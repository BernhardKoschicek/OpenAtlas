# Created by Alexander Watzinger and others. Please see README.md for licensing information
from flask import flash, g, render_template, request, url_for
from flask_babel import lazy_gettext as _
from flask_login import current_user
from werkzeug.utils import redirect
from wtforms import (BooleanField, FieldList, HiddenField, IntegerField, StringField, SubmitField,
                     TextAreaField)
from wtforms.validators import InputRequired, Optional

from openatlas import app, logger
from openatlas.forms.forms import DateForm, build_form
from openatlas.models.entity import EntityMapper
from openatlas.models.gis import GisMapper, InvalidGeomException
from openatlas.models.node import NodeMapper
from openatlas.models.user import UserMapper
from openatlas.models.overlay import OverlayMapper
from openatlas.util.table import Table
from openatlas.util.util import (display_remove_link, get_base_table_data, get_entity_data,
                                 get_profile_image_table_link, is_authorized, link, required_group,
                                 truncate_string, uc_first, was_modified)


class PlaceForm(DateForm):
    name = StringField(_('name'), [InputRequired()], render_kw={'autofocus': True})
    geonames_id = IntegerField('GeoNames Id', [Optional()], description=_('tooltip geonames'))
    geonames_precision = BooleanField('exact match')
    alias = FieldList(StringField(''), description=_('tooltip alias'))
    description = TextAreaField(_('description'))
    save = SubmitField(_('insert'))
    insert_and_continue = SubmitField(_('insert and continue'))
    gis_points = HiddenField(default='[]')
    gis_polygons = HiddenField(default='[]')
    gis_lines = HiddenField(default='[]')
    continue_ = HiddenField()
    opened = HiddenField()


class FeatureForm(DateForm):
    name = StringField(_('name'), [InputRequired()])
    description = TextAreaField(_('description'))
    save = SubmitField(_('insert'))
    gis_points = HiddenField()
    gis_polygons = HiddenField()
    gis_lines = HiddenField()
    insert_and_continue = SubmitField(_('insert and continue'))
    continue_ = HiddenField()
    opened = HiddenField()


@app.route('/place')
@required_group('readonly')
def place_index():
    table = Table(Table.HEADERS['place'], defs='[{className: "dt-body-right", targets: [2,3]}]')
    for place in EntityMapper.get_by_system_type(
            'place', nodes=True, aliases=current_user.settings['table_show_aliases']):
        table.rows.append(get_base_table_data(place))
    return render_template('place/index.html', table=table, gis_data=GisMapper.get_all())


@app.route('/place/insert', methods=['POST', 'GET'])
@app.route('/place/insert/<int:origin_id>', methods=['POST', 'GET'])
@required_group('contributor')
def place_insert(origin_id=None):
    origin = EntityMapper.get_by_id(origin_id) if origin_id else None
    geonames_buttons = False
    if origin and origin.system_type == 'place':
        title = 'feature'
        form = build_form(FeatureForm, 'Feature')
    elif origin and origin.system_type == 'feature':
        title = 'stratigraphic unit'
        form = build_form(FeatureForm, 'Stratigraphic Unit')
    elif origin and origin.system_type == 'stratigraphic unit':
        title = 'find'
        form = build_form(FeatureForm, 'Find')
    else:
        title = 'place'
        form = build_form(PlaceForm, 'Place')
        geonames_buttons = True if current_user.settings['module_geonames'] else False
    if origin and origin.system_type not in ['place', 'feature', 'stratigraphic unit'] \
            and hasattr(form, 'insert_and_continue'):
        del form.insert_and_continue
    if hasattr(form, 'geonames_id') and not current_user.settings['module_geonames']:
        del form.geonames_id, form.geonames_precision  # pragma: no cover
    if form.validate_on_submit():
        return redirect(save(form, origin=origin))
    if title == 'place':
        form.alias.append_entry('')
    gis_data = GisMapper.get_all()
    place = None
    feature = None
    if origin and origin.system_type == 'stratigraphic unit':
        feature = origin.get_linked_entity('P46', True)
        place = feature.get_linked_entity('P46', True)
    elif origin and origin.system_type == 'feature':
        place = origin.get_linked_entity('P46', True)
    return render_template('place/insert.html', form=form, title=title, place=place, origin=origin,
                           gis_data=gis_data, feature=feature, geonames_buttons=geonames_buttons)


@app.route('/place/view/<int:id_>')
@required_group('readonly')
def place_view(id_):
    object_ = EntityMapper.get_by_id(id_, nodes=True, aliases=True)
    object_.note = UserMapper.get_note(object_)
    location = object_.get_linked_entity('P53', nodes=True)
    tables = {'info': get_entity_data(object_, location),
              'file': Table(Table.HEADERS['file'] + [_('main image')]),
              'source': Table(Table.HEADERS['source']),
              'event': Table(Table.HEADERS['event'],
                             defs='[{className: "dt-body-right", targets: [3,4]}]'),
              'reference': Table(Table.HEADERS['reference'] + ['page / link text']),
              'actor': Table([_('actor'), _('property'), _('class'), _('first'), _('last')])}
    if object_.system_type == 'place':
        tables['feature'] = Table(Table.HEADERS['place'] + [_('description')])
    if object_.system_type == 'feature':
        tables['stratigraphic-unit'] = Table(Table.HEADERS['place'] + [_('description')])
    if object_.system_type == 'stratigraphic unit':
        tables['find'] = Table(Table.HEADERS['place'] + [_('description')])
    profile_image_id = object_.get_profile_image_id()
    overlays = None
    if current_user.settings['module_map_overlay']:
        overlays = OverlayMapper.get_by_object(object_)
        print(overlays)
        if is_authorized('editor'):
            tables['file'].header.append(uc_first(_('overlay')))

    for link_ in object_.get_links('P67', inverse=True):
        domain = link_.domain
        data = get_base_table_data(domain)
        if domain.view_name == 'file':  # pragma: no cover
            extension = data[3].replace('.', '')
            data.append(get_profile_image_table_link(domain, object_, extension, profile_image_id))
            if not profile_image_id and extension in app.config['DISPLAY_FILE_EXTENSIONS']:
                profile_image_id = domain.id
            if is_authorized('editor') and current_user.settings['module_map_overlay']:
                if extension in app.config['DISPLAY_FILE_EXTENSIONS']:
                    if domain.id in overlays:
                        url = url_for('overlay_update', id_=overlays[domain.id].id)
                        data.append('<a href="' + url + '">' + uc_first(_('edit')) + '</a>')
                    else:
                        url = url_for('overlay_insert', image_id=domain.id, place_id=object_.id,
                                      link_id=link_.id)
                        data.append('<a href="' + url + '">' + uc_first(_('add')) + '</a>')
                else:
                    data.append('')
        if domain.view_name not in ['source', 'file']:
            data.append(truncate_string(link_.description))
            if domain.system_type.startswith('external reference'):
                object_.external_references.append(link_)
            if is_authorized('contributor') and domain.system_type != 'external reference geonames':
                url = url_for('reference_link_update', link_id=link_.id, origin_id=object_.id)
                data.append('<a href="' + url + '">' + uc_first(_('edit')) + '</a>')
            else:
                data.append('')
        if is_authorized('contributor'):
            url = url_for('link_delete', id_=link_.id, origin_id=object_.id)
            data.append(display_remove_link(url + '#tab-' + domain.view_name, domain.name))
        tables[domain.view_name].rows.append(data)
    event_ids = []  # Keep track of already inserted events to prevent doubles
    for event in location.get_linked_entities(['P7'], inverse=True):
        tables['event'].rows.append(get_base_table_data(event))
        event_ids.append(event.id)
    for event in object_.get_linked_entities(['P24'], inverse=True):
        if event.id not in event_ids:  # Don't add again if already in table
            tables['event'].rows.append(get_base_table_data(event))
    has_subunits = False
    for entity in object_.get_linked_entities('P46', nodes=True):
        has_subunits = True
        data = get_base_table_data(entity)
        data.append(truncate_string(entity.description))
        tables[entity.system_type.replace(' ', '-')].rows.append(data)
    for link_ in location.get_links(['P74', 'OA8', 'OA9'], inverse=True):
        actor = EntityMapper.get_by_id(link_.domain.id)
        tables['actor'].rows.append([link(actor),
                                     g.properties[link_.property.code].name,
                                     actor.class_.name,
                                     actor.first,
                                     actor.last])
    gis_data = GisMapper.get_all(object_) if location else None
    if gis_data['gisPointSelected'] == '[]' and gis_data['gisPolygonSelected'] == '[]' \
            and gis_data['gisLineSelected'] == '[]':
        gis_data = None
    place = None
    feature = None
    stratigraphic_unit = None
    if object_.system_type == 'find':
        stratigraphic_unit = object_.get_linked_entity('P46', True)
        feature = stratigraphic_unit.get_linked_entity('P46', True)
        place = feature.get_linked_entity('P46', True)
    elif object_.system_type == 'stratigraphic unit':
        feature = object_.get_linked_entity('P46', True)
        place = feature.get_linked_entity('P46', True)
    elif object_.system_type == 'feature':
        place = object_.get_linked_entity('P46', True)
    return render_template('place/view.html', object_=object_, tables=tables, gis_data=gis_data,
                           place=place, feature=feature, stratigraphic_unit=stratigraphic_unit,
                           has_subunits=has_subunits, profile_image_id=profile_image_id,
                           overlays=overlays)


@app.route('/place/delete/<int:id_>')
@required_group('contributor')
def place_delete(id_):
    entity = EntityMapper.get_by_id(id_)
    parent = None if entity.system_type == 'place' else entity.get_linked_entity('P46', True)
    if entity.get_linked_entities('P46'):
        flash(_('Deletion not possible if subunits exists'), 'error')
        return redirect(url_for('place_view', id_=id_))
    entity.delete()
    logger.log_user(id_, 'delete')
    flash(_('entity deleted'), 'info')
    if parent:
        return redirect(url_for('place_view', id_=parent.id) + '#tab-' + entity.system_type)
    return redirect(url_for('place_index'))


@app.route('/place/update/<int:id_>', methods=['POST', 'GET'])
@required_group('contributor')
def place_update(id_):
    object_ = EntityMapper.get_by_id(id_, nodes=True, aliases=True)
    location = object_.get_linked_entity('P53', nodes=True)
    geonames_buttons = False
    if object_.system_type == 'feature':
        form = build_form(FeatureForm, 'Feature', object_, request, location)
    elif object_.system_type == 'stratigraphic unit':
        form = build_form(FeatureForm, 'Stratigraphic Unit', object_, request, location)
    elif object_.system_type == 'find':
        form = build_form(FeatureForm, 'Find', object_, request, location)
    else:
        geonames_buttons = True if current_user.settings['module_geonames'] else False
        form = build_form(PlaceForm, 'Place', object_, request, location)
    if hasattr(form, 'geonames_id') and not current_user.settings['module_geonames']:
        del form.geonames_id, form.geonames_precision  # pragma: no cover
    if form.validate_on_submit():
        if was_modified(form, object_):  # pragma: no cover
            del form.save
            flash(_('error modified'), 'error')
            modifier = link(logger.get_log_for_advanced_view(object_.id)['modifier'])
            return render_template(
                'place/update.html', form=form, object_=object_, modifier=modifier)
        save(form, object_, location)
        return redirect(url_for('place_view', id_=id_))
    if object_.system_type == 'place':
        for alias in object_.aliases.values():
            form.alias.append_entry(alias)
        form.alias.append_entry('')
    gis_data = GisMapper.get_all(object_)
    if hasattr(form, 'geonames_id') and current_user.settings['module_geonames']:
        geonames_link = get_geonames_link(object_)
        if geonames_link:
            geonames_entity = geonames_link.domain
            form.geonames_id.data = geonames_entity.name if geonames_entity else ''
            exact_match = True if g.nodes[geonames_link.type.id].name == 'exact match' else False
            form.geonames_precision.data = exact_match
    place = None
    feature = None
    stratigraphic_unit = None
    if object_.system_type == 'find':
        stratigraphic_unit = object_.get_linked_entity('P46', True)
        feature = stratigraphic_unit.get_linked_entity('P46', True)
        place = feature.get_linked_entity('P46', True)
    if object_.system_type == 'stratigraphic unit':
        feature = object_.get_linked_entity('P46', True)
        place = feature.get_linked_entity('P46', True)
    elif object_.system_type == 'feature':
        place = object_.get_linked_entity('P46', True)

    return render_template('place/update.html', form=form, object_=object_, gis_data=gis_data,
                           place=place, feature=feature, stratigraphic_unit=stratigraphic_unit,
                           overlays=OverlayMapper.get_by_object(object_),
                           geonames_buttons=geonames_buttons)


def save(form: DateForm, object_=None, location=None, origin=None) -> str:
    g.cursor.execute('BEGIN')
    log_action = 'update'
    try:
        if object_:
            GisMapper.delete_by_entity(location)
        else:
            log_action = 'insert'
            if origin and origin.system_type == 'stratigraphic unit':
                object_ = EntityMapper.insert('E22', form.name.data, 'find')
            else:
                system_type = 'place'
                if origin and origin.system_type == 'place':
                    system_type = 'feature'
                elif origin and origin.system_type == 'feature':
                    system_type = 'stratigraphic unit'
                object_ = EntityMapper.insert('E18', form.name.data, system_type)
            location = EntityMapper.insert('E53', 'Location of ' + form.name.data, 'place location')
            object_.link('P53', location)
        object_.name = form.name.data
        object_.description = form.description.data
        object_.set_dates(form)
        object_.update()
        object_.save_nodes(form)
        if object_.system_type == 'place':
            object_.update_aliases(form)
        location.name = 'Location of ' + form.name.data
        location.update()
        location.save_nodes(form)
        if hasattr(form, 'geonames_id') and current_user.settings['module_geonames']:
            update_geonames(form, object_)
        url = url_for('place_view', id_=object_.id)
        if origin:
            url = url_for(origin.view_name + '_view', id_=origin.id) + '#tab-place'
            if origin.view_name == 'reference':
                link_id = origin.link('P67', object_)
                url = url_for('reference_link_update', link_id=link_id, origin_id=origin.id)
            elif origin.system_type in ['place', 'feature', 'stratigraphic unit']:
                url = url_for('place_view', id_=object_.id)
                origin.link('P46', object_)
            else:
                origin.link('P67', object_)
        GisMapper.insert(location, form)
        g.cursor.execute('COMMIT')
        if form.continue_.data == 'yes':
            url = url_for('place_insert', origin_id=origin.id if origin else None)
        logger.log_user(object_.id, log_action)
        flash(_('entity created') if log_action == 'insert' else _('info update'), 'info')
    except InvalidGeomException as e:  # pragma: no cover
        g.cursor.execute('ROLLBACK')
        logger.log('error', 'database', 'transaction failed because of invalid geom', str(e))
        flash(_('Invalid geom entered'), 'error')
        url = url_for('place_index') if log_action == 'insert' else url_for('place_view',
                                                                            id_=object_.id)
    except Exception as e:  # pragma: no cover
        g.cursor.execute('ROLLBACK')
        logger.log('error', 'database', 'transaction failed', str(e))
        flash(_('error transaction'), 'error')
        url = url_for('place_index') if log_action == 'insert' else url_for('place_view',
                                                                            id_=object_.id)
    return url


def get_geonames_link(object_):
    for link_ in object_.get_links('P67', inverse=True):
        if link_.domain.system_type == 'external reference geonames':
            return link_
    return


def update_geonames(form: PlaceForm, object_) -> None:
    new_geonames_id = form.geonames_id.data
    geonames_link = get_geonames_link(object_)
    geonames_entity = geonames_link.domain if geonames_link else None

    if not new_geonames_id:
        if geonames_entity:
            if len(geonames_entity.get_links('P67')) > 1:  # pragma: no cover
                geonames_link.delete()  # There are more linked so only remove this link
            else:
                geonames_entity.delete()  # Nothing else is linked to the reference so delete it
        return

    # Get id of the match type
    match_id = None
    for node_id in NodeMapper.get_hierarchy_by_name('External Reference Match').subs:
        if g.nodes[node_id].name == 'exact match' and form.geonames_precision.data:
            match_id = node_id
            break
        if g.nodes[node_id].name == 'close match' and not form.geonames_precision.data:
            match_id = node_id
            break

    # There wasn't one linked before
    if not geonames_entity:
        reference = EntityMapper.get_by_name_and_system_type(new_geonames_id,
                                                             'external reference geonames')
        if not reference:  # The selected reference doesn't exist so create it
            reference = EntityMapper.insert('E31', new_geonames_id, 'external reference geonames',
                                            description='GeoNames ID')
        object_.link('P67', reference, inverse=True, type_id=match_id)
        return

    if int(new_geonames_id) == int(geonames_entity.name) and match_id == geonames_link.type.id:
        return  # It's the same link so do nothing

    # Only the match type change so delete and recreate the link
    if int(new_geonames_id) == int(geonames_entity.name):
        geonames_link.delete()
        object_.link('P67', geonames_entity, inverse=True, type_id=match_id)
        return

    # Its linked to a different geonames reference
    if len(geonames_entity.get_links('P67')) > 1:
        geonames_link.delete()  # There are more linked so only remove this link
    else:  # pragma: no cover
        geonames_entity.delete()  # Nothing else is linked to the reference so delete it
    reference = EntityMapper.get_by_name_and_system_type(new_geonames_id,
                                                         'external reference geonames')

    if not reference:  # The selected reference doesn't exist so create it
        reference = EntityMapper.insert('E31', new_geonames_id, 'external reference geonames',
                                        description='GeoNames ID')
    object_.link('P67', reference, inverse=True, type_id=match_id)

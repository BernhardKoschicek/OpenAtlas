# Created by Alexander Watzinger and others. Please see README.md for licensing information
from typing import Any, Union

from flask import flash, g, render_template, request, url_for
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from werkzeug.exceptions import abort
from werkzeug.utils import redirect
from werkzeug.wrappers import Response
from wtforms import HiddenField, StringField, SubmitField, TextAreaField
from wtforms.validators import InputRequired, URL

import openatlas
from openatlas import app, logger
from openatlas.forms.forms import TableField, build_form
from openatlas.models.entity import Entity, EntityMapper
from openatlas.models.link import LinkMapper
from openatlas.util.table import Table
from openatlas.util.util import (get_base_table_data, link, required_group, truncate_string,
                                 uc_first, was_modified)


class ReferenceForm(FlaskForm):
    name = StringField(_('name'), [InputRequired()], render_kw={'autofocus': True})
    description = TextAreaField(_('description'))
    save = SubmitField(_('insert'))
    insert_and_continue = SubmitField(_('insert and continue'))
    continue_ = HiddenField()
    opened = HiddenField()


class AddReferenceForm(FlaskForm):
    reference = TableField(_('reference'), [InputRequired()])
    page = StringField(_('page'))
    save = SubmitField(_('insert'))


class AddSourceForm(FlaskForm):
    source = TableField(_('source'), [InputRequired()])
    page = StringField(_('page'))
    save = SubmitField(_('insert'))


class AddEventForm(FlaskForm):
    event = TableField(_('event'), [InputRequired()])
    page = StringField(_('page'))
    save = SubmitField(_('insert'))


class AddActorForm(FlaskForm):
    actor = TableField(_('actor'), [InputRequired()])
    page = StringField(_('page'))
    save = SubmitField(_('insert'))


class AddPlaceForm(FlaskForm):
    place = TableField(_('place'), [InputRequired()])
    page = StringField(_('page'))
    save = SubmitField(_('insert'))


class AddFileForm(FlaskForm):
    file = TableField(_('file'), [InputRequired()])
    page = StringField(_('page'))
    save = SubmitField(_('insert'))


@app.route('/reference/add/<int:id_>/<class_name>', methods=['POST', 'GET'])
@required_group('contributor')
def reference_add(id_: int, class_name: str) -> Union[str, Response]:
    reference = EntityMapper.get_by_id(id_, view_name='reference')
    form = getattr(openatlas.views.reference, 'Add' + uc_first(class_name) + 'Form')()
    if form.validate_on_submit():
        property_code = 'P128' if reference.class_.code == 'E84' else 'P67'
        entity = EntityMapper.get_by_id(getattr(form, class_name).data)
        reference.link(property_code, entity, form.page.data)
        return redirect(url_for('entity_view', id_=reference.id) + '#tab-' + class_name)
    if reference.system_type == 'external reference':
        form.page.label.text = uc_first(_('link text'))
    return render_template('reference/add.html', reference=reference, form=form,
                           class_name=class_name)


@app.route('/reference/link-update/<int:link_id>/<int:origin_id>', methods=['POST', 'GET'])
@required_group('contributor')
def reference_link_update(link_id: int, origin_id: int) -> Union[str, Response]:
    link_ = LinkMapper.get_by_id(link_id)
    origin = EntityMapper.get_by_id(origin_id)
    form = AddReferenceForm()
    del form.reference
    if form.validate_on_submit():
        link_.description = form.page.data
        link_.update()
        flash(_('info update'), 'info')
        tab = '#tab-' + (link_.range.view_name if origin.view_name == 'reference' else 'reference')
        return redirect(url_for('entity_view', id_=origin.id) + tab)
    form.save.label.text = _('save')
    form.page.data = link_.description
    if link_.domain.system_type == 'external reference':
        form.page.label.text = uc_first(_('link text'))
    linked_object = link_.domain if link_.domain.id != origin.id else link_.range
    return render_template('reference/link-update.html', origin=origin, form=form,
                           linked_object=linked_object)


@app.route('/reference')
@required_group('readonly')
def reference_index() -> str:
    table = Table(Table.HEADERS['reference'] + ['description'])
    for reference in EntityMapper.get_by_codes('reference'):
        data = get_base_table_data(reference)
        data.append(truncate_string(reference.description))
        table.rows.append(data)
    return render_template('reference/index.html', table=table)


@app.route('/reference/insert/<code>', methods=['POST', 'GET'])
@app.route('/reference/insert/<code>/<int:origin_id>', methods=['POST', 'GET'])
@required_group('contributor')
def reference_insert(code: str, origin_id: int = None) -> Union[str, Response]:
    origin = EntityMapper.get_by_id(origin_id) if origin_id else None
    form = build_form(ReferenceForm, 'External Reference' if code == 'external_reference' else code)
    if code == 'external_reference':
        form.name.validators = [InputRequired(), URL()]
        form.name.label.text = 'URL'
    if origin:
        del form.insert_and_continue
    if form.validate_on_submit():
        return redirect(save(form, code=code, origin=origin))
    return render_template('reference/insert.html', form=form, code=code, origin=origin)


@app.route('/reference/delete/<int:id_>')
@required_group('contributor')
def reference_delete(id_: int) -> Response:
    EntityMapper.delete(id_)
    logger.log_user(id_, 'delete')
    flash(_('entity deleted'), 'info')
    return redirect(url_for('reference_index'))


@app.route('/reference/update/<int:id_>', methods=['POST', 'GET'])
@required_group('contributor')
def reference_update(id_: int) -> Union[str, Response]:
    reference = EntityMapper.get_by_id(id_, nodes=True, view_name='reference')
    form = build_form(ReferenceForm, reference.system_type.title(), reference, request)
    if reference.system_type == 'external reference':
        form.name.validators = [InputRequired(), URL()]
        form.name.label.text = 'URL'
    if form.validate_on_submit():
        if was_modified(form, reference):  # pragma: no cover
            del form.save
            flash(_('error modified'), 'error')
            modifier = link(logger.get_log_for_advanced_view(reference.id)['modifier'])
            return render_template('reference/update.html', form=form, reference=reference,
                                   modifier=modifier)
        save(form, reference)
        return redirect(url_for('entity_view', id_=id_))
    return render_template('reference/update.html', form=form, reference=reference)


def save(form: Any, reference: Entity = None, code: str = None, origin: Entity = None) -> str:
    g.cursor.execute('BEGIN')
    log_action = 'update'

    try:
        if not code and not reference:
            abort(404)  # pragma: no cover, either reference or code has to be provided
        elif not reference:
            log_action = 'insert'
            system_type = code.replace('_', ' ')  # type: ignore
            reference = EntityMapper.insert('E31', form.name.data, system_type)
        reference.name = form.name.data
        reference.description = form.description.data
        reference.update()
        reference.save_nodes(form)
        url = url_for('entity_view', id_=reference.id)
        if origin:
            link_id = reference.link('P67', origin)[0]
            url = url_for('reference_link_update', link_id=link_id, origin_id=origin.id)
        if form.continue_.data == 'yes' and code:
            url = url_for('reference_insert', code=code)
        g.cursor.execute('COMMIT')
        logger.log_user(reference.id, log_action)
        flash(_('entity created') if log_action == 'insert' else _('info update'), 'info')
    except Exception as e:  # pragma: no cover
        g.cursor.execute('ROLLBACK')
        logger.log('error', 'database', 'transaction failed', e)
        flash(_('error transaction'), 'error')
        url = url_for('reference_index')
    return url

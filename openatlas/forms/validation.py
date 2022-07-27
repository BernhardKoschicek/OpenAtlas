import ast

from flask import g, request
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from wtforms import MultipleFileField

from openatlas.forms.field import TableField, TreeField
from openatlas.forms.util import form_to_datetime64
from openatlas.models.entity import Entity
from openatlas.models.type import Type
from openatlas.util.util import uc_first


def super_event(form: FlaskForm, super_: TableField) -> None:
    if not super_.data:
        return
    if str(super_.data) == str(form.event_id.data):
        form.event.errors.append(_('self as super not allowed'))
    if get_sub_events_recursive(
            Entity.get_by_id(form.event_id.data),
            Entity.get_by_id(super_.data)):  # pragma: no cover
        form.event.errors.append(_('sub of self not allowed as super'))


def get_sub_events_recursive(entity, target):  # pragma: no cover
    for sub in entity.get_linked_entities('P9', inverse=True):
        if sub.id == target.id:
            return True
        get_sub_events_recursive(sub, target)


def preceding_event(form: FlaskForm, preceding: TableField) -> None:
    if preceding.data and str(preceding.data) == str(form.event_id.data):
        form.event_preceding.errors.append(_('self as preceding not allowed'))


def membership(form: FlaskForm, member: TableField) -> None:
    if form.member_origin_id.data in ast.literal_eval(member.data):
        member.errors.append(_("Can't link to itself."))


def actor_relation(form: FlaskForm, actor: TableField) -> None:
    if getattr(form, 'relation_origin_id').data \
            in ast.literal_eval(actor.data):
        actor.errors.append(_("Can't link to itself."))


def file(_form: FlaskForm, field: MultipleFileField) -> None:
    for file_ in request.files.getlist('file'):
        if not file_:  # pragma: no cover
            field.errors.append(_('no file to upload'))
        elif not (
                '.' in file_.filename
                and file_.filename.rsplit('.', 1)[1].lower() in
                g.settings['file_upload_allowed_extension']):
            field.errors.append(uc_first(_('file type not allowed')))


def type_super(form: FlaskForm, field: TreeField) -> None:
    type_ = g.types[int(form.entity_id.data)]
    new_super = g.types[int(field.data)]
    if new_super.id == type_.id:
        field.errors.append(uc_first(_('error type self as super')))
    if new_super.root and type_.id in new_super.root:
        field.errors.append(uc_first(_('error type sub as super')))


def hierarchy_name_exists(form: FlaskForm, field: TreeField) -> None:
    if not hasattr(form, 'entity_id') or \
            Entity.get_by_id(int(form.entity_id.data)).name != form.name.data:
        if Type.check_hierarchy_exists(form.name.data):
            field.errors.append(uc_first(_('error name exists')))


def validate(form: FlaskForm) -> bool:
    # Validation of dates and reference systems are handled here in general
    # because of multiple fields, Flask doesn't validate empty input, ...
    valid = FlaskForm.validate(form)
    if hasattr(form, 'begin_year_from'):  # Dates
        if not validate_dates(form):
            valid = False
    for field_id, field in form.__dict__.items():  # External reference systems
        if field_id.startswith('reference_system_id_') and field.data:
            if not getattr(form, field_id.replace('id_', 'precision_')).data:
                valid = False
                field.errors.append(uc_first(_('precision required')))
            if field.label.text == 'Wikidata':
                if field.data[0].upper() != 'Q' \
                        or not field.data[1:].isdigit():
                    field.errors.append(uc_first(_('wrong id format')))
                    valid = False
                else:
                    field.data = uc_first(field.data)
            if field.label.text == 'GeoNames' and not field.data.isnumeric():
                field.errors.append(uc_first(_('wrong id format')))
                valid = False
    return valid


def validate_dates(form: FlaskForm) -> bool:
    valid = True
    dates = {}
    for prefix in ['begin_', 'end_']:  # Create "dates" dict for validation
        if getattr(form, f'{prefix}year_to').data \
                and not getattr(form, f'{prefix}year_from').data:
            getattr(form, f'{prefix}year_from').errors.append(
                _("Required for time span"))
            valid = False
        for postfix in ['_from', '_to']:
            if getattr(form, f'{prefix}year{postfix}').data:
                date = form_to_datetime64(
                    getattr(form, f'{prefix}year{postfix}').data,
                    getattr(form, f'{prefix}month{postfix}').data,
                    getattr(form, f'{prefix}day{postfix}').data,
                    getattr(form, f'{prefix}hour{postfix}').data
                    if f'{prefix}hour{postfix}' in form else None,
                    getattr(form, f'{prefix}minute{postfix}').data
                    if f'{prefix}minute{postfix}' in form else None,
                    getattr(form, f'{prefix}second{postfix}').data
                    if f'{prefix}second{postfix}' in form else None)
                if not date:
                    getattr(form, f'{prefix}day{postfix}').errors.append(
                        _('not a valid date'))
                    valid = False
                else:
                    dates[prefix + postfix.replace('_', '')] = date
    # Check for valid date combination e.g. begin not after end
    if valid:
        for prefix in ['begin', 'end']:
            if f'{prefix}_from' in dates \
                    and f'{prefix}_to' in dates \
                    and dates[f'{prefix}_from'] > dates[f'{prefix}_to']:
                field = getattr(form, f'{prefix}_day_from')
                field.errors.append(_('First date cannot be after second.'))
                valid = False
    if 'begin_from' in dates and 'end_from' in dates:
        field = getattr(form, 'begin_day_from')
        if len(dates) == 4:  # All dates are used
            if dates['begin_from'] > dates['end_from'] \
                    or dates['begin_to'] > dates['end_to']:
                field.errors.append(
                    _('Begin dates cannot start after end dates.'))
                valid = False
        else:
            first = dates['begin_to'] \
                if 'begin_to' in dates else dates['begin_from']
            second = dates['end_from'] \
                if 'end_from' in dates else dates['end_to']
            if first > second:
                field.errors.append(
                    _('Begin dates cannot start after end dates.'))
                valid = False
    return valid

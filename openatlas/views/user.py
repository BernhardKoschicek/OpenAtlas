from typing import Optional, Union

import bcrypt
from flask import abort, flash, g, render_template, request, url_for
from flask_babel import format_number, lazy_gettext as _
from flask_login import current_user
from flask_wtf import FlaskForm
from werkzeug.utils import redirect
from werkzeug.wrappers import Response
from wtforms import (
    BooleanField, HiddenField, PasswordField, SelectField, StringField,
    SubmitField, TextAreaField)
from wtforms.validators import Email, InputRequired

from openatlas import app
from openatlas.models.entity import Entity
from openatlas.models.user import User
from openatlas.util.table import Table
from openatlas.util.util import (
    format_date, is_authorized, link, required_group, send_mail, uc_first)


class UserForm(FlaskForm):
    user_id: Optional[int] = None
    active = BooleanField(_('active'), default=True)
    username = StringField(
        _('username'),
        [InputRequired()],
        render_kw={'autofocus': True})
    group = SelectField(_('group'), choices=[])
    email = StringField(_('email'), [InputRequired(), Email()])
    password = PasswordField(_('password'), [InputRequired()])
    password2 = PasswordField(_('repeat password'), [InputRequired()])
    show_passwords = BooleanField(_('show passwords'))
    real_name = StringField(_('full name'), description=_('tooltip full name'))
    description = TextAreaField(_('info'))
    send_info = BooleanField(_('send account information'))
    save = SubmitField(_('save'))
    insert_and_continue = SubmitField(_('insert and continue'))
    continue_ = HiddenField()

    def validate(self) -> bool:
        valid = FlaskForm.validate(self)
        username = ''
        user_email = ''
        if self.user_id:
            user = User.get_by_id(self.user_id)
            if not user:
                abort(404)  # pragma: no cover
            username = user.username
            user_email = user.email
        if username != self.username.data \
                and User.get_by_username(self.username.data):
            self.username.errors.append(_('error username exists'))
            valid = False
        if user_email != self.email.data \
                and User.get_by_email(self.email.data):
            self.email.errors.append(_('error email exists'))
            valid = False
        if getattr(self, 'password'):
            if self.password.data != self.password2.data:
                self.password.errors.append(_('error passwords must match'))
                self.password2.errors.append(_('error passwords must match'))
                valid = False
            if len(self.password.data) < g.settings['minimum_password_length']:
                self.password.errors.append(_('error password too short'))
                valid = False
        return valid


class ActivityForm(FlaskForm):
    action_choices = (
        ('all', _('all')),
        ('insert', _('insert')),
        ('update', _('update')),
        ('delete', _('delete')))
    limit = SelectField(
        _('limit'),
        choices=((0, _('all')), (100, 100), (500, 500)),
        default=100,
        coerce=int)
    user = SelectField(
        _('user'),
        choices=([(0, _('all'))]),
        default=0,
        coerce=int)
    action = SelectField(_('action'), choices=action_choices, default='all')
    save = SubmitField(_('apply'))


@app.route('/admin/user/activity', methods=['POST', 'GET'])
@app.route('/admin/user/activity/<int:user_id>', methods=['POST', 'GET'])
@required_group('readonly')
def user_activity(user_id: int = 0) -> str:
    form = ActivityForm()
    form.user.choices = [(0, _('all'))] + User.get_users_for_form()
    if form.validate_on_submit():
        activity = User.get_activities(
            int(form.limit.data),
            int(form.user.data),
            form.action.data)
    elif user_id:
        form.user.data = user_id
        activity = User.get_activities(100, user_id, 'all')
    else:
        activity = User.get_activities(100, 0, 'all')
    table = Table(['date', 'user', 'action', 'entity'], order=[[0, 'desc']])
    for row in activity:
        try:
            entity = link(Entity.get_by_id(row['entity_id']))
        except AttributeError:  # pragma: no cover - entity already deleted
            entity = f"id {row['entity_id']}"
        user = User.get_by_id(row['user_id'])
        table.rows.append([
            format_date(row['created']),
            link(user) if user else f"id {row['user_id']}",
            _(row['action']),
            entity])
    return render_template(
        'user/activity.html',
        table=table,
        form=form,
        title=_('user'),
        crumbs=[[_('admin'), url_for('admin_index')], _('activity')])


@app.route('/admin/user/view/<int:id_>')
@required_group('readonly')
def user_view(id_: int) -> str:
    user = User.get_by_id(id_)
    if not user:
        abort(404)  # pragma: no cover
    entities_count = ''
    if count := User.get_created_entities_count(user.id):
        entities_count = \
            f'<a href="{url_for("user_entities", id_=user.id)}">' \
            f'{format_number(count)}</a>'
    info = {
        _('username'): user.username,
        _('group'): user.group,
        _('full name'): user.real_name,
        _('email'):
            user.email
            if is_authorized('manager') or user.settings['show_email'] else '',
        _('created entities'): entities_count,
        _('language'): user.settings['language'],
        _('last login'): format_date(user.login_last_success),
        _('failed logins'):
            user.login_failed_count if is_authorized('manager') else ''}
    return render_template(
        'user/view.html',
        user=user,
        info=info,
        title=user.username,
        crumbs=[
            [_('admin'), f"{url_for('admin_index')}#tab-user"],
            user.username])


@app.route('/admin/user/entities/<int:id_>')
@required_group('readonly')
def user_entities(id_: int) -> str:
    user = User.get_by_id(id_)
    table = Table([
        'name',
        'class',
        'type',
        'begin',
        'end',
        'created'])
    for entity in user.get_entities():
        table.rows.append([
            link(entity),
            entity.class_.label,
            link(entity.standard_type),
            entity.first,
            entity.last,
            format_date(entity.created)])
    return render_template(
        'table.html',
        table=table,
        crumbs=[
            [_('admin'), f"{url_for('admin_index')}#tab-user"],
            user,
            _('entered entities')])


@app.route('/admin/user/update/<int:id_>', methods=['POST', 'GET'])
@required_group('manager')
def user_update(id_: int) -> Union[str, Response]:
    user = User.get_by_id(id_)
    if not user:
        abort(404)  # pragma: no cover
    if user.group == 'admin' and current_user.group != 'admin':
        abort(403)  # pragma: no cover
    form = UserForm(obj=user)
    form.user_id = id_
    del form.password, form.password2, form.send_info, \
        form.insert_and_continue, form.show_passwords
    form.group.choices = get_groups()
    if user and form.validate_on_submit():
        # Active is always true for current user to prevent self deactivation
        user.active = True if user.id == current_user.id else form.active.data
        user.real_name = form.real_name.data
        user.username = form.username.data
        user.email = form.email.data
        user.description = form.description.data
        user.group = form.group.data
        user.update()
        flash(_('info update'), 'info')
        return redirect(url_for('user_view', id_=id_))
    if user.id == current_user.id:
        del form.active
    return render_template(
        'display_form.html',
        form=form,
        title=user.username,
        manual_page='admin/user',
        crumbs=[
            [_('admin'), f"{url_for('admin_index')}#tab-user"],
            user,
            _('edit')])


@app.route('/admin/user/insert', methods=['POST', 'GET'])
@required_group('manager')
def user_insert() -> Union[str, Response]:
    form = UserForm()
    form.group.choices = get_groups()
    if not g.settings['mail']:
        del form.send_info
    if form.validate_on_submit():
        user_id = User.insert({
            'username': form.username.data.strip(),
            'real_name': form.real_name.data.strip(),
            'info': form.description.data,
            'email': form.email.data,
            'active': form.active.data,
            'group_name': form.group.data,
            'password': bcrypt.hashpw(
                form.password.data.encode('utf-8'),
                bcrypt.gensalt()).decode('utf-8')})
        flash(_('user created'), 'info')
        if g.settings['mail'] and form.send_info.data:  # pragma: no cover
            subject = _(
                'Your account information for %(sitename)s',
                sitename=g.settings['site_name'])
            body = \
                _('Account information for %(username)s',
                  username=form.username.data) + \
                f" {_('at')} {request.scheme}" \
                f"://{request.headers['Host']}\n\n" \
                f"{uc_first(_('username'))}: {form.username.data}\n" \
                f"{uc_first(_('password'))}: {form.password.data}\n"
            if send_mail(subject, body, form.email.data, False):
                flash(
                    _('Sent account information mail to %(email)s.',
                      email=form.email.data),
                    'info')
            else:
                flash(
                    _('Failed to send account details to %(email)s.',
                      email=form.email.data),
                    'error')
        if hasattr(form, 'continue_') and form.continue_.data == 'yes':
            return redirect(url_for('user_insert'))
        return redirect(url_for('user_view', id_=user_id))
    return render_template(
        'user/insert.html',
        form=form,
        title=_('user'),
        crumbs=[
            [_('admin'),
             f"{url_for('admin_index')}#tab-user"],
            f"+ {uc_first(_('user'))}"])


def get_groups() -> list[tuple[str, str]]:
    choices = [(name, name) for name in [  # Weakest to strongest permissions
        'readonly',
        'contributor',
        'editor',
        'manager']]
    if is_authorized('admin'):
        choices.append(('admin', 'admin'))
    return choices

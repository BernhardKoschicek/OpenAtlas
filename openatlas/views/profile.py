# Copyright 2017 by Alexander Watzinger and others. Please see README.md for licensing information
import bcrypt
from flask import flash, render_template, session, url_for
from flask_babel import lazy_gettext as _
from flask_login import current_user, login_required
from flask_wtf import Form
from werkzeug.utils import redirect
from wtforms import BooleanField, PasswordField, SelectField, StringField
from wtforms.validators import InputRequired

import openatlas
from openatlas import app
from openatlas.util.util import uc_first


class DisplayForm(Form):
    language = SelectField(uc_first(_('language')), choices=[])
    # theme = SelectField(uc_first(_('theme')), choices=[])
    # layout = SelectField(uc_first(_('layout')), choices=[
    #    ('default', uc_first(_('default'))), ('advanced', uc_first(_('advanced')))])
    table_rows = SelectField(uc_first(_('table rows')), choices=[])


class PasswordForm(Form):
    password_old = PasswordField(uc_first(_('old password')), validators=[InputRequired()])
    password = PasswordField(uc_first(_('password')), validators=[InputRequired()])
    password2 = PasswordField(uc_first(_('repeat password')), validators=[InputRequired()])

    def validate(self, extra_validators=None):
        valid = Form.validate(self)
        password_hashed = bcrypt.hashpw(self.password_old.data.encode('utf-8'), current_user.password.encode('utf-8'))
        if password_hashed != current_user.password.encode('utf-8'):
            self.password_old.errors.append(_('error wrong password'))
            valid = False
        if self.password.data != self.password2.data:
            self.password.errors.append(_('error passwords must match'))
            self.password2.errors.append(_('error passwords must match'))
            valid = False
        return valid


class ProfileForm(Form):
    name = StringField(uc_first(_('name')))
    email = StringField(uc_first(_('email')))
    show_email = BooleanField(uc_first(_('show email')), false_values='false')
    newsletter = BooleanField(uc_first(_('newsletter')), false_values='false')


@app.route('/profile', methods=['POST', 'GET'])
@login_required
def profile_index():
    data = {'info': [
        (_('username'), current_user.username),
        (_('name'), current_user.real_name),
        (_('email'), current_user.email),
        (_('show email'), uc_first('on') if current_user.settings['show_email'] else uc_first('off')),
        (_('newsletter'), uc_first('on') if current_user.settings['newsletter'] else uc_first('off'))]}
    form = DisplayForm()
    getattr(form, 'language').choices = openatlas.app.config['LANGUAGES'].items()
    getattr(form, 'table_rows').choices = openatlas.default_table_rows.items()
    if form.validate_on_submit():
        current_user.settings['language'] = form.language.data
        # current_user.settings['layout'] = form.layout.data
        current_user.settings['table_rows'] = form.table_rows.data
        openatlas.get_cursor().execute('BEGIN')
        current_user.update_settings()
        openatlas.get_cursor().execute('COMMIT')
        session['language'] = form.language.data
        flash(_('info update'), 'info')
        return redirect(url_for('profile_index'))

    form.language.data = current_user.settings['language']
    # form.layout.data = current_user.get_setting('layout')
    form.table_rows.data = str(current_user.settings['table_rows'])
    data['display'] = [
        (form.language.label, form.language),
        # (form.theme.label, form.theme),
        # (form.layout.label, form.layout),
        (form.table_rows.label, form.table_rows)]
    return render_template('profile/index.html', data=data, form=form)


@app.route('/profile/update', methods=['POST', 'GET'])
@login_required
def profile_update():
    form = ProfileForm()
    if form.validate_on_submit():
        current_user.real_name = form.name.data
        current_user.email = form.email.data
        current_user.settings['show_email'] = form.show_email.data
        current_user.settings['newsletter'] = form.newsletter.data
        openatlas.get_cursor().execute('BEGIN')
        current_user.update()
        current_user.update_settings()
        openatlas.get_cursor().execute('COMMIT')
        flash(_('info update'), 'info')
        return redirect(url_for('profile_index'))
    form.name.data = current_user.real_name
    form.email.data = current_user.email
    form.show_email.data = current_user.settings['show_email']
    form.newsletter.data = current_user.settings['newsletter']
    data = {'profile': [
        (form.name.label, form.name),
        (form.email.label, form.email),
        (form.show_email.label, form.show_email),
        (form.newsletter.label, form.newsletter)]}
    return render_template('profile/update.html', form=form, data=data)


@app.route('/profile/password', methods=['POST', 'GET'])
@login_required
def profile_password():
    form = PasswordForm()
    if form.validate_on_submit():
        current_user.password = bcrypt.hashpw(form.password.data.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        current_user.update()
        flash(_('info password updated'), 'info')
        return redirect(url_for('profile_index'))
    return render_template('profile/password.html', form=form)

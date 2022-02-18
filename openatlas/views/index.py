import datetime
from typing import Any, Union

from flask import flash, g, jsonify, render_template, request, session, url_for
from flask_babel import format_number, lazy_gettext as _
from flask_login import current_user
from flask_wtf import FlaskForm
from werkzeug.utils import redirect
from werkzeug.wrappers import Response
from wtforms import SelectField, SubmitField, TextAreaField
from wtforms.validators import InputRequired

from openatlas import app, logger
from openatlas.api.v02.resources.error import MethodNotAllowedError
from openatlas.models.content import get_translation
from openatlas.models.entity import Entity
from openatlas.models.user import User
from openatlas.util.changelog import versions
from openatlas.util.tab import Tab
from openatlas.util.table import Table
from openatlas.util.util import (
    bookmark_toggle, format_date, link, required_group, send_mail, uc_first)


class FeedbackForm(FlaskForm):
    subject = SelectField(
        _('subject'),
        render_kw={'autofocus': True},
        choices=(
            ('suggestion', _('suggestion')),
            ('question', _('question')),
            ('problem', _('problem'))))
    description = TextAreaField(_('description'), [InputRequired()])
    save = SubmitField(_('send'))


@app.route('/')
@app.route('/overview')
def overview() -> str:
    tabs = {
        'info': Tab('info'),
        'bookmarks': Tab(
            'bookmarks',
            table=Table(['name', 'class', 'begin', 'end'])),
        'notes': Tab(
            'notes',
            table=Table(
                ['date', _('visibility'), 'entity', 'class', _('note')]))}
    tables = {
        'overview': Table(
            paging=False,
            defs=[{'className': 'dt-body-right', 'targets': 1}]),
        'latest': Table(paging=False, order=[[0, 'desc']])}
    if current_user.is_authenticated and hasattr(current_user, 'bookmarks'):
        for entity_id in current_user.bookmarks:
            entity = Entity.get_by_id(entity_id)
            tabs['bookmarks'].table.rows.append([
                link(entity),
                entity.class_.label,
                entity.first,
                entity.last,
                bookmark_toggle(entity.id, True)])
        for note in User.get_notes_by_user_id(current_user.id):
            entity = Entity.get_by_id(note['entity_id'])
            tabs['notes'].table.rows.append([
                format_date(note['created']),
                uc_first(_('public') if note['public'] else _('private')),
                link(entity),
                entity.class_.label,
                note['text'],
                f'<a href="{url_for("note_view", id_=note["id"])}">'
                f'{uc_first(_("view"))}</a>'])
        for name, count in Entity.get_overview_counts().items():
            if not count:
                continue  # pragma: no cover
            url = url_for('index', view=g.class_view_mapping[name])
            if name == 'administrative_unit':
                url = f"{url_for('type_index')}#menu-tab-place"
            elif name == 'type':
                url = url_for('type_index')
            elif name in [
                    'feature',
                    'human_remains',
                    'stratigraphic_unit',
                    'source_translation']:
                url = ''
            tables['overview'].rows.append([
                link(g.classes[name].label, url) if url
                else g.classes[name].label,
                format_number(count)])
        for entity in Entity.get_latest(10):
            tables['latest'].rows.append([
                format_date(entity.created),
                link(entity),
                entity.class_.label,
                entity.first,
                entity.last,
                link(logger.get_log_info(entity.id)['creator'])])
    tabs['info'].content = render_template(
        'index/index.html',
        intro=get_translation('intro'),
        tables=tables)
    return render_template('tabs.html', tabs=tabs, crumbs=['overview'])


@app.route('/index/setlocale/<language>')
def set_locale(language: str) -> Response:
    session['language'] = language
    if hasattr(current_user, 'id') and current_user.id:
        current_user.settings['language'] = language
        current_user.update_language()
    return redirect(request.referrer)


@app.route('/overview/feedback', methods=['POST', 'GET'])
@required_group('readonly')
def index_feedback() -> Union[str, Response]:
    form = FeedbackForm()
    if form.validate_on_submit() and g.settings['mail']:  # pragma: no cover
        body = \
            f'{form.subject.data} from {current_user.username} ' \
            f'({current_user.id}) {current_user.email} at ' \
            f'{request.headers["Host"]}\n\n' \
            f'{form.description.data}'
        if send_mail(
                f"{uc_first(form.subject.data)} from {g.settings['site_name']}",
                body,
                g.settings['mail_recipients_feedback']):
            flash(_('info feedback thanks'), 'info')
        else:
            flash(_('error mail send'), 'error')
        return redirect(url_for('overview'))
    return render_template(
        'index/feedback.html',
        form=form,
        title=_('feedback'),
        crumbs=[_('feedback')])


@app.route('/overview/content/<item>')
def index_content(item: str) -> str:
    return render_template(
        'index/content.html',
        text=get_translation(item),
        title=_(_(item)),
        crumbs=[_(item)])


@app.errorhandler(400)
def bad_request(e: Exception) -> tuple[Any, int]:  # pragma: no cover
    return render_template('400.html', crumbs=['400 - Bad Request'], e=e), 400


@app.errorhandler(403)
def forbidden(e: Exception) -> tuple[Union[dict[str, str], str], int]:
    return render_template('403.html', crumbs=['403 - Forbidden'], e=e), 403


@app.errorhandler(404)
def page_not_found(e: Exception) -> tuple[Union[dict[str, str], str], int]:
    if request.path.startswith('/api/'):  # pragma: nocover
        return jsonify({
            'message': 'Endpoint not found',
            "url": request.url,
            "timestamp": datetime.datetime.now(),
            'status': 404}), 404
    return render_template(
        '404.html',
        crumbs=['404 - File not found'],
        e=e), 404


@app.errorhandler(405)  # pragma: no cover
def method_not_allowed(_e: Exception) -> tuple[Union[dict[str, str], str], int]:
    raise MethodNotAllowedError


@app.errorhandler(418)
def invalid_id(e: Exception) -> tuple[str, int]:
    return render_template('418.html', crumbs=["418 - I’m a teapot"], e=e), 418


@app.errorhandler(422)
def unprocessable_entity(e: Exception) -> tuple[str, int]:  # pragma: no cover
    return render_template(
        '422.html',
        crumbs=['422 - Unprocessable entity'],
        e=e), 422


@app.route('/changelog')
def index_changelog() -> str:
    return render_template(
        'index/changelog.html',
        title=_('changelog'),
        crumbs=[_('changelog')],
        versions=versions)


@app.route('/unsubscribe/<code>')
def index_unsubscribe(code: str) -> str:
    user = User.get_by_unsubscribe_code(code)
    text = _('unsubscribe link not valid')
    if user:  # pragma: no cover
        user.settings['newsletter'] = ''
        user.unsubscribe_code = ''
        user.update()
        user.remove_newsletter()
        text = _(
            'You have successfully unsubscribed. '
            'You can subscribe again in your Profile.')
    return render_template(
        'index/unsubscribe.html',
        text=text,
        crumbs=[_('unsubscribe newsletter')])

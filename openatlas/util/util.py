from __future__ import annotations  # Needed for Python 4.0 type annotations

import glob
import os
import re
import smtplib
from collections import OrderedDict
from datetime import datetime, timedelta
from email.header import Header
from email.mime.text import MIMEText
from functools import wraps
from html.parser import HTMLParser
from os.path import basename
from typing import Any, Dict, List, Optional, TYPE_CHECKING, Tuple, Union

import numpy
from flask import abort, flash, g, request, session, url_for
from flask_babel import format_number, lazy_gettext as _
from flask_login import current_user
from flask_wtf import FlaskForm
from numpy import math
from werkzeug.utils import redirect

import openatlas
from openatlas import app
from openatlas.models.date import Date
from openatlas.models.model import CidocClass, CidocProperty

if TYPE_CHECKING:  # pragma: no cover - Type checking is disabled in tests
    from openatlas.models.entity import Entity
    from openatlas.models.imports import Project
    from openatlas.models.user import User
    from openatlas.models.link import Link


def convert_size(size_bytes: int) -> str:
    if size_bytes == 0:
        return "0B"  # pragma: no cover
    size_name = ("B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB")
    i = int(math.floor(math.log(size_bytes, 1024)))
    return "%s %s" % (int(size_bytes / math.pow(1024, i)), size_name[i])


def get_file_path(entity: Union[int, 'Entity']) -> Optional[str]:
    entity_id = entity if isinstance(entity, int) else entity.id
    path = glob.glob(os.path.join(app.config['UPLOAD_FOLDER_PATH'], str(entity_id) + '.*'))
    return path[0] if path else None


def print_file_size(entity: 'Entity') -> str:
    path = get_file_path(entity.id)
    return convert_size(os.path.getsize(path)) if path else 'N/A'


def display_tooltip(text: str) -> str:
    if not text:
        return ''
    return ' <span class="tooltip" title="{title}">i</span>'.format(title=text.replace('"', "'"))


def print_file_extension(entity: Union[int, 'Entity']) -> str:
    entity_id = entity if isinstance(entity, int) else entity.id
    path = get_file_path(entity_id)
    return os.path.splitext(path)[1] if path else 'N/A'


def send_mail(subject: str,
              text: str,
              recipients: Union[str, List[str]],
              log_body: bool = True) -> bool:  # pragma: no cover
    """ Send one mail to every recipient, set log_body to False for sensitive data e.g. passwords"""
    recipients = recipients if isinstance(recipients, list) else [recipients]
    settings = session['settings']
    if not settings['mail'] or len(recipients) < 1:
        return False
    mail_user = settings['mail_transport_username']
    from_ = settings['mail_from_name'] + ' <' + settings['mail_from_email'] + '>'
    server = smtplib.SMTP(settings['mail_transport_host'], settings['mail_transport_port'])
    server.ehlo()
    server.starttls()
    try:
        if settings['mail_transport_username']:
            server.login(mail_user, app.config['MAIL_PASSWORD'])
        for recipient in recipients:
            msg = MIMEText(text, _charset='utf-8')
            msg['From'] = from_
            msg['To'] = recipient.strip()
            msg['Subject'] = Header(subject.encode('utf-8'), 'utf-8')
            server.sendmail(settings['mail_from_email'], recipient, msg.as_string())
        log_text = 'Mail from ' + from_ + ' to ' + ', '.join(recipients) + ' Subject: ' + subject
        log_text += ' Content: ' + text if log_body else ''
        openatlas.logger.log('info', 'mail', 'Mail send from ' + from_, log_text)
    except smtplib.SMTPAuthenticationError as e:
        openatlas.logger.log('error', 'mail', 'Error mail login for ' + mail_user, e)
        flash(_('error mail login'), 'error')
        return False
    except Exception as e:
        openatlas.logger.log('error', 'mail', 'Error send mail for ' + mail_user, e)
        flash(_('error mail send'), 'error')
        return False
    return True


class MLStripper(HTMLParser):

    def error(self: MLStripper, message: str) -> None:  # pragma: no cover
        pass

    def __init__(self) -> None:
        super().__init__()
        self.reset()
        self.strict = False
        self.convert_charrefs = True
        self.fed: List[str] = []

    def handle_data(self, d: Any) -> None:
        self.fed.append(d)

    def get_data(self) -> str:
        return ''.join(self.fed)


def sanitize(string: Optional[str], mode: Optional[str] = None) -> str:
    if not string:
        return ''
    if mode == 'node':
        # Remove all characters from a string except letters, numbers and spaces
        return re.sub(r'([^\s\w]|_)+', '', string).strip()
    if mode == 'description':
        s = MLStripper()
        s.feed(string)
        return s.get_data().strip()
    # Remove all characters from a string except ASCII letters and numbers
    return re.sub('[^A-Za-z0-9]+', '', string).strip()


def get_file_stats(path: str = app.config['UPLOAD_FOLDER_PATH']) -> Dict[Union[int, str], Any]:
    """ Build a dict with file ids and stats from files in given directory.
        It's much faster to do this in one call for every file."""
    file_stats: Dict[Union[int, str], Any] = {}
    with os.scandir(path) as it:
        for file in it:
            split_name = os.path.splitext(file.name)
            if len(split_name) > 1 and split_name[0].isdigit():
                file_stats[int(split_name[0])] = {'ext': split_name[1],
                                                  'size': file.stat().st_size,
                                                  'date': file.stat().st_ctime}
    return file_stats


def display_remove_link(url: str, name: str) -> str:
    """ Build a link to remove a link with a JavaScript confirmation dialog"""
    name = name.replace('\'', '')
    confirm = 'onclick="return confirm(\'' + _('Remove %(name)s?', name=name) + '\')"'
    return '<a ' + confirm + ' href="' + url + '">' + uc_first(_('remove')) + '</a>'


def add_type_data(entity: 'Entity',
                  data: List[Tuple[str, Optional[str]]],
                  location: Optional['Entity'] = None) -> List[Tuple[str, Optional[str]]]:
    # Nodes
    if location:
        entity.nodes.update(location.nodes)  # Add location types
    type_data: OrderedDict[str, Any] = OrderedDict()
    for node, node_value in entity.nodes.items():
        root = g.nodes[node.root[-1]]
        name = 'type' if root.name in app.config['BASE_TYPES'] else root.name
        if root.name not in type_data:
            type_data[name] = []
        text = ''
        if root.value_type:  # Text for value types
            text = ': {value} <span style="font-style:italic;">{description}</span>'.format(
                value=format_number(node_value), description=node.description)
        type_data[name].append(link(node) + text)

    # Sort types by name
    type_data = OrderedDict(sorted(type_data.items(), key=lambda t: t[0]))
    for root_type in type_data:
        type_data[root_type].sort()

    # Move the base type to the top
    if 'type' in type_data:
        type_data.move_to_end('type', last=False)
    for root_name, nodes in type_data.items():
        data.append((root_name, '<br>'.join(nodes)))
    return data


def add_system_data(entity: 'Entity',
                    data: List[Tuple[str, Optional[str]]]) -> List[Tuple[str, Optional[str]]]:
    # Additional info for advanced layout
    if hasattr(current_user, 'settings') and current_user.settings['layout'] == 'advanced':
        data.append((uc_first(_('class')), link(entity.class_)))
        info = openatlas.logger.get_log_for_advanced_view(entity.id)
        data.append((_('created'), format_date(entity.created) + ' ' + link(info['creator'])))
        if info['modified']:
            html = format_date(info['modified']) + ' ' + link(info['modifier'])
            data.append((_('modified'), html))
        if info['import_project']:
            data.append((_('imported from'), link(info['import_project'])))
        if info['import_user']:
            data.append((_('imported by'), link(info['import_user'])))
        if info['import_origin_id']:
            data.append(('origin ID', info['import_origin_id']))
    return data


def get_entity_data(entity: 'Entity',
                    location: Optional['Entity'] = None) -> List[Tuple[str, Optional[str]]]:
    """
    Return related entity information for a table for view.
    The location parameter is for places which have a location attached.
    """
    data: List[Tuple[str, Optional[str]]] = []
    # Aliases
    if entity.aliases:
        data.append((uc_first(_('alias')), '<br>'.join(entity.aliases.values())))

    # Dates
    from_link = ''
    to_link = ''
    if entity.class_.code == 'E9':  # Add places to dates if it's a move
        place_from = entity.get_linked_entity('P27')
        if place_from:
            from_link = link(place_from.get_linked_entity_safe('P53', True)) + ' '
        place_to = entity.get_linked_entity('P26')
        if place_to:
            to_link = link(place_to.get_linked_entity_safe('P53', True)) + ' '
    data.append((uc_first(_('begin')), (from_link if from_link else '') +
                 format_entry_begin(entity)))
    data.append((uc_first(_('end')), (to_link if to_link else '') + format_entry_end(entity)))

    # Types
    add_type_data(entity, data, location=location)

    # Info for files
    if entity.system_type == 'file':
        data.append((uc_first(_('size')), print_file_size(entity)))
        data.append((uc_first(_('extension')), print_file_extension(entity)))

    # Info for source
    if entity.system_type == 'source content':
        data.append((uc_first(_('information carrier')), '<br>'.join(
            [link(recipient) for recipient in entity.get_linked_entities(['P128'], inverse=True)])))

    # Info for events
    if entity.class_.code in app.config['CLASS_CODES']['event']:
        super_event = entity.get_linked_entity('P117')
        if super_event:
            data.append((uc_first(_('sub event of')), link(super_event)))

        if not entity.class_.code == 'E9':
            place = entity.get_linked_entity('P7')
            if place:
                data.append((uc_first(_('location')),
                             link(place.get_linked_entity_safe('P53', True))))

        # Info for acquisitions
        if entity.class_.code == 'E8':
            data.append((uc_first(_('recipient')), '<br>'.join(
                [link(recipient) for recipient in entity.get_linked_entities(['P22'])])))
            data.append((uc_first(_('donor')), '<br>'.join(
                [link(donor) for donor in entity.get_linked_entities(['P23'])])))
            data.append((uc_first(_('given place')), '<br>'.join(
                [link(place) for place in entity.get_linked_entities(['P24'])])))

        # Info for moves
        if entity.class_.code == 'E9':
            person_data = []
            object_data = []
            for linked_entity in entity.get_linked_entities(['P25']):
                if linked_entity.class_.code == 'E21':
                    person_data.append(linked_entity)
                elif linked_entity.class_.code == 'E84':
                    object_data.append(linked_entity)
            if person_data:
                data.append((uc_first(_('person')), '<br>'.join(
                    [link(object_) for object_ in person_data])))
            if object_data:
                data.append((uc_first(_('object')), '<br>'.join(
                    [link(object_) for object_ in object_data])))
    return add_system_data(entity, data)


def add_dates_to_form(form: Any, for_person: bool = False) -> str:
    errors = {}
    valid_dates = True
    for field_name in ['begin_year_from', 'begin_month_from', 'begin_day_from',
                       'begin_year_to', 'begin_month_to', 'begin_day_to',
                       'end_year_from', 'end_month_from', 'end_day_from',
                       'end_year_to', 'end_month_to', 'end_day_to']:
        errors[field_name] = ''
        if getattr(form, field_name).errors:
            valid_dates = False
            errors[field_name] = '<label class="error">'
            for error in getattr(form, field_name).errors:
                errors[field_name] += uc_first(error)
            errors[field_name] += ' </label>'
    style = '' if valid_dates else ' style="display:table-row" '
    html = """
        <div class="table-row">
            <div>
                <label>{date}</label> {tooltip}
            </div>
            <div class="table-cell date-switcher">
                <span id="date-switcher" class="button">{show}</span>
            </div>
        </div>""".format(date=uc_first(_('date')),
                         tooltip=display_tooltip(_('tooltip date')),
                         show=uc_first(_('show')))
    html += '<div class="table-row date-switch" ' + style + '>'
    html += '<div>' + uc_first(_('birth') if for_person else _('begin')) + '</div>'
    html += '<div class="table-cell">'
    html += str(form.begin_year_from(class_='year')) + ' ' + errors['begin_year_from'] + ' '
    html += str(form.begin_month_from(class_='month')) + ' ' + errors['begin_month_from'] + ' '
    html += str(form.begin_day_from(class_='day')) + ' ' + errors['begin_day_from'] + ' '
    html += str(form.begin_comment)
    html += '</div></div>'
    html += '<div class="table-row date-switch" ' + style + '>'
    html += '<div></div><div class="table-cell">'
    html += str(form.begin_year_to(class_='year')) + ' ' + errors['begin_year_to'] + ' '
    html += str(form.begin_month_to(class_='month')) + ' ' + errors['begin_month_to'] + ' '
    html += str(form.begin_day_to(class_='day')) + ' ' + errors['begin_day_to'] + ' '
    html += '</div></div>'
    html += '<div class="table-row date-switch" ' + style + '>'
    html += '<div>' + uc_first(_('death') if for_person else _('end')) + '</div>'
    html += '<div class="table-cell">'
    html += str(form.end_year_from(class_='year')) + ' ' + errors['end_year_from'] + ' '
    html += str(form.end_month_from(class_='month')) + ' ' + errors['end_month_from'] + ' '
    html += str(form.end_day_from(class_='day')) + ' ' + errors['end_day_from'] + ' '
    html += str(form.end_comment)
    html += '</div></div>'
    html += '<div class="table-row date-switch"' + style + '>'
    html += '<div></div><div class="table-cell">'
    html += str(form.end_year_to(class_='year')) + ' ' + errors['end_year_to'] + ' '
    html += str(form.end_month_to(class_='month')) + ' ' + errors['end_month_to'] + ' '
    html += str(form.end_day_to(class_='day')) + ' ' + errors['end_day_to'] + ' '
    html += '</div></div>'
    return html


def required_group(group: str):  # type: ignore
    def wrapper(f):  # type: ignore
        @wraps(f)
        def wrapped(*args, **kwargs):  # type: ignore
            if not current_user.is_authenticated:
                return redirect(url_for('login', next=request.path))
            if not is_authorized(group):
                abort(403)
            return f(*args, **kwargs)

        return wrapped

    return wrapper


def bookmark_toggle(entity_id: int, for_table: bool = False) -> str:
    label = uc_first(_('bookmark remove') if entity_id in current_user.bookmarks else _('bookmark'))
    if for_table:
        return """<a id="bookmark{entity_id}" onclick="ajaxBookmark('{entity_id}');"
                style="cursor:pointer;">{label}</a>""".format(entity_id=entity_id, label=label)
    return """<button id="bookmark{entity_id}" onclick="ajaxBookmark('{entity_id}');"
                type="button">{label}</button>""".format(entity_id=entity_id, label=label)


def is_authorized(group: str) -> bool:
    if not current_user.is_authenticated or not hasattr(current_user, 'group'):
        return False  # pragma: no cover - needed because AnonymousUserMixin has no group

    if current_user.group == 'admin' or (
            current_user.group == 'manager' and group in
            ['manager', 'editor', 'contributor', 'readonly']) or (
            current_user.group == 'editor' and group in ['editor', 'contributor', 'readonly']) or (
            current_user.group == 'contributor' and group in ['contributor', 'readonly']) or (
            current_user.group == 'readonly' and group == 'readonly'):
        return True
    return False


def uc_first(string: str) -> str:
    return str(string)[0].upper() + str(string)[1:] if string else ''


def format_date(value: Union[datetime, numpy.datetime64]) -> str:
    if not value:
        return ''
    if isinstance(value, numpy.datetime64):
        date_ = Date.datetime64_to_timestamp(value)
        return date_ if date_ else ''
    return value.date().isoformat()


def format_datetime(value: Any) -> str:
    return value.replace(microsecond=0).isoformat() if value else ''


def get_profile_image_table_link(file: 'Entity',
                                 entity: 'Entity',
                                 extension: str,
                                 profile_image_id: Optional[int] = None) -> str:
    if file.id == profile_image_id:
        return '<a href="{url}">{label}</a>'.format(
            url=url_for('file_remove_profile_image', entity_id=entity.id),
            label=uc_first(_('unset')))
    elif extension in app.config['DISPLAY_FILE_EXTENSIONS']:
        return '<a href="{url}">{label}</a>'.format(
            url=url_for('file_set_as_profile_image', id_=file.id, origin_id=entity.id),
            label=uc_first(_('set')))
    return ''  # pragma: no cover - only happens for non image files


def link(entity: Union['Entity', CidocClass, CidocProperty, 'Project', 'User']) -> str:
    # Builds an HTML link to entity view for display
    from openatlas.models.entity import Entity
    from openatlas.models.imports import Project
    from openatlas.models.user import User
    if not entity:
        return ''
    html = ''
    if type(entity) is Project:
        url = url_for('import_project_view', id_=entity.id)
        html = '<a href="' + url + '">' + entity.name + '</a>'
    elif isinstance(entity, User):
        style = '' if entity.active else 'class="inactive"'
        url = url_for('user_view', id_=entity.id)
        html = '<a ' + style + ' href="' + url + '">' + entity.username + '</a>'
    elif isinstance(entity, CidocClass):
        url = url_for('class_view', code=entity.code)
        html = '<a href="' + url + '">' + entity.code + '</a>'
    elif isinstance(entity, CidocProperty):
        url = url_for('property_view', code=entity.code)
        html = '<a href="' + url + '">' + entity.code + '</a>'
    elif isinstance(entity, Entity):
        url = url_for('entity_view', id_=entity.id)
        html = '<a href="' + url + '">' + truncate(entity.name) + '</a>'
    return html


def truncate(string: Optional[str] = '', length: int = 40, span: bool = True) -> str:
    """
    Returns a truncates string with '..' at the end if it was longer than length
    Also adds a span title (for mouse over) with the original string if parameter "span" is True
    """
    if string is None:
        return ''  # pragma: no cover
    if len(string) < length + 1:
        return string
    if not span:
        return string[:length] + '..'
    return '<span title="' + string.replace('"', '') + '">' + string[:length] + '..' + '</span>'


def get_base_table_data(entity: 'Entity',
                        file_stats: Optional[Dict[Union[int, str], Any]] = None) -> List[str]:
    """ Returns standard table data for an entity"""
    data: List[str] = ['<br>'.join([link(entity)] + [truncate(alias) for
                                                     alias in entity.aliases.values()])]
    if entity.view_name in ['event', 'actor']:
        data.append(g.classes[entity.class_.code].name)
    if entity.view_name in ['reference'] and entity.system_type != 'file':
        data.append(uc_first(_(entity.system_type)))
    if entity.view_name in ['event', 'place', 'source', 'reference', 'file', 'object']:
        data.append(entity.print_base_type())
    if entity.system_type == 'file':
        if file_stats:
            data.append(convert_size(
                file_stats[entity.id]['size']) if entity.id in file_stats else 'N/A')
            data.append(
                file_stats[entity.id]['ext'] if entity.id in file_stats else 'N/A')
        else:
            data.append(print_file_size(entity))
            data.append(print_file_extension(entity))
    if entity.view_name in ['event', 'actor', 'place']:
        data.append(entity.first if entity.first else '')
        data.append(entity.last if entity.last else '')
    if entity.view_name in ['source'] or entity.system_type == 'file':
        data.append(truncate(entity.description))
    return data


def was_modified(form: FlaskForm, entity: 'Entity') -> bool:  # pragma: no cover
    """ Checks if an entity was modified after an update form was opened."""
    if not entity.modified or not form.opened.data:
        return False
    if entity.modified < datetime.fromtimestamp(float(form.opened.data)):
        return False
    openatlas.logger.log('info', 'multi user', 'Multi user overwrite prevented.')
    return True


def format_entry_begin(entry: Union['Entity', 'Link'], object_: Optional['Entity'] = None) -> str:
    html = link(object_) if object_ else ''
    if entry.begin_from:
        html += ', ' if html else ''
        if entry.begin_to:
            html += _('between %(begin)s and %(end)s',
                      begin=format_date(entry.begin_from), end=format_date(entry.begin_to))
        else:
            html += format_date(entry.begin_from)
    html += (' (' + entry.begin_comment + ')') if entry.begin_comment else ''
    return html


def format_entry_end(entry: 'Entity', object_: Optional['Entity'] = None) -> str:
    html = link(object_) if object_ else ''
    if entry.end_from:
        html += ', ' if html else ''
        if entry.end_to:
            html += _('between %(begin)s and %(end)s',
                      begin=format_date(entry.end_from), end=format_date(entry.end_to))
        else:
            html += format_date(entry.end_from)
    html += (' (' + entry.end_comment + ')') if entry.end_comment else ''
    return html


def get_appearance(event_links: List['Link']) -> Tuple[Optional[str], Optional[str]]:
    # Get first/last appearance from events for actors without begin/end
    first_year = None
    last_year = None
    first_string = None
    last_string = None
    for link_ in event_links:
        event = link_.domain
        actor = link_.range
        event_link = '<a href="{url}">{label}</a> '.format(label=uc_first(_('event')),
                                                           url=url_for('entity_view', id_=event.id))
        if not actor.first:
            if link_.first and (not first_year or int(link_.first) < int(first_year)):
                first_year = link_.first
                first_string = format_entry_begin(link_) + ' ' + _('at an') + ' ' + event_link
                first_string += (' ' + _('in') + ' ' + link(link_.object_)) if link_.object_ else ''
            elif event.first and (not first_year or int(event.first) < int(first_year)):
                first_year = event.first
                first_string = format_entry_begin(event) + ' ' + _('at an') + ' ' + event_link
                first_string += (' ' + _('in') + ' ' + link(link_.object_)) if link_.object_ else ''
        if not actor.last:
            if link_.last and (not last_year or int(link_.last) > int(last_year)):
                last_year = link_.last
                last_string = format_entry_end(event) + ' ' + _('at an') + ' ' + event_link
                last_string += (' ' + _('in') + ' ' + link(link_.object_)) if link_.object_ else ''
            elif event.last and (not last_year or int(event.last) > int(last_year)):
                last_year = event.last
                last_string = format_entry_end(event) + ' ' + _('at an') + ' ' + event_link
                last_string += (' ' + _('in') + ' ' + link(link_.object_)) if link_.object_ else ''
    return first_string, last_string


def get_backup_file_data() -> Dict[str, Any]:
    path = app.config['EXPORT_FOLDER_PATH'].joinpath('sql')
    latest_file = None
    latest_file_date = None
    for file in [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]:
        if basename(file) == '.gitignore':
            continue
        file_date = datetime.utcfromtimestamp(os.path.getmtime(path.joinpath(file)))
        if not latest_file_date or file_date > latest_file_date:
            latest_file = file
            latest_file_date = file_date
    file_data: Dict[str, Any] = {'backup_too_old': True}
    if latest_file and latest_file_date:
        yesterday = datetime.today() - timedelta(days=1)
        file_data['file'] = latest_file
        file_data['backup_too_old'] = True if yesterday > latest_file_date else False
        file_data['size'] = convert_size(os.path.getsize(path.joinpath(latest_file)))
        file_data['date'] = format_date(latest_file_date)
    return file_data


def is_float(value: Union[int, float]) -> bool:
    try:
        float(value)
        return True
    except ValueError:
        return False

# Created by Alexander Watzinger and others. Please see README.md for licensing information
from flask import flash, url_for
from flask_babel import lazy_gettext as _
from werkzeug.utils import redirect

from openatlas import app
from openatlas.models.entity import EntityMapper
from openatlas.models.link import LinkMapper
from openatlas.util.util import required_group


@app.route('/link/delete/<int:id_>/<int:origin_id>', methods=['POST', 'GET'])
@required_group('editor')
def link_delete(id_, origin_id):
    LinkMapper.delete_by_id(id_)
    flash(_('link removed'), 'info')
    origin = EntityMapper.get_by_id(origin_id)
    return redirect(url_for(origin.view_name + '_view', id_=origin.id))

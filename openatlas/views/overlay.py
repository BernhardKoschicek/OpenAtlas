import ast
from typing import Union

from flask import flash, render_template, url_for
from flask_babel import lazy_gettext as _
from flask_wtf import FlaskForm
from werkzeug.utils import redirect
from werkzeug.wrappers import Response
from wtforms import FloatField, SubmitField
from wtforms.validators import InputRequired

from openatlas import app
from openatlas.models.entity import Entity
from openatlas.models.overlay import Overlay
from openatlas.util.util import button, required_group, uc_first


class OverlayForm(FlaskForm):
    top_left_easting = FloatField(
        '',
        [InputRequired()],
        render_kw={'autofocus': True})
    top_left_northing = FloatField('', [InputRequired()])
    top_right_easting = FloatField('', [InputRequired()])
    top_right_northing = FloatField('', [InputRequired()])
    bottom_left_easting = FloatField('', [InputRequired()])
    bottom_left_northing = FloatField('', [InputRequired()])
    save = SubmitField()


@app.route(
    '/overlay/insert/<int:image_id>/<int:place_id>/<int:link_id>',
    methods=['POST', 'GET'])
@required_group('editor')
def overlay_insert(
        image_id: int,
        place_id: int,
        link_id: int) -> Union[str, Response]:
    form = OverlayForm()
    if form.validate_on_submit():
        Overlay.insert({
            'image_id': image_id,
            'place_id': place_id,
            'link_id': link_id,
            'top_left_northing': form.top_left_northing.data,
            'top_left_easting': form.top_left_easting.data,
            'top_right_northing': form.top_right_northing.data,
            'top_right_easting': form.top_right_easting.data,
            'bottom_left_northing': form.bottom_left_northing.data,
            'bottom_left_easting': form.bottom_left_easting.data})
        return redirect(f"{url_for('view', id_=place_id)}#tab-file")
    return render_template(
        'overlay.html',
        form=form,
        crumbs=[
            [_('place'), url_for('index', view='place')],
            Entity.get_by_id(place_id),
            Entity.get_by_id(image_id),
            _('overlay')])


@app.route('/overlay/update/<int:id_>', methods=['POST', 'GET'])
@required_group('editor')
def overlay_update(id_: int) -> Union[str, Response]:
    overlay = Overlay.get_by_id(id_)
    form = OverlayForm()
    if form.validate_on_submit():
        Overlay.update({
            'image_id': overlay.image_id,
            'place_id': overlay.place_id,
            'top_left_northing': form.top_left_northing.data,
            'top_left_easting': form.top_left_easting.data,
            'top_right_northing': form.top_right_northing.data,
            'top_right_easting': form.top_right_easting.data,
            'bottom_left_northing': form.bottom_left_northing.data,
            'bottom_left_easting': form.bottom_left_easting.data})
        flash(_('info update'), 'info')
        return redirect(
            f"{url_for('view', id_=overlay.place_id)}#tab-file")
    bounding = ast.literal_eval(overlay.bounding_box)
    if len(bounding) == 2:  # pragma no cover
        bounding = [[0, 0], [0, 0], [0, 0]]  # For data entered before 6.4.0
    form.top_left_easting.data = bounding[0][1]
    form.top_left_northing.data = bounding[0][0]
    form.top_right_easting.data = bounding[1][1]
    form.top_right_northing.data = bounding[1][0]
    form.bottom_left_easting.data = bounding[2][1]
    form.bottom_left_northing.data = bounding[2][0]
    entity = Entity.get_by_id(overlay.place_id)
    return render_template(
        'overlay.html',
        form=form,
        overlay=overlay,
        entity=entity,
        buttons=[button(
            _('remove'),
            url_for('overlay_remove', id_=overlay.id, place_id=entity.id),
            onclick=f"return confirm('{uc_first(_('remove'))}?');")],
        crumbs=[
            [_('place'), url_for('index', view='place')],
            entity,
            Entity.get_by_id(overlay.image_id),
            _('update overlay')])


@app.route('/overlay/remove/<int:id_>/<int:place_id>')
@required_group('editor')
def overlay_remove(id_: int, place_id: int) -> Response:
    Overlay.remove(id_)
    return redirect(f"{url_for('view', id_=place_id)}#tab-file")

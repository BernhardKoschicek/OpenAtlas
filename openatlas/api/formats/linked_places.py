from __future__ import annotations

import mimetypes
from typing import Any, Optional, TYPE_CHECKING

from flask import g, url_for

from openatlas.api.resources.util import (
    date_to_str, get_crm_relation, get_crm_relation_label_x,
    get_crm_relation_x, get_license_name, to_camel_case)
from openatlas.display.util import check_iiif_activation, \
    check_iiif_file_exist, get_file_path
from openatlas.models.entity import Entity
from openatlas.models.link import Link

if TYPE_CHECKING:  # pragma: no cover
    from openatlas.api.endpoints.parser import Parser


def link_dict(link_: Link, inverse: bool = False) -> dict[str, Any]:
    return {
        'label': link_.domain.name if inverse else link_.range.name,
        'relationTo':
            url_for(
                'api.entity',
                id_=link_.domain.id if inverse else link_.range.id,
                _external=True),
        'relationType': get_crm_relation(link_, inverse),
        'relationSystemClass':
            link_.domain.class_.name if inverse else link_.range.class_.name,
        'type': to_camel_case(link_.type.name) if link_.type else None,
        'relationDescription': link_.description,
        'when': {'timespans': [get_lp_time(link_)]}}


def link_dict_x(link_: Link, inverse: bool = False) -> dict[str, Any]:
    return {
        'label': link_.domain.name if inverse else link_.range.name,
        'relationTo':
            url_for(
                'api.entity',
                id_=link_.domain.id if inverse else link_.range.id,
                _external=True),
        'relationType': get_crm_relation_x(link_),
        'relationTypeLabel': get_crm_relation_label_x(link_, inverse),
        'relationSystemClass':
            link_.domain.class_.name if inverse else link_.range.class_.name,
        'type': to_camel_case(link_.type.name) if link_.type else None,
        'relationDescription': link_.description,
        'when': {'timespans': [get_lp_time(link_)]}}


def get_lp_links(
        links: list[Link],
        links_inverse: list[Link],
        parser: Parser) -> list[dict[str, str]]:
    properties = parser.relation_type or list(g.properties)
    out = []
    for link_ in links:
        if link_.property.code in properties:
            out.append(
                link_dict_x(link_) if parser.format == 'lpx'
                else link_dict(link_))
    for link_ in links_inverse:
        if link_.property.code in properties:
            out.append(
                link_dict_x(link_, inverse=True) if parser.format == 'lpx'
                else link_dict(link_, inverse=True))
    return out


def get_lp_file(links_inverse: list[Link]) -> list[dict[str, str]]:
    files = []
    for link in links_inverse:
        if link.domain.class_.name != 'file':
            continue
        iiif_manifest = ''
        if check_iiif_activation() and check_iiif_file_exist(link.domain.id):
            iiif_manifest = url_for(
                'api.iiif_manifest',
                version=g.settings['iiif_version'],
                id_=link.domain.id,
                _external=True)
        path = get_file_path(link.domain.id)
        mime_type = None
        if path:
            mime_type, _ = mimetypes.guess_type(path)
        files.append({
            '@id': url_for(
                'api.entity',
                id_=link.domain.id,
                _external=True),
            'title': link.domain.name,
            'license': get_license_name(link.domain),
            'mimetype': mime_type,
            'IIIFManifest': iiif_manifest,
            'url': url_for(
                'api.display',
                filename=path.stem,
                _external=True) if path else "N/A"})
    return files


def get_lp_time(entity: Entity | Link) -> Optional[dict[str, Any]]:
    return {
        'start': {
            'earliest': date_to_str(entity.begin_from),
            'latest': date_to_str(entity.begin_to),
            'comment': entity.begin_comment},
        'end': {
            'earliest': date_to_str(entity.end_from),
            'latest': date_to_str(entity.end_to),
            'comment': entity.end_comment}}

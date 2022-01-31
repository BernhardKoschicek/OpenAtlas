import zipfile
from collections import defaultdict
from io import BytesIO
from itertools import groupby
from typing import Any, Union

import pandas as pd
from flask import Response, g

from openatlas.api.v03.resources.util import get_linked_entities_api, \
    link_parser_check, remove_duplicate_entities
from openatlas.models.entity import Entity
from openatlas.models.gis import Gis
from openatlas.models.link import Link


def export_entities_csv(
        entities: Union[Entity, list[Entity]],
        name: Union[int, str]) -> Response:
    frames = [build_entity_dataframe(entity, True) for entity in
              (entities if isinstance(entities, list) else [entities])]
    return Response(
        pd.DataFrame(data=frames).to_csv(),
        mimetype='text/csv',
        headers={'Content-Disposition': f'attachment;filename={name}.csv'})


def build_entity_dataframe(
        entity: Entity,
        relations: bool = False) -> dict[str, Any]:
    geom = get_geom_entry(entity)
    data = {
        'id': str(entity.id),
        'name': entity.name,
        'description': entity.description,
        'begin_from': entity.begin_from,
        'begin_to': entity.begin_to,
        'begin_comment': entity.begin_comment,
        'end_from': entity.end_from,
        'end_to': entity.end_to,
        'end_comment': entity.end_comment,
        'cidoc_class': entity.cidoc_class.name,
        'system_class': entity.class_.name,
        'geom_type': geom['type'],
        'coordinates': geom['coordinates']}
    if relations:
        for key, value in get_links(entity).items():
            data[key] = ' | '.join(list(map(str, value)))  # pragma: no cover
        for key, value in get_node(entity).items():
            data[key] = ' | '.join(list(map(str, value)))
    return data


def build_link_dataframe(link: Link) -> dict[str, Any]:
    return {
        'id': link.id,
        'range_id': link.range.id,
        'range_name': link.range.name,
        'domain_id': link.domain.id,
        'domain_name': link.domain.name,
        'description': link.description,
        'begin_from': link.begin_from,
        'begin_to': link.begin_to,
        'begin_comment': link.begin_comment,
        'end_from': link.end_from,
        'end_to': link.end_to,
        'end_comment': link.end_comment}


def get_node(entity: Entity) -> dict[Any, list[Any]]:
    nodes: dict[str, Any] = defaultdict(list)
    for node in entity.types:
        hierarchy = [g.types[root].name for root in node.root]
        value = ''
        for link in Link.get_links(entity.id):  # pragma: no cover
            if link.range.id == node.id and link.description:
                value += link.description
                if link.range.id == node.id and node.description:
                    value += node.description
        key = ' > '.join(map(str, hierarchy))
        nodes[key].append(node.name + (': ' + value if value else ''))
    return nodes


def get_links(entity: Entity) -> dict[str, Any]:  # pragma: no cover
    links: dict[str, Any] = defaultdict(list)
    for link in Link.get_links(entity.id):
        key = f"""{link.property.i18n['en'].replace(' ', '_')}
              _{link.range.class_.name}"""
        links[key].append(link.range.name)
    for link in Link.get_links(entity.id, inverse=True):
        key = f"""{link.property.i18n['en'].replace(' ', '_')}
              _{link.range.class_.name}"""
        if link.property.i18n_inverse['en']:
            key = link.property.i18n_inverse['en'].replace(' ', '_')
            key += '_' + link.domain.class_.name
        links[key].append(link.domain.name)
    links.pop('has_type_type', None)
    return links


def get_geom_entry(entity: Entity) -> dict[str, None]:
    geom = {'type': None, 'coordinates': None}
    if entity.class_.view == 'place' or entity.class_.name == 'artifact':
        geom = get_geometry(
            Link.get_linked_entity_safe(entity.id, 'P53'))
    elif entity.class_.name == 'object_location':
        geom = get_geometry(entity)
    return geom


def get_geometry(entity: Entity) -> dict[str, Any]:
    if entity.cidoc_class.code != 'E53':
        return {'type': None, 'coordinates': None}  # pragma: no cover
    geoms = Gis.get_by_id(entity.id)
    if geoms:
        return {key: [geom[key] for geom in geoms] for key in geoms[0]}
    return {'type': None, 'coordinates': None}


def export_csv_for_network_analysis(
        entities: list[Entity],
        parser: dict[str, Any]) -> Response:
    archive = BytesIO()
    with zipfile.ZipFile(archive, 'w') as zf:
        for key, frame in get_entities_grouped_by_class(entities).items():
            with zf.open(f'{key}.csv', 'w') as file:
                file.write(bytes(
                    pd.DataFrame(data=frame).to_csv(), encoding='utf8'))
        with zf.open('links.csv', 'w') as file:
            link_frame = [build_link_dataframe(link_) for link_ in
                          (link_parser_check(entities, parser) +
                           link_parser_check(entities, parser, True))]
            file.write(bytes(
                pd.DataFrame(data=link_frame).to_csv(), encoding='utf8'))

    return Response(
        archive.getvalue(),
        mimetype='application/zip',
        headers={'Content-Disposition': f'attachment;filename=test.zip'})


def get_entities_grouped_by_class(entities: list[Entity]) -> dict[str, Any]:
    entities += get_linked_entities_api([e.id for e in entities])
    entities = remove_duplicate_entities(entities)
    grouped_entities = {}
    for class_, entities in groupby(
            sorted(entities, key=lambda entity: entity.class_.name),
            key=lambda entity: entity.class_.name):
        grouped_entities[class_] = \
            [build_entity_dataframe(entity) for entity in entities]
    return grouped_entities

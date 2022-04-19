import ast
from typing import Any, Optional, Union

from flask import g

from openatlas.api.v03.resources.error import (
    EntityDoesNotExistError, InvalidCidocClassCode, InvalidCodeError,
    InvalidSearchSyntax, InvalidSystemClassError)
from openatlas.models.entity import Entity
from openatlas.models.gis import Gis
from openatlas.models.link import Link
from openatlas.models.reference_system import ReferenceSystem


def get_entity_by_id(id_: int) -> Entity:
    try:
        entity = Entity.get_by_id(id_, types=True, aliases=True)
    except Exception as e:
        raise EntityDoesNotExistError from e
    return entity


def get_entities_by_ids(ids: list[int]) -> list[Entity]:
    return Entity.get_by_ids(ids, types=True, aliases=True)


def get_license(entity: Entity) -> Optional[str]:
    for type_ in entity.types:
        if g.types[type_.root[0]].name == 'License':
            return type_.name
    return None


def to_camel_case(i: str) -> str:
    return (i[0] + i.title().translate(" ")[1:] if i else i).replace(" ", "")


def parser_str_to_dict(parser: list[str]) -> list[dict[str, Any]]:
    try:
        return [ast.literal_eval(p) for p in parser]
    except Exception as e:
        raise InvalidSearchSyntax from e


def get_all_subunits_recursive(
        entity: Entity,
        data: list[Entity]) -> list[Entity]:
    data.append(entity)
    if entity.class_.name not in ['artifact', 'human_remains']:
        if sub_entities := entity.get_linked_entities('P46', types=True):
            for e in sub_entities:
                get_all_subunits_recursive(e, data)
    return data


def replace_empty_list_values_in_dict_with_none(
        data: dict[str, Any]) -> dict[str, Any]:
    for key, value in data.items():
        if isinstance(value, list) and not data[key]:
            data[key] = None
    return data


def get_by_cidoc_classes(class_codes: list[str]) -> list[Entity]:
    class_codes = list(g.cidoc_classes) if 'all' in class_codes else class_codes
    if not all(cc in g.cidoc_classes for cc in class_codes):
        raise InvalidCidocClassCode
    return Entity.get_by_cidoc_class(class_codes, types=True, aliases=True)


def get_entities_by_view_classes(codes: list[str]) -> list[Entity]:
    codes = list(g.view_class_mapping) if 'all' in codes else codes
    if not all(c in g.view_class_mapping for c in codes):
        raise InvalidCodeError
    view_classes = flatten_list_and_remove_duplicates(
        [g.view_class_mapping[view] for view in codes])
    return Entity.get_by_class(view_classes, types=True, aliases=True)


def get_entities_by_system_classes(system_classes: list[str]) -> list[Entity]:
    system_classes = list(g.classes) \
        if 'all' in system_classes else system_classes
    if not all(sc in g.classes for sc in system_classes):
        raise InvalidSystemClassError
    return Entity.get_by_class(system_classes, types=True, aliases=True)


def flatten_list_and_remove_duplicates(list_: list[Any]) -> list[Any]:
    return [item for sublist in list_ for item in sublist if item not in list_]


def get_linked_entities_api(id_: Union[int, list[int]]) -> list[Entity]:
    domain_entity = [link_.range for link_ in get_all_links(id_)]
    range_entity = [link_.domain for link_ in get_all_links_inverse(id_)]
    return [*range_entity, *domain_entity]


def get_linked_entities_id_api(id_: int) -> list[Entity]:
    domain_ids = [link_.range.id for link_ in get_all_links(id_)]
    range_ids = [link_.domain.id for link_ in get_all_links_inverse(id_)]
    return [*range_ids, *domain_ids]


def get_entities_linked_to_special_type(id_: int) -> list[Entity]:
    domain_ids = [link_['domain_id'] for link_ in
                  Link.get_links_by_type(g.types[id_])]
    range_ids = [link_['range_id'] for link_ in
                 Link.get_links_by_type(g.types[id_])]
    return get_entities_by_ids(range_ids + domain_ids)


def get_entities_linked_to_special_type_recursive(
        id_: int,
        data: list[int]) -> list[int]:
    for link_ in Link.get_links_by_type(g.types[id_]):
        data.append(link_['domain_id'])
        data.append(link_['range_id'])
    for sub_id in g.types[id_].subs:
        get_entities_linked_to_special_type_recursive(sub_id, data)
    return data


def get_entities_by_type(
        entities: list[Entity],
        parser: dict[str, Any]) -> list[Entity]:
    new_entities = []
    for entity in entities:
        if any(ids in [key.id for key in entity.types]
               for ids in parser['type_id']):
            new_entities.append(entity)
    return new_entities


def get_key(entity: Entity, parser: str) -> str:
    if parser == 'cidoc_class':
        return entity.cidoc_class.name
    if parser == 'system_class':
        return entity.class_.name
    return getattr(entity, parser)


def remove_duplicate_entities(entities: list[Entity]) -> list[Entity]:
    seen = set()  # type: ignore
    seen_add = seen.add  # Do not change, faster than always call seen.add(e.id)
    return [
        entity for entity in entities
        if not (entity.id in seen or seen_add(entity.id))]


def get_all_links(
        entities: Union[int, list[int]],
        codes: Optional[Union[str, list[str]]] = None) -> list[Link]:
    codes = list(g.properties) if not codes else codes
    return Link.get_links(entities, codes)


def get_all_links_inverse(
        entities: Union[int, list[int]],
        codes: Optional[Union[str, list[str]]] = None) -> list[Link]:
    codes = list(g.properties) if not codes else codes
    return Link.get_links(entities, codes, inverse=True)


def link_parser_check(
        entities: list[Entity],
        parser: dict[str, Any]) -> list[Link]:
    if any(i in ['relations', 'types', 'depictions', 'links', 'geometry']
           for i in parser['show']):
        return get_all_links(
            [entity.id for entity in entities],
            get_properties_for_links(parser))
    return []


def link_parser_check_inverse(
        entities: list[Entity],
        parser: dict[str, Any]) -> list[Link]:
    if any(i in ['relations', 'types', 'depictions', 'links', 'geometry']
           for i in parser['show']):
        return get_all_links_inverse(
            [entity.id for entity in entities],
            get_properties_for_links(parser))
    return []


def get_properties_for_links(parser: dict[str, Any]) -> Optional[list[str]]:
    if parser['relation_type']:
        codes = [code for code in parser['relation_type']]
        if 'geometry' in parser['show']:
            codes.append('P53')
        if 'types' in parser['show']:
            codes.append('P2')
        if any(i in ['depictions', 'links'] for i in parser['show']):
            codes.append('P67')
        return codes
    return None


def get_reference_systems(
        links_inverse: list[Link]) -> list[dict[str, Any]]:
    ref = []
    for link_ in links_inverse:
        if not isinstance(link_.domain, ReferenceSystem):
            continue
        system = g.reference_systems[link_.domain.id]
        identifier = system.resolver_url if system.resolver_url else ''
        ref.append({
            'referenceURL': system.website_url,
            'id': link_.description,
            'resolverURL': system.resolver_url,
            'identifier': f"{identifier}{link_.description}",
            'type': to_camel_case(g.types[link_.type.id].name),
            'referenceSystem': system.name})
    return ref


def get_geometries(
        entity: Entity,
        links: list[Link]) -> Union[dict[str, Any], None]:
    if entity.class_.view == 'place' or entity.class_.name in ['artifact']:
        return get_geoms_by_entity(get_location_id(links))
    if entity.class_.name == 'object_location':
        return get_geoms_by_entity(entity.id)
    return None


def get_location_id(links: list[Link]) -> int:
    return [l_.range.id for l_ in links if l_.property.code == 'P53'][0]


def get_geoms_by_entity(entity_id: int) -> dict[str, Any]:
    geoms = Gis.get_by_id(entity_id)
    if len(geoms) == 1:
        return geoms[0]
    return {'type': 'GeometryCollection', 'geometries': geoms}

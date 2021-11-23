from typing import Any, Dict, List, Tuple, Union

from flask import Response
from flask_restful import Resource

from openatlas.api.v03.resources.formats.thanados import get_subunits
from openatlas.api.v03.resources.parser import entity_
from openatlas.api.v03.resources.resolve_endpoints import resolve_subunit
from openatlas.api.v03.resources.util import get_entity_by_id, link_builder
from openatlas.models.entity import Entity


class GetSubunits(Resource):  # type: ignore
    @staticmethod
    def get(id_: int) -> Union[Tuple[Resource, int], Response, Dict[str, Any]]:
        return resolve_subunit(
            GetSubunits.iterate(get_entity_by_id(id_), entity_.parse_args()),
            entity_.parse_args(),
            id_)

    @staticmethod
    def iterate(entity: Entity, parser: Dict[str, Any]):
        root = entity
        entities_dict = GetSubunits.get_all_subunits_recursive(
            entity,
            [{entity: []}])
        # Todo: make List comprehension
        entities = []
        for entity_dict in entities_dict:
            for entity in entity_dict.keys():
                entities.append(entity)
        links = link_builder(entities)
        links_inverse = link_builder(entities, True)
        return [
            get_subunits(
                list(entity.keys())[0],
                entity[(list(entity.keys())[0])],
                [link_ for link_ in links if link_.domain.id == list(entity.keys())[0].id],
                [link_ for link_ in links_inverse if
                 link_.range.id == list(entity.keys())[0].id],
                root,
                max(entity.modified for entity in entities),
                parser)
            for entity in entities_dict]

    @staticmethod
    def get_all_subunits_recursive(
            entity: Entity,
            data: List[Dict[Entity, List]]) -> List[Dict[Any, Any]]:
        if entity.class_.name not in ['artifact', 'human_remains']:
            sub_entities = entity.get_linked_entities('P46', nodes=True)
            data[-1] = {entity: sub_entities if sub_entities else None}
            if sub_entities:
                for e in sub_entities:
                    data.append({e: []})
            if sub_entities:
                for e in sub_entities:
                    GetSubunits.get_all_subunits_recursive(e, data)
        return data

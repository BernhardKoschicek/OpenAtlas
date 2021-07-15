from typing import Any, Dict, List, Tuple, Union

from flask import Response, g
from flask_restful import Resource

from openatlas.api.v02.resources.enpoints_util import resolve_entities
from openatlas.api.v02.resources.error import InvalidSubunitError
from openatlas.api.v02.resources.parser import entity_parser
from openatlas.api.v02.resources.util import get_entity_by_id
from openatlas.models.entity import Entity
from openatlas.models.link import Link


class GetTypeEntitiesAll(Resource):  # type: ignore
    @staticmethod
    def get(id_: int) -> Union[Tuple[Resource, int], Response, Dict[str, Any]]:
        entities = [entity for entity in GetTypeEntitiesAll.get_node_all(id_)]
        if not entities:
            entities = [get_entity_by_id(entity_id) for entity_id in
                        GetTypeEntitiesAll.get_special_node(id_, [])]
        return resolve_entities(entities, entity_parser.parse_args(), id_)

    @staticmethod
    def get_node_all(id_: int) -> List[Entity]:
        if id_ not in g.nodes:
            raise InvalidSubunitError
        return GetTypeEntitiesAll.get_recursive_node_entities(id_, [])

    @staticmethod
    def get_recursive_node_entities(id_: int, data: List[Entity]) -> List[Entity]:
        for entity in g.nodes[id_].get_linked_entities(['P2', 'P89'], inverse=True):
            data.append(entity)
        for sub_id in g.nodes[id_].subs:
            GetTypeEntitiesAll.get_recursive_node_entities(sub_id, data)
        return data

    @staticmethod
    def get_special_node(id_: int, data: List[int]) -> List[int]:
        for link_ in Link.get_entities_by_node(g.nodes[id_]):
            data.append(link_['domain_id'])
            data.append(link_['range_id'])
        for sub_id in g.nodes[id_].subs:
            GetTypeEntitiesAll.get_special_node(sub_id, data)
        return data
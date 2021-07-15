from typing import Any, Dict, List, Tuple, Union

from flask import Response, g
from flask_restful import Resource

from openatlas.api.v02.resources.enpoints_util import resolve_entities
from openatlas.api.v02.resources.error import InvalidSubunitError
from openatlas.api.v02.resources.parser import entity_parser
from openatlas.api.v02.resources.util import get_entity_by_id
from openatlas.models.entity import Entity
from openatlas.models.link import Link


class GetTypeEntities(Resource):  # type: ignore
    @staticmethod
    def get(id_: int) -> Union[Tuple[Resource, int], Response, Dict[str, Any]]:
        entities = [entity for entity in GetTypeEntities.get_node(id_)]
        if not entities:
            for link_ in Link.get_entities_by_node(g.nodes[id_]):
                entities.append(get_entity_by_id(link_['domain_id']))
                entities.append(get_entity_by_id(link_['range_id']))
        return resolve_entities(entities, entity_parser.parse_args(), id_)

    @staticmethod
    def get_node(id_: int) -> List[Entity]:
        if id_ not in g.nodes:
            raise InvalidSubunitError
        return [e for e in g.nodes[id_].get_linked_entities(['P2', 'P89'], inverse=True)]
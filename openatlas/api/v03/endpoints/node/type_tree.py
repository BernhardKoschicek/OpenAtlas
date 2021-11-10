from typing import Any, Dict, List, Tuple, Union

from flask import Response
from flask_restful import Resource, marshal

from openatlas.api.v03.resources.parser import entity_
from openatlas.api.v03.resources.resolve_endpoints import download
from openatlas.api.v03.templates.type_tree import TypeTreeTemplate
from openatlas.models.node import Node


class GetTypeTree(Resource):  # type: ignore

    def get(self) -> Union[Tuple[Resource, int], Response]:
        parser = entity_.parse_args()
        type_tree = {'typeTree': GetTypeTree.get_type_tree()}
        template = TypeTreeTemplate.type_tree_template()
        if parser['download']:
            return download(type_tree, template, 'type_tree')
        return marshal(type_tree, template), 200

    @staticmethod
    def get_type_tree() -> List[Dict[int, Dict[str, Any]]]:
        return [
            {id_: GetTypeTree.serialize_to_json(node)}
            for id_, node in Node.get_all_nodes().items()]

    @staticmethod
    def serialize_to_json(node: Node) -> Dict[str, Any]:
        return {
            'id': node.id,
            'name': node.name,
            'description': node.description,
            'origin_id': node.origin_id,
            'first': node.first,
            'last': node.last,
            'root': node.root,
            'subs': node.subs,
            'count': node.count,
            'count_subs': node.count_subs,
            'category': node.category}
from typing import Any, Dict, List, Tuple, Union

from flask import Response, json
from flask_restful import Resource, marshal

from openatlas.api.export.csv_export import ApiExportCSV
from openatlas.api.v02.resources.enpoints_util import download
from openatlas.api.v02.resources.geojson import Geojson
from openatlas.api.v02.resources.linked_places import LinkedPlaces
from openatlas.api.v02.resources.parser import entity_parser
from openatlas.api.v02.resources.util import get_all_links, get_all_links_inverse, get_entity_by_id
from openatlas.api.v02.templates.geojson import GeojsonTemplate
from openatlas.api.v02.templates.linked_places import LinkedPlacesTemplate
from openatlas.models.entity import Entity

from rdflib.plugin import register, Parser
register('json-ld', Parser, 'rdflib_jsonld.parser', 'JsonLDParser')
from rdflib import Graph, URIRef, Literal

class GetEntity(Resource):  # type: ignore
    @staticmethod
    def get(id_: int) -> Union[Tuple[Resource, int], Response, Dict[str, Any]]:
        return GetEntity.resolve_entity(get_entity_by_id(id_), entity_parser.parse_args())

    @staticmethod
    def resolve_entity(
            entity: Entity,
            parser: Dict[str, Any]) -> Union[Response, Dict[str, Any], Tuple[Any, int]]:
        if parser['export'] == 'csv':
            return ApiExportCSV.export_entity(entity)
        result = GetEntity.get_format(entity, parser)

        g = Graph().parse(data=json.dumps(result), format='json-ld')

        print(g.serialize(format='turtle').decode('utf-8'))

        if parser['download']:
            return download(result, GetEntity.get_template(parser), entity.id)
        return marshal(result, GetEntity.get_template(parser)), 200

    @staticmethod
    def get_format(
            entity: Entity,
            parser: Dict[str, Any]) -> Union[List[Dict[str, Any]], Dict[str, Any]]:
        if parser['format'] == 'geojson':
            return Geojson.get_geojson([entity])
        return LinkedPlaces.get_entity(
            entity,
            get_all_links(entity.id),
            get_all_links_inverse(entity.id),
            parser)

    @staticmethod
    def get_template(parser: Dict[str, Any]) -> Dict[str, Any]:
        if parser['format'] == 'geojson':
            return GeojsonTemplate.geojson_template()
        return LinkedPlacesTemplate.linked_places_template(parser['show'])
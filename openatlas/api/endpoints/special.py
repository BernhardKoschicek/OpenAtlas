import json
from collections import defaultdict
from typing import Any

from flask import Response, g, jsonify
from flask_restful import Resource, marshal

from openatlas.api.endpoints.parser import Parser
from openatlas.api.formats.csv import export_database_csv
from openatlas.api.formats.subunits import get_subunits_from_id
from openatlas.api.formats.xml import export_database_xml
from openatlas.api.resources.database_mapper import (
    get_all_entities_as_dict, get_all_links_as_dict, get_all_links_for_network,
    get_cidoc_hierarchy,
    get_classes, get_properties, get_property_hierarchy)
from openatlas.api.resources.error import NotAPlaceError
from openatlas.api.resources.api_entity import ApiEntity
from openatlas.api.resources.parser import entity_, gis, network
from openatlas.api.resources.resolve_endpoints import (
    download, resolve_subunits)
from openatlas.api.resources.templates import geometries_template, \
    network_visualisation_template
from openatlas.api.resources.util import get_geometries
from openatlas.models.export import current_date_for_filename


class GetGeometricEntities(Resource):
    @staticmethod
    def get() -> int | Response | tuple[Any, int]:
        parser = gis.parse_args()
        output: dict[str, Any] = {
            'type': 'FeatureCollection',
            'features': get_geometries(parser)}
        if parser['count'] == 'true':
            return jsonify(len(output['features']))
        if parser['download'] == 'true':
            return download(output, geometries_template())
        return marshal(output, geometries_template()), 200


class ExportDatabase(Resource):
    @staticmethod
    def get(format_: str) -> tuple[Resource, int] | Response:
        geoms = [
            ExportDatabase.get_geometries_dict(geom)
            for geom in get_geometries({'geometry': 'gisAll'})]
        tables = {
            'entities': get_all_entities_as_dict(),
            'links': get_all_links_as_dict(),
            'properties': get_properties(),
            'property_hierarchy': get_property_hierarchy(),
            'classes': get_classes(),
            'class_hierarchy': get_cidoc_hierarchy(),
            'geometries': geoms}
        filename = f'{current_date_for_filename()}-export'
        if format_ == 'csv':
            return export_database_csv(tables, filename)
        if format_ == 'xml':
            return export_database_xml(tables, filename)
        return Response(
            json.dumps(tables),
            mimetype='application/json',
            headers={
                'Content-Disposition': f'attachment;filename={filename}.json'})

    @staticmethod
    def get_geometries_dict(geom: dict[str, Any]) -> dict[str, Any]:
        return {
            'id': geom['properties']['id'],
            'locationId': geom['properties']['locationId'],
            'objectId': geom['properties']['objectId'],
            'name': geom['properties']['name'],
            'objectName': geom['properties']['objectName'],
            'objectDescription': geom['properties']['objectDescription'],
            'coordinates': geom['geometry']['coordinates'],
            'type': geom['geometry']['type']}


class GetSubunits(Resource):
    @staticmethod
    def get(id_: int) -> tuple[Resource, int] | Response | dict[str, Any]:
        entity = ApiEntity.get_by_id(id_, types=True, aliases=True)
        if entity.class_.name != 'place':
            raise NotAPlaceError
        parser = entity_.parse_args()
        return resolve_subunits(
            get_subunits_from_id(entity, parser),
            parser,
            str(id_))


class GetNetworkVisualisation(Resource):
    @staticmethod
    def get() -> tuple[Resource, int] | Response | dict[str, Any]:
        parser = Parser(network.parse_args())
        system_classes = g.classes
        if exclude := parser.exclude_system_classes:
            system_classes = [s for s in system_classes if s not in exclude]
        output: dict[str, Any] = defaultdict()
        for item in get_all_links_for_network(system_classes):
            if output.get(item['domain_id']):
                output[item['domain_id']]['relations'].append(item['range_id'])
            else:
                output[item['domain_id']] = {
                    'label': item['domain_name'],
                    'systemClass': item['domain_system_class'],
                    'relations': [item['range_id']]}
            if output.get(item['range_id']):
                output[item['range_id']]['relations'].append(item['domain_id'])
            else:
                output[item['range_id']] = {
                    'label': item['range_name'],
                    'systemClass': item['range_system_class'],
                    'relations': [item['domain_id']]}
        results: dict[str, Any] = {'results': []}
        for id_, dict_ in output.items():
            dict_['id'] = id_
            results['results'].append(dict_)
        if parser.download:
            return download(results, network_visualisation_template())
        return marshal(results, network_visualisation_template()), 200

import ast
from typing import Any, Dict, List, Optional

from flask import g, json
from flask_wtf import FlaskForm

from openatlas.models.entity import Entity
from openatlas.models.imports import Project
from openatlas.models.node import Node
from openatlas.util.util import sanitize


class InvalidGeomException(Exception):
    pass


class Gis:

    @staticmethod
    def get_all(objects: Optional[List[Entity]] = None,
                subunits: Optional[List[Entity]] = None) -> Dict[str, List[Any]]:
        if objects is None:
            objects = []
        all_: Dict[str, List[Any]] = {'point': [], 'linestring': [], 'polygon': []}
        selected: Dict[str, List[Any]] = {'point': [],
                                          'linestring': [],
                                          'polygon': [],
                                          'polygon_point': []}

        # Include GIS features of subunits which would be otherwise omitted
        subunit_ids = [0]
        if objects and objects[0].system_type in ['place', 'feature', 'find', 'stratigraphic unit']:
            subunit_selected_id = objects[0].id
            subunit_ids = [subunit.id for subunit in subunits] + [subunit_selected_id]

        object_ids = [x.id for x in objects]
        polygon_point_sql = \
            'public.ST_AsGeoJSON(public.ST_PointOnSurface(polygon.geom)) AS polygon_point, '
        for shape in ['point', 'polygon', 'linestring']:
            polygon_sql = polygon_point_sql if shape == 'polygon' else ''
            sql = """
                SELECT
                    object.id AS object_id,
                    {shape}.id,
                    {shape}.name,
                    {shape}.description,
                    {shape}.type,
                    public.ST_AsGeoJSON({shape}.geom) AS geojson, {polygon_sql}
                    object.name AS object_name,
                    object.description AS object_desc,
                    string_agg(CAST(t.range_id AS text), ',') AS types
                FROM model.entity place
                JOIN model.link l ON place.id = l.range_id
                JOIN model.entity object ON l.domain_id = object.id
                JOIN gis.{shape} {shape} ON place.id = {shape}.entity_id
                LEFT JOIN model.link t ON object.id = t.domain_id AND t.property_code = 'P2'
                WHERE place.class_code = 'E53'
                    AND l.property_code = 'P53'
                    AND (object.system_type = 'place' OR object.id IN %(subunit_ids)s)
                GROUP BY object.id, {shape}.id;""".format(shape=shape, polygon_sql=polygon_sql)
            g.execute(sql, {'subunit_ids': tuple(subunit_ids)})
            place_root = Node.get_hierarchy('Place')
            for row in g.cursor.fetchall():
                description = row.description.replace('"', '\"') if row.description else ''
                object_desc = row.object_desc.replace('"', '\"') if row.object_desc else ''
                item = {'type': 'Feature',
                        'geometry': json.loads(row.geojson),
                        'properties': {'objectId': row.object_id,
                                       'objectName': row.object_name.replace('"', '\"'),
                                       'objectDescription': object_desc,
                                       'id': row.id,
                                       'name': row.name.replace('"', '\"') if row.name else '',
                                       'description': description,
                                       'shapeType': row.type}}
                if hasattr(row, 'types') and row.types:
                    nodes_list = ast.literal_eval('[' + row.types + ']')
                    for node_id in list(set(nodes_list)):
                        node = g.nodes[node_id]
                        if node.root and node.root[-1] == place_root.id:
                            item['properties']['objectType'] = node.name.replace('"', '\"')
                            break
                if row.object_id in object_ids:
                    selected[shape].append(item)
                else:
                    all_[shape].append(item)
                if hasattr(row, 'polygon_point'):
                    polygon_point_item = dict(item)  # make a copy to prevent overriding geometry
                    polygon_point_item['geometry'] = json.loads(row.polygon_point)
                    if row.object_id in object_ids:
                        selected['polygon_point'].append(polygon_point_item)
                    else:
                        all_['point'].append(polygon_point_item)
        return {'gisPointAll': json.dumps(all_['point']),
                'gisPointSelected': json.dumps(selected['point']),
                'gisLineAll': json.dumps(all_['linestring']),
                'gisLineSelected': json.dumps(selected['linestring']),
                'gisPolygonAll': json.dumps(all_['polygon']),
                'gisPolygonSelected': json.dumps(selected['polygon']),
                'gisPolygonPointSelected': json.dumps(selected['polygon_point']),
                'gisAllSelected': json.dumps(selected['polygon'] + selected['linestring'] +
                                             selected['point'])}

    @staticmethod
    def insert(entity: Entity, form: FlaskForm) -> None:
        for shape in ['point', 'line', 'polygon']:
            data = getattr(form, 'gis_' + shape + 's').data
            if not data:
                continue  # pragma: no cover
            for item in json.loads(data):
                # Don't save geom if coordinates are empty
                if not item['geometry']['coordinates'] or item['geometry']['coordinates'] == [[]]:
                    continue  # pragma: no cover
                if item['properties']['shapeType'] != 'centerpoint':
                    # Test for valid geom
                    sql = """
                        SELECT st_isvalid(
                            public.ST_SetSRID(public.ST_GeomFromGeoJSON(%(geojson)s),4326));"""
                    g.execute(sql, {'geojson': json.dumps(item['geometry'])})
                    if not g.cursor.fetchone()[0]:
                        raise InvalidGeomException
                sql = """
                    INSERT INTO gis.{shape} (entity_id, name, description, type, geom) VALUES (
                        %(entity_id)s,
                        %(name)s,
                        %(description)s,
                        %(type)s,
                        public.ST_SetSRID(public.ST_GeomFromGeoJSON(%(geojson)s),4326));
                    """.format(shape=shape if shape != 'line' else 'linestring')
                g.execute(sql, {
                    'entity_id': entity.id,
                    'name': sanitize(item['properties']['name'], 'description'),
                    'description': sanitize(item['properties']['description'], 'description'),
                    'type': item['properties']['shapeType'],
                    'geojson': json.dumps(item['geometry'])})

    @staticmethod
    def insert_import(entity: Entity, location: Entity, project: Project,
                      easting: float, northing: float) -> None:
        # Insert places from CSV imports
        sql = """
            INSERT INTO gis.point (entity_id, name, description, type, geom) VALUES (
                %(entity_id)s,
                %(name)s,
                %(description)s,
                %(type)s,
                public.ST_SetSRID(public.ST_GeomFromGeoJSON(%(geojson)s),4326));"""
        g.execute(sql, {
            'entity_id': location.id,
            'name': '',
            'description': 'Imported centerpoint of {name} from the {project} project'.format(
                name=sanitize(entity.name, 'description'),
                project=sanitize(project.name, 'description')),
            'type': 'centerpoint',
            'geojson': '''{{"type":"Point", "coordinates": [{easting},{northing}]}}'''.format(
                easting=easting, northing=northing)})

    @staticmethod
    def delete_by_entity(entity: Entity) -> None:
        g.execute('DELETE FROM gis.point WHERE entity_id = %(id)s;', {'id': entity.id})
        g.execute('DELETE FROM gis.linestring WHERE entity_id = %(id)s;', {'id': entity.id})
        g.execute('DELETE FROM gis.polygon WHERE entity_id = %(id)s;', {'id': entity.id})

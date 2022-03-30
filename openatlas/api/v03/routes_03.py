from flask_restful import Api

from openatlas.api.v03.endpoints.content import ClassMapping, \
    GetContent, GetGeometricEntities, SystemClassCount
from openatlas.api.v03.endpoints.display_image import DisplayImage
from openatlas.api.v03.endpoints.entities import GetByCidocClass, \
    GetBySystemClass, GetByViewClass, GetEntitiesLinkedToEntity, GetEntity, \
    GetLatest, GetQuery, GetTypeEntities, GetTypeEntitiesAll
from openatlas.api.v03.endpoints.type import GetSubunits, GetTypeOverview, \
    GetTypeTree


def add_routes_v03(api: Api) -> None:
    api.add_resource(
        GetByViewClass,
        '/view_class/<string:view_class>',
        endpoint="view_class")
    api.add_resource(
        GetByCidocClass,
        '/cidoc_class/<string:cidoc_class>',
        endpoint="cidoc_class")
    api.add_resource(
        GetEntity,
        '/entity/<int:id_>',
        endpoint='entity')
    api.add_resource(
        GetLatest,
        '/latest/<int:latest>',
        endpoint="latest")
    api.add_resource(
        GetQuery,
        '/query/',
        endpoint="query")
    api.add_resource(
        GetBySystemClass,
        '/system_class/<string:system_class>',
        endpoint="system_class")
    api.add_resource(
        GetTypeEntities,
        '/type_entities/<int:id_>',
        endpoint="type_entities")
    api.add_resource(
        GetTypeEntitiesAll,
        '/type_entities_all/<int:id_>',
        endpoint="type_entities_all")
    api.add_resource(
        GetEntitiesLinkedToEntity,
        '/entities_linked_to_entity/<int:id_>',
        endpoint="entities_linked_to_entity")

    api.add_resource(
        GetTypeOverview,
        '/type_overview/',
        endpoint="type_overview")
    api.add_resource(
        GetTypeTree,
        '/type_tree/',
        endpoint="type_tree")
    api.add_resource(
        GetSubunits,
        '/subunits/<int:id_>',
        endpoint="subunits")

    api.add_resource(
        GetContent,
        '/content/',
        endpoint="content")
    api.add_resource(
        ClassMapping,
        '/classes/',
        endpoint='class_mapping')
    api.add_resource(
        SystemClassCount,
        '/system_class_count/',
        endpoint='system_class_count')
    api.add_resource(
        GetGeometricEntities,
        '/geometric_entities/',
        endpoint="geometric_entities")

    api.add_resource(
        DisplayImage,
        '/display/<path:filename>',
        endpoint='display')

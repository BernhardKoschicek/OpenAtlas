from __future__ import annotations

from typing import Any, TYPE_CHECKING

from openatlas.database import overlay as db
from openatlas.display.util import get_file_path

if TYPE_CHECKING:  # pragma: no cover
    from openatlas.models.entity import Entity


class Overlay:

    def __init__(self, row: dict[str, Any]) -> None:
        self.id = row['id']
        self.name = row['name'] if 'name' in row else ''
        self.image_id = row['image_id']
        self.place_id = row['place_id']
        self.bounding_box = row['bounding_box']
        path = get_file_path(row['image_id'])
        self.image_name = path.name if path else False

    @staticmethod
    def insert(data: dict[str, Any]) -> None:
        db.insert({
            'image_id': data['image_id'],
            'place_id': data['place_id'],
            'link_id': data['link_id'],
            'bounding_box':
                f"[[{data['top_left_northing']}, "
                f"{data['top_left_easting']}], "
                f"[{data['top_right_northing']}, "
                f"{data['top_right_easting']}], "
                f"[{data['bottom_left_northing']}, "
                f"{data['bottom_left_easting']}]]"})

    @staticmethod
    def update(data: dict[str, Any]) -> None:
        db.update({
            'image_id': data['image_id'],
            'place_id': data['place_id'],
            'bounding_box':
                f"[[{data['top_left_northing']}, "
                f"{data['top_left_easting']}], "
                f"[{data['top_right_northing']}, "
                f"{data['top_right_easting']}], "
                f"[{data['bottom_left_northing']}, "
                f"{data['bottom_left_easting']}]]"})

    @staticmethod
    def get_by_object(object_: Entity) -> dict[int, Overlay]:
        ids = [object_.id] + \
            [e.id for e in object_.get_linked_entities_recursive('P46', True)]
        return {row['image_id']: Overlay(row) for row in db.get_by_object(ids)}

    @staticmethod
    def get_by_id(id_: int) -> Overlay:
        return Overlay(db.get_by_id(id_))

    @staticmethod
    def remove(id_: int) -> None:
        db.remove(id_)

from typing import Any

from flask import g, url_for

from openatlas import app
from openatlas.models.entity import Entity
from openatlas.models.type import Type
from tests.base import TestBaseCase, insert_entity


class TypeTest(TestBaseCase):

    def test_type(self) -> None:
        with app.app_context():
            with app.test_request_context():
                app.preprocess_request()  # type: ignore
                actor_type = Type.get_hierarchy('Actor actor relation')
                dimension_type = Type.get_hierarchy('Dimensions')
                historical_type = Type.get_hierarchy('Historical place')
                sex_type = Type.get_hierarchy('Sex')
                place = insert_entity('Home', 'place')
                place.link('P2', g.types[dimension_type.subs[0]], '46')
                location = place.get_linked_entity_safe('P53')
                location.link('P89', g.types[historical_type.subs[0]])

            rv: Any = self.app.get(
                url_for('view', id_=historical_type.subs[0]))
            assert b'Historical place' in rv.data
            rv = self.app.get(url_for('type_index'))
            assert b'Actor actor relation' in rv.data
            rv = self.app.get(
                url_for('insert', class_='type', origin_id=actor_type.id))
            assert b'Actor actor relation' in rv.data
            data = {
                'name': 'My secret type',
                'name_inverse': 'Do I look inverse?',
                'description': 'Very important!'}
            rv = self.app.post(
                url_for('insert', class_='type', origin_id=actor_type.id),
                data=data)
            type_id = rv.location.split('/')[-1]
            rv = self.app.get(url_for('update', id_=type_id))
            assert b'My secret type' in rv.data and b'Super' in rv.data
            self.app.post(
                url_for('insert', class_='type', origin_id=sex_type.id),
                data=data)
            rv = self.app.post(
                url_for('update', id_=type_id),
                data=data,
                follow_redirects=True)
            assert b'Changes have been saved.' in rv.data

            # Insert and continue
            data['continue_'] = 'yes'
            rv = self.app.post(
                url_for('insert', class_='type', origin_id=actor_type.id),
                data=data,
                follow_redirects=True)
            assert b'An entry has been created' in rv.data
            data['continue_'] = ''

            # Forbidden system type
            rv = self.app.post(
                url_for('update', id_=actor_type.id),
                data=data,
                follow_redirects=True)
            assert b'Forbidden' in rv.data

            # Update with self as root
            data[str(actor_type.id)] = type_id
            rv = self.app.post(
                url_for('update', id_=type_id),
                data=data,
                follow_redirects=True)
            assert b'Type can&#39;t have itself as super' in rv.data

            # Update with sub as root
            rv = self.app.post(
                url_for('insert', class_='type', origin_id=actor_type.id),
                data=data)
            sub_type_id = rv.location.split('/')[-1].replace('type#tab-', '')
            data[str(actor_type.id)] = sub_type_id
            rv = self.app.post(
                url_for('update', id_=type_id),
                data=data,
                follow_redirects=True)
            assert b'Type can&#39;t have a sub as super' in rv.data

            # Custom type
            rv = self.app.get(
                url_for('view', id_=sex_type.id),
                follow_redirects=True)
            assert b'Male' in rv.data

            # Administrative unit
            admin_unit_id = Type.get_hierarchy('Administrative unit').id
            rv = self.app.get(
                url_for('view', id_=admin_unit_id), follow_redirects=True)
            assert b'Austria' in rv.data
            rv = self.app.post(
                url_for(
                    'insert',
                    class_='administrative_unit',
                    origin_id=g.types[admin_unit_id].subs[0]),
                data={'name': 'admin unit'},
                follow_redirects=True)
            assert b'An entry has been created' in rv.data

            # Value type
            rv = self.app.get(
                url_for('view', id_=dimension_type.id),
                follow_redirects=True)
            assert b'Height' in rv.data
            rv = self.app.get(url_for('view', id_=dimension_type.subs[0]))
            assert b'Unit' in rv.data
            rv = self.app.get(url_for('update', id_=dimension_type.subs[0]))
            assert b'Dimensions' in rv.data

            # Test parent value type view after creating a sub subtype
            rv = self.app.post(
                url_for(
                    'insert',
                    class_='type',
                    origin_id=dimension_type.subs[0]),
                data={
                    'name': "Sub sub type",
                    dimension_type.id: dimension_type.subs[0]},
                follow_redirects=True)
            assert b'An entry has been created' in rv.data
            rv = self.app.get(url_for('view', id_=dimension_type.subs[0]))
            assert b'Sub sub type' in rv.data

            # Untyped entities
            with app.test_request_context():
                app.preprocess_request()  # type: ignore
                actor = Entity.insert('person', 'Connor MacLeod')
            rv = self.app.get(
                url_for('show_untyped_entities', id_=sex_type.id))
            assert b'Connor MacLeod' in rv.data
            with app.test_request_context():
                app.preprocess_request()  # type: ignore
                actor.link('P2', g.types[sex_type.subs[0]])
            rv = self.app.get(
                url_for('show_untyped_entities', id_=sex_type.id))
            assert b'No entries' in rv.data

            # Delete
            rv = self.app.get(
                url_for('type_delete', id_=actor_type.id),
                follow_redirects=True)
            assert b'Forbidden' in rv.data
            rv = self.app.get(
                url_for('type_delete', id_=sub_type_id),
                follow_redirects=True)
            assert b'The entry has been deleted.' in rv.data

            with app.test_request_context():
                app.preprocess_request()  # type: ignore
                frodo = insert_entity('Frodo', 'person')
                frodo.link(
                    'P2',
                    Entity.get_by_id(Type.get_hierarchy('Sex').subs[0]))
                frodo.link(
                    'P2',
                    Entity.get_by_id(Type.get_hierarchy('Sex').subs[1]))

            # Check invalid multiple type links
            rv = self.app.get(url_for('update', id_=frodo.id))
            assert b'422' in rv.data

            # Multiple linked entities
            rv = self.app.get(
                url_for('show_multiple_linked_entities', id_=sex_type.id))
            assert b'Frodo' in rv.data

            # Multiple disabled
            self.app.post(
                url_for('hierarchy_update', id_=sex_type.id),
                data={'multiple': True})
            rv = self.app.get(url_for('hierarchy_update', id_=sex_type.id))
            assert b'disabled="disabled" id="multiple"' in rv.data

            # Delete recursively
            rv = self.app.get(
                url_for('hierarchy_delete', id_=sex_type.id),
                follow_redirects=True)
            assert b'Warning' in rv.data

            rv = self.app.get(
                url_for('type_delete_recursive', id_=sex_type.subs[0]),
                follow_redirects=True)
            assert b'Warning' in rv.data

            rv = self.app.post(
                url_for('type_delete_recursive', id_=sex_type.id))
            assert b'This field is required.' in rv.data

            rv = self.app.post(
                url_for('type_delete_recursive', id_=sex_type.id),
                data={'confirm_delete': True},
                follow_redirects=True)
            assert b'Types deleted' in rv.data

            rv = self.app.post(
                url_for('type_delete_recursive', id_=actor_type.id),
                data={'confirm_delete': True},
                follow_redirects=True)
            assert b'403 - Forbidden' in rv.data

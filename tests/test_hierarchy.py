from typing import Any

from flask import url_for

from openatlas import app
from openatlas.models.type import Type
from tests.base import TestBaseCase


class HierarchyTest(TestBaseCase):

    def test_hierarchy(self) -> None:
        with app.app_context():
            data = {
                'name': 'Geronimo',
                'classes':
                    ['file', 'group', 'move', 'person', 'place', 'source'],
                'multiple': True,
                'description': 'Very important!'}
            rv: Any = self.app.post(
                url_for('hierarchy_insert', category='custom'),
                follow_redirects=True,
                data=data)
            assert b'An entry has been created' in rv.data

            rv = self.app.post(
                url_for('hierarchy_insert', category='custom'),
                follow_redirects=True,
                data=data)
            assert b'The name is already in use' in rv.data

            with app.test_request_context():
                hierarchy = Type.get_hierarchy('Geronimo')
            rv = self.app.get(url_for('hierarchy_update', id_=hierarchy.id))
            assert b'Geronimo' in rv.data

            data['classes'] = ['acquisition']
            data['entity_id'] = hierarchy.id
            rv = self.app.post(
                url_for('hierarchy_update', id_=hierarchy.id),
                data=data,
                follow_redirects=True)
            assert b'Changes have been saved.' in rv.data

            rv = self.app.get(url_for('hierarchy_update', id_=hierarchy.id))
            assert b'checked class="" id="multiple"' in rv.data

            rv = self.app.get(url_for('hierarchy_insert', category='custom'))
            assert b'+ Custom' in rv.data

            with app.test_request_context():
                app.preprocess_request()  # type: ignore
                sex_hierarchy = Type.get_hierarchy('Sex')

            rv = self.app.get(
                url_for('required_risk', id_=sex_hierarchy.id),
                follow_redirects=True)
            assert b'Be careful with making types required' in rv.data

            rv = self.app.get(
                url_for('required_add', id_=sex_hierarchy.id),
                follow_redirects=True)
            assert b'Changes have been saved.' in rv.data

            rv = self.app.get(url_for('insert', class_='person'))
            assert b'Sex *' in rv.data

            rv = self.app.get(
                url_for('required_remove', id_=sex_hierarchy.id),
                follow_redirects=True)
            assert b'Changes have been saved.' in rv.data

            data = {'name': 'My secret type', 'description': 'Very important!'}
            rv = self.app.post(
                url_for('insert', class_='type', origin_id=hierarchy.id),
                data=data)
            type_id = rv.location.split('/')[-1]
            rv = self.app.get(
                url_for('remove_class', id_=hierarchy.id, class_name='person'),
                follow_redirects=True)
            assert b'Changes have been saved.' in rv.data

            rv = self.app.get(
                url_for('type_delete', id_=type_id),
                follow_redirects=True)
            assert b'deleted' in rv.data

            rv = self.app.post(
                url_for('hierarchy_update', id_=hierarchy.id),
                data={'name': 'Actor relation', 'entity_id': hierarchy.id},
                follow_redirects=True)
            assert b'The name is already in use' in rv.data

            rv = self.app.post(
                url_for('hierarchy_delete', id_=hierarchy.id),
                follow_redirects=True)
            assert b'deleted' in rv.data

            rv = self.app.get(url_for('hierarchy_insert', category='value'))
            assert b'+ Value' in rv.data

            rv = self.app.post(
                url_for('hierarchy_insert', category='value'),
                follow_redirects=True,
                data={
                    'name': 'A valued value',
                    'classes': ['file'],
                    'description': ''})
            assert b'An entry has been created' in rv.data

            with app.test_request_context():
                value_type = Type.get_hierarchy('A valued value')
            rv = self.app.get(url_for('hierarchy_update', id_=value_type.id))
            assert b'valued' in rv.data

            relation_type = Type.get_hierarchy('Actor relation')
            rv = self.app.get(
                url_for('hierarchy_update', id_=relation_type.id),
                follow_redirects=True)
            assert b'Forbidden' in rv.data

            rv = self.app.get(
                url_for('hierarchy_delete', id_=relation_type.id),
                follow_redirects=True)
            assert b'Forbidden' in rv.data

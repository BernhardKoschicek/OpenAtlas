from flask import url_for

from openatlas import app
from openatlas.models.type import Type
from tests.base import TestBaseCase


class HierarchyTest(TestBaseCase):

    def test_hierarchy(self) -> None:
        with app.app_context():
            # Custom types
            data = {
                'name': 'Geronimo',
                'classes':
                    ['file', 'group', 'move', 'person', 'place', 'source'],
                'multiple': True,
                'description': 'Very important!'}
            rv = self.app.post(
                url_for('hierarchy_insert', param='custom'),
                follow_redirects=True,
                data=data)
            assert b'An entry has been created' in rv.data
            rv = self.app.post(
                url_for('hierarchy_insert', param='custom'),
                follow_redirects=True,
                data=data)
            assert b'The name is already in use' in rv.data
            with app.test_request_context():
                hierarchy = Type.get_hierarchy('Geronimo')
            rv = self.app.get(url_for('hierarchy_update', id_=hierarchy.id))
            assert b'Geronimo' in rv.data
            data['classes'] = ['acquisition']
            rv = self.app.post(
                url_for('hierarchy_update', id_=hierarchy.id),
                data=data,
                follow_redirects=True)
            assert b'Changes have been saved.' in rv.data

            rv = self.app.get(url_for('hierarchy_insert', param='custom'))
            assert b'+ Custom' in rv.data

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
                data={'name': 'Actor actor relation'},
                follow_redirects=True)
            assert b'The name is already in use' in rv.data
            rv = self.app.post(
                url_for('hierarchy_delete', id_=hierarchy.id),
                follow_redirects=True)
            assert b'deleted' in rv.data

            # Value types
            rv = self.app.get(url_for('hierarchy_insert', param='value'))
            assert b'+ Value' in rv.data
            rv = self.app.post(
                url_for('hierarchy_insert', param='value'),
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

            # Test checks
            relation_type = Type.get_hierarchy('Actor actor relation')
            rv = self.app.get(
                url_for('hierarchy_update', id_=relation_type.id),
                follow_redirects=True)
            assert b'Forbidden' in rv.data
            rv = self.app.get(
                url_for('hierarchy_delete', id_=relation_type.id),
                follow_redirects=True)
            assert b'Forbidden' in rv.data

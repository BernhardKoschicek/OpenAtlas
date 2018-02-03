# Copyright 2017 by Alexander Watzinger and others. Please see README.md for licensing information
import os
import unittest

import psycopg2
from flask import url_for

from openatlas import app, NodeMapper


class TestBaseCase(unittest.TestCase):
    @staticmethod
    def setup_database():
        app.testing = True
        connection = psycopg2.connect(
            database=app.config['DATABASE_NAME'],
            user=app.config['DATABASE_USER'],
            password=app.config['DATABASE_PASS'],
            port=app.config['DATABASE_PORT'])
        connection.autocommit = True
        cursor = connection.cursor()
        for file_name in [
            'structure.sql',
            'data_web.sql',
            'data_model.sql',
            'data_node.sql',
            'data_test.sql'
        ]:
            with open(os.path.dirname(__file__) + '/../install/' + file_name, 'r') as sqlFile:
                cursor.execute(sqlFile.read())

    def setUp(self):
        app.config['SERVER_NAME'] = 'localhost'
        app.config['WTF_CSRF_ENABLED'] = False
        self.setup_database()
        self.app = app.test_client()

    def tearDown(self):
        pass

    def login(self):
        self.app.post('/login', data={'username': 'Alice', 'password': 'test'})

    def insert(self, view, name):
        data = {'name': name}
        if view == 'event':
            data['event'] = '[' + str(NodeMapper.get_nodes('event')[0]) + ']'
        rv = self.app.post(url_for(view + '_insert'), data=data)
        return rv.location.split('/')[-1]  # return the new id

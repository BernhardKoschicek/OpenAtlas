# This script is for developing purposes and not needed to install OpenAtlas.
#
# CIDOC CRM is used as basis for the underlying data model of OpenAtlas.
# Currently we are using CIDOC CRM 7.7.1 (October 2021) from
# http://www.cidoc-crm.org/versions-of-the-cidoc-crm
#
# The script parses the rdfs file and imports it to a PostgreSQL database.
# Installation of needed package: # apt-get install python3-rdflib
#
# Once run table data can be extracted with e.g.
# pg_dump --column-inserts --data-only --rows-per-insert=1000 --table=model.cidoc_class cidoc > class.sql

import time
from typing import Dict, List, Optional

import psycopg2.extras
from rdflib import URIRef
from rdflib.graph import Graph

FILENAME = 'CIDOC_CRM_v7.1.1.rdfs'
CRM_URL = 'http://www.cidoc-crm.org/cidoc-crm/'

EXCLUDE_PROPERTIES = [
    'P3', 'P57', 'P79', 'P80', 'P81', 'P81a', 'P81b', 'P82', 'P82a', 'P82b',
    'P90', 'P90a', 'P90b', 'P171', 'P172', 'P190', 'P168']

DATABASE_NAME = 'cidoc'
DATABASE_USER = 'openatlas'
DATABASE_PORT = '5432'
DATABASE_HOST = 'localhost'
DATABASE_PASS = 'CHANGE ME'


def connect() -> psycopg2.connect:
    return psycopg2.connect(
        database=DATABASE_NAME,
        user=DATABASE_USER,
        password=DATABASE_PASS,
        port=DATABASE_PORT,
        host=DATABASE_HOST)


class Item:

    domain_code: str
    range_code: str

    def __init__(self, code: str, name: str, comment: str) -> None:
        self.code = code
        self.name = name
        self.comment = comment
        self.name_inverse: Optional[str] = None
        self.label: Dict[str, str] = {}
        self.sub_class_of: List[str] = []
        self.sub_property_of: List[str] = []


def import_cidoc() -> None:  # pragma: no cover

    start = time.time()
    classes = {}
    properties: Dict[str, Item] = {}
    properties_inverse: Dict[str, Item] = {}
    graph = Graph()
    graph.parse(FILENAME, format='application/rdf+xml')

    # Get classes and properties
    for subject, predicate, object_ in graph:
        try:
            code, name = subject.replace(CRM_URL, '').split('_', 1)
        except:
            print(f'Not able to parse subject: {subject}')
            continue
        item = Item(code, name.replace('_', ' '), graph.comment(subject))

        # Translations
        for language in ['de', 'en', 'fr', 'ru', 'el', 'pt', 'zh']:
            translation = graph.preferredLabel(subject, lang=language)
            if translation and translation[0][1]:
                item.label[language] = translation[0][1]

        if code[0] == 'E':
            classes[code] = item
        elif code[0] == 'P':
            if code in EXCLUDE_PROPERTIES:
                pass
            elif code[-1] == 'i':
                properties_inverse[code[:-1]] = item
            else:
                properties[code] = item

    for code, property_inverse in properties_inverse.items():
        if code in properties:
            properties[code].name_inverse = property_inverse.name
        else:
            print(f'Missing property code: {code}')

    # Get subClassOf
    subs = graph.triples((
        None,
        URIRef('http://www.w3.org/2000/01/rdf-schema#subClassOf'),
        None))
    for subject__, predicate__, object__ in subs:
        class_ = subject__.replace(CRM_URL, '').split('_', 1)[0]
        sub_class_of = object__.replace(CRM_URL, '').split('_', 1)[0]
        classes[class_].sub_class_of.append(sub_class_of)

    # Get subPropertyOf
    subs = graph.triples((
        None,
        URIRef('http://www.w3.org/2000/01/rdf-schema#subPropertyOf'),
        None))
    for subject__, predicate__, object__ in subs:
        property_ = subject__.replace(CRM_URL, '').split('_', 1)[0]
        if property_[-1] == 'i' or property_ in EXCLUDE_PROPERTIES:
            continue
        sub_property_of = object__.replace(CRM_URL, '').split('_', 1)[0]
        sub_property_of = sub_property_of.replace('i', '')  # P10i, P130i, P59i
        properties[property_].sub_property_of.append(sub_property_of)

    # Get domain for properties
    domains = graph.triples((
        None,
        URIRef('http://www.w3.org/2000/01/rdf-schema#domain'),
        None))
    for subject__, predicate__, object__ in domains:
        property_ = subject__.replace(CRM_URL, '').split('_', 1)[0]
        if property_[-1] == 'i' or property_ in EXCLUDE_PROPERTIES:
            continue
        properties[property_].domain_code = \
            object__.replace(CRM_URL, '').split('_', 1)[0]

    # Get range for properties
    ranges = graph.triples((
        None,
        URIRef('http://www.w3.org/2000/01/rdf-schema#range'),
        None))
    for subject__, predicate__, object__ in ranges:
        property_ = subject__.replace(CRM_URL, '').split('_', 1)[0]
        if property_[-1] == 'i' or property_ in EXCLUDE_PROPERTIES:
            continue
        properties[property_].range_code = \
            object__.replace(CRM_URL, '').split('_', 1)[0]

    # OpenAtlas shortcuts
    properties['OA7'] = Item('OA7', 'has relationship to', 'OA7 is used to link two Actors (E39) via a certain relationship E39 Actor linked with E39 Actor: E39 (Actor) - P11i (participated in) - E5 (Event) - P11 (had participant) - E39 (Actor) Example: [ Stefan (E21)] participated in [ Relationship from Stefan to Joachim (E5)] had participant [Joachim (E21)] The connecting event is defined by an entity of class E55 (Type): [Relationship from Stefan to Joachim (E5)] has type [Son to Father (E55)]')
    properties['OA7'].domain_code = 'E39'
    properties['OA7'].range_code = 'E39'
    properties['OA7'].label = {'en': 'has relationship to', 'de': 'hat Beziehung zu'}

    properties['OA8'] = Item('OA8', ' begins in', "OA8 is used to link the beginning of a persistent item's (E77) life span (or time of usage) with a certain place. E.g to document the birthplace of a person. E77 Persistent Item linked with a E53 Place: E77 (Persistent Item) - P92i (was brought into existence by) - E63 (Beginning of Existence) - P7 (took place at) - E53 (Place) Example: [Albert Einstein (E21)] was brought into existence by [Birth of Albert Einstein (E12)] took place at [Ulm (E53)]")
    properties['OA8'].domain_code = 'E77'
    properties['OA8'].range_code = 'E53'
    properties['OA8'].label = {'en': 'begins in', 'de': 'beginnt in'}

    properties['OA9'] = Item('OA9', ' begins in', "OA9 is used to link the end of a persistent item's (E77) life span (or time of usage) with a certain place. E.g to document a person's place of death. E77 Persistent Item linked with a E53 Place: E77 (Persistent Item) - P93i (was taken out of existence by) - E64 (End of Existence) - P7 (took place at) - E53 (Place) Example: [Albert Einstein (E21)] was taken out of by [Death of Albert Einstein (E12)] took place at [Princeton (E53)]")
    properties['OA9'].domain_code = 'E77'
    properties['OA9'].range_code = 'E53'
    properties['OA9'].label = {'en': 'ends in', 'de': 'endet in'}

    connection = connect()
    cursor = connection.cursor(cursor_factory=psycopg2.extras.NamedTupleCursor)
    cursor.execute("""
        BEGIN;

        UPDATE model.entity SET (cidoc_class_code, openatlas_class_name) = ('E41', 'appellation') WHERE cidoc_class_code = 'E82';
        UPDATE model.link SET property_code = 'P1' WHERE property_code = 'P131';
        DELETE FROM model.openatlas_class WHERE cidoc_class_code = 'E82';
        ALTER TABLE model.cidoc_class DROP COLUMN IF EXISTS created, DROP COLUMN IF EXISTS modified;
        ALTER TABLE model.cidoc_class_inheritance DROP COLUMN IF EXISTS created, DROP COLUMN IF EXISTS modified;
        ALTER TABLE model.cidoc_class_i18n DROP COLUMN IF EXISTS created, DROP COLUMN IF EXISTS modified;
        ALTER TABLE model.property DROP COLUMN IF EXISTS created, DROP COLUMN IF EXISTS modified;
        ALTER TABLE model.property_inheritance DROP COLUMN IF EXISTS created, DROP COLUMN IF EXISTS modified;
        ALTER TABLE model.property_i18n DROP COLUMN IF EXISTS created, DROP COLUMN IF EXISTS modified;
        DROP TRIGGER IF EXISTS update_modified ON model.cidoc_class;
        DROP TRIGGER IF EXISTS update_modified ON model.cidoc_class_inheritance;
        DROP TRIGGER IF EXISTS update_modified ON model.cidoc_class_i18n;
        DROP TRIGGER IF EXISTS update_modified ON model.property;
        DROP TRIGGER IF EXISTS update_modified ON model.property_inheritance;
        DROP TRIGGER IF EXISTS update_modified ON model.property_i18n;

        ALTER TABLE model.entity DROP CONSTRAINT IF EXISTS entity_class_code_fkey;
        ALTER TABLE model.entity DROP CONSTRAINT IF EXISTS entity_openatlas_class_name_fkey;
        ALTER TABLE model.link DROP CONSTRAINT IF EXISTS link_property_code_fkey;
        ALTER TABLE model.cidoc_class_inheritance DROP CONSTRAINT IF EXISTS class_inheritance_super_code_fkey;
        ALTER TABLE model.cidoc_class_inheritance DROP CONSTRAINT IF EXISTS class_inheritance_sub_code_fkey;
        ALTER TABLE model.cidoc_class_i18n DROP CONSTRAINT IF EXISTS class_i18n_class_code_fkey;
        ALTER TABLE model.property DROP CONSTRAINT IF EXISTS property_domain_class_code_fkey;
        ALTER TABLE model.property DROP CONSTRAINT IF EXISTS property_range_class_code_fkey;
        ALTER TABLE model.property_inheritance DROP CONSTRAINT IF EXISTS property_inheritance_super_code_fkey;
        ALTER TABLE model.property_inheritance DROP CONSTRAINT IF EXISTS property_inheritance_sub_code_fkey;
        ALTER TABLE model.property_i18n DROP CONSTRAINT IF EXISTS property_i18n_property_code_fkey;
        ALTER TABLE model.openatlas_class DROP CONSTRAINT IF EXISTS openatlas_class_cidoc_class_code_fkey;
        ALTER TABLE web.reference_system_openatlas_class DROP CONSTRAINT IF EXISTS reference_system_openatlas_class_openatlas_class_name_fkey;

        TRUNCATE model.cidoc_class_inheritance, model.cidoc_class_i18n, model.cidoc_class, model.property_inheritance, model.property_i18n, model.property;

        ALTER SEQUENCE model.cidoc_class_id_seq RESTART;
        ALTER SEQUENCE model.cidoc_class_inheritance_id_seq RESTART;
        ALTER SEQUENCE model.cidoc_class_i18n_id_seq RESTART;
        ALTER SEQUENCE model.property_id_seq RESTART;
        ALTER SEQUENCE model.property_inheritance_id_seq RESTART;
        ALTER SEQUENCE model.property_i18n_id_seq RESTART;""")

    # Classes
    for code, class_ in classes.items():
        sql = """
            INSERT INTO model.cidoc_class (code, name, comment)
            VALUES (%(code)s, %(name)s, %(comment)s);"""
        cursor.execute(sql, {
            'code': class_.code,
            'name': class_.name,
            'comment': class_.comment})
    for code, class_ in classes.items():
        for sub_code_of in class_.sub_class_of:
            sql = """
                INSERT INTO model.cidoc_class_inheritance (super_code, sub_code)
                VALUES (%(super_code)s, %(sub_code)s);"""
            cursor.execute(sql, {
                'super_code': sub_code_of,
                'sub_code': class_.code})
        for language, label in class_.label.items():
            sql = """
                INSERT INTO model.cidoc_class_i18n
                    (class_code, language_code, text)
                VALUES (%(class)s, %(language)s, %(text)s);"""
            cursor.execute(sql, {
                'class': class_.code,
                'language': language,
                'text': label})

    # Properties
    for code, property_ in properties.items():
        sql = """
            INSERT INTO model.property (
                code, name, name_inverse, comment, domain_class_code,
                range_class_code)
            VALUES (
                %(code)s, %(name)s, %(name_inverse)s, %(comment)s,
                %(domain_code)s, %(range_code)s);"""
        cursor.execute(sql, {
            'code': property_.code,
            'name': property_.name,
            'name_inverse': property_.name_inverse,
            'comment': property_.comment,
            'domain_code': property_.domain_code,
            'range_code': property_.range_code})
    for code, property_ in properties.items():
        for sub_property_of in property_.sub_property_of:
            sql = """
                INSERT INTO model.property_inheritance (super_code, sub_code)
                VALUES (%(super_code)s, %(sub_code)s);"""
            cursor.execute(sql, {
                'super_code': sub_property_of,
                'sub_code': property_.code})

        for language, label in property_.label.items():
            text_inverse = None
            if property_.code in properties_inverse \
                    and language in properties_inverse[property_.code].label:
                text_inverse = properties_inverse[property_.code].label[language]
            sql = """
                INSERT INTO model.property_i18n
                    (property_code, language_code, text, text_inverse)
                VALUES
                    (%(property)s, %(language)s, %(text)s, %(text_inverse)s);"""
            cursor.execute(sql, {
                'property': property_.code,
                'language': language,
                'text': label,
                'text_inverse': text_inverse})
    cursor.execute("""
        ALTER TABLE ONLY model.entity ADD CONSTRAINT entity_class_code_fkey FOREIGN KEY (cidoc_class_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.link ADD CONSTRAINT link_property_code_fkey FOREIGN KEY (property_code) REFERENCES model.property(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.cidoc_class_inheritance ADD CONSTRAINT class_inheritance_super_code_fkey FOREIGN KEY (super_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.cidoc_class_inheritance ADD CONSTRAINT class_inheritance_sub_code_fkey FOREIGN KEY (sub_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.cidoc_class_i18n ADD CONSTRAINT class_i18n_class_code_fkey FOREIGN KEY (class_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.property ADD CONSTRAINT property_domain_class_code_fkey FOREIGN KEY (domain_class_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.property ADD CONSTRAINT property_range_class_code_fkey FOREIGN KEY (range_class_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.property_inheritance ADD CONSTRAINT property_inheritance_super_code_fkey FOREIGN KEY (super_code) REFERENCES model.property(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.property_inheritance ADD CONSTRAINT property_inheritance_sub_code_fkey FOREIGN KEY (sub_code) REFERENCES model.property(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.property_i18n ADD CONSTRAINT property_i18n_property_code_fkey FOREIGN KEY (property_code) REFERENCES model.property(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.entity ADD CONSTRAINT entity_openatlas_class_name_fkey FOREIGN KEY (openatlas_class_name) REFERENCES model.openatlas_class(name) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY model.openatlas_class ADD CONSTRAINT openatlas_class_cidoc_class_code_fkey FOREIGN KEY (cidoc_class_code) REFERENCES model.cidoc_class(code) ON UPDATE CASCADE ON DELETE CASCADE;
        ALTER TABLE ONLY web.reference_system_openatlas_class ADD CONSTRAINT reference_system_openatlas_class_openatlas_class_name_fkey FOREIGN KEY (openatlas_class_name) REFERENCES model.openatlas_class(name) ON UPDATE CASCADE ON DELETE CASCADE;
        """)
    cursor.execute("COMMIT")
    print('Execution time: ' + str(int(time.time() - start)) + ' seconds')


import_cidoc()

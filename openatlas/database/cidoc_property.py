from typing import Any

from flask import g


class CidocProperty:

    @staticmethod
    def get_properties() -> list[dict[str, Any]]:
        g.cursor.execute("""
            SELECT
                p.id,
                p.code,
                p.comment,
                p.domain_class_code,
                p.range_class_code,
                p.name,
                p.name_inverse,
                COUNT(l.id) AS count
            FROM model.property p
            LEFT JOIN model.link l ON p.code = l.property_code
            GROUP BY (
                p.id,
                p.code,
                p.comment,
                p.domain_class_code,
                p.range_class_code,
                p.name,
                p.name_inverse);""")
        return [dict(row) for row in g.cursor.fetchall()]

    @staticmethod
    def get_hierarchy() -> list[dict[str, Any]]:
        g.cursor.execute(
            'SELECT super_code, sub_code FROM model.property_inheritance;')
        return [dict(row) for row in g.cursor.fetchall()]

    @staticmethod
    def get_translations(language_codes: list[str]) -> list[dict[str, Any]]:
        sql = """
            SELECT property_code, language_code, text, text_inverse
            FROM model.property_i18n
            WHERE language_code IN %(language_codes)s;"""
        g.cursor.execute(sql, {'language_codes': tuple(language_codes)})
        return [dict(row) for row in g.cursor.fetchall()]

from typing import Any

from flask import g


class Date:

    @staticmethod
    def get_invalid_dates() -> list[dict[str, Any]]:
        g.cursor.execute(
            """
            SELECT id FROM model.entity WHERE
                begin_from > begin_to OR end_from > end_to
                OR (
                    begin_from IS NOT NULL
                    AND end_from IS NOT NULL
                    AND begin_from > end_from)
                OR (
                    begin_to IS NOT NULL
                    AND end_to IS NOT NULL
                    AND begin_to > end_to);
            """)
        return [dict(row) for row in g.cursor.fetchall()]

    @staticmethod
    def get_invalid_link_dates() -> list[dict[str, Any]]:
        g.cursor.execute(
            """
            SELECT id FROM model.link WHERE
                begin_from > begin_to OR end_from > end_to
                OR (
                    begin_from IS NOT NULL
                    AND end_from IS NOT NULL
                    AND begin_from > end_from)
                OR (
                    begin_to IS NOT NULL
                    AND end_to IS NOT NULL
                    AND begin_to > end_to);
            """)
        return [dict(row) for row in g.cursor.fetchall()]

    @staticmethod
    def invalid_involvement_dates() -> list[dict[str, Any]]:
        g.cursor.execute(
            """
            SELECT involvement.id
            FROM model.entity actor
            JOIN model.link involvement ON actor.id = involvement.range_id
                AND involvement.property_code IN ('P11', 'P14', 'P22', 'P23')
            JOIN model.entity event ON involvement.domain_id = event.id
            WHERE
                (actor.begin_from IS NOT NULL
                    AND involvement.end_from IS NOT NULL
                    AND actor.end_from < involvement.end_from)
                OR (actor.begin_to IS NOT NULL
                    AND involvement.end_to IS NOT NULL
                    AND actor.begin_to > involvement.end_to)
                OR (actor.begin_from IS NOT NULL
                    AND event.end_from IS NOT NULL
                    AND actor.begin_from > event.end_from)
                OR (actor.begin_to IS NOT NULL
                    AND event.end_to IS NOT NULL
                    AND actor.begin_to > event.end_to)
                OR (involvement.begin_from IS NOT NULL
                    AND involvement.end_from IS NOT NULL
                    AND involvement.begin_from > involvement.end_from)
                OR (involvement.begin_to IS NOT NULL
                    AND involvement.end_to IS NOT NULL
                    AND involvement.begin_to > involvement.end_to)
                OR (involvement.begin_from IS NOT NULL
                    AND event.end_from IS NOT NULL
                    AND involvement.begin_from > event.end_from)
                OR (involvement.begin_to IS NOT NULL
                    AND event.end_to IS NOT NULL
                    AND involvement.begin_to > event.end_to)
                OR (involvement.end_from IS NOT NULL
                    AND event.end_to IS NOT NULL
                    AND involvement.end_from > event.end_to)
                OR (involvement.begin_from IS NOT NULL
                    AND event.begin_from IS NOT NULL
                    AND involvement.begin_from < event.begin_from);
            """)
        return [dict(row) for row in g.cursor.fetchall()]

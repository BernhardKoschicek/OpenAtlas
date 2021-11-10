class TypeTree:
    @staticmethod
    def get_test_type_tree(params):
        return {'typeTree': [{
            f'{params["abbot_id"]}': {
                'id': params["abbot_id"], 'name': 'Abbot', 'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["actor_function_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["actor_actor_relation_id"]}': {
                'id': params["actor_actor_relation_id"],
                'name': 'Actor actor relation',
                'description': 'Categories for the relationship between two actors. This may be a mutual relationship (e.g. actor A is friend of actor B and vice versa), or a directional relationship (e.g. actor A is the child of actor B, while actor B is the parent of actor A).',
                'origin_id': None, 'first': None, 'last': None, 'root': [],
                'subs': [params["economical_id"], params["kindredship_id"],
                         params["political_id"], params["social_id"]],
                'count': 0, 'count_subs': 1, 'category': 'standard'}}, {
            f'{params["actor_function_id"]}': {
                'id': params["actor_function_id"], 'name': 'Actor function',
                'description': 'Definitions of an actor\'s function within a group. An actor can for example be member of a group and this membership is defined by a certain function during a certain period of time. E.g. actor "Charlemagne" is member of the group "Frankish Reign" from 768 to 814 in the function of "King" and he is member of the group "Roman Empire" from 800 to 814 in the function "Emperor".',
                'origin_id': None, 'first': None, 'last': None, 'root': [],
                'subs': [params["abbot_id"], params["bishop_id"],
                         params["count_id"], params["emperor_id"],
                         params["king_id"], params["pope_id"]],
                'count': 0, 'count_subs': 0, 'category': 'standard'}}, {
            f'{params["ally_of_id"]}': {
                'id': params["ally_of_id"], 'name': 'Ally of',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["political_id"],
                         params["actor_actor_relation_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["article_id"]}': {
                'id': params["article_id"], 'name': 'Article',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["bibliography_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["artifact_id"]}': {
                'id': params["artifact_id"], 'name': 'Artifact',
                'description': None,
                'origin_id': None, 'first': None, 'last': None, 'root': [],
                'subs': [params["coin_id"], params["statue_id"]], 'count': 0,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["battle_id"]}': {
                'id': params["battle_id"], 'name': 'Battle',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["conflict_id"], params["event_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["bibliography_id"]}': {
                'id': params["bibliography_id"], 'name': 'Bibliography',
                'description': 'Categories for bibliographical entries as used for example in BibTeX, e.g. Book, Inbook, Article etc.',
                'origin_id': None, 'first': None,
                'last': None, 'root': [],
                'subs': [params["article_id"], params["book_id"],
                         params["inbook_id"]], 'count': 0,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["bishop_id"]}': {
                'id': params["bishop_id"], 'name': 'Bishop',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["actor_function_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["book_id"]}': {
                'id': params["book_id"], 'name': 'Book', 'description': None,
                'origin_id': None,
                'first': None, 'last': None,
                'root': [params["bibliography_id"]],
                'subs': [],
                'count': 0,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["boundary_mark_id"]}': {
                'id': params["boundary_mark_id"], 'name': 'Boundary Mark',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["place_id"]],
                'subs': [], 'count': 1, 'count_subs': 0, 'category': ''}}, {
            f'{params["burial_id"]}': {
                'id': params["burial_id"], 'name': 'Burial',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["stratigraphic_unit_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["burial_site_id"]}': {
                'id': params["burial_site_id"], 'name': 'Burial Site',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["place_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["cc_by-sa_4.0_id"]}': {
                'id': params["cc_by-sa_4.0_id"],
                'name': 'CC BY-SA 4.0', 'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["open_license_id"], params["license_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["cc_by_4.0_id"]}': {
                'id': params["cc_by_4.0_id"], 'name': 'CC BY 4.0',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["open_license_id"], params["license_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["change_of_property_id"]}': {
                'id': params["change_of_property_id"],
                'name': 'Change of Property',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["event_id"]],
                'subs': [params["donation_id"], params["exchange_id"],
                         params["sale_id"]], 'count': 0, 'count_subs': 0,
                'category': ''}}, {
            f'{params["charter_id"]}': {
                'id': params["charter_id"], 'name': 'Charter',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["source_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["charter_edition_id"]}': {
                'id': params["charter_edition_id"], 'name': 'Charter Edition',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["edition_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["chronicle_edition_id"]}': {
                'id': params["chronicle_edition_id"],
                'name': 'Chronicle Edition',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["edition_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["close_match_id"]}': {
                'id': params["close_match_id"], 'name': 'close match',
                'description': 'Concepts are sufficiently similar that they can be used interchangeably in some information retrieval applications.',
                'origin_id': None, 'first': None,
                'last': None, 'root': [params["external_reference_match_id"]],
                'subs': [], 'count': 1,
                'count_subs': 0, 'category': ''}}, {
            f'{params["coin_id"]}': {
                'id': params["coin_id"], 'name': 'Coin', 'description': None,
                'origin_id': None,
                'first': None, 'last': None, 'root': [params["artifact_id"]],
                'subs': [],
                'count': 0, 'count_subs': 0, 'category': 'standard'}}, {
            f'{params["conflict_id"]}': {
                'id': params["conflict_id"], 'name': 'Conflict',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["event_id"]],
                'subs': [params["battle_id"], params["raid_id"]], 'count': 0,
                'count_subs': 0, 'category': ''}}, {
            f'{params["contract_id"]}': {
                'id': params["contract_id"], 'name': 'Contract',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["source_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["count_id"]}': {
                'id': params["count_id"], 'name': 'Count', 'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["actor_function_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["creator_id"]}': {
                'id': params["creator_id"], 'name': 'Creator',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["involvement_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["deposit_id"]}': {
                'id': params["deposit_id"], 'name': 'Deposit',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["stratigraphic_unit_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["dimensions_id"]}': {
                'id': params["dimensions_id"], 'name': 'Dimensions',
                'description': 'Physical dimensions like weight and height.',
                'origin_id': None, 'first': None,
                'last': None, 'root': [],
                'subs': [params["height_id"], params["weight_id"]], 'count': 0,
                'count_subs': 1, 'category': 'value'}}, {
            f'{params["donation_id"]}': {
                'id': params["donation_id"], 'name': 'Donation',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["change_of_property_id"], params["event_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["economic_site_id"]}': {
                'id': params["economic_site_id"], 'name': 'Economic Site',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["place_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["economical_id"]}': {
                'id': params["economical_id"], 'name': 'Economical',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["actor_actor_relation_id"]],
                'subs': [params["provider_of_(customer_of)_id"]], 'count': 1,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["edition_id"]}': {
                'id': params["edition_id"], 'name': 'Edition',
                'description': "Categories for the classification of written sources' editions like charter editions, chronicle edition etc.",
                'origin_id': None, 'first': None,
                'last': None, 'root': [],
                'subs': [params["charter_edition_id"],
                         params["chronicle_edition_id"],
                         params["letter_edition_id"]], 'count': 0,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["emperor_id"]}': {
                'id': params["emperor_id"], 'name': 'Emperor',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["actor_function_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["enemy_of_id"]}': {
                'id': params["enemy_of_id"], 'name': 'Enemy of',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["social_id"],
                         params["actor_actor_relation_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["event_id"]}': {
                'id': params["event_id"], 'name': 'Event',
                'description': 'Categories for the type of events like Change of property, Conflict, Movement, Attendance etc.',
                'origin_id': None, 'first': None,
                'last': None, 'root': [],
                'subs': [params["change_of_property_id"],
                         params["conflict_id"]], 'count': 0,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["exact_match_id"]}': {
                'id': params["exact_match_id"], 'name': 'exact match',
                'description': 'High degree of confidence that the concepts can be used interchangeably.',
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["external_reference_match_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["exchange_id"]}': {
                'id': params["exchange_id"], 'name': 'Exchange',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["change_of_property_id"], params["event_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["external_reference_id"]}': {
                'id': params["external_reference_id"],
                'name': 'External reference',
                'description': 'Categories for the classification of external references like a link to Wikipedia',
                'origin_id': None, 'first': None, 'last': None, 'root': [],
                'subs': [params["link_id"]], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["external_reference_match_id"]}': {
                'id': params["external_reference_match_id"],
                'name': 'External reference match',
                'description': 'SKOS based definition of the confidence degree that concepts can be used interchangeable.',
                'origin_id': None, 'first': None, 'last': None, 'root': [],
                'subs': [params["close_match_id"], params["exact_match_id"]],
                'count': 0, 'count_subs': 1, 'category': 'system'}}, {
            f'{params["feature_id"]}': {
                'id': params["feature_id"], 'name': 'Feature',
                'description': 'Classification of the archaeological feature e.g. grave, pit, ...',
                'origin_id': None, 'first': None,
                'last': None, 'root': [],
                'subs': [params["grave_id"], params["pit_id"]], 'count': 0,
                'count_subs': 0, 'category': 'standard'}}, {
            f'{params["female_id"]}': {
                'id': params["female_id"], 'name': 'Female',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["sex_id"]],
                'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
            f'{params["friend_of_id"]}': {
                'id': params["friend_of_id"], 'name': 'Friend of',
                'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["social_id"],
                         params["actor_actor_relation_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["grave_id"]}': {
                'id': params["grave_id"], 'name': 'Grave', 'description': None,
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["feature_id"]],
                'subs': [], 'count': 0, 'count_subs': 0,
                'category': 'standard'}}, {
            f'{params["height_id"]}': {
                'id': params["height_id"], 'name': 'Height',
                'description': 'centimeter',
                'origin_id': None, 'first': None, 'last': None,
                'root': [params["dimensions_id"]],
                'subs': [], 'count': 1, 'count_subs': 0, 'category': 'value'}},
            {
                f'{params["human_remains_id"]}': {
                    'id': params["human_remains_id"], 'name': 'Human remains',
                    'description': 'Human remains, that for example were discovered during archaeological excavations. They are associated with a stratigraphic unit (in most cases a skeleton) that is composed of (P46) one or multiple parts (in most cases bones) that are classified as biological objects (E20). From a hierarchical point of view the human remains are one level below the stratigraphic unit respectively the entity whose sum of parts resembles the individual/skeleton. This way individual bones or body parts can be treated individually and be connected with separate classifications (e.g. Injuries of the right upper arm or caries on a certain tooth).',
                    'origin_id': None, 'first': None,
                    'last': None, 'root': [],
                    'subs': [params["lower_body_id"], params["upper_body_id"]],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["inbook_id"]}': {
                    'id': params["inbook_id"], 'name': 'Inbook',
                    'description': None,
                    'origin_id': None,
                    'first': None, 'last': None,
                    'root': [params["bibliography_id"]],
                    'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["infrastructure_id"]}': {
                    'id': params["infrastructure_id"], 'name': 'Infrastructure',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["involvement_id"]}': {
                    'id': params["involvement_id"], 'name': 'Involvement',
                    'description': 'Categories to define the involvement of an actor within an event. E.g. "Napoleon" participated in the event "Invasion of Russia" as "Commander" or "Michelangelo" performed the event "painting of the Sistine chapel" as "Artist".',
                    'origin_id': None, 'first': None,
                    'last': None, 'root': [],
                    'subs': [params["creator_id"], params["offender_id"],
                             params["sponsor_id"], params["victim_id"]],
                    'count': 0, 'count_subs': 0, 'category': 'standard'}}, {
                f'{params["kindredship_id"]}': {
                    'id': params["kindredship_id"], 'name': 'Kindredship',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["actor_actor_relation_id"]],
                    'subs': [params["parent_of_(child_of)_id"]], 'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["king_id"]}': {
                    'id': params["king_id"], 'name': 'King',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["actor_function_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["leader_of_(retinue_of)_id"]}': {
                    'id': params["leader_of_(retinue_of)_id"],
                    'name': 'Leader of (Retinue of)',
                    'description': None, 'origin_id': None, 'first': None,
                    'last': None,
                    'root': [params["political_id"],
                             params["actor_actor_relation_id"]], 'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["letter_id"]}': {
                    'id': params["letter_id"], 'name': 'Letter',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["source_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["letter_edition_id"]}': {
                    'id': params["letter_edition_id"], 'name': 'Letter Edition',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["edition_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["license_id"]}': {
                    'id': params["license_id"], 'name': 'License',
                    'description': 'Types for the licensing of a file',
                    'origin_id': None, 'first': None,
                    'last': None, 'root': [],
                    'subs': [params["open_license_id"],
                             params["proprietary_license_id"]],
                    'count': 0,
                    'count_subs': 1, 'category': 'standard'}}, {
                f'{params["link_id"]}': {
                    'id': params["link_id"], 'name': 'Link',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["external_reference_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["lower_body_id"]}': {
                    'id': params["lower_body_id"], 'name': 'Lower Body',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["human_remains_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["male_id"]}': {
                    'id': params["male_id"], 'name': 'Male',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["sex_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["mentor_of_(student_of)_id"]}': {
                    'id': params["mentor_of_(student_of)_id"],
                    'name': 'Mentor of (Student of)',
                    'description': None, 'origin_id': None, 'first': None,
                    'last': None, 'root': [params["social_id"],
                                           params["actor_actor_relation_id"]],
                    'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["military_facility_id"]}': {
                    'id': params["military_facility_id"],
                    'name': 'Military Facility',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["offender_id"]}': {
                    'id': params["offender_id"], 'name': 'Offender',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["involvement_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["open_license_id"]}': {
                    'id': params["open_license_id"], 'name': 'Open license',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["license_id"]],
                    'subs': [params["cc_by-sa_4.0_id"], params["cc_by_4.0_id"],
                             params["public_domain_id"]], 'count': 1,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["original_text_id"]}': {
                    'id': params["original_text_id"], 'name': 'Original Text',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["source_translation_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["parent_of_(child_of)_id"]}': {
                    'id': params["parent_of_(child_of)_id"],
                    'name': 'Parent of (Child of)',
                    'description': None, 'origin_id': None, 'first': None,
                    'last': None,
                    'root': [params["kindredship_id"],
                             params["actor_actor_relation_id"]],
                    'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["pit_id"]}': {
                    'id': params["pit_id"], 'name': 'Pit', 'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["feature_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["place_id"]}': {
                    'id': params["place_id"], 'name': 'Place',
                    'description': 'Types for non-moveable entities (i.e. places) with a certain extent and/or location like Settlement, Burial site, Ritual site, Fortification etc.',
                    'origin_id': None,
                    'first': None, 'last': None,
                    'root': [],
                    'subs': [params["boundary_mark_id"],
                             params["burial_site_id"],
                             params["economic_site_id"],
                             params["infrastructure_id"],
                             params["military_facility_id"],
                             params["ritual_site_id"],
                             params["settlement_id"],
                             params["topographical_entity_id"]],
                    'count': 1,
                    'count_subs': 1, 'category': 'standard'}}, {
                f'{params["political_id"]}': {
                    'id': params["political_id"], 'name': 'Political',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["actor_actor_relation_id"]],
                    'subs': [params["ally_of_id"],
                             params["leader_of_(retinue_of)_id"]], 'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["pope_id"]}': {
                    'id': params["pope_id"], 'name': 'Pope',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["actor_function_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["proprietary_license_id"]}': {
                    'id': params["proprietary_license_id"],
                    'name': 'Proprietary license',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["license_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["provider_of_(customer_of)_id"]}': {
                    'id': params["provider_of_(customer_of)_id"],
                    'name': 'Provider of (Customer of)',
                    'description': None, 'origin_id': None, 'first': None,
                    'last': None,
                    'root': [params["economical_id"],
                             params["actor_actor_relation_id"]], 'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["public_domain_id"]}': {
                    'id': params["public_domain_id"], 'name': 'Public domain',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["open_license_id"], params["license_id"]],
                    'subs': [], 'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["raid_id"]}': {
                    'id': params["raid_id"], 'name': 'Raid',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["conflict_id"], params["event_id"]],
                    'subs': [],
                    'count': 0, 'count_subs': 0, 'category': 'standard'}}, {
                f'{params["ritual_site_id"]}': {
                    'id': params["ritual_site_id"], 'name': 'Ritual Site',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["sale_id"]}': {
                    'id': params["sale_id"], 'name': 'Sale',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["change_of_property_id"],
                             params["event_id"]],
                    'subs': [],
                    'count': 0, 'count_subs': 0, 'category': 'standard'}}, {
                f'{params["settlement_id"]}': {
                    'id': params["settlement_id"], 'name': 'Settlement',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["sex_id"]}': {
                    'id': params["sex_id"], 'name': 'Sex',
                    'description': 'Categories for sex like female, male.',
                    'origin_id': None,
                    'first': None, 'last': None,
                    'root': [],
                    'subs': [params["female_id"], params["male_id"]],
                    'count': 0, 'count_subs': 0, 'category': 'custom'}}, {
                f'{params["social_id"]}': {
                    'id': params["social_id"], 'name': 'Social',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["actor_actor_relation_id"]],
                    'subs': [params["enemy_of_id"], params["friend_of_id"],
                             params["mentor_of_(student_of)_id"]], 'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["source_id"]}': {
                    'id': params["source_id"], 'name': 'Source',
                    'description': 'Types for historical sources like charter, chronicle, letter etc.',
                    'origin_id': None, 'first': None, 'last': None, 'root': [],
                    'subs': [params["charter_id"], params["contract_id"],
                             params["letter_id"], params["testament_id"]],
                    'count': 0, 'count_subs': 0, 'category': 'standard'}}, {
                f'{params["source_translation_id"]}': {
                    'id': params["source_translation_id"],
                    'name': 'Source translation',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None, 'root': [],
                    'subs': [params["original_text_id"],
                             params["translation_id"],
                             params["transliteration_id"]], 'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["sponsor_id"]}': {
                    'id': params["sponsor_id"], 'name': 'Sponsor',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["involvement_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["statue_id"]}': {
                    'id': params["statue_id"], 'name': 'Statue',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["artifact_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["stratigraphic_unit_id"]}': {
                    'id': params["stratigraphic_unit_id"],
                    'name': 'Stratigraphic unit',
                    'description': 'Classification of the archaeological SU e.g. burial, deposit, ...',
                    'origin_id': None, 'first': None, 'last': None, 'root': [],
                    'subs': [params["burial_id"], params["deposit_id"]],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["testament_id"]}': {
                    'id': params["testament_id"], 'name': 'Testament',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["source_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["topographical_entity_id"]}': {
                    'id': params["topographical_entity_id"],
                    'name': 'Topographical Entity',
                    'description': None, 'origin_id': None, 'first': None,
                    'last': None, 'root': [params["place_id"]], 'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["translation_id"]}': {
                    'id': params["translation_id"], 'name': 'Translation',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["source_translation_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["transliteration_id"]}': {
                    'id': params["transliteration_id"],
                    'name': 'Transliteration',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["source_translation_id"]], 'subs': [],
                    'count': 0,
                    'count_subs': 0, 'category': 'standard'}}, {
                f'{params["upper_body_id"]}': {
                    'id': params["upper_body_id"], 'name': 'Upper Body',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["human_remains_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["victim_id"]}': {
                    'id': params["victim_id"], 'name': 'Victim',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["involvement_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'standard'}}, {
                f'{params["weight_id"]}': {
                    'id': params["weight_id"], 'name': 'Weight',
                    'description': 'gram',
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["dimensions_id"]], 'subs': [], 'count': 0,
                    'count_subs': 0, 'category': 'value'}}, {
                f'{params["administrative_unit_id"]}': {
                    'id': params["administrative_unit_id"],
                    'name': 'Administrative unit',
                    'description': 'Hierarchy of administrative units like "Austria", "Germany", "Italy" and their respective subunits like "Lower Austria", "Styria" and their subunits etc.',
                    'origin_id': None, 'first': None, 'last': None, 'root': [],
                    'subs': [params["austria_id"], params["czech_republic_id"],
                             params["germany_id"], params["italy_id"],
                             params["slovakia_id"], params["slovenia_id"]],
                    'count': 6,
                    'count_subs': 2, 'category': 'place'}}, {
                f'{params["austria_id"]}': {
                    'id': params["austria_id"], 'name': 'Austria',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["administrative_unit_id"]],
                    'subs': [params["niederösterreich_id"], params["wien_id"]],
                    'count': 2,
                    'count_subs': 0, 'category': 'place'}}, {
                f'{params["carantania_id"]}': {
                    'id': params["carantania_id"], 'name': 'Carantania',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["historical_place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["comitatus_iauntal_id"]}': {
                    'id': params["comitatus_iauntal_id"],
                    'name': 'Comitatus Iauntal',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["historical_place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0, 'category': ''}}, {
                f'{params["czech_republic_id"]}': {
                    'id': params["czech_republic_id"], 'name': 'Czech Republic',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["germany_id"]}': {
                    'id': params["germany_id"], 'name': 'Germany',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["historical_place_id"]}': {
                    'id': params["historical_place_id"],
                    'name': 'Historical place',
                    'description': 'Hierarchy of historical places respectively historical administrative units like: Duchy of Bavaria, Lombard Kingdom etc.',
                    'origin_id': None, 'first': None, 'last': None, 'root': [],
                    'subs': [params["carantania_id"],
                             params["comitatus_iauntal_id"],
                             params["kingdom_of_serbia_id"],
                             params["marcha_orientalis_id"]],
                    'count': 4,
                    'count_subs': 0, 'category': 'place'}}, {
                f'{params["italy_id"]}': {
                    'id': params["italy_id"], 'name': 'Italy',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["kingdom_of_serbia_id"]}': {
                    'id': params["kingdom_of_serbia_id"],
                    'name': 'Kingdom of Serbia',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["historical_place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["marcha_orientalis_id"]}': {
                    'id': params["marcha_orientalis_id"],
                    'name': 'Marcha Orientalis',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["historical_place_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["niederösterreich_id"]}': {
                    'id': params["niederösterreich_id"],
                    'name': 'Niederösterreich',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["austria_id"],
                             params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["slovakia_id"]}': {
                    'id': params["slovakia_id"], 'name': 'Slovakia',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["slovenia_id"]}': {
                    'id': params["slovenia_id"], 'name': 'Slovenia',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}, {
                f'{params["wien_id"]}': {
                    'id': params["wien_id"], 'name': 'Wien',
                    'description': None,
                    'origin_id': None, 'first': None, 'last': None,
                    'root': [params["austria_id"],
                             params["administrative_unit_id"]],
                    'subs': [], 'count': 0, 'count_subs': 0,
                    'category': 'place'}}]}
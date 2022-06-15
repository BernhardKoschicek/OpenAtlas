Event
=====

.. toctree::

CIDOC documentation: :cidoc_entity:`E5 Event<e5-event>`,
:cidoc_entity:`E7 Activity<e7-activity>`,
:cidoc_entity:`E8 Acquisition<e8-acquisition>`,
:cidoc_entity:`E9 Move<e9-move>` and
:cidoc_entity:`E12 Production<e12-production>`

Available event classes based on `CIDOC CRM <http://www.cidoc-crm.org/>`_:

* **Activity** (CIDOC documentation: :cidoc_entity:`E7 Activity<e7-activity>`)
  - the most common, e.g. a battle, a meeting or a wedding
* **Acquisition** (CIDOC documentation:
  :cidoc_entity:`E8 Acquisition<e8-acquisition>`) - mapping a change of
  property
* **Event** (CIDOC documentation: :cidoc_entity:`E5 Event<e5-event>`)-
  used for events not performed by actors, e.g. a natural
  disaster
* **Move** (CIDOC documentation: :cidoc_entity:`E9 Move<e9-move>`) -
  movement of artifacts or persons
* **Production** (CIDOC documentation:
  :cidoc_entity:`E12 Production<e12-production>`) - creation of artifacts

.. include:: navigation.rst

Form fields
-----------
* :doc:`/form/name`
* :doc:`type`
* :doc:`/form/date`
* :doc:`/form/description`
* **Location** - a :doc:`place` where the event occurred
* **Sub event of** - events can be part of another event,
  e.g. a battle as a sub event of a war.
* **Preceding event** - events can follow up other events, useful for e.g.
  entering a journey
* :doc:`reference_system`

Can be linked via tabs to
-------------------------
* :doc:`source` - when it is referenced there
* :doc:`actor` - to add participants, or recipient and donor for an acquisition
* :doc:`reference`
* :doc:`file`

Move
****

* **From** - a :doc:`place` as a start point
* **To** - a :doc:`place` as a destination point
* :doc:`artifact` - to select artifacts that were moved
* :doc:`Person <actor>` - to select persons that were moved

For step by step instructions have a look at our :doc:`/examples/index`.

Acquisition
***********
* **Given Place** - to select which :doc:`places <place>` changed ownership.

To add **recipients** and **donors** go to the **Actor** tab, add actors and
select as activity:

* **acquired title through** for **recipients**
* **surrendered title through** for **donors**

Production
**********
* :doc:`artifact` - to select artifacts that were produced

The creators can be added via the **Actor** tab and selecting the **performed**
activity while linking them.

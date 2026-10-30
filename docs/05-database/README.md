# 05 — Database

> Design status: MVP — Step 5 of 9, proposed
>
> Implementation status: NOT STARTED

Step 5 turns the [business rules](../requirements/business-rules.md) and the [screens](../03-information-architecture/04-screen-inventory.md) into a database schema: a DBML file and Mermaid ER diagrams. It also fills the Database column of the [master traceability matrix](../traceability/master-traceability.md). Inputs: [Use cases and user stories](../02-usecases-userstories/README.md), [Business rules](../requirements/business-rules.md), and [UI states](../03-information-architecture/06-ui-states-and-accessibility.md). It is the input for Step 6 (OpenAPI), where every API must use an entity from this schema.

| File | Content |
|---|---|
| [00-decisions.md](00-decisions.md) | Decisions D-28..D-34; default DF-30 |
| [01-data-model.md](01-data-model.md) | Tables, labels on a ticket, derived values, transaction boundaries, concurrency, duplicate checks, privacy, seed data, and what is not modelled |
| [02-er-diagram.md](02-er-diagram.md) | Relationships by group, enums with their UI labels, detailed ER diagrams |
| [helpdesk_ai.dbml](helpdesk_ai.dbml) | Schema source of truth in DBML; paste it into dbdiagram.io to view it |

**Related:** [README](../../README.md) · [Previous: UI/UX wireframes](../04-uiux/README.md) · [Master traceability](../traceability/master-traceability.md)

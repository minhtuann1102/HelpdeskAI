# Master Traceability Matrix — Helpdesk AI MVP

> Design status: MVP — updated at every step (last update: during Step 5, D-35 reply deadlines (SLA), D-36 confidence bands, D-37 response clocks, and D-38 the dashboard by Staff member added BR-22, BR-23, G-10, and `response_clocks`; before that, Step 5 filled the Database column with the tables of the [ERD](../05-database/02-er-diagram.md); earlier, after Step 4, D-19 email notifications, D-20 Staff on leave, D-21 warm-up after joining, D-22..D-24 classification status, concurrent changes, leave history, D-25 policy knowledge base and reply suggestions, D-26 policy revisions, D-27 one story per use case; wireframes for each screen are listed in [Screen notes and states](../04-uiux/02-screen-notes.md))
>
> Implementation status: NOT STARTED

Columns marked TBD are filled in by the step that owns them: Screen (Step 3), Database (Step 5), API operationId (Step 6), C4 Component (Step 7). Step 6 uses this matrix for its cross-check: every user story must have an API, and every API must use an entity from the ERD.

## Functional traceability

| Requirement | Use Case | Acceptance Criteria | Business Rules | Screen | API operationId | Database | C4 Component |
|---|---|---|---|---|---|---|---|
| US-01 | UC-01 (role-based access: all) | AC-01.1–AC-01.8 | BR-01, BR-02, BR-05, BR-15 | SCR-01; navigation by role, SCR-90 | TBD; role check on every protected operation | `app_users` | TBD |
| US-02 | UC-02 | AC-02.1–AC-02.2 | — | Account menu → SCR-01 | TBD | — (sessions: Step 7) | TBD |
| US-03 | UC-03 | AC-03.1–AC-03.3 | BR-15 | SCR-40 | TBD | `app_users` | TBD |
| US-04 | UC-04 | AC-04.1–AC-04.3 | BR-15 | SCR-40 | TBD | `app_users` | TBD |
| US-05 | UC-05 | AC-05.1–AC-05.4 | BR-15 | SCR-02 | TBD | `app_users` | TBD |
| US-06 | UC-06 | AC-06.1–AC-06.9 | BR-03, BR-08, BR-14, BR-22 | SCR-11 | TBD | `tickets`, `ticket_attachments`, `categories`, `response_clocks` | TBD |
| US-07 | UC-07 | AC-07.1–AC-07.6 | BR-02 | SCR-10, SCR-12 | TBD | `tickets`, `ticket_messages`, `ticket_attachments` | TBD |
| US-08 | UC-08 | AC-08.1–AC-08.5 | BR-05, BR-06, BR-07, BR-22 | SCR-12 | TBD | `ticket_messages`, `tickets`, `response_clocks` | TBD |
| US-09 | UC-09 | AC-09.1–AC-09.2 | BR-06, BR-22 | SCR-12, SCR-13 | TBD | `tickets`, `response_clocks` | TBD |
| US-10 | UC-10 | AC-10.1–AC-10.12 | BR-02, BR-08, BR-22, BR-23 | SCR-20 | TBD | `tickets`, `response_clocks` | TBD |
| US-11 | UC-11 | AC-11.1–AC-11.4 | BR-02 | SCR-20 | TBD | `tickets`, `categories`, `app_users` | TBD |
| US-12 | UC-12 | AC-12.1–AC-12.6 | BR-02, BR-08, BR-09, BR-22, BR-23 | SCR-21 | TBD | `tickets`, `ticket_messages`, `ticket_attachments`, `categories`, `response_clocks` | TBD |
| US-13 | UC-13 | AC-13.1–AC-13.8 | BR-06, BR-07, BR-19, BR-22 | SCR-21 | TBD | `ticket_messages`, `tickets`, `email_notifications`, `response_clocks` | TBD |
| US-14 | UC-14 | AC-14.1–AC-14.6 | BR-06, BR-19, BR-22 | SCR-21 | TBD | `tickets`, `email_notifications`, `response_clocks` | TBD |
| US-15 | UC-15 | AC-15.1–AC-15.8 | BR-04, BR-19, BR-22 | SCR-21, SCR-23 | TBD (incl. list of active Staff) | `tickets`, `app_users` | TBD |
| US-16 | UC-16 | AC-16.1–AC-16.6 | BR-09, BR-10, BR-19, BR-22, BR-23 | SCR-21 | TBD | `tickets` | TBD |
| US-17 | UC-17 | AC-17.1–AC-17.5 | BR-11 | SCR-21 | TBD | `ticket_summaries`, `ai_requests` | TBD |
| US-18 | UC-18 | AC-18.1–AC-18.5 | BR-12 | SCR-21 | TBD | `ai_requests` | TBD |
| US-19 | UC-19 | AC-19.1–AC-19.13 | BR-10, BR-16, BR-22, BR-23 | SCR-22 | TBD | `tickets`, `response_clocks`, `ticket_messages`, `app_users` | TBD |
| US-20 | UC-20 | AC-20.1–AC-20.9 | BR-13 | SCR-30, SCR-32 | TBD | `categories` | TBD |
| US-21 | UC-21 | AC-21.1–AC-21.2 | BR-01 | SCR-31 | TBD | `app_users` | TBD |
| US-22 | UC-22 | AC-22.1–AC-22.3 | BR-01, BR-03, BR-15 | SCR-31, SCR-33 | TBD | `app_users` | TBD |
| US-23 | UC-23 | AC-23.1–AC-23.4 | BR-03, BR-05 | SCR-31, SCR-34 | TBD | `app_users`, `staff_leaves`, `tickets` | TBD |
| US-24 | UC-24 | AC-24.1–AC-24.17 | BR-08, BR-09, BR-22 | — (system) | Via submit ticket | `tickets`, `categories`, `ai_requests` | TBD |
| US-25 | UC-25 | AC-25.1–AC-25.8 | BR-03 | — (system) | Via submit ticket, lock account, set on leave, and customer reply (reopen when assignee is locked or on leave) | `tickets`, `app_users` | TBD |
| US-26 | UC-26 (via UC-13, UC-14) | AC-26.1–AC-26.6 | BR-17 | — (email, links to SCR-12) | Via reply to customer and change status | `email_notifications` | TBD |
| US-27 | UC-27 | AC-27.1–AC-27.7 | BR-03, BR-04, BR-18 | SCR-31, SCR-35 | TBD | `app_users`, `staff_leaves`, `tickets` | TBD |
| US-28 | UC-28 | AC-28.1–AC-28.11 | BR-20 | SCR-36, SCR-37 | TBD | `policy_articles`, `policy_article_revisions` | TBD |
| US-29 | UC-29 | AC-29.1–AC-29.11 | BR-20, BR-21 | SCR-21 | TBD | `reply_suggestions`, `reply_suggestion_citations`, `policy_article_revisions`, `ai_requests` | TBD |

## Goal traceability

Links the measurable goals of [Goals and success metrics](../01-research/02-goals-and-metrics.md) to the stories and criteria that deliver or measure them.

| Goal | Delivered by | Measured by |
|---|---|---|
| G-01 No request is lost | US-25 | AC-25.1, AC-25.4 |
| G-02 AI never blocks ticket creation | US-06, US-24 | AC-06.4, AC-24.11 |
| G-03 Faster first response | US-10, US-13, US-24 | AC-19.3 |
| G-04 Trustworthy AI triage | US-12, US-16, US-24 | AC-16.3, AC-19.4 (BR-10), AC-19.10 (BR-23) |
| G-05 Low fallback rate | US-24 | AC-19.2 (Unclassified group) |
| G-06 Fast catch-up and drafting | US-17, US-18, US-29 | AC-17.1, AC-18.5, AC-29.1 |
| G-07 Humans stay in control | US-13, US-18, US-29 | AC-13.5, AC-18.3, AC-29.2 |
| G-08 Management has data | US-19 | AC-19.1–AC-19.5, AC-19.8–AC-19.11 |
| G-09 Grounded reply suggestions | US-28, US-29 | AC-29.3, AC-29.6, AC-29.10 |
| G-10 Replies on time | US-10, US-13, US-14 | AC-19.8 (BR-22) |

## Problem traceability

Links the problems of [Context and problem](../01-research/01-context-and-problem.md) to the goals and MVP modules that address them.

| Problem | Goals | Modules |
|---|---|---|
| P-01 Requests are lost | G-01, G-02 | M-01, M-03, M-04 (auto-assignment), M-05 |
| P-02 Urgent cannot be told apart | G-03, G-04, G-05, G-10 | M-04, M-05, M-06 |
| P-03 Slow responses | G-03, G-06, G-09, G-10 | M-04 (reply deadlines), M-05 (summary, suggestion), M-09 |
| P-04 Inconsistent replies | G-06, G-07, G-09 | M-04, M-05 (rewrite, suggestion), M-09 |
| P-05 No management data | G-04, G-08 | M-07, M-08 |

**Related:** [Research](../01-research/README.md) · [Use cases and user stories](../02-usecases-userstories/README.md) · [Information architecture](../03-information-architecture/README.md) · [Business rules](../requirements/business-rules.md)

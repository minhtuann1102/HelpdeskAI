# Master Traceability Matrix — Helpdesk AI MVP

> Design status: MVP — updated at every step (last update: Step 4; wireframes for each screen are listed in [Screen notes and states](../04-uiux/02-screen-notes.md))
>
> Implementation status: NOT STARTED

Columns marked TBD are filled in by the step that owns them: Screen (Step 3), Database (Step 5), API operationId (Step 6), C4 Component (Step 7). Step 6 uses this matrix for its cross-check: every user story must have an API, and every API must use an entity from the ERD.

## Functional traceability

| Requirement | Use Case | Acceptance Criteria | Business Rules | Screen | API operationId | Database | C4 Component |
|---|---|---|---|---|---|---|---|
| US-01 | UC-05 | AC-01.1–AC-01.4 | BR-15 | SCR-02 | TBD | TBD | TBD |
| US-02 | UC-01 | AC-02.1–AC-02.3 | BR-05, BR-15 | SCR-01 | TBD | TBD | TBD |
| US-03 | UC-02 | AC-03.1–AC-03.2 | — | Account menu → SCR-01 | TBD | TBD | TBD |
| US-04 | All | AC-04.1–AC-04.5 | BR-01, BR-02 | Navigation by role, SCR-90 | Every protected operation | TBD | TBD |
| US-05 | UC-03 | AC-05.1–AC-05.3 | BR-15 | SCR-40 | TBD | TBD | TBD |
| US-06 | UC-04 | AC-06.1–AC-06.3 | BR-15 | SCR-40 | TBD | TBD | TBD |
| US-07 | UC-06 | AC-07.1–AC-07.5 | BR-03, BR-08 | SCR-11 | TBD | TBD | TBD |
| US-08 | UC-06 | AC-08.1–AC-08.4 | BR-14 | SCR-11 | TBD | TBD | TBD |
| US-09 | UC-07 | AC-09.1–AC-09.3 | BR-02 | SCR-10 | TBD | TBD | TBD |
| US-10 | UC-07 | AC-10.1–AC-10.3 | BR-02 | SCR-12 | TBD | TBD | TBD |
| US-11 | UC-08 | AC-11.1–AC-11.5 | BR-05, BR-06, BR-07 | SCR-12 | TBD | TBD | TBD |
| US-12 | UC-09 | AC-12.1–AC-12.2 | BR-06 | SCR-12, SCR-13 | TBD | TBD | TBD |
| US-13 | UC-25 | AC-13.1–AC-13.6 | BR-03 | — (system) | Via submit ticket, lock account, and customer reply (reopen when assignee is locked) | TBD | TBD |
| US-14 | UC-24 | AC-14.1–AC-14.5 | BR-08, BR-09 | — (system) | Via submit ticket | TBD | TBD |
| US-15 | UC-24 | AC-15.1–AC-15.3 | BR-08 | — (system) | Via submit ticket | TBD | TBD |
| US-16 | UC-24 | AC-16.1–AC-16.5 | BR-08 | — (system) | Via submit ticket | TBD | TBD |
| US-17 | UC-10 | AC-17.1–AC-17.5 | BR-02 | SCR-20 | TBD | TBD | TBD |
| US-18 | UC-11 | AC-18.1–AC-18.4 | BR-02 | SCR-20 | TBD | TBD | TBD |
| US-19 | UC-12 | AC-19.1–AC-19.3 | BR-02, BR-09 | SCR-21 | TBD | TBD | TBD |
| US-20 | UC-13 | AC-20.1–AC-20.5 | BR-06, BR-07 | SCR-21 | TBD | TBD | TBD |
| US-21 | UC-14 | AC-21.1–AC-21.3 | BR-06 | SCR-21 | TBD | TBD | TBD |
| US-22 | UC-15 | AC-22.1–AC-22.3 | BR-04 | SCR-21, SCR-23 | TBD (incl. list of active Staff) | TBD | TBD |
| US-23 | UC-15 | AC-23.1–AC-23.2 | BR-04 | SCR-21, SCR-23 | TBD | TBD | TBD |
| US-24 | UC-16 | AC-24.1–AC-24.3 | BR-09, BR-10 | SCR-21 | TBD | TBD | TBD |
| US-25 | UC-17 | AC-25.1–AC-25.5 | BR-11 | SCR-21 | TBD | TBD | TBD |
| US-26 | UC-18 | AC-26.1–AC-26.5 | BR-12 | SCR-21 | TBD | TBD | TBD |
| US-27 | UC-20 | AC-27.1–AC-27.3 | BR-13 | SCR-30, SCR-32 | TBD | TBD | TBD |
| US-28 | UC-20 | AC-28.1–AC-28.3 | BR-13 | SCR-30, SCR-32 | TBD | TBD | TBD |
| US-29 | UC-20 | AC-29.1–AC-29.3 | BR-13 | SCR-30 | TBD | TBD | TBD |
| US-30 | UC-21 | AC-30.1–AC-30.2 | BR-01 | SCR-31 | TBD | TBD | TBD |
| US-31 | UC-22 | AC-31.1–AC-31.3 | BR-01, BR-15 | SCR-31, SCR-33 | TBD | TBD | TBD |
| US-32 | UC-23 | AC-32.1–AC-32.4 | BR-05 | SCR-31, SCR-34 | TBD | TBD | TBD |
| US-33 | UC-19 | AC-33.1–AC-33.5 | BR-10, BR-16 | SCR-22 | TBD | TBD | TBD |
| US-34 | UC-19 | AC-34.1–AC-34.2 | BR-16 | SCR-22 | TBD | TBD | TBD |

## Goal traceability

Links the measurable goals of [Goals and success metrics](../01-research/02-goals-and-metrics.md) to the stories and criteria that deliver or measure them.

| Goal | Delivered by | Measured by |
|---|---|---|
| G-01 No request is lost | US-13 | AC-13.1, AC-13.4 |
| G-02 AI never blocks ticket creation | US-07, US-16 | AC-07.4, AC-16.2 |
| G-03 Faster first response | US-14, US-17, US-20 | AC-33.3 |
| G-04 Trustworthy AI triage | US-14, US-24 | AC-24.3, AC-33.4 (BR-10) |
| G-05 Low fallback rate | US-16 | AC-33.2 (Unclassified group) |
| G-06 Fast catch-up and drafting | US-25, US-26 | AC-25.1, AC-26.5 |
| G-07 Humans stay in control | US-20, US-26 | AC-20.5, AC-26.3 |
| G-08 Management has data | US-33, US-34 | AC-33.1–AC-33.5 |

## Problem traceability

Links the problems of [Context and problem](../01-research/01-context-and-problem.md) to the goals and MVP modules that address them.

| Problem | Goals | Modules |
|---|---|---|
| P-01 Requests are lost | G-01, G-02 | M-01, M-03, M-04 (auto-assignment), M-05 |
| P-02 Urgent cannot be told apart | G-03, G-04, G-05 | M-04, M-05, M-06 |
| P-03 Slow responses | G-03, G-06 | M-04, M-05 (summary) |
| P-04 Inconsistent replies | G-06, G-07 | M-04, M-05 (rewrite) |
| P-05 No management data | G-04, G-08 | M-07, M-08 |

**Related:** [Research](../01-research/README.md) · [Use cases and user stories](../02-usecases-userstories/README.md) · [Information architecture](../03-information-architecture/README.md) · [Business rules](../requirements/business-rules.md)

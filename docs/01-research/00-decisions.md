# Decisions and Open Items

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

## Decisions recorded before this step

These decisions refine the original brief. Later steps must follow them.

| ID | Decision | Effect on the brief |
|---|---|---|
| D-01 | All documentation is written in English. Technical names (entities, endpoints, fields) are also English. Exceptions: the product mind map (`docs/mindmap.png`) is drawn in Vietnamese by the user, and the UI copy in the wireframes is Vietnamese (Step 4, D-17). | Replaces "write in Vietnamese". |
| D-02 | The support employee actor is called **Staff** (role code `STAFF`). The word "agent" is not used anywhere, to avoid confusion with AI agents. | Renames the "Agent" actor. |
| D-03 | **Admin can see everything** and has every Staff permission on tickets (view, reply, change status, edit AI labels, use AI tools, reassign), plus administration (users, categories, system dashboard). | Admin ⊇ Staff. |
| D-04 | **The system auto-assigns** every new ticket to an active Staff member. Staff must handle the tickets assigned to them. Staff can transfer a ticket to another Staff member. Admin can reassign any ticket. | Replaces "Staff claims/assigns tickets". Algorithm: fewest open tickets (Step 2, D-07). |
| D-05 | Staff see a **personal dashboard** limited to tickets assigned to them. Admin sees the system-wide dashboard. | Adds a Staff view of the existing dashboard. Confirmed in Step 2 (D-08). |
| D-06 | Helpdesk AI is a **customer service** help desk: tickets come from the business's external customers. It is **not** an internal IT service desk. The product stays domain-agnostic (Admin defines the categories), but all examples, wireframes, and sample data use one **sample domain: a small online shop**. Sample categories: Orders, Shipping & Delivery, Payment & Refunds, Returns & Warranty, Account. | Clarifies the brief; no scope change. |

## Open items and their resolution

| ID | Item | Resolution (Step 2) |
|---|---|---|
| O-01 | Auto-assignment algorithm: round-robin or fewest open tickets. | D-07: fewest open tickets |
| O-02 | Confirm D-05: the personal Staff dashboard shows only tickets assigned to that Staff member. | D-08: confirmed |
| O-03 | Exact status transitions and who may trigger each one. | D-10, D-11, BR-06 |
| O-04 | When the customer chose a category and the AI call fails. | DF-07: category kept; priority and sentiment "Unclassified" (default) |
| O-05 | Exact formula of the label correction rate. | D-12, BR-10: category or priority |
| O-06 | Staff visibility: own tickets only, or all tickets? | D-09: own tickets only |
| O-07 | Is Admin ever auto-assigned? | DF-03: no (default) |

## Changes after Step 4

| ID | Decision | Effect on the brief | Source |
|---|---|---|---|
| D-19 | **Customers get an email notification** when Staff or Admin reply to their ticket or change its status (US-35, BR-17). The email only tells the customer that something changed and links to the ticket; the conversation stays on the website. | The brief's "no email integration" is read as **no email intake**: tickets and replies still come only from the web form (W-05). Outbound notification emails are added. Changes A-03 and A-04. | User, 2026-10-30 |
| D-20 | **Staff can be set "On leave" by the Administrator only.** A Staff member on leave gets no new tickets, cannot receive transfers, and their open tickets are redistributed (US-36, BR-18). Staff cannot change their own status. | Narrows R-08 (absence). No change to the brief. | User, 2026-10-30 |
| D-21 | **Warm-up whenever a Staff member joins auto-assignment.** For a short time after a Staff account is created, its leave is ended, or it is unlocked, auto-assignment counts that Staff member's load as the average of the other active Staff, so they get a fair share of new tickets instead of all of them. No case may pile new tickets onto one person (BR-03, DF-27). | Refines D-07. No change to the brief. | User, 2026-10-30 |

| ID | Open item | Status |
|---|---|---|
| O-08 | Confirm with the mentor that "no email integration" in the brief excludes only email intake, not notification emails (D-19). | Pending |

**Related:** [Step index](README.md)

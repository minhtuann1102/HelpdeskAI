# MVP Scope

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

## In scope (MVP)

| # | Module | Capabilities |
|---|---|---|
| M-01 | Authentication and authorization | Customer self-registration; login and logout; role-based access (`CUSTOMER`, `STAFF`, `ADMIN`); access denied when the role lacks permission. |
| M-02 | Personal profile | Update personal information; change password. |
| M-03 | Submit and track tickets (Customer) | Submit a ticket: title, description, attachments, optional category. List and view own tickets; add follow-up replies; close own ticket. Receive an email when Staff reply or change the status (D-19). |
| M-04 | Ticket handling (Staff, and Admin per D-03) | **Personal queue of auto-assigned tickets** (D-04), with the reply that is due soonest on top and replies that are due soon or overdue marked (D-35); transfer a ticket to another Staff member; change status; reply to the customer; search and filter; correct AI labels; AI summary; AI reply rewrite; AI reply suggestion from the shop's policies. Admin sees all tickets and can reassign any of them. |
| M-05 | AI assistance | Classification and sentiment on creation; ticket summary on demand; reply rewrite on demand; reply suggestion grounded in policy articles, with citations, on demand (D-25) (see [Why AI instead of rule-based](07-ai-vs-rule-based.md) and the brief's AI design). |
| M-06 | Category management | Admin adds, edits, and hides categories (name and description; the description is used as AI context). |
| M-07 | User management | Admin lists users, creates Staff accounts, locks and unlocks accounts, and sets Staff on leave and back (D-20). |
| M-08 | Dashboard | **Admin (system-wide):** tickets by status, category, and sentiment; response times in working hours and the share of replies on time (D-35); label correction rate, also by confidence band (D-36); a table by Staff member with open and overdue tickets, replies on time, and first response time (D-38). **Staff (personal, D-05):** the same metrics limited to tickets assigned to them. |
| M-09 | Policy knowledge base (internal) | Admin adds, edits, and hides policy articles (title, body); each article has a last-reviewed date. Articles only ground reply suggestions; customers never see them (D-25). |

**Ticket lifecycle:** `New → In Progress → Waiting for Customer → Resolved → Closed`. Allowed transitions and who may trigger them: [BR-06](../requirements/business-rules.md#br-06--ticket-status-transitions).

## Out of scope

- Real-time chat.
- Customer-facing knowledge base or help centre. The internal policy list behind reply suggestions is in scope (M-09, D-25).
- Duplicate ticket detection.
- Email and Zalo intake: tickets and replies come only from the web form. Outbound notification emails are in scope (D-19).
- SLA escalation: reassigning a ticket, or sending an email or another alert, when a reply deadline passes; deadlines for resolving tickets; deadlines shown to customers. Reply deadlines and the in-app "Sắp trễ" and "Trễ hạn" marks are in scope (D-35).
- AI sending replies automatically.
- Chatbots or autonomous AI that act on tickets.

How these could be added after the MVP, step by step: [Future work](09-future-work.md).

## Assumptions (apply unless changed)

| ID | Assumption |
|---|---|
| A-01 | Single business (single-tenant). No multi-company support. |
| A-02 | Tickets are written mainly in Vietnamese (with or without diacritics), sometimes in English. |
| A-03 | Customers get an email when Staff or Admin reply to their ticket or change its status (D-19, BR-17). There are no push or in-app notifications; Staff see new work, and replies that are due soon or overdue, in their queue (D-35). |
| A-04 | No "forgot password" by email in the MVP. The email service only sends ticket notifications (D-19). |
| A-05 | Attachments are stored and shown to Staff but **not sent to the LLM**. |
| A-06 | Web application only. No native mobile app; the layout must work on phone width. |
| A-07 | The Admin writes the shop's policies as articles (mainly Vietnamese) and keeps them reviewed. Without articles, reply suggestions are simply not offered (D-25). |

**Related:** [Step index](README.md)

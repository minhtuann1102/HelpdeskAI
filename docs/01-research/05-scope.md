# MVP Scope

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

## In scope (MVP)

| # | Module | Capabilities |
|---|---|---|
| M-01 | Authentication and authorization | Customer self-registration; login and logout; role-based access (`CUSTOMER`, `STAFF`, `ADMIN`); access denied when the role lacks permission. |
| M-02 | Personal profile | Update personal information; change password. |
| M-03 | Submit and track tickets (Customer) | Submit a ticket: title, description, attachments, optional category. List and view own tickets; add follow-up replies; close own ticket. |
| M-04 | Ticket handling (Staff, and Admin per D-03) | **Personal queue of auto-assigned tickets** (D-04); transfer a ticket to another Staff member; change status; reply to the customer; search and filter; correct AI labels; AI summary; AI reply rewrite. Admin sees all tickets and can reassign any of them. |
| M-05 | AI assistance | Classification and sentiment on creation; ticket summary on demand; reply rewrite on demand (see [Why AI instead of rule-based](07-ai-vs-rule-based.md) and the brief's AI design). |
| M-06 | Category management | Admin adds, edits, and hides categories (name and description; the description is used as AI context). |
| M-07 | User management | Admin lists users, creates Staff accounts, locks and unlocks accounts. |
| M-08 | Dashboard | **Admin (system-wide):** tickets by status, category, and sentiment; average response time; label correction rate. **Staff (personal, D-05):** the same metrics limited to tickets assigned to them. |

**Ticket lifecycle:** `New → In Progress → Waiting for Customer → Resolved → Closed`. Allowed transitions and who may trigger them: [BR-06](../requirements/business-rules.md#br-06--ticket-status-transitions).

## Out of scope

- Real-time chat.
- Knowledge base.
- AI reply suggestions using RAG.
- Duplicate ticket detection.
- Email and Zalo integration (tickets come only from the web form).
- Automatic SLA (timers, escalation, breach alerts).
- AI sending replies automatically.
- Chatbots or autonomous AI that act on tickets.

## Assumptions (apply unless changed)

| ID | Assumption |
|---|---|
| A-01 | Single business (single-tenant). No multi-company support. |
| A-02 | Tickets are written mainly in Vietnamese (with or without diacritics), sometimes in English. |
| A-03 | No email or push notifications. Customers see updates when they open their tickets. This follows from "no email integration". |
| A-04 | No "forgot password" by email in the MVP, for the same reason. |
| A-05 | Attachments are stored and shown to Staff but **not sent to the LLM**. |
| A-06 | Web application only. No native mobile app; the layout must work on phone width. |

**Related:** [Step index](README.md)

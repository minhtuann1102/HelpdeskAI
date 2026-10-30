# Routes and Page Permissions

> Design status: MVP — Step 3 of 9, approved
>
> Implementation status: NOT STARTED

## Routes

`/login` `/register` `/my-tickets` `/my-tickets/new` `/my-tickets/:id` `/queue` `/queue/:id` `/dashboard` `/admin/categories` `/admin/users` `/admin/policies` `/profile` `/403`

- Staff and Administrator share `/queue` and `/dashboard`; the server returns only the tickets and numbers the role may see (BR-02, BR-16).
- Modals have no route of their own; they open on top of their list page (DF-20).

## Page permissions

| Page | Customer | Staff | Administrator |
|---|---|---|---|
| SCR-01 Login, SCR-02 Register | Public | Public (Login only) | Public (Login only) |
| SCR-10 My Tickets, SCR-11 Submit Ticket, SCR-12 Ticket Detail | Own tickets | — | — |
| SCR-20 Ticket Queue | — | Assigned to me | All tickets |
| SCR-21 Ticket Handling | — | Assigned to me | All tickets |
| SCR-22 Dashboard | — | Personal | System-wide |
| SCR-30 Categories, SCR-31 Users, SCR-36 Policies | — | — | ✓ |
| SCR-40 Profile | ✓ | ✓ | ✓ |
| Unauthorized | `/403` | `/403` | `/403` |

Unauthorized items are **not rendered** in the navigation. Opening a URL without permission shows SCR-90 Access denied (US-02).

**Related:** [Step index](README.md)

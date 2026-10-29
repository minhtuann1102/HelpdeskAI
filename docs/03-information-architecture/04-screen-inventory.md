# Screen Inventory

> Design status: MVP — Step 3 of 9, approved
>
> Implementation status: NOT STARTED

## Screen inventory

| Screen ID | Screen | Presentation | Roles | Main content | Related stories |
|---|---|---|---|---|---|
| `SCR-01` | Login | Page | All | Email, password, link to Register, errors (wrong credentials, locked account) | US-02 |
| `SCR-02` | Register | Page | Customer (visitor) | Full name, email, optional phone, password + confirmation | US-01 |
| `SCR-10` | My Tickets | Page | Customer | Own tickets (number, title, status, category, last update), status filter, Submit a ticket, empty state | US-09 |
| `SCR-11` | Submit Ticket | Page | Customer | Title, description, optional category ("Not sure"), attachments (≤ 5 × 10 MB) | US-07, US-08 |
| `SCR-12` | Ticket Detail | Page | Customer | Status, category, description, attachments, conversation, reply box, Close ticket; no AI data | US-10, US-11, US-12 |
| `SCR-13` | Close ticket confirmation | Modal on SCR-12 | Customer | Ticket number, warning that a closed ticket cannot be reopened | US-12 |
| `SCR-20` | Ticket Queue | Page | Staff (own), Administrator (all) | Ticket table ordered by urgency, priority and sentiment chips, AI marker, Unclassified badge, search, filters (Administrator: assignee, Unassigned) | US-17, US-18 |
| `SCR-21` | Ticket Handling | Page | Staff (own), Administrator (all) | Header (customer, status control, assignee, Transfer); conversation; **AI label panel** (final vs AI label, confidence, reason, edit); **AI summary panel**; reply box with **Rewrite**, Send, Send and wait | US-19, US-20, US-21, US-24, US-25, US-26 |
| `SCR-23` | Transfer / reassign | Modal on SCR-21 | Staff (transfer own), Administrator (reassign any) | Active Staff list with open-ticket counts; Administrator can also choose self | US-22, US-23 |
| `SCR-22` | Dashboard | Page | Staff (personal), Administrator (system-wide) | Date range; tickets by status, category, sentiment; average first response time; label correction rate | US-33, US-34 |
| `SCR-30` | Categories | Page | Administrator | Category list (name, description, active/hidden), Add, Edit, Hide/Show | US-27, US-28, US-29 |
| `SCR-32` | Category form | Modal on SCR-30 | Administrator | Name, description (marked "used by AI") | US-27, US-28 |
| `SCR-31` | Users | Page | Administrator | User list (name, email, role, status, created), search, role and status filters, Create Staff, Lock/Unlock | US-30, US-32 |
| `SCR-33` | Create Staff | Modal on SCR-31 | Administrator | Full name, email, initial password; role fixed to Staff | US-31 |
| `SCR-34` | Lock / unlock confirmation | Modal on SCR-31 | Administrator | User name; for Staff, a note that open tickets will be redistributed | US-32 |
| `SCR-40` | Profile | Page with two sections | All | Account (full name, phone; email and role read-only), Change password | US-05, US-06 |
| `SCR-90` | Access denied | System page | All | Message and a link back to the role's home page | US-04 |

## Requirement-to-screen mapping

| Requirement | Primary screen / action |
|---|---|
| US-01 | `SCR-02` submit registration |
| US-02 | `SCR-01` submit login → role home page |
| US-03 | Account menu → Log out → `SCR-01` |
| US-04 | Navigation by role; `SCR-90` for denied URLs |
| US-05, US-06 | `SCR-40` save profile / change password |
| US-07, US-08 | `SCR-11` submit ticket with optional attachments |
| US-09 | `SCR-10` list and filter own tickets |
| US-10, US-11 | `SCR-12` read conversation and reply |
| US-12 | `SCR-12` Close → `SCR-13` confirm |
| US-13..US-16 | No screen (system behaviour); results visible on `SCR-20` and `SCR-21` |
| US-17, US-18 | `SCR-20` queue, search, and filters |
| US-19 | `SCR-21` ticket content and AI label panel |
| US-20 | `SCR-21` reply box → Send / Send and wait |
| US-21 | `SCR-21` status control |
| US-22, US-23 | `SCR-21` Transfer → `SCR-23` |
| US-24 | `SCR-21` AI label panel → Edit labels |
| US-25 | `SCR-21` AI summary panel → Summarize / Regenerate |
| US-26 | `SCR-21` reply box → Rewrite → compare → Use / Discard |
| US-27, US-28 | `SCR-30` Add / Edit → `SCR-32` |
| US-29 | `SCR-30` Hide / Show |
| US-30 | `SCR-31` list, search, filters |
| US-31 | `SCR-31` Create Staff → `SCR-33` |
| US-32 | `SCR-31` Lock / Unlock → `SCR-34` |
| US-33, US-34 | `SCR-22` dashboard (scope by role) |

## Screen-to-API mapping

Filled in by Step 6 (OpenAPI).

| Screen | API operations |
|---|---|
| SCR-01, SCR-02 | TBD |
| SCR-10, SCR-11, SCR-12, SCR-13 | TBD |
| SCR-20, SCR-21, SCR-23 | TBD |
| SCR-22 | TBD |
| SCR-30, SCR-32 | TBD |
| SCR-31, SCR-33, SCR-34 | TBD |
| SCR-40 | TBD |

**Related:** [Step index](README.md)

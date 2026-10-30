# Screen Inventory

> Design status: MVP — Step 3 of 9, approved
>
> Implementation status: NOT STARTED

## Screen inventory

| Screen ID | Screen | Presentation | Roles | Main content | Related stories |
|---|---|---|---|---|---|
| `SCR-01` | Login | Page | All | Email, password, link to Register, errors (wrong credentials, locked account) | US-02 |
| `SCR-02` | Register | Page | Customer (visitor) | Full name, email, optional phone, password + confirmation | US-01 |
| `SCR-10` | My Tickets | Page | Customer | Own tickets (number, title, status, category, last update), status filter, Submit a ticket, empty state | US-07 |
| `SCR-11` | Submit Ticket | Page | Customer | Title, description, optional category ("Not sure"), attachments (≤ 5 × 10 MB) | US-06 |
| `SCR-12` | Ticket Detail | Page | Customer | Status, category, description, attachments, conversation, reply box, Close ticket; no AI data | US-07, US-08, US-09 |
| `SCR-13` | Close ticket confirmation | Modal on SCR-12 | Customer | Ticket number, warning that a closed ticket cannot be reopened | US-09 |
| `SCR-20` | Ticket Queue | Page | Staff (own), Administrator (all) | Ticket table ordered by urgency, priority and sentiment chips, AI marker, Unclassified badge, search, filters (Administrator: assignee, Unassigned) | US-13, US-14 |
| `SCR-21` | Ticket Handling | Page | Staff (own), Administrator (all) | Header (customer, status control, assignee, Transfer); conversation; **AI label panel** (final vs AI label, confidence, reason, edit); **AI summary panel**; reply box with **Rewrite**, **Gợi ý trả lời** (cited suggestion), Send, Send and wait | US-15, US-16, US-17, US-19, US-20, US-21, US-22 |
| `SCR-23` | Transfer / reassign | Modal on SCR-21 | Staff (transfer own), Administrator (reassign any) | Active Staff list with open-ticket counts; Administrator can also choose self | US-18 |
| `SCR-22` | Dashboard | Page | Staff (personal), Administrator (system-wide) | Date range; tickets by status, category, sentiment; average first response time; label correction rate | US-28 |
| `SCR-30` | Categories | Page | Administrator | Category list (name, description, active/hidden), Add, Edit, Hide/Show | US-23 |
| `SCR-32` | Category form | Modal on SCR-30 | Administrator | Name, description (marked "used by AI") | US-23 |
| `SCR-36` | Policies | Page | Administrator | Policy article list (title, excerpt, last reviewed, active/hidden, "Cần xem lại" when overdue), Add, Edit, Mark reviewed, Hide/Show | US-29 |
| `SCR-37` | Policy article form | Modal on SCR-36 | Administrator | Title, body (marked "AI quotes this text"), last-reviewed date | US-29 |
| `SCR-31` | Users | Page | Administrator | User list (name, email, role, status Active / On leave / Locked, created), search, role and status filters, Create Staff, Lock/Unlock, Set on leave / End leave (Staff only) | US-24, US-26, US-27 |
| `SCR-33` | Create Staff | Modal on SCR-31 | Administrator | Full name, email, initial password; role fixed to Staff | US-25 |
| `SCR-34` | Lock / unlock confirmation | Modal on SCR-31 | Administrator | User name; for Staff, a note that open tickets will be redistributed | US-26 |
| `SCR-35` | Set on leave confirmation | Modal on SCR-31 | Administrator | Staff name; the Staff member can still log in but gets no new tickets; number of open tickets that will be redistributed and not moved back | US-27 |
| `SCR-40` | Profile | Page with two sections | All | Account (full name, phone; email and role read-only), Change password | US-04, US-05 |
| `SCR-90` | Access denied | System page | All | Message and a link back to the role's home page | US-02 |

## Requirement-to-screen mapping

| Requirement | Primary screen / action |
|---|---|
| US-01 | `SCR-02` submit registration |
| US-02 | `SCR-01` submit login → role home page; navigation by role; `SCR-90` for denied URLs |
| US-03 | Account menu → Log out → `SCR-01` |
| US-04, US-05 | `SCR-40` save profile / change password |
| US-06 | `SCR-11` submit ticket with optional attachments |
| US-07 | `SCR-10` list and filter own tickets → `SCR-12` read the conversation |
| US-08 | `SCR-12` reply box → Send |
| US-09 | `SCR-12` Close → `SCR-13` confirm |
| US-10 | No screen (email to the customer); the email link opens `SCR-12` |
| US-11, US-12 | No screen (system behaviour); results visible on `SCR-20` and `SCR-21` |
| US-13, US-14 | `SCR-20` queue, search, and filters |
| US-15 | `SCR-21` ticket content and AI label panel |
| US-16 | `SCR-21` reply box → Send / Send and wait |
| US-17 | `SCR-21` status control |
| US-18 | `SCR-21` Transfer → `SCR-23` |
| US-19 | `SCR-21` AI label panel → Edit labels |
| US-20 | `SCR-21` AI summary panel → Summarize / Regenerate |
| US-21 | `SCR-21` reply box → Rewrite → compare → Use / Discard |
| US-22 | `SCR-21` reply box → Gợi ý trả lời → suggestion with citations, or "no relevant policy" → Use / Discard |
| US-23 | `SCR-30` Add / Edit → `SCR-32`; Hide / Show on the list |
| US-24 | `SCR-31` list, search, filters |
| US-25 | `SCR-31` Create Staff → `SCR-33` |
| US-26 | `SCR-31` Lock / Unlock → `SCR-34` |
| US-27 | `SCR-31` Set on leave → `SCR-35`; End leave applies at once |
| US-28 | `SCR-22` dashboard (scope by role) |
| US-29 | `SCR-36` Add / Edit → `SCR-37`; Mark reviewed and Hide / Show on the list |

## Screen-to-API mapping

Filled in by Step 6 (OpenAPI).

| Screen | API operations |
|---|---|
| SCR-01, SCR-02 | TBD |
| SCR-10, SCR-11, SCR-12, SCR-13 | TBD |
| SCR-20, SCR-21, SCR-23 | TBD |
| SCR-22 | TBD |
| SCR-30, SCR-32 | TBD |
| SCR-36, SCR-37 | TBD |
| SCR-31, SCR-33, SCR-34, SCR-35 | TBD |
| SCR-40 | TBD |

**Related:** [Step index](README.md)

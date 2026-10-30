# Decisions and Defaults

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

## Decisions made in this step

| ID | Decision | Resolves | Source |
|---|---|---|---|
| D-07 | **Auto-assignment by load:** a new ticket goes to the active Staff member with the **fewest open tickets**. | O-01 | User (mind map) |
| D-08 | D-05 is confirmed: Staff see a personal dashboard of the tickets assigned to them; Admin sees the system-wide dashboard. | O-02 | User (mind map) |
| D-09 | **Staff see only the tickets currently assigned to them.** Search and filters work inside that set. Admin sees all tickets. | O-06 | User |
| D-10 | A ticket moves from `New` to `In Progress` **automatically on the first reply** by the assignee or Admin. | O-03 | User |
| D-11 | A customer reply on a `Resolved` ticket **reopens** it to `In Progress` (same assignee). `Closed` is final. | O-03 | User |
| D-12 | **Label correction rate:** a ticket counts as corrected when its final **category or priority** differs from the AI label (formula in BR-10). | O-05 | User |

## Defaults pending confirmation

These values make the stories testable. They apply unless the user changes them.

| ID | Default |
|---|---|
| DF-01 | "Open ticket" (for load counting) means status `New`, `In Progress`, or `Waiting for Customer`. |
| DF-02 | Tie-break for auto-assignment: the Staff member whose last assignment is the oldest (never-assigned Staff first). |
| DF-03 | Admin is never auto-assigned; Admin receives tickets only by manual reassignment (O-07). |
| DF-04 | If no active Staff exists, the ticket stays **Unassigned** and Admin assigns it manually. |
| DF-05 | **Locking a Staff account redistributes their open tickets** using the auto-assignment rule. |
| DF-06 | A reopened ticket whose assignee is locked or on leave (DF-26) is auto-assigned again. |
| DF-07 | If the customer chose a category and the AI fails or has low confidence, the category is kept; priority and sentiment become "Unclassified" (O-04). |
| DF-08 | No automatic AI retry. Unclassified tickets are triaged by a human. |
| DF-09 | AI settings: confidence threshold 0.6; timeout 10 s for classification, 20 s for summary and rewrite. Set in server configuration; **no settings screen** in the MVP. |
| DF-10 | **Attachments** only when submitting a ticket: up to 5 files, 10 MB each, types `jpg`, `jpeg`, `png`, `pdf`. |
| DF-11 | Passwords have at least 8 characters. Registration asks for full name, email, password (with confirmation), and an optional phone; the customer is logged in right after registering. |
| DF-12 | Profile: full name and phone are editable; email and role are read-only. |
| DF-13 | Admin creates **Staff** accounts only. The first Admin account is created at installation. Admin cannot lock their own account. |
| DF-14 | Customers never see priority, sentiment, confidence, AI reason, or the AI summary. |
| DF-15 | The Staff queue shows `New`, `In Progress`, and `Waiting for Customer` by default, ordered: Unclassified first, then `urgent` → `high` → `medium` → `low`, then oldest first. |
| DF-16 | Home page after login: Customer → My tickets; Staff → My queue; Admin → Dashboard. |
| DF-17 | The dashboard covers the last 30 days by ticket creation date unless the user picks another range. |
| DF-18 | Categories are never deleted in the MVP, only hidden. |
| DF-25 | **Notification email** (D-19): one email per Staff or Admin action, sent to the customer's account email from a no-reply address. It contains the ticket number, title, what changed (new reply or new status), and a link to the ticket. It does **not** contain the reply text, and it asks the customer to reply on the website. No unsubscribe option in the MVP. |
| DF-26 | **On leave** (D-20): only an `Active` Staff account can be set on leave. Setting it redistributes **all** their open tickets with the auto-assignment rule; ending leave sets the account back to `Active` and does not move tickets back. A Staff member on leave can still log in. An on-leave account can be locked; unlocking returns it to `Active`. A returning Staff member has 0 open tickets; the warm-up (D-21, DF-27) keeps them from receiving every new ticket. |
| DF-27 | **Warm-up** (D-21): starts when a Staff member joins auto-assignment (Staff account created, leave ended, or Staff account unlocked) and lasts **4 hours** (about one half-day session), set in server configuration. During it, the Staff member's load for auto-assignment is the larger of their actual open tickets and the **average actual open tickets of the other active Staff**, compared without rounding. Tie-break DF-02 is unchanged. With no other active Staff, their actual count is used. It affects auto-assignment only; manual transfer and reassignment are not limited. |

**Related:** [Step index](README.md)

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
| DF-14 | Customers never see priority, sentiment, confidence, AI reason, classification status, the AI summary, reply suggestions, or policy articles. |
| DF-15 | The Staff queue shows `New`, `In Progress`, and `Waiting for Customer` by default, ordered: Unclassified and Pending (classification not finished, DF-28) first, then `urgent` → `high` → `medium` → `low`, then oldest first. |
| DF-16 | Home page after login: Customer → My tickets; Staff → My queue; Admin → Dashboard. |
| DF-17 | The dashboard covers the last 30 days by ticket creation date unless the user picks another range. |
| DF-18 | Categories are never deleted in the MVP, only hidden. |
| DF-25 | **Notification email** (D-19): one email per Staff or Admin action, sent to the customer's account email from a no-reply address. It contains the ticket number, title, what changed (new reply or new status), and a link to the ticket. It does **not** contain the reply text, and it asks the customer to reply on the website. No unsubscribe option in the MVP. |
| DF-26 | **On leave** (D-20): only an `Active` Staff account can be set on leave. Setting it redistributes **all** their open tickets with the auto-assignment rule; ending leave sets the account back to `Active` and does not move tickets back. A Staff member on leave can still log in. An on-leave account can be locked; unlocking returns it to `Active`. A returning Staff member has 0 open tickets; the warm-up (D-21, DF-27) keeps them from receiving every new ticket. |
| DF-27 | **Warm-up** (D-21): starts when a Staff member joins auto-assignment (Staff account created, leave ended, or Staff account unlocked) and lasts **4 hours** (about one half-day session), set in server configuration. During it, the Staff member's load for auto-assignment is the larger of their actual open tickets and the **average actual open tickets of the other active Staff**, compared without rounding. Tie-break DF-02 is unchanged. With no other active Staff, their actual count is used. It affects auto-assignment only; manual transfer and reassignment are not limited. |
| DF-28 | **Classification pending** (D-22): Ticket Handling (SCR-21) re-reads the ticket every **3 s** while its classification is `Pending`, for at most **30 s**. A ticket still `Pending` 30 s after creation is treated as `Unclassified` (AI error) everywhere, and a later AI result for it is discarded. Both limits are set in server configuration and use the same 30 s value, so the page and the server agree. |
| DF-29 | **Policy articles and reply suggestions** (D-25): article title up to 150 characters, unique ignoring case; body up to 5,000 characters. An article becomes **overdue 180 days** after its last review and is not used until it is reviewed again. A suggestion uses at most the **3** most relevant active, reviewed articles. Timeout 20 s, as for summary and rewrite (DF-09); no automatic retry. |

## Story merge (D-27)

After Step 4 the backlog was merged to one story per use case ([D-27](../01-research/00-decisions.md#changes-after-step-4)): 41 stories became 29, and each story now has the number of its use case (US-01 is UC-01, like the reference backlog). All 171 acceptance criteria are kept with the same text and only renumbered. Use this map to read references to the original numbers.

| New story (= use case) | Original stories | Original → new criteria |
|---|---|---|
| US-01 | US-02, US-04 | AC-02.n → AC-01.n; AC-04.1–AC-04.5 → AC-01.4–AC-01.8 |
| US-02 | US-03 | AC-03.n → AC-02.n |
| US-03 | US-05 | AC-05.n → AC-03.n |
| US-04 | US-06 | AC-06.n → AC-04.n |
| US-05 | US-01 | AC-01.n → AC-05.n |
| US-06 | US-07, US-08 | AC-07.n → AC-06.n; AC-08.1–AC-08.4 → AC-06.6–AC-06.9 |
| US-07 | US-09, US-10 | AC-09.n → AC-07.n; AC-10.1–AC-10.3 → AC-07.4–AC-07.6 |
| US-08 | US-11 | AC-11.n → AC-08.n |
| US-09 | US-12 | AC-12.n → AC-09.n |
| US-10 | US-17 | AC-17.n → AC-10.n |
| US-11 | US-18 | AC-18.n → AC-11.n |
| US-12 | US-19 | AC-19.n → AC-12.n |
| US-13 | US-20 | AC-20.n → AC-13.n |
| US-14 | US-21 | AC-21.n → AC-14.n |
| US-15 | US-22, US-23 | AC-22.n → AC-15.n; AC-23.1–AC-23.3 → AC-15.5–AC-15.7 |
| US-16 | US-24 | AC-24.n → AC-16.n |
| US-17 | US-25 | AC-25.n → AC-17.n |
| US-18 | US-26 | AC-26.n → AC-18.n |
| US-19 | US-33, US-34 | AC-33.n → AC-19.n; AC-34.1–AC-34.2 → AC-19.6–AC-19.7 |
| US-20 | US-27, US-28, US-29 | AC-27.n → AC-20.n; AC-28.1–AC-28.3 → AC-20.4–AC-20.6; AC-29.1–AC-29.3 → AC-20.7–AC-20.9 |
| US-21 | US-30 | AC-30.n → AC-21.n |
| US-22 | US-31 | AC-31.n → AC-22.n |
| US-23 | US-32 | AC-32.n → AC-23.n |
| US-24 | US-14, US-15, US-16 | AC-14.n → AC-24.n; AC-15.1–AC-15.3 → AC-24.7–AC-24.9; AC-16.1–AC-16.7 → AC-24.10–AC-24.16 |
| US-25 | US-13 | AC-13.n → AC-25.n |
| US-26 | US-35 | AC-35.n → AC-26.n |
| US-27 | US-36 | AC-36.n → AC-27.n |
| US-28 | US-37, US-38, US-39 | AC-37.n → AC-28.n; AC-38.1–AC-38.4 → AC-28.5–AC-28.8; AC-39.1–AC-39.3 → AC-28.9–AC-28.11 |
| US-29 | US-40, US-41 | AC-40.n → AC-29.n; AC-41.1–AC-41.4 → AC-29.8–AC-29.11 |

**Related:** [Step index](README.md)

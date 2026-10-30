# User Stories (INVEST)

> Design status: MVP — Step 2 of 9, approved (after Step 4: one story per use case, with the use case's number, D-27)
>
> Implementation status: NOT STARTED

Each requirement is small enough to implement and test independently. Cross-cutting authorization, validation, and AI guardrails are acceptance constraints, not hidden features. Like the reference backlog, each story covers one use case and has its number, so US-01 is UC-01 (D-27); the old story numbers are mapped in [Decisions and defaults](00-decisions.md#story-merge-d-27).

## INVEST checklist

| Principle | Application in this backlog |
|---|---|
| Independent | Each story produces a demonstrable outcome and names only unavoidable prerequisites (login, ticket creation, categories). |
| Negotiable | Layout and implementation details may change while the stated outcome and permissions stay fixed. |
| Valuable | Every story names the user benefit. System behaviours (US-24, US-25) are written for the role that benefits from them. |
| Estimable | Inputs, limits, roles, and failure cases are explicit (DF-01..DF-18, DF-25..DF-29, DF-31..DF-34), and every story has a size. |
| Small | Each story targets one use case. Sizes: **S** = a simple screen or rule; **M** = a screen with several rules; **L** = AI integration or cross-cutting logic. |
| Testable | Every story has Given/When/Then acceptance criteria in [Acceptance criteria](04-acceptance-criteria.md); a larger story groups its criteria by part. |

## Product backlog

| ID | User story | Value | Dependencies | MoSCoW | Size |
|---|---|---|---|---|---|
| US-01 | As a registered user, I want to log in with my email and password and reach only the functions and data of my role, so that I can do my work while customer data and administration stay protected. | Protected access | US-05 | Must | M |
| US-02 | As a logged-in user, I want to log out, so that nobody else can use my session on this device. | Session safety | US-01 | Must | S |
| US-03 | As a logged-in user, I want to update my full name and phone number, so that my contact details stay correct. | Up-to-date contacts | US-01 | Should | S |
| US-04 | As a logged-in user, I want to change my password, so that I can keep my account secure. | Account security | US-01 | Should | S |
| US-05 | As a visitor, I want to register a customer account, so that I can submit and track my support requests. | Self-service access | — | Must | S |
| US-06 | As a Customer, I want to submit a ticket with a title and description, optionally choose a category, and attach screenshots or documents, so that my request is recorded, someone is responsible for it, and Staff can see the problem without asking. | No lost requests | US-01 | Must | M |
| US-07 | As a Customer, I want to see a list of my tickets and each ticket's full conversation, so that I can follow their status and know what has been answered. | Transparency | US-06 | Must | M |
| US-08 | As a Customer, I want to add follow-up replies to my ticket, so that I can answer questions or add information. | Complete information | US-07 | Must | S |
| US-09 | As a Customer, I want to close my ticket when I no longer need help, so that Staff stop working on it. | No wasted effort | US-07 | Should | S |
| US-10 | As Staff, I want to see the tickets assigned to me with the reply that is due soonest on top, and replies that are due soon or overdue marked, so that I handle the most urgent ones first and no customer waits past the deadline; as Administrator, I want the same view over all tickets. | Focus on urgent work, nobody forgotten | US-25 | Must | L |
| US-11 | As Staff, I want to search and filter tickets, so that I can find a specific ticket quickly. | Speed | US-10 | Should | M |
| US-12 | As Staff, I want to see the whole ticket with the AI labels, how sure the AI was, the reason behind them, and when my reply is due, so that I understand the case and can judge whether the AI was right. | Context, AI transparency | US-10 | Must | S |
| US-13 | As Staff, I want to reply to the customer from the ticket, so that the whole conversation stays in one place. | Single history | US-12 | Must | M |
| US-14 | As Staff, I want to change a ticket's status, so that the customer and I both know where it stands. | Shared status | US-12 | Must | M |
| US-15 | As Staff, I want to transfer a ticket to a colleague, and as Administrator, I want to assign or reassign any ticket, including Unassigned ones, so that every ticket is handled by the right, available person. | Flexible workload | US-12 | Should | M |
| US-16 | As Staff, I want to correct the category, priority, or sentiment, or confirm them when they are right, so that wrong AI labels do not mislead the queue, the reply deadlines, or the reports. | Accurate data | US-12, US-24 | Must | S |
| US-17 | As Staff, I want a short AI summary of a long ticket, so that I can catch up in seconds, especially after a transfer. | Faster catch-up | US-12 | Must | M |
| US-18 | As Staff, I want AI to polish my draft reply, so that customers get polite and clear answers without me spending time on wording. | Consistent reply quality | US-13 | Must | M |
| US-19 | As Administrator, I want a dashboard of ticket volume, response time, replies on time, and AI quality, and as Staff, I want the same metrics for my own tickets, so that support is managed with data and I can track my own workload. | Data-driven management | US-13, US-16, US-24 | Should | L |
| US-20 | As Administrator, I want to add, edit, and hide categories with a description, so that customers can choose them and AI classifies tickets into the categories in use, without losing old tickets. | Configurable triage | US-01 | Must | M |
| US-21 | As Administrator, I want to see all user accounts, so that I can manage access. | Access overview | US-01 | Should | S |
| US-22 | As Administrator, I want to create Staff accounts, so that new support employees can start handling tickets. | Onboarding | US-01 | Must | S |
| US-23 | As Administrator, I want to lock and unlock accounts, so that I can stop access for people who should no longer use the system. | Access control | US-21, US-25 | Should | M |
| US-24 | As Staff, I want each new ticket labelled by AI with a category, priority, and sentiment, with angry customers moved up and uncertain tickets marked "Unclassified", so that I see what a ticket is about and how urgent it is before reading it, and never trust a wrong guess. *(System behaviour)* | Faster, safe triage | US-06, US-20 | Must | L |
| US-25 | As the business owner, I want every new ticket assigned automatically to the Staff member with the fewest open tickets, so that no request is left without an owner and work is shared fairly. *(System behaviour)* | Clear ownership | US-06, US-22 | Must | M |
| US-26 | As a Customer, I want an email when Staff reply to my ticket or change its status, so that I know there is an update without checking the website. | Timely updates | US-13, US-14 | Should | S |
| US-27 | As Administrator, I want to set a Staff member on leave and back, so that no new tickets go to someone who is away and their open tickets are handled by others. | Coverage during absence | US-21, US-25 | Should | M |
| US-28 | As Administrator, I want to add, edit, review, and hide policy articles, so that AI grounds reply suggestions only in the shop's current policies. | Grounded, up-to-date answers | US-01 | Should | M |
| US-29 | As Staff, I want AI to suggest a reply from the shop's policies with its sources shown, and no suggestion when no policy fits, so that I answer policy questions quickly and never send an answer the policies do not support. | Faster, grounded answers | US-12, US-28 | Should | L |

## Per-story INVEST review

`PASS` means the design gives enough information for planning and acceptance. It does not claim that implementation or tests exist.

| Story | I | N | V | E | S | T | Notes |
|---|---|---|---|---|---|---|---|
| US-01 | PASS | PASS | PASS | PASS | PASS | PASS | Foundation story. Role-based access is part of login (AC-01.4–AC-01.8) and is tested against every role. |
| US-02 | PASS | PASS | PASS | PASS | PASS | PASS | Foundation story. |
| US-03, US-04 | PASS | PASS | PASS | PASS | PASS | PASS | Editable fields and password policy are explicit. |
| US-05 | PASS | PASS | PASS | PASS | PASS | PASS | Foundation story. |
| US-06 | PASS | PASS | PASS | PASS | PASS | PASS | Works even when AI is down (AC-06.4). Attachments are a *Should* part with explicit limits (DF-10). |
| US-07..US-09 | PASS | PASS | PASS | PASS | PASS | PASS | Status rules come from BR-06. |
| US-10..US-14 | PASS | PASS | PASS | PASS | PASS | PASS | Visibility follows D-09. The reply deadline parts (D-35, BR-22) and the confidence band parts (D-36, BR-23) are *Should* parts with their own criteria; without them the queue keeps the priority order of AC-10.2. US-10 is L because the response clock is cross-cutting logic. |
| US-15 | PASS | PASS | PASS | PASS | PASS | PASS | Staff transfer and Administrator reassignment have separate criteria because permissions differ. |
| US-16 | PASS | PASS | PASS | PASS | PASS | PASS | Correction counting is defined by BR-10; a confirmation is not a correction (BR-23). |
| US-17, US-18 | PASS | PASS | PASS | PASS | PASS | PASS | Rewrite quality is checked with a fixed test set (AC-18.2). |
| US-19 | PASS | PASS | PASS | PASS | PASS | PASS | Metric definitions in BR-10, BR-16, BR-22, and BR-23. The personal view reuses the same metrics with a filter. |
| US-20 | PASS | PASS | PASS | PASS | PASS | PASS | Administration only. Hide or show is a *Should* part (AC-20.7–AC-20.9). |
| US-21..US-23 | PASS | PASS | PASS | PASS | PASS | PASS | Administration only. |
| US-24 | PASS | PASS | PASS | PASS | PASS | PASS | Largest story (L); testable with a mocked LLM. The angry rule and the fallback keep their own criteria (AC-24.7–AC-24.16), so each is still tested on its own. |
| US-25 | PASS | PASS | PASS | PASS | PASS | PASS | System behaviour; tested through ticket creation. |
| US-26 | PASS | PASS | PASS | PASS | PASS | PASS | Added after Step 4 (D-19). Testable with a mocked Email Service; the email content is fixed by DF-25. |
| US-27 | PASS | PASS | PASS | PASS | PASS | PASS | Added after Step 4 (D-20). Reuses the redistribution of US-23; only the Administrator can set it. |
| US-28 | PASS | PASS | PASS | PASS | PASS | PASS | Added after Step 4 (D-25, D-26). Same shape as categories (US-20). |
| US-29 | PASS | PASS | PASS | PASS | PASS | PASS | Added after Step 4 (D-25). Testable with a mocked LLM and a fixed test set (AC-29.3, AC-29.10); the no-match behaviour has its own criteria. |

## Cross-cutting acceptance constraints

- Only `CUSTOMER`, `STAFF`, and `ADMIN` exist.
- The server, not the browser, enforces visibility (BR-02) and status transitions (BR-06).
- AI never blocks ticket creation and never sends a reply (BR-08, BR-12, BR-21).
- A reply suggestion states facts only from the policy articles it cites (BR-21).
- AI output is validated before it is used (BR-08).
- Customers never see internal AI data, confidence bands, or reply deadlines (DF-14).
- Reply deadlines count working hours only and never restart because of a status change, a transfer, or a new priority (BR-22).
- Attachments are validated on the server and never sent to the LLM (BR-14).
- A notification email never blocks or undoes the action that triggered it (BR-17).
- Ticket changes made from an outdated view are rejected, never silently overwritten (BR-19).

**Related:** [Step index](README.md)

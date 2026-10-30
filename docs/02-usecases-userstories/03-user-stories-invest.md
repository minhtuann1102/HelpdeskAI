# User Stories (INVEST)

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

Each requirement is small enough to implement and test independently. Cross-cutting authorization, validation, and AI guardrails are acceptance constraints, not hidden features.

## INVEST checklist

| Principle | Application in this backlog |
|---|---|
| Independent | Each story produces a demonstrable outcome and names only unavoidable prerequisites (login, ticket creation, categories). |
| Negotiable | Layout and implementation details may change while the stated outcome and permissions stay fixed. |
| Valuable | Every story names the user benefit. System behaviours (US-13..US-16) are written for the role that benefits from them. |
| Estimable | Inputs, limits, roles, and failure cases are explicit (DF-01..DF-18, DF-25, DF-26), and every story has a size. |
| Small | Each story targets one capability. Sizes: **S** = a simple screen or rule; **M** = a screen with several rules; **L** = AI integration or cross-cutting logic. |
| Testable | Every story has Given/When/Then acceptance criteria in [Acceptance criteria](04-acceptance-criteria.md). |

## Product backlog

| ID | User story | Value | Dependencies | MoSCoW | Size |
|---|---|---|---|---|---|
| US-01 | As a visitor, I want to register a customer account, so that I can submit and track my support requests. | Self-service access | — | Must | S |
| US-02 | As a registered user, I want to log in with my email and password, so that I can use the functions of my role. | Protected access | US-01 | Must | S |
| US-03 | As a logged-in user, I want to log out, so that nobody else can use my session on this device. | Session safety | US-02 | Must | S |
| US-04 | As the business owner, I want each role to reach only its own functions and data, so that customer data and administration stay protected. | Data protection | US-02 | Must | M |
| US-05 | As a logged-in user, I want to update my full name and phone number, so that my contact details stay correct. | Up-to-date contacts | US-02 | Should | S |
| US-06 | As a logged-in user, I want to change my password, so that I can keep my account secure. | Account security | US-02 | Should | S |
| US-07 | As a Customer, I want to submit a ticket with a title and description and optionally choose a category, so that my request is recorded and someone is responsible for it. | No lost requests | US-02 | Must | M |
| US-08 | As a Customer, I want to attach screenshots or documents when I submit a ticket, so that Staff can see the problem without asking. | Fewer follow-up questions | US-07 | Should | M |
| US-09 | As a Customer, I want to see a list of my tickets, so that I can follow their status. | Transparency | US-07 | Must | S |
| US-10 | As a Customer, I want to see a ticket's full conversation, so that I know what has been answered and what is still open. | Transparency | US-09 | Must | S |
| US-11 | As a Customer, I want to add follow-up replies to my ticket, so that I can answer questions or add information. | Complete information | US-10 | Must | S |
| US-12 | As a Customer, I want to close my ticket when I no longer need help, so that Staff stop working on it. | No wasted effort | US-10 | Should | S |
| US-13 | As the business owner, I want every new ticket assigned automatically to the Staff member with the fewest open tickets, so that no request is left without an owner and work is shared fairly. *(System behaviour)* | Clear ownership | US-07, US-31 | Must | M |
| US-14 | As Staff, I want each new ticket labelled by AI with a category, priority, and sentiment, so that I can see what it is about and how urgent it is before reading it in full. *(System behaviour)* | Faster triage | US-07, US-27 | Must | L |
| US-15 | As Staff, I want tickets from angry customers moved up in priority, so that upset customers are answered first. *(System behaviour)* | Protects at-risk customers | US-14 | Must | S |
| US-16 | As Staff, I want tickets the AI is unsure about marked "Unclassified", so that I triage them myself instead of trusting a wrong guess. *(System behaviour)* | Safe AI | US-14 | Must | M |
| US-17 | As Staff, I want to see the tickets assigned to me ordered by urgency, so that I handle the most important ones first; as Administrator, I want the same view over all tickets. | Focus on urgent work | US-13 | Must | M |
| US-18 | As Staff, I want to search and filter tickets, so that I can find a specific ticket quickly. | Speed | US-17 | Should | M |
| US-19 | As Staff, I want to see the whole ticket with the AI labels and the reason behind them, so that I understand the case and can judge whether the AI was right. | Context, AI transparency | US-17 | Must | S |
| US-20 | As Staff, I want to reply to the customer from the ticket, so that the whole conversation stays in one place. | Single history | US-19 | Must | M |
| US-21 | As Staff, I want to change a ticket's status, so that the customer and I both know where it stands. | Shared status | US-19 | Must | M |
| US-22 | As Staff, I want to transfer a ticket to a colleague, so that it is handled by someone available or more suitable. | Flexible workload | US-19 | Should | S |
| US-23 | As Administrator, I want to assign or reassign any ticket, including Unassigned ones, so that every ticket has the right owner. | Control | US-17 | Should | S |
| US-24 | As Staff, I want to correct the category, priority, or sentiment, so that wrong AI labels do not mislead the queue or the reports. | Accurate data | US-14, US-19 | Must | S |
| US-25 | As Staff, I want a short AI summary of a long ticket, so that I can catch up in seconds, especially after a transfer. | Faster catch-up | US-19 | Must | M |
| US-26 | As Staff, I want AI to polish my draft reply, so that customers get polite and clear answers without me spending time on wording. | Consistent reply quality | US-20 | Must | M |
| US-27 | As Administrator, I want to add a category with a description, so that customers can choose it and AI can classify tickets into it. | Configurable triage | US-02 | Must | S |
| US-28 | As Administrator, I want to edit a category's name and description, so that AI classification improves as I refine them. | Better AI accuracy | US-27 | Must | S |
| US-29 | As Administrator, I want to hide a category that is no longer used, so that customers and AI stop choosing it without losing old tickets. | Clean category list | US-27 | Should | S |
| US-30 | As Administrator, I want to see all user accounts, so that I can manage access. | Access overview | US-02 | Should | S |
| US-31 | As Administrator, I want to create Staff accounts, so that new support employees can start handling tickets. | Onboarding | US-02 | Must | S |
| US-32 | As Administrator, I want to lock and unlock accounts, so that I can stop access for people who should no longer use the system. | Access control | US-30, US-13 | Should | M |
| US-33 | As Administrator, I want a dashboard of ticket volume, response time, and AI quality, so that I can manage support with data. | Data-driven management | US-14, US-20, US-24 | Should | L |
| US-34 | As Staff, I want to see the same metrics for my own tickets, so that I can track my workload and response time. | Self-management | US-33 | Should | S |
| US-35 | As a Customer, I want an email when Staff reply to my ticket or change its status, so that I know there is an update without checking the website. | Timely updates | US-20, US-21 | Should | S |
| US-36 | As Administrator, I want to set a Staff member on leave and back, so that no new tickets go to someone who is away and their open tickets are handled by others. | Coverage during absence | US-13, US-30 | Should | M |

## Per-story INVEST review

`PASS` means the design gives enough information for planning and acceptance. It does not claim that implementation or tests exist.

| Story | I | N | V | E | S | T | Notes |
|---|---|---|---|---|---|---|---|
| US-01..US-03 | PASS | PASS | PASS | PASS | PASS | PASS | Foundation stories. |
| US-04 | PASS | PASS | PASS | PASS | PASS | PASS | Cross-cutting; tested against every role. |
| US-05, US-06 | PASS | PASS | PASS | PASS | PASS | PASS | Editable fields and password policy are explicit. |
| US-07 | PASS | PASS | PASS | PASS | PASS | PASS | Works even when AI is down (AC-07.4). |
| US-08 | PASS | PASS | PASS | PASS | PASS | PASS | Split from US-07; limits are explicit (DF-10). |
| US-09..US-12 | PASS | PASS | PASS | PASS | PASS | PASS | Status rules come from BR-06. |
| US-13 | PASS | PASS | PASS | PASS | PASS | PASS | System behaviour; tested through ticket creation. |
| US-14 | PASS | PASS | PASS | PASS | PASS | PASS | Largest story (L); testable with a mocked LLM. |
| US-15, US-16 | PASS | PASS | PASS | PASS | PASS | PASS | Deterministic rules split from US-14 so each is tested on its own. |
| US-17..US-21 | PASS | PASS | PASS | PASS | PASS | PASS | Visibility follows D-09. |
| US-22, US-23 | PASS | PASS | PASS | PASS | PASS | PASS | Split by role because permissions differ. |
| US-24 | PASS | PASS | PASS | PASS | PASS | PASS | Correction counting is defined by BR-10. |
| US-25, US-26 | PASS | PASS | PASS | PASS | PASS | PASS | Rewrite quality is checked with a fixed test set (AC-26.2). |
| US-27..US-32 | PASS | PASS | PASS | PASS | PASS | PASS | Administration only. |
| US-33 | PASS | PASS | PASS | PASS | PASS | PASS | Metric definitions in BR-10 and BR-16. |
| US-34 | PASS | PASS | PASS | PASS | PASS | PASS | Small because it reuses US-33 with a filter. |
| US-35 | PASS | PASS | PASS | PASS | PASS | PASS | Added after Step 4 (D-19). Testable with a mocked Email Service; the email content is fixed by DF-25. |
| US-36 | PASS | PASS | PASS | PASS | PASS | PASS | Added after Step 4 (D-20). Reuses the redistribution of US-32; only the Administrator can set it. |

## Cross-cutting acceptance constraints

- Only `CUSTOMER`, `STAFF`, and `ADMIN` exist.
- The server, not the browser, enforces visibility (BR-02) and status transitions (BR-06).
- AI never blocks ticket creation and never sends a reply (BR-08, BR-12).
- AI output is validated before it is used (BR-08).
- Customers never see internal AI data (DF-14).
- Attachments are validated on the server and never sent to the LLM (BR-14).
- A notification email never blocks or undoes the action that triggered it (BR-17).

**Related:** [Step index](README.md)

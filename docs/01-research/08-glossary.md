# Glossary

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

| Term | Meaning |
|---|---|
| Ticket | One customer request, with title, description, attachments, labels, status, assignee, and message history. |
| Customer | A registered end user who submits and follows their own tickets. |
| Staff | A support employee who handles the tickets assigned to them (role `STAFF`). |
| Admin | An administrator with every Staff permission plus user, category, and system-dashboard management (role `ADMIN`). |
| Assignee | The Staff (or Admin) member currently responsible for a ticket. |
| Auto-assignment | The system picks an assignee when a ticket is created (D-04). |
| Account status | `Active`, `On leave` (Staff only, set by Admin: D-20), or `Locked`. "Active Staff" means Staff whose status is `Active`; only they receive new tickets and transfers. |
| Warm-up | The first 4 hours after a Staff member joins auto-assignment: account created, leave ended, or account unlocked. Auto-assignment counts their load as the other active Staff's average, so they receive a fair share of new tickets, not all of them (D-21, DF-27). |
| Transfer / reassign | Changing the assignee: Staff transfer their own ticket; Admin reassigns any ticket. |
| AI label | The original category, priority, and sentiment proposed by AI. It is stored and never overwritten. |
| Final label | The label in effect after any correction by Staff or Admin. |
| Unclassified | The fallback state when AI confidence is below the threshold or the AI call failed; a human must triage. |
| Classification status | The state of the AI run on a ticket: `Pending`, `Classified`, or `Unclassified` (low confidence or AI error). People never change it; manual triage changes only the final labels (D-22, BR-08). |
| Ticket version | A counter that changes whenever a ticket changes. Staff actions made from an outdated view are rejected instead of overwriting someone else's change (D-23, BR-19). |
| Confidence | AI self-reported certainty, from 0 to 1. |
| Label correction rate | Share of AI-labelled tickets whose final label differs from the AI label. |
| Policy article | An internal text the Admin writes about one shop policy (returns, shipping, payment…), with a last-reviewed date. Customers never see it (D-25, BR-20). |
| Reply suggestion | A draft reply that AI writes on request from the most relevant policy articles, citing them. Staff review it and send it themselves (BR-21). |
| Citation | A reference from a reply suggestion to the policy article and passage it relies on, shown to Staff next to the suggestion. |
| First response time | Time from ticket creation to the first reply by Staff or Admin. |
| Stale summary | An AI summary created before the latest message on the ticket. |
| Email notification | An email sent to the Customer when Staff or Admin reply to their ticket or change its status. It links to the ticket; the conversation stays on the website (D-19, BR-17). |

**Related:** [Step index](README.md)

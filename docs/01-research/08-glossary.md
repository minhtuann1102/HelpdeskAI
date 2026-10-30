# Glossary

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

| Term | Meaning |
|---|---|
| Ticket | One customer request, with title, description, attachments, labels, status, assignee, and message history. |
| User | Abstract actor on the use case diagrams: anyone with an account. Customer and Staff inherit its use cases, and Administrator inherits those of Staff (D-39). |
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
| Confidence | AI self-reported certainty, from 0 to 1, shown with its band (BR-23). |
| Confidence band | "Cao" or "Vừa": the range that a classified ticket's confidence falls in (DF-34, BR-23). Below the threshold, the ticket is Unclassified instead. |
| AI chưa chắc | Queue marker on AI labels in band "Vừa" that no person has checked yet. Correcting or confirming the labels clears it (BR-23). |
| Label correction rate | Share of AI-labelled tickets whose final label differs from the AI label. |
| Policy article | An internal text the Admin writes about one shop policy (returns, shipping, payment…), with a last-reviewed date. Customers never see it (D-25, BR-20). |
| Reply suggestion | A draft reply that AI writes on request from the most relevant policy articles, citing them. Staff review it and send it themselves (BR-21). |
| Citation | A reference from a reply suggestion to the policy article and passage it relies on, shown to Staff next to the suggestion. |
| First response time | Working time from ticket creation to the first reply by Staff or Admin (BR-16). |
| Working hours | The support hours that every deadline and response time counts: by default Monday to Saturday, 08:00–18:00 Vietnam time, without public holidays (DF-32). |
| Reply deadline (SLA) | The time by which Staff or Admin must answer a waiting customer, set by the ticket's priority and counted in working hours (D-35, BR-22). Internal only; customers never see it. |
| Response clock | Counts working time while a customer waits for a reply. It starts when the ticket is created or when the customer writes after the last Staff reply; it pauses while the ticket is `Waiting for Customer` or `Resolved`; it ends with the reply, or when the ticket is closed (BR-22). |
| Sắp trễ / Trễ hạn | Marks on a reply that has at most a quarter of its time left, or is past its deadline (DF-33). |
| Stale summary | An AI summary created before the latest message on the ticket. |
| Email notification | An email sent to the Customer when Staff or Admin reply to their ticket or change its status. It links to the ticket; the conversation stays on the website (D-19, BR-17). |

**Related:** [Step index](README.md)

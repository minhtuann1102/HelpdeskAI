# Future Work (after the MVP)

> Design status: MVP — Step 1 of 9, added after Step 4; nothing here is in the MVP scope except Level 1 (D-25)
>
> Implementation status: NOT PLANNED for the MVP

Everything on this page is **outside the MVP**, except Level 1 of the roadmap, which D-25 moved into it. Most of it is listed by the brief as out of scope ([Won't](../02-usecases-userstories/05-moscow-prioritization.md) W-01..W-08). It is recorded so that a later release starts from this analysis, and so the reasons for leaving it out are visible. No user story, use case, or business rule numbers are reserved for these items.

## Automation roadmap

AI takes over more of the work one level at a time. Each level keeps the guardrails of the level before it, and moves on only when the measurements from that level show the AI can be trusted.

| Level | What AI does | Who sends the reply | Measured before moving on |
|---|---|---|---|
| **MVP** (current, including Level 1) | Classifies new tickets, summarizes, rewrites a Staff draft, and suggests replies from the shop's policies with citations | Staff, always (G-07) | Label correction rate (G-04), fallback rate (G-05), and suggestion use rate and citation accuracy (G-09) during the pilot |
| **Level 1** (in the MVP since D-25) | Suggests a reply grounded in the shop's written policies, with citations | Staff, after review | Suggestion use rate and citation accuracy (G-09) |
| **Level 2** | Answers a fixed list of simple, low-risk questions on its own | AI for those topics; Staff for everything else | Error rate of automatic answers on a sampled review |
| **Level 3** | Chatbot on the website that answers first and hands over to Staff | AI first, then Staff | Hand-over rate and customer satisfaction |

## Level 1 — moved into the MVP

Since D-25, Level 1 is part of the MVP: an internal policy knowledge base (M-09) and cited reply suggestions on Ticket Handling. Its rules are in [BR-20](../requirements/business-rules.md#br-20--policy-articles) and [BR-21](../requirements/business-rules.md#br-21--ai-reply-suggestion), its goal is G-09, and its risks are R-14 and R-15. The mentor still has to confirm it (O-09), because the brief lists it as out of scope.

How articles are found for a ticket is a Step 7 decision. A small shop with tens of articles may send all active, reviewed articles in one size-capped call; a larger set needs search, for example `pgvector` if Step 7 chooses PostgreSQL.

## Level 2 and Level 3

- **Level 2 — automatic answers for simple questions.** A fixed list of low-risk topics (for example order status or delivery time) is answered automatically when retrieval is confident. Every other ticket, and any `angry` or `urgent` ticket, goes to Staff as today. It changes G-07 and W-07, so it needs the Level 1 measurements first.
- **Level 3 — chatbot.** A chat window on the website answers first and hands the conversation to Staff as a ticket when it cannot help. It needs real-time chat (W-01) and changes W-08.

## Scheduled leave (Admin only)

In the MVP, Admin sets and ends leave by hand at the moment it happens (D-20). If Admin forgets to end it, a returning Staff member gets no tickets. Scheduled leave lets Admin plan it ahead. Only Admin can use it, as today, and logging in still never ends leave.

- **One form, by half-day session.** "From" and "To", each a date plus *sáng* (from 0:00) or *chiều* (from 12:00). "From" defaults to now. An empty "To" means the leave lasts until Admin ends it. This covers both "set the return date only" and "plan the whole leave ahead".
- **Starts and ends by itself.** A background job checks every few minutes. At "From" it sets the Staff member On leave and redistributes their tickets. At "To" it sets them back to Active, which starts the warm-up (D-21).
- **Redistribution is a choice.** A "redistribute open tickets" checkbox is on by default for leave of one day or more, and off for a single session. For a half-day absence, the Staff member only stops getting new tickets and keeps the ones they are working on.
- **Admin can still override.** End leave early, or extend it by editing "To". Lock wins over leave: leave that ends while the account is locked keeps it locked.
- **History.** Who set each leave, when, and its From and To, for later review.
- **Data model.** Decided in D-24: the MVP already keeps each leave in a `staff_leave` table (Staff, from, to, set by, ended by) next to the account status. Scheduled leave only needs to start using future "From" values and a filled "To".

## Other candidates

| Item | Idea | Why it waits | Related |
|---|---|---|---|
| Channel intake | Messages to the shop's Facebook Page (Messenger Platform) and Zalo Official Account become tickets; Staff replies go back to that channel | The brief excludes it (W-05); each platform needs app approval; customers from a channel have no account; rules for when a message starts a new ticket | W-05, A-03 |
| Skill-based routing | Admin links Staff to the categories they handle; auto-assignment prefers them | The category comes from AI, and assignment must never depend on AI (BR-03) | D-07, BR-03 |
| SLA escalation | Time limits per priority; reassign or alert when a ticket waits too long | The brief excludes automatic SLA (W-06) | W-06, G-03 |
| AI category hint | When the customer chose a category, AI still proposes one in the same call and shows it to Staff if it differs | Changes BR-08 rule 4, AC-24.3, AC-12.2, and SCR-21 | BR-08 |
| Transfer note | An optional "why" note when transferring a ticket | Not requested yet; adds one field | BR-04 |
| Near-duplicate policy warning | When an article is saved, compare it by meaning with the other articles and warn, with a link, when one says nearly the same thing; later, also flag articles that contradict each other | Needs a similarity search, which depends on the Step 7 retrieval choice, and a new warning state on SCR-37. The MVP rejects only a body that repeats another article's body (D-26) | BR-20, R-14 |

**Related:** [Step index](README.md) · [MVP scope](05-scope.md)

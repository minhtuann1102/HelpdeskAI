# Future Work (after the MVP)

> Design status: MVP — Step 1 of 9, added after Step 4; nothing here is in the MVP scope
>
> Implementation status: NOT PLANNED for the MVP

Everything on this page is **outside the MVP**. Most of it is listed by the brief as out of scope ([Won't](../02-usecases-userstories/05-moscow-prioritization.md) W-01..W-08). It is recorded so that a later release starts from this analysis, and so the reasons for leaving it out are visible. No user story, use case, or business rule numbers are reserved for these items.

## Automation roadmap

AI takes over more of the work one level at a time. Each level keeps the guardrails of the level before it, and moves on only when the measurements from that level show the AI can be trusted.

| Level | What AI does | Who sends the reply | Measured before moving on |
|---|---|---|---|
| **MVP** (current) | Classifies new tickets, summarizes, rewrites a Staff draft | Staff, always (G-07) | Label correction rate (G-04) and fallback rate (G-05) during the pilot |
| **Level 1** | Suggests a reply grounded in the shop's written policies, with citations | Staff, after review | Suggestion use rate and citation accuracy (see below) |
| **Level 2** | Answers a fixed list of simple, low-risk questions on its own | AI for those topics; Staff for everything else | Error rate of automatic answers on a sampled review |
| **Level 3** | Chatbot on the website that answers first and hands over to Staff | AI first, then Staff | Hand-over rate and customer satisfaction |

## Level 1 — Policy knowledge base and reply suggestions

### What it is

- Admin writes **policy articles** in a knowledge base (for example returns, refunds, shipping, warranty, account), each with a title, body, category, active or hidden state, and a last-reviewed date.
- On Ticket Handling (SCR-21), Staff click a **Suggest reply** button. The system retrieves the articles most relevant to the ticket and asks the LLM to draft a reply that cites them (retrieval-augmented generation, RAG).
- The suggestion lands in the reply box like a rewrite (US-26). Staff review it, edit it, and click Send.

### Why it is not in the MVP

- The brief names "Knowledge base" and "AI reply suggestions using RAG" as out of scope (W-02, W-03).
- A new small shop rarely has written policies. Someone has to write them, and keep them current, before AI can use them.
- It adds a retrieval pipeline (splitting articles, embeddings, vector search) and a new kind of AI failure: citing the wrong or an outdated policy, which the shop then has to honour.
- The one-week schedule (R-12).

### Prerequisites

- **A policy owner.** Admin writes and reviews the articles; each one shows when it was last reviewed.
- **Vector search.** If Step 7 chooses PostgreSQL, the `pgvector` extension adds it without a second database.
- **An embedding model** from the chosen LLM provider, or a second provider for embeddings only.

### Guardrails

- A suggestion may contain facts, dates, or amounts **only if they appear in a cited article**, and every suggestion shows its sources. This replaces the MVP rule that a rewrite adds no new facts (BR-12) only for suggestions; rewrite keeps its rule.
- If no article is relevant enough, there is **no suggestion**: the panel says "Không tìm thấy chính sách phù hợp" and the AI never guesses.
- Hidden articles and articles past their review date are never used.
- Retrieved article text is passed to the LLM as data, not instructions (R-03).
- **Staff still review and click Send** (G-07). AI never sends.

### Measurements

- **Suggestion use rate:** share of suggestions that Staff send with no or small edits.
- **Citation accuracy:** share of sampled suggestions whose facts match the cited article.
- **First response time** (G-03), compared before and after Level 1.

### What it would change in the documentation

| Step | Change |
|---|---|
| 1 Research | A decision that moves W-02 and W-03 into scope; a knowledge base module; "AI helps at three points" becomes four; the "no knowledge base" differentiator in [Similar products](04-similar-products.md); new risks (wrong or outdated policy, missed retrieval, embedding cost); new goals; glossary |
| 2 Use cases and stories | About five stories (Admin adds, edits, and hides articles; Staff get a cited suggestion; no-match behaviour); two use cases; new business rules; MoSCoW and traceability |
| 3 Information architecture | A knowledge base screen and article form for Admin; a suggestion panel on SCR-21 with loading, error, and no-match states |
| 4 UI/UX | Wireframes and PNGs for the new screen and the SCR-21 panel |
| 5–7 | Article and chunk tables with vectors, a suggestion log; article and suggestion APIs; a vector store and embedding model in C4 |
| Mind map | A knowledge base branch and a "suggest reply from policy" node under AI assistance |

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
- **Data model (Step 5).** A status column on the user is enough for the MVP. A separate `staff_leave` table (Staff, from, to, set by) costs one table now but makes this feature and the leave history a small change later. Decide when designing the ERD.

## Other candidates

| Item | Idea | Why it waits | Related |
|---|---|---|---|
| Channel intake | Messages to the shop's Facebook Page (Messenger Platform) and Zalo Official Account become tickets; Staff replies go back to that channel | The brief excludes it (W-05); each platform needs app approval; customers from a channel have no account; rules for when a message starts a new ticket | W-05, A-03 |
| Skill-based routing | Admin links Staff to the categories they handle; auto-assignment prefers them | The category comes from AI, and assignment must never depend on AI (BR-03) | D-07, BR-03 |
| SLA escalation | Time limits per priority; reassign or alert when a ticket waits too long | The brief excludes automatic SLA (W-06) | W-06, G-03 |
| AI category hint | When the customer chose a category, AI still proposes one in the same call and shows it to Staff if it differs | Changes BR-08 rule 4, AC-14.3, AC-19.2, and SCR-21 | BR-08 |
| Transfer note | An optional "why" note when transferring a ticket | Not requested yet; adds one field | BR-04 |

**Related:** [Step index](README.md) · [MVP scope](05-scope.md)

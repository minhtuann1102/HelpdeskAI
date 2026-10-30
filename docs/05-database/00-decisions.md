# Decisions and Defaults

> Design status: MVP — Step 5 of 9, proposed
>
> Implementation status: NOT STARTED

## Decisions made in this step

| ID | Decision | Source |
|---|---|---|
| D-28 | **PostgreSQL is assumed** for the schema and confirmed in Step 7 with the rest of the tech stack. [`helpdesk_ai.dbml`](helpdesk_ai.dbml) is the source of truth, and the Mermaid diagrams are drawn from it. The file stays in this folder because the code folder layout is decided in Step 8. SQL migrations are written in Step 9. | Step 5 design |
| D-29 | **One `app_users` table for all three roles** (BR-01). Account status is one column, `ACTIVE`, `ON_LEAVE`, or `LOCKED` (BR-18), and the two values auto-assignment needs for each Staff member, when they last joined (warm-up, DF-27) and when they were last assigned (tie-break, DF-02), sit on the same row. | Step 5 design |
| D-30 | **The labels live on `tickets` as column sets**: the customer's category choice, the AI label (written once), and the final label, plus the classification status and its cause (BR-08, BR-09). A ticket has exactly one of each, so a separate label table would add joins without adding information. | Step 5 design |
| D-31 | **Customer emails go through an outbox.** The reply or status change and its `email_notifications` row are saved in one transaction; a sender delivers the email after commit and records a failure on the row without touching the ticket (BR-17). | Step 5 design |
| D-32 | **Every LLM call is logged in `ai_requests`** with its feature, outcome, latency, and token counts, for G-06 and cost checks. The log holds no prompt or response text; results are stored only where a rule needs them (labels, summary, suggestion). | Step 5 design |
| D-33 | **Policy articles are split into `policy_articles` and immutable `policy_article_revisions`**, and each citation points to the revision AI was given (D-26). No embedding table yet: how articles are found is a Step 7 decision (BR-21 rule 2). If Step 7 chooses vector search, it adds one table keyed by revision and model. | Step 5 design, from D-26 |
| D-34 | **Values that can be computed are not stored**: open-ticket load, outdated summary, overdue article, and every dashboard metric. The exceptions, `first_response_at`, `last_assigned_at`, and the article title copy, are listed with their reasons in the [data model](01-data-model.md#stored-although-derivable). | Step 5 design |

## Defaults pending confirmation

| ID | Default |
|---|---|
| DF-30 | Field lengths that the requirements do not fix: email 255, full name 150, phone 20, attachment file name 255 characters. Ticket descriptions and replies have no database limit; Step 6 sets the API limits. |

**Related:** [Step index](README.md)

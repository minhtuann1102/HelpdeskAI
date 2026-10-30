# Data Model

> Design status: MVP — Step 5 of 9, proposed
>
> Implementation status: NOT STARTED

The schema for **Helpdesk AI** on PostgreSQL (D-28): 13 tables in five groups. It stores what the [business rules](../requirements/business-rules.md) need and nothing that can be computed (D-34).

Related sources of truth: [helpdesk_ai.dbml](helpdesk_ai.dbml), [ER diagram](02-er-diagram.md).

## Tables

| Table | Group | Purpose |
|---|---|---|
| `app_users` | Accounts | Every account, with `role` (`CUSTOMER`, `STAFF`, `ADMIN`) and `status` (`ACTIVE`, `ON_LEAVE`, `LOCKED`). Email is unique ignoring case. `ON_LEAVE` is allowed only for `STAFF` (check constraint). For Staff, `assignment_joined_at` starts the warm-up and `last_assigned_at` breaks ties (BR-03). |
| `staff_leaves` | Accounts | One row per leave: Staff member, start, end, who set it, who ended it, and why it ended (D-24). At most one open leave per Staff member (partial unique index). |
| `categories` | Tickets | Name (unique ignoring case), description that AI reads, active or hidden (BR-13). |
| `tickets` | Tickets | The request, its status, its assignee (NULL = Unassigned), the [labels](#labels-on-a-ticket), `first_response_at`, and `version` for concurrent changes (BR-19). |
| `ticket_messages` | Tickets | Replies after the description, by the customer, the assignee, or Admin (BR-07). |
| `ticket_attachments` | Tickets | Metadata of files added at submission: name, storage key, type (jpg, png, pdf), size up to 10 MB (BR-14). The file itself is stored outside the database (Step 7). |
| `ticket_summaries` | AI | The latest summary of a ticket and the newest reply it covered (BR-11). Regenerating replaces the row. |
| `ai_requests` | AI | One row per LLM call: feature, ticket, who asked, model, outcome, latency, tokens (D-32). |
| `email_notifications` | Notifications | Outbox of customer emails: ticket, recipient, the reply and/or new status, send status, error (D-31, BR-17). |
| `policy_articles` | Policies | An article: current title (unique ignoring case), current revision, active or hidden, last-reviewed date (BR-20). |
| `policy_article_revisions` | Policies | Numbered, never-changed text of an article, with a hash of its normalized body for the duplicate check (D-26). |
| `reply_suggestions` | Policies | Every "Gợi ý trả lời" click: outcome, suggested text when shown, and when it was accepted (BR-21 rule 8). |
| `reply_suggestion_citations` | Policies | The passages a shown suggestion quotes, each tied to the revision AI was given. |

There are no dashboard or report tables: every metric is calculated from `tickets` and the logs (see [Derived values](#derived-values)).

The Policies group exists because of D-25. If the mentor does not accept it (O-09), the four tables, the `SUGGEST_REPLY` value of `ai_feature`, and the `suggestion_outcome` enum are removed; no other table depends on them.

## Labels on a ticket

A ticket carries three sets of label columns (D-30):

- **Customer choice:** `customer_category_id`, set at submission and never changed.
- **AI label:** the `ai_*` columns, written once by classification and never overwritten (BR-09).
- **Final label:** `category_id`, `priority`, and `sentiment`, which Staff and Admin can correct. NULL means Unclassified.

| Case | `customer_category_id` | AI label (`ai_*`) | Final label | `classification_status` / cause |
|---|---|---|---|---|
| Customer chose nothing; AI confident | NULL | category, priority, sentiment, confidence, reason | Copied from the AI label | `CLASSIFIED` |
| Customer chose a category; AI confident | The choice | priority, sentiment, confidence, reason; `ai_category_id` NULL | Category = the customer's; priority and sentiment from AI | `CLASSIFIED` |
| Confidence below 0.6 | The choice or NULL | Only confidence and reason | Category = the customer's or NULL; priority and sentiment NULL | `UNCLASSIFIED` / `LOW_CONFIDENCE` |
| AI error, timeout, invalid output, or still pending after 30 s | The choice or NULL | Empty | As above | `UNCLASSIFIED` / `AI_ERROR` |
| A person sets the labels | Unchanged | Unchanged | The person's values; `labels_edited_by` and `labels_edited_at` set | Unchanged (BR-08 rule 9) |

`ai_priority` is stored **after** the anger rule, and `ai_priority_raised` records that the rule raised it (AC-24.9). The flag is needed because a raised `urgent` cannot be told apart from an original one.

## Derived values

These are computed when read, never stored (D-34).

| Value | How it is computed | Rule |
|---|---|---|
| Open tickets of a Staff member | `tickets` with that `assignee_id` and status `NEW`, `IN_PROGRESS`, or `WAITING_FOR_CUSTOMER` | DF-01 |
| Load used by auto-assignment | The open-ticket count. Within 4 hours after `assignment_joined_at`, the larger of that count and the average count of the other `ACTIVE` Staff | BR-03, DF-27 |
| Effective classification | A `PENDING` ticket created more than 30 s ago counts as `UNCLASSIFIED` / `AI_ERROR` | DF-28 |
| AI marker on a final label | The final value equals the AI value | BR-09 |
| Summary outdated | A reply of the ticket newer than `ticket_summaries.last_message_id` exists | BR-11 |
| Article usable by AI | `is_active` and `last_reviewed_at` within the last 180 days, read through `current_revision_id` | BR-20, DF-29 |
| Ticket counts on the dashboard | Group by `status`, `category_id`, and `sentiment`; NULL is the Unclassified group | BR-16 |
| Average first response time | Mean of `first_response_at − created_at` over tickets that have it; tickets without it are counted apart | BR-16 |
| Label correction rate | Denominator: tickets with `classification_status = CLASSIFIED`. Numerator: those where (`customer_category_id` is NULL and `category_id ≠ ai_category_id`) or `priority ≠ ai_priority` | BR-10 |
| Fallback rate | Share of tickets that are effectively `UNCLASSIFIED` | G-05 |
| AI latency | 95th percentile of `ai_requests.latency_ms` per feature | G-06 |
| Suggestion use rate | `reply_suggestions` with `accepted_at` ÷ those with outcome `SHOWN` | G-09 |

### Stored although derivable

| Column | Why it is stored |
|---|---|
| `tickets.first_response_at` | Deriving it needs the assignee at the time of each reply, and the assignee changes. Set once, by the first reply of the assignee or Admin (BR-07). |
| `app_users.last_assigned_at` | The MVP keeps no assignment history, so the time of the last assignment exists only here (DF-02). |
| `policy_articles.title` | A copy of the current revision's title, so a unique index can enforce "unique ignoring case" (BR-20). It is written in the same transaction as the revision. |

## Transaction boundaries

The LLM call never runs inside a database transaction, so no lock is held for up to 20 s.

| Action | Saved together in one transaction | After commit |
|---|---|---|
| Submit ticket | `tickets` row and `ticket_attachments` rows. Files are stored first and removed if the insert fails. | Auto-assignment; classification |
| Auto-assignment (new ticket, redistribution, reopen) | Take one assignment lock, read the loads, set `assignee_id`, `assigned_at`, `version`, and the Staff member's `last_assigned_at` | — |
| Staff or Admin reply | `ticket_messages` row; ticket `version`, `updated_at`, and, on the first reply, `first_response_at` and `NEW → IN_PROGRESS`; one `email_notifications` row | Send the email |
| "Send and wait for customer" | Reply, status change (version-checked), and **one** email row. On a conflict nothing is saved (BR-19) | Send the email |
| Customer reply | `ticket_messages` row and the automatic T4 or T6. If the reply reopens the ticket (T6) and the assignee is locked or on leave, auto-assignment runs in the same transaction (BR-05) | — |
| Status change, label correction, transfer, reassignment | One version-checked update of the ticket (plus an email row for a status change) | Send the email |
| Lock a Staff member or set them on leave | `app_users.status`, the `staff_leaves` row (opened, or closed with `ACCOUNT_LOCKED`), and redistribution of every open ticket | — |
| Unlock or end leave | `status = ACTIVE`, `assignment_joined_at = now()`, and the open leave closed with `ENDED_BY_ADMIN` | — |
| Classification result | The guarded ticket update (below) and the `ai_requests` row | — |
| Summary | Upsert of `ticket_summaries` and the `ai_requests` row; the ticket version is unchanged | — |
| Save a policy article | New revision, then the article's `title`, `current_revision_id`, and `last_reviewed_at`, after the duplicate checks | — |
| Suggestion result | Check that every cited revision is still current, then `reply_suggestions`, its citations, and the `ai_requests` row | — |

## Concurrency

- **Ticket version** (BR-19): a checked action runs `UPDATE tickets SET …, version = version + 1 WHERE id = :id AND version = :seen`. Zero rows updated means the ticket changed, and nothing is saved.
- **Auto-assignment** takes a single transaction-level lock (for example a PostgreSQL advisory lock), so two tickets created at the same moment never read the same loads and land on the same person.
- **Late classification** (DF-28): the result is written with `WHERE classification_status = 'PENDING' AND created_at > now() - interval '30 seconds'`. Zero rows means the result is discarded. The final label is filled only when `labels_edited_at` is NULL (BR-08 rule 10). Whether a job also rewrites stale `PENDING` rows is decided in Step 7; reads already treat them as `AI_ERROR`.
- **Policy revisions**: `(article_id, revision_no)` is unique, so a double save cannot create two revisions with the same number.

## Duplicate and change checks for policy articles

These checks implement D-26 and BR-20.

- **Title:** the unique index on `lower(title)` rejects a duplicate title.
- **Body that repeats another article:** the body is normalized (Unicode NFC, lower case, runs of spaces and line breaks collapsed) and hashed with SHA-256 into `body_hash`. A match with the **current** revision of another article, active or hidden, rejects the save and names that article.
- **No change:** if the NFC-normalized, trimmed title and body equal the current revision, no revision is added and only `last_reviewed_at` is updated.

## Privacy

- `password_hash` is never returned by the API or written to logs.
- `ai_requests` and `email_notifications.last_error` hold no ticket text, prompts, or secrets.
- Customer-facing reads never select the `ai_*` columns, `priority`, `sentiment`, `classification_status`, summaries, suggestions, or policy tables (DF-14).
- `ticket_attachments.storage_key` is never shown; files are served only to the owner, the assignee, and Admin (BR-14).

## Seed data

- The first Admin account, created at installation (BR-01).
- Sample categories from the wireframes (D-06, DF-24): Đơn hàng, Giao hàng, Thanh toán & hoàn tiền, Đổi trả & bảo hành, Tài khoản.
- Demo data only: the fictional shop "Lá Cọ Home" (DF-24), its Staff and customers on `example` email domains, sample tickets, and the policy articles shown on SCR-36.

## Not modelled in Step 5

| Item | Why | Where it is decided |
|---|---|---|
| Login sessions and tokens | Depends on the authentication design. A locked account must end on its next request (BR-05) whatever the design. | Step 7 |
| File storage for attachments | Disk or object storage | Step 7 |
| Embeddings for policy search | How articles are found is open (BR-21 rule 2). Vector search would add one table keyed by `revision_id` and model. | Step 7 |
| Ticket history (status and assignment events) | No screen or rule shows it | Not in the MVP |
| SQL migrations | Written with the code | Step 9 |

**Related:** [Step index](README.md)

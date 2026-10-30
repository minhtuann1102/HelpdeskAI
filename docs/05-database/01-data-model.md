# Data Model

> Design status: MVP — Step 5 of 9, proposed
>
> Implementation status: NOT STARTED

The schema for **Helpdesk AI** on PostgreSQL (D-28): 14 tables in five groups. It stores what the [business rules](../requirements/business-rules.md) need, plus [who created each record](#who-created-a-record), and nothing that can be computed (D-34).

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
| `response_clocks` | Tickets | One row per reply a customer waited for: when it started, the working minutes spent paused, and, once ended, the result with the deadline, priority, and assignee of that moment (D-37, BR-22). At most one open clock per ticket (partial unique index). |
| `ticket_summaries` | AI | The latest summary of a ticket and the newest reply it covered (BR-11). Regenerating replaces the row. |
| `ai_requests` | AI | One row per LLM call: feature, ticket, who asked, model, outcome, latency, tokens (D-32). |
| `email_notifications` | Notifications | Outbox of customer emails: ticket, recipient, the reply and/or new status, send status, error (D-31, BR-17). |
| `policy_articles` | Policies | An article: current title (unique ignoring case), current revision, active or hidden, last-reviewed date (BR-20). |
| `policy_article_revisions` | Policies | Numbered, never-changed text of an article, with a hash of its normalized body for the duplicate check (D-26). |
| `reply_suggestions` | Policies | Every "Gợi ý trả lời" click: outcome, suggested text when shown, and when it was accepted (BR-21 rule 8). |
| `reply_suggestion_citations` | Policies | The passages a shown suggestion quotes, each tied to the revision AI was given. |

There are no dashboard or report tables: every metric is calculated from `tickets`, `response_clocks`, and the logs (see [Derived values](#derived-values)).

The Policies group exists because of D-25. If the mentor does not accept it (O-09), the four tables, the `SUGGEST_REPLY` value of `ai_feature`, and the `suggestion_outcome` enum are removed; no other table depends on them.

### Who created a record

The `created_by` columns of `app_users`, `categories`, `policy_articles`, and `policy_article_revisions` are kept for audit. No rule or screen reads them yet, but this information cannot be recovered later.

`app_users.created_by` refers to `app_users` itself, because Admin and Staff share one table (D-29). It is an ordinary one-to-many relationship between two roles: one Admin creates many Staff accounts, and each Staff account has one creator. Customers and the first Admin have none, so a check allows a value only on `STAFF` rows. A check cannot read another row, so the API verifies that the creator is an Admin.

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
| A person corrects or confirms the labels | Unchanged | Unchanged | The person's values (the same ones for a confirmation); `labels_edited_by` and `labels_edited_at` set | Unchanged (BR-08 rule 9) |

`ai_priority` is stored **after** the anger rule, and `ai_priority_raised` records that the rule raised it (AC-24.9). The flag is needed because a raised `urgent` cannot be told apart from an original one.

## Derived values

These are computed when read, never stored (D-34).

| Value | How it is computed | Rule |
|---|---|---|
| Open tickets of a Staff member | `tickets` with that `assignee_id` and status `NEW`, `IN_PROGRESS`, or `WAITING_FOR_CUSTOMER` | DF-01 |
| Load used by auto-assignment | The open-ticket count. Within 4 hours after `assignment_joined_at`, the larger of that count and the average count of the other `ACTIVE` Staff | BR-03, DF-27 |
| Effective classification | A `PENDING` ticket created more than 30 s ago counts as `UNCLASSIFIED` / `AI_ERROR` | DF-28 |
| AI marker on a final label | The value came from AI and `labels_edited_at` is NULL: no person has corrected or confirmed the labels | BR-09, BR-23 |
| Confidence band | `ai_confidence` against the cut-offs: "Cao" from 0.85, "Vừa" from 0.60 | BR-23, DF-34 |
| "AI chưa chắc" | `CLASSIFIED`, band "Vừa", and `labels_edited_at` is NULL | BR-23 |
| Last update and "Lâu chưa cập nhật" | `tickets.updated_at`, which every new message and change moves | BR-22 rule 7 |
| Deadline of a running clock | `started_at` plus the target of the ticket's final priority (`high` when NULL) plus `paused_minutes`, counted in working minutes with the current working hours and holidays. A paused clock has no deadline; its time left is the target minus the working minutes used before `paused_at` | BR-22, DF-31, DF-32 |
| "Sắp trễ", "Trễ hạn", "Tạm dừng" | At most 25% of the target left; past the deadline; `paused_at` set | DF-33 |
| Overdue now | Open clocks that are not paused and are past their deadline | BR-16 |
| Summary outdated | A reply of the ticket newer than `ticket_summaries.last_message_id` exists | BR-11 |
| Article usable by AI | `is_active` and `last_reviewed_at` within the last 180 days, read through `current_revision_id` | BR-20, DF-29 |
| Ticket counts on the dashboard | Group by `status`, `category_id`, and `sentiment`; NULL is the Unclassified group | BR-16 |
| First response time | Working minutes from `created_at` to `first_response_at`, over tickets that have it: the average and the 90th percentile; tickets without it are counted apart | BR-16, G-03 |
| Replies on time | `response_clocks` that ended in the range: `ON_TIME` ÷ (`ON_TIME` + `LATE`), overall and grouped by `priority` | BR-16, G-10 |
| Dashboard by Staff member | Per person: open tickets and overdue now from `tickets.assignee_id`; replies on time from `response_clocks` grouped by `assignee_id`; first response time grouped by the author of each ticket's first Staff or Admin message in `ticket_messages`. A Staff member's own dashboard uses the same grouping | BR-16, D-38 |
| Label correction rate | Denominator: tickets with `classification_status = CLASSIFIED`. Numerator: those where (`customer_category_id` is NULL and `category_id ≠ ai_category_id`) or `priority ≠ ai_priority`. A confirmation keeps the values, so it never counts. Also split by confidence band, with the rate hidden below 20 tickets | BR-10, BR-23 |
| Fallback rate | Share of tickets that are effectively `UNCLASSIFIED` | G-05 |
| AI latency | 95th percentile of `ai_requests.latency_ms` per feature | G-06 |
| Suggestion use rate | `reply_suggestions` with `accepted_at` ÷ those with outcome `SHOWN` | G-09 |

### Stored although derivable

| Column | Why it is stored |
|---|---|
| `tickets.first_response_at` | Deriving it needs the assignee at the time of each reply, and the assignee changes. Set once, by the first reply of the assignee or Admin (BR-07). |
| `app_users.last_assigned_at` | The MVP keeps no assignment history, so the time of the last assignment exists only here (DF-02). |
| `policy_articles.title` | A copy of the current revision's title, so a unique index can enforce "unique ignoring case" (BR-20). It is written in the same transaction as the revision. |
| `response_clocks.paused_minutes` | The pause intervals are not kept anywhere else (no status history), so the working minutes spent paused exist only here (BR-22 rule 2). |
| `response_clocks.due_at`, `outcome`, `priority`, `assignee_id` of an ended clock | The working hours, targets, the ticket's priority, and its assignee can change later, but a reply that was on time must stay on time, and for the same person (BR-22 rule 10, D-38). There is no assignment history, so who held the ticket when the clock ended exists only here. A running clock stores none of them. |

## Transaction boundaries

The LLM call never runs inside a database transaction, so no lock is held for up to 20 s.

| Action | Saved together in one transaction | After commit |
|---|---|---|
| Submit ticket | `tickets` row, `ticket_attachments` rows, and the `FIRST` response clock. Files are stored first and removed if the insert fails. | Auto-assignment; classification |
| Auto-assignment (new ticket, redistribution, reopen) | Take one assignment lock, read the loads, set `assignee_id`, `assigned_at`, `version`, and the Staff member's `last_assigned_at` | — |
| Staff or Admin reply | `ticket_messages` row; ticket `version`, `updated_at`, and, on the first reply, `first_response_at` and `NEW → IN_PROGRESS`; the open response clock ends (`ON_TIME` or `LATE`, with `due_at`, `priority`, `assignee_id`, and the reply); one `email_notifications` row | Send the email |
| "Send and wait for customer" | Reply, status change (version-checked), and **one** email row. On a conflict nothing is saved (BR-19) | Send the email |
| Customer reply | `ticket_messages` row, the ticket `version` and `updated_at`, and the automatic T4 or T6. A `NEXT` response clock starts if none is open; a paused one resumes with T4 or T6. If the reply reopens the ticket (T6) and the assignee is locked or on leave, auto-assignment runs in the same transaction (BR-05) | — |
| Status change | One version-checked update of the ticket, one email row, and the open clock paused (`Waiting for Customer`, `Resolved`), resumed (`In Progress`), or ended (`Closed`: `LATE` if past the deadline, otherwise `CANCELLED`, with the same end fields as a reply) | Send the email |
| Label correction or confirmation, transfer, reassignment | One version-checked update of the ticket. Nothing is written to `response_clocks`: a running deadline is computed when read (D-37) | — |
| Lock a Staff member or set them on leave | `app_users.status`, the `staff_leaves` row (opened, or closed with `ACCOUNT_LOCKED`), and redistribution of every open ticket | — |
| Unlock or end leave | `status = ACTIVE`, `assignment_joined_at = now()`, and the open leave closed with `ENDED_BY_ADMIN` | — |
| Classification result | The guarded ticket update (below), which also increments `version` (BR-19), and the `ai_requests` row | — |
| Summary | Upsert of `ticket_summaries` and the `ai_requests` row; the ticket version is unchanged | — |
| Save a policy article | New revision, then the article's `title`, `current_revision_id`, and `last_reviewed_at`, after the duplicate checks | — |
| Suggestion result | Check that every cited revision is still current, then `reply_suggestions`, its citations, and the `ai_requests` row | — |

## Concurrency

- **Ticket version** (BR-19): a checked action runs `UPDATE tickets SET …, version = version + 1 WHERE id = :id AND version = :seen`. Zero rows updated means the ticket changed, and nothing is saved.
- **Auto-assignment** takes a single transaction-level lock (for example a PostgreSQL advisory lock), so two tickets created at the same moment never read the same loads and land on the same person.
- **Late classification** (DF-28): the result is written with `UPDATE tickets SET …, version = version + 1 WHERE id = :id AND classification_status = 'PENDING' AND created_at > now() - interval '30 seconds'`. Zero rows means the result is discarded. The final label is filled only when `labels_edited_at` is NULL (BR-08 rule 10). Whether a job also rewrites stale `PENDING` rows is decided in Step 7; reads already treat them as `AI_ERROR`.
- **Policy revisions**: `(article_id, revision_no)` is unique, so a double save cannot create two revisions with the same number.
- **Response clocks**: every clock write happens in the transaction of the ticket update that causes it, which already changes the version, so two actions cannot both end or pause the same clock. The partial unique index on open clocks stops a second clock from starting.

## Duplicate and change checks for policy articles

These checks implement D-26 and BR-20.

- **Title:** the unique index on `lower(title)` rejects a duplicate title.
- **Body that repeats another article:** the body is normalized (Unicode NFC, lower case, runs of spaces and line breaks collapsed) and hashed with SHA-256 into `body_hash`. A match with the **current** revision of another article, active or hidden, rejects the save and names that article.
- **No change:** if the NFC-normalized, trimmed title and body equal the current revision, no revision is added and only `last_reviewed_at` is updated.

## Privacy

- `password_hash` is never returned by the API or written to logs.
- `ai_requests` and `email_notifications.last_error` hold no ticket text, prompts, or secrets.
- Customer-facing reads never select the `ai_*` columns, `priority`, `sentiment`, `classification_status`, summaries, suggestions, `response_clocks`, or policy tables (DF-14).
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
| Ticket history (status and assignment events) | No screen or rule shows it; `response_clocks` keeps only what deadlines need | Not in the MVP |
| Reply targets, working hours, and holidays | Server settings with no screen, like DF-09 (DF-31, DF-32) | Step 7 (configuration) |
| SQL migrations | Written with the code | Step 9 |

**Related:** [Step index](README.md)

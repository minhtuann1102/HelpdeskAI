# ER Diagram

> Design status: MVP — Step 5 of 9, proposed
>
> Implementation status: NOT STARTED

The PostgreSQL schema of **Helpdesk AI** (D-28), drawn from [helpdesk_ai.dbml](helpdesk_ai.dbml). Table purposes, derived values, and transaction boundaries are in the [data model](01-data-model.md).

## Relationships (tables)

`app_users` is on the left because almost every table refers to it. The five groups are on the right. Arrows point from the referenced table to the table that refers to it.

```mermaid
%%{init: {"flowchart": {"nodeSpacing": 30, "rankSpacing": 70, "padding": 12}}}%%
flowchart LR
  U[app_users]

  subgraph groups [" "]
    direction TB

    subgraph accounts [Accounts]
      SL[staff_leaves]
    end

    subgraph ticketGroup [Tickets]
      direction LR
      C[categories] --> T[tickets]
      T --> TM[ticket_messages]
      T --> TA[ticket_attachments]
    end

    subgraph ai [AI]
      direction LR
      TS[ticket_summaries]
      AR[ai_requests]
    end

    subgraph notifications [Notifications]
      EN[email_notifications]
    end

    subgraph policies ["Policies (D-25)"]
      direction LR
      PA[policy_articles] --> PR[policy_article_revisions]
      RS[reply_suggestions] --> RC[reply_suggestion_citations]
      PR --> RC
    end
  end

  U --> accounts
  U --> ticketGroup
  U --> ai
  U --> notifications
  U --> policies
  T --> TS
  T --> AR
  T --> EN
  T --> RS
  AR --> RS
```

## Enums

| Enum | Values | UI |
|---|---|---|
| `user_role` | CUSTOMER, STAFF, ADMIN | Khách hàng, Nhân viên hỗ trợ, Quản trị viên |
| `account_status` | ACTIVE, ON_LEAVE, LOCKED | Hoạt động, Đang nghỉ (Staff only), Đã khóa |
| `leave_end_reason` | ENDED_BY_ADMIN, ACCOUNT_LOCKED | Not shown; leave history |
| `ticket_status` | NEW, IN_PROGRESS, WAITING_FOR_CUSTOMER, RESOLVED, CLOSED | Mới, Đang xử lý, Chờ khách (customers see "Chờ bạn phản hồi", DF-22), Đã giải quyết, Đã đóng |
| `ticket_priority` | LOW, MEDIUM, HIGH, URGENT | Thấp, Trung bình, Cao, Khẩn cấp |
| `ticket_sentiment` | POSITIVE, NEUTRAL, NEGATIVE, ANGRY | Tích cực, Trung lập, Tiêu cực, Bức xúc |
| `classification_status` | PENDING, CLASSIFIED, UNCLASSIFIED | "AI đang phân loại…", the labels, "Chưa phân loại" |
| `unclassified_cause` | LOW_CONFIDENCE, AI_ERROR | The label panel explains which one |
| `email_status` | PENDING, SENT, FAILED | Not shown; email outbox |
| `ai_feature` | CLASSIFY, SUMMARIZE, REWRITE, SUGGEST_REPLY | Not shown; AI request log |
| `ai_outcome` | SUCCESS, INVALID_OUTPUT, TIMEOUT, ERROR | Not shown; AI request log |
| `suggestion_outcome` | SHOWN, NO_MATCH, POLICY_CHANGED, FAILED | The suggestion, "Không tìm thấy chính sách phù hợp", "Chính sách vừa được cập nhật…", the error with Retry |

## Detailed ER diagram — accounts, tickets, AI, notifications

```mermaid
erDiagram
  app_users {
    bigint id PK
    varchar email UK "unique ignoring case"
    text password_hash
    varchar full_name
    varchar phone
    user_role role
    account_status status
    timestamptz assignment_joined_at "STAFF: warm-up start"
    timestamptz last_assigned_at "STAFF: tie-break"
    bigint created_by FK
  }

  staff_leaves {
    bigint id PK
    bigint staff_id FK
    timestamptz starts_at
    timestamptz ends_at "NULL while open"
    bigint set_by FK
    bigint ended_by FK
    leave_end_reason end_reason
  }

  categories {
    bigint id PK
    varchar name UK "unique ignoring case"
    text description "read by AI"
    boolean is_active
    bigint created_by FK
  }

  tickets {
    bigint id PK "ticket number"
    bigint customer_id FK
    varchar title
    text description
    ticket_status status
    bigint assignee_id FK "NULL = Unassigned"
    timestamptz assigned_at
    bigint customer_category_id FK "customer choice"
    classification_status classification_status
    unclassified_cause unclassified_cause
    bigint ai_category_id FK "AI label"
    ticket_priority ai_priority "AI label"
    boolean ai_priority_raised "AI label"
    ticket_sentiment ai_sentiment "AI label"
    numeric ai_confidence "AI label"
    text ai_reason "AI label"
    bigint category_id FK "final label"
    ticket_priority priority "final label"
    ticket_sentiment sentiment "final label"
    bigint labels_edited_by FK
    timestamptz first_response_at
    integer version
  }

  ticket_messages {
    bigint id PK
    bigint ticket_id FK
    bigint author_id FK
    text body
    timestamptz created_at
  }

  ticket_attachments {
    bigint id PK
    bigint ticket_id FK
    varchar original_name
    varchar storage_key
    varchar content_type
    integer size_bytes
  }

  ticket_summaries {
    bigint ticket_id PK, FK
    text content
    bigint last_message_id FK
    bigint generated_by FK
    timestamptz generated_at
  }

  ai_requests {
    bigint id PK
    ai_feature feature
    bigint ticket_id FK
    bigint requested_by FK "NULL for classification"
    varchar model
    ai_outcome outcome
    integer latency_ms
  }

  email_notifications {
    bigint id PK
    bigint ticket_id FK
    bigint recipient_id FK
    bigint actor_id FK
    bigint message_id FK
    ticket_status new_status
    email_status status
    smallint attempts
  }

  app_users |o--o{ app_users : created_by
  app_users ||--o{ staff_leaves : staff_id
  app_users ||--o{ staff_leaves : set_by
  app_users |o--o{ staff_leaves : ended_by
  app_users ||--o{ categories : created_by

  app_users ||--o{ tickets : customer_id
  app_users |o--o{ tickets : assignee_id
  app_users |o--o{ tickets : labels_edited_by
  categories |o--o{ tickets : customer_category_id
  categories |o--o{ tickets : ai_category_id
  categories |o--o{ tickets : category_id
  tickets ||--o{ ticket_messages : ticket_id
  app_users ||--o{ ticket_messages : author_id
  tickets ||--o{ ticket_attachments : ticket_id

  tickets ||--o| ticket_summaries : ticket_id
  ticket_messages |o--o{ ticket_summaries : last_message_id
  app_users ||--o{ ticket_summaries : generated_by
  tickets ||--o{ ai_requests : ticket_id
  app_users |o--o{ ai_requests : requested_by

  tickets ||--o{ email_notifications : ticket_id
  app_users ||--o{ email_notifications : recipient_id
  app_users ||--o{ email_notifications : actor_id
  ticket_messages |o--o{ email_notifications : message_id
```

At most one leave per Staff member is open at a time (partial unique index on `staff_id` where `ends_at` is NULL), and at most 5 attachments belong to a ticket (checked by the API).

## Detailed ER diagram — policies (D-25, D-26)

`app_users`, `tickets`, and `ai_requests` are shown with their key only; their columns are in the diagram above.

```mermaid
erDiagram
  app_users {
    bigint id PK
  }

  tickets {
    bigint id PK
  }

  ai_requests {
    bigint id PK
  }

  policy_articles {
    bigint id PK
    varchar title UK "copy of the current revision title"
    bigint current_revision_id FK, UK
    boolean is_active
    date last_reviewed_at "overdue after 180 days"
    bigint last_reviewed_by FK
    bigint created_by FK
  }

  policy_article_revisions {
    bigint id PK
    bigint article_id FK
    integer revision_no "unique per article"
    varchar title
    text body "at most 5,000 characters"
    char body_hash "duplicate check"
    bigint created_by FK
    timestamptz created_at
  }

  reply_suggestions {
    bigint id PK
    bigint ticket_id FK
    bigint requested_by FK
    bigint ai_request_id FK, UK "NULL when no call was made"
    suggestion_outcome outcome
    text suggestion_text "only when SHOWN"
    timestamptz accepted_at
  }

  reply_suggestion_citations {
    bigint suggestion_id PK, FK
    smallint cite_no PK "1 to 3"
    bigint revision_id FK
    text quote "word for word from the revision"
  }

  policy_articles ||--|{ policy_article_revisions : article_id
  policy_article_revisions ||--o| policy_articles : current_revision_id
  app_users ||--o{ policy_articles : created_by
  app_users ||--o{ policy_articles : last_reviewed_by
  app_users ||--o{ policy_article_revisions : created_by

  tickets ||--o{ reply_suggestions : ticket_id
  app_users ||--o{ reply_suggestions : requested_by
  ai_requests |o--o| reply_suggestions : ai_request_id
  reply_suggestions ||--o{ reply_suggestion_citations : suggestion_id
  policy_article_revisions ||--o{ reply_suggestion_citations : revision_id
```

An article always has at least one revision, and exactly one of them is current. Revisions are only inserted. A citation points to the exact revision AI was given, so an old suggestion still shows the text it quoted after the article changes (D-26).

**Related:** [Step index](README.md)

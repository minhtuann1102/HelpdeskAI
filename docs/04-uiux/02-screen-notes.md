# Screen Notes and States

> Design status: MVP — Step 4 of 9, approved
>
> Implementation status: NOT STARTED

Each screen lists its purpose, the yellow annotation numbers shown in the HTML, and its states. The **Source** column names the row of the [UI/UX state contract](../03-information-architecture/06-ui-states-and-accessibility.md) (Step 3) that each state implements, or the business rule behind it. Open a state with `?state=<name>` (and `?role=` where shown).

## Common

### SCR-01 Login — [`01-login.html`](wireframes/01-login.html) · [PNG](../images/common/01-login.png)

Shared by all roles; links to Register; no "forgot password" (A-04).

| # | Note |
|---|---|
| 1 | One error message for wrong email or password, without revealing which (AC-02.2). |

| State | Source | Behavior |
|---|---|---|
| `error` | Validation error | Inline error above the fields; values kept. |
| `locked` | Unauthorized | "Tài khoản này đang bị khóa…" ([PNG](../images/common/01b-login-account-locked.png)). |

### SCR-02 Register — [`02-register.html`](wireframes/02-register.html) · [PNG](../images/common/02-register.png)

| # | Note |
|---|---|
| 1 | Creates a `CUSTOMER` account and logs the customer in (AC-01.1). |

| State | Source | Behavior |
|---|---|---|
| `validation-error` | Validation error | Email already used (with a link to log in) and password mismatch, next to each field ([PNG](../images/common/02b-register-validation-error.png)). |

### SCR-40 Profile — [`40-profile.html`](wireframes/40-profile.html) · roles `customer`, `staff`, `admin`

| # | Note |
|---|---|
| 1 | Full name and phone are editable; email and role are read-only (DF-12). |
| 2 | Password change needs the current password (AC-06.2). |

| State | Source | Behavior |
|---|---|---|
| `saved` | Success | Toast "Đã lưu thông tin tài khoản." |
| `password-error` | Validation error | Wrong current password; mismatched confirmation. |

### SCR-90 Access denied — [`90-access-denied.html`](wireframes/90-access-denied.html) · roles `staff`, `customer`

| # | Note |
|---|---|
| 1 | Explains why and links back to the role's home page (Forbidden). |

## Customer portal (Submit & track tickets)

### SCR-10 My Tickets — [`10-my-tickets.html`](wireframes/10-my-tickets.html) · [PNG](../images/customer/10-my-tickets.png)

| # | Note |
|---|---|
| 1 | Own tickets only, most recently updated first, filter tabs by status (AC-09.1, AC-09.2). |
| 2 | Tickets waiting for the customer have an amber rule and the status "Chờ bạn phản hồi" (DF-22). |

| State | Source | Behavior |
|---|---|---|
| `loading` | Initial loading | Skeleton rows inside the list. |
| `empty` | Empty | "Bạn chưa gửi yêu cầu nào" with **Gửi yêu cầu mới** (AC-09.3). |

### SCR-11 Submit Ticket — [`11-submit-ticket.html`](wireframes/11-submit-ticket.html) · [PNG](../images/customer/11-submit-ticket.png)

Optional category defaults to "Chưa chắc, để shop xếp giúp" (empty choice, AC-07.2). The customer never waits for AI (AC-07.4).

| # | Note |
|---|---|
| 1 | Submitting creates the ticket as `New` and goes to SCR-12 with a toast (AC-07.1). |

| State | Source | Behavior |
|---|---|---|
| `validation-error` | Validation error | Summary notice, empty title error, a rejected `.mp4` and a 14,2 MB file with their reasons; other input kept (AC-07.3, AC-08.2) ([PNG](../images/customer/11b-submit-ticket-validation-error.png)). |
| `saving` | Saving | Button "Đang gửi…" disabled to prevent double submission. |

### SCR-12 Ticket Detail and SCR-13 — [`12-ticket-detail.html`](wireframes/12-ticket-detail.html) · [PNG](../images/customer/12-ticket-detail.png)

No priority, sentiment, confidence, AI reason, or summary is shown (DF-14).

| # | Note |
|---|---|
| 1 | Close the request from the side panel; confirmation in SCR-13. |

| State | Source | Behavior |
|---|---|---|
| default | BR-06 (`Waiting for Customer`) | Amber banner "Shop đang chờ bạn trả lời"; replying moves the ticket to In progress (T4). |
| `just-submitted` | Success | Toast with the ticket number; status New; category "Đang xếp nhóm" until classified. |
| `resolved` | BR-06 (T6) | Green banner; replying reopens the ticket. |
| `closed` | BR-06 (`Closed`) | Banner, no reply box, link to submit a new request (AC-11.4) ([PNG](../images/customer/12b-ticket-detail-closed.png)). |
| `close-confirm` | Destructive confirmation | SCR-13 states that a closed request cannot be replied to ([PNG](../images/customer/12c-close-ticket-confirm.png)). |

## Ticket workspace (Ticket handling)

### SCR-20 Ticket Queue — [`20-ticket-queue.html`](wireframes/20-ticket-queue.html) · roles `staff`, `admin` · [PNG staff](../images/staff/20-ticket-queue.png), [PNG admin](../images/admin/20-all-tickets.png)

| # | Note |
|---|---|
| 1 | Order: Unclassified first, then urgent → low, oldest first (DF-15). |
| 2 | Filters: status tabs, keyword, category (incl. Unclassified), priority, sentiment; Admin also filters by assignee (AC-18.2). |
| 3 | Unclassified row: grey left rule and the reason (AI error or low confidence). |

Rows also show the AI states *Classification pending* (#1046), *Priority raised by anger* (#1042, arrow), and *Label corrected* (#1039, solid chip).

| State | Source | Behavior |
|---|---|---|
| `loading` | Initial loading | Skeleton rows; filters stay usable. |
| `empty` | Empty | "Bạn không có ticket nào đang mở" (AC-17.5). |
| `empty-filtered` | Empty (filtered) | "Không có ticket khớp bộ lọc" with **Xóa bộ lọc** (AC-18.4). |

### SCR-21 Ticket Handling and SCR-23 — [`21-ticket-handling.html`](wireframes/21-ticket-handling.html) · roles `staff`, `admin` · [PNG](../images/staff/21-ticket-handling.png)

| # | Note |
|---|---|
| 1 | AI label panel: category, priority (with "raised because the customer is angry"), sentiment; dashed = AI, solid = corrected (AC-19.2). |
| 2 | Confidence bar and the AI's reason. |
| 3 | Summary: issue / done / pending, generation time, regenerate (AC-25.1). |
| 4 | **Viết lại bằng AI** in the composer; result shown beside the draft (AC-26.1, AC-26.3). |
| 5 | Nothing is sent until **Gửi** or **Gửi và chờ khách** (AC-20.3, AC-20.5). |
| 6 | Transfer (Staff) or reassign (Admin) opens SCR-23. |
| 7 | **Gợi ý trả lời**: a reply grounded in the shop's policies, shown beside the draft like a rewrite (AC-40.1, AC-40.2). Disabled when no active, reviewed article exists (AC-41.4). |
| 8 | Cited passages are quoted in ink (a person wrote them); the suggestion itself stays pencil, with numbered markers that point to each source (BR-21). |

| State | Source | Behavior |
|---|---|---|
| `classification-pending` | Classification pending | "AI đang phân loại…" in the label panel; the ticket is usable; summary not created yet. The page re-checks every 3 s for up to 30 s (DF-28). |
| `unclassified-low-confidence` | Unclassified (low confidence) | Badge, confidence 0,42 in grey, reason, manual triage form. |
| `unclassified-ai-error` | Unclassified (AI error or timeout) | Badge, "AI không phản hồi… (quá 10 giây)", manual triage form ([PNG](../images/staff/21b-ticket-handling-unclassified-ai-error.png)). |
| default | Priority raised by anger | Priority chip "Cao" with the note that it was raised from Medium. |
| `label-corrected` | Label corrected | Category chip turns solid, with "Trần Bình đã sửa. AI đề xuất: …". |
| `summary-loading` | Summary loading | Skeleton, "tối đa 20 giây", button disabled. |
| `summary-error` | Summary error or timeout | Inline error with **Thử lại**; nothing else changes. |
| `summary-outdated` | Summary outdated | New message highlighted; "Đã cũ" notice; greyed summary; **Tóm tắt lại** ([PNG](../images/staff/21d-ticket-handling-summary-outdated.png)). |
| `rewrite-loading` | Rewrite loading | Draft read-only; Rewrite and Send disabled. |
| `rewrite-result` | Rewrite result | Draft and rewrite side by side; **Dùng bản này** / **Bỏ qua**; "Chưa gửi gì cho khách" ([PNG](../images/staff/21c-ticket-handling-rewrite-result.png)). |
| `rewrite-error` | Rewrite error or timeout | Inline error; draft unchanged and still sendable. |
| `suggest-loading` | Suggestion loading | "Đang soạn gợi ý…"; draft read-only; Rewrite and Send disabled. |
| `suggest-result` | Suggestion result | Draft and suggestion side by side, the two cited passages below, **Dùng bản này** / **Bỏ qua**. The customer asked about Friday, but no policy promises a date, so the suggestion does not (AC-40.3) ([PNG](../images/staff/21f-ticket-handling-suggest-result.png)). |
| `suggest-no-match` | No relevant policy | Neutral notice "Không tìm thấy chính sách phù hợp…"; draft unchanged (AC-41.1). |
| `suggest-error` | Suggestion error or timeout | Inline error; draft unchanged and still sendable (AC-40.4). |
| `transfer` | BR-04 | SCR-23 lists active Staff with open-ticket counts; Admin can choose themselves ([PNG](../images/staff/21e-transfer-ticket.png)). |

### SCR-22 Dashboard — [`22-dashboard.html`](wireframes/22-dashboard.html) · roles `admin`, `staff` · [PNG admin](../images/admin/22-dashboard.png), [PNG staff](../images/staff/22-dashboard.png)

| # | Note |
|---|---|
| 1 | Date range, default last 30 days by creation date (DF-17). |
| 2 | Average first response time over tickets with a reply, plus tickets still waiting (AC-33.3). |
| 3 | Label correction rate with numerator/denominator and a unit grid (BR-10). |

| State | Source | Behavior |
|---|---|---|
| `empty` | Empty | Zeros and dashes, one empty-state card, no error (AC-33.5). |

## Administration

### SCR-30 Categories and SCR-32 — [`30-categories.html`](wireframes/30-categories.html) · [PNG](../images/admin/30-categories.png)

| # | Note |
|---|---|
| 1 | AI notice: the description is what AI reads (BR-13). |
| 2 | Hide instead of delete; old tickets keep the category (DF-18). |

| State | Source | Behavior |
|---|---|---|
| `edit` | — | SCR-32 edit form ([PNG](../images/admin/30b-edit-category.png)). |
| `form-error` | Validation error | Duplicate name (ignoring case) and missing description (AC-27.2, AC-27.3). |
| `hide-confirm` | Destructive confirmation | Names the category and the effect on customers, AI, and old tickets. |

### SCR-36 Policies and SCR-37 — [`36-policies.html`](wireframes/36-policies.html) · [PNG](../images/admin/36-policies.png)

The page says up front that customers never see it and that AI uses only active articles reviewed within 180 days (BR-20).

| # | Note |
|---|---|
| 1 | Add an article: title and body; AI quotes the body word for word (AC-37.1). |
| 2 | Overdue for review: dashed "Cần xem lại" chip, attention rule, and **Đánh dấu đã xem lại**; suggestions skip it until reviewed (AC-38.2, AC-38.3). |

| State | Source | Behavior |
|---|---|---|
| `edit` | — | SCR-37 for the overdue article; saving also counts as reviewed today ([PNG](../images/admin/36b-edit-policy.png)). |
| `form-error` | Validation error | Duplicate title (ignoring case) and missing body (AC-37.2, AC-37.3). |
| `hide-confirm` | Destructive confirmation | Names the article and says AI stops using it; the text is kept (AC-39.1). |
| `empty` | Empty | "Chưa có chính sách nào" explains that Staff's **Gợi ý trả lời** stays off until an article exists, with **Thêm chính sách**. |

### SCR-31 Users, SCR-33, SCR-34 and SCR-35 — [`31-users.html`](wireframes/31-users.html) · [PNG](../images/admin/31-users.png)

| # | Note |
|---|---|
| 1 | Create Staff only; role fixed (DF-13). |
| 2 | Lock / unlock; own account cannot be locked (AC-32.4). |
| 3 | "Đang nghỉ" is set and ended only here, by the Administrator; Staff rows only. There is no leave control on SCR-40, so Staff cannot change their own status (AC-36.5). |

| State | Source | Behavior |
|---|---|---|
| `create-staff` | — | SCR-33 form; the new Staff joins auto-assignment ([PNG](../images/admin/31b-create-staff.png)). |
| `lock-confirm` | Destructive confirmation | SCR-34 warns that 3 open tickets will be redistributed (DF-05) ([PNG](../images/admin/31c-lock-account.png)). |
| `leave-confirm` | Destructive confirmation | SCR-35: the Staff member can still log in but gets no new tickets or transfers; 2 open tickets will be redistributed and not moved back (DF-26) ([PNG](../images/admin/31d-set-on-leave.png)). "Kết thúc nghỉ" applies at once with a success toast. |
| `empty-filtered` | Empty (filtered) | "Không tìm thấy người dùng" with **Xóa bộ lọc**. |

## States without a dedicated variant

- **Server error** (general): same pattern as `summary-error` — a short brick notice with **Thử lại**, never technical details.
- **Unauthorized** (session ended): redirect to SCR-01 with the `locked` or a "phiên đăng nhập đã hết" message.
- **Conflict** (SCR-21, SCR-23): a brick notice above the reply box, "Ticket vừa được cập nhật. Tải lại để xem thay đổi." with **Tải lại**; the draft and the chosen status or labels stay as they were (BR-19).
- **Lost access while editing** (SCR-21): a neutral notice "Ticket này đã được chuyển cho người khác." with a link back to **Hàng đợi của tôi**; the draft stays in the reply box so it can be copied (BR-19).

**Related:** [Step index](README.md) · [Design system](01-design-system.md)

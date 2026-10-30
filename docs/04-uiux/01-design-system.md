# Design System

> Design status: MVP — Step 4 of 9, approved
>
> Implementation status: NOT STARTED

Source of truth: [`wireframes/assets/wireframe.css`](wireframes/assets/wireframe.css). Step 9 reuses these tokens.

## Concept: pencil and ink

Staff spend the day in a queue and must always know **what AI suggested** and **what a person decided**. The interface borrows from a paper support slip with margin notes:

- **Pencil** — anything proposed by AI is drawn with a **dashed violet** line: AI labels, the AI reason, the summary, the rewrite, and the whole AI column of the ticket page (the "pencil margin").
- **Ink** — anything a person confirmed or corrected is **solid** and neutral. When Staff correct a label, its chip changes from dashed violet to solid grey.

This is the one bold element. Everything else stays quiet: neutral surfaces, borders instead of shadows, one font family.

## Tokens

### Color

| Token | Hex | Role |
|---|---|---|
| `--pine` | `#173a33` | Brand: sidebar, primary buttons, single-series charts |
| `--pine-soft` | `#e2ece6` | Staff message bubbles, ticket stub |
| `--sage` | `#eaefea` | Canvas (page background) |
| `--paper` | `#ffffff` | Surfaces |
| `--graphite` | `#1d2925` | Text |
| `--moss` | `#5e6e68` | Secondary text, "Unclassified" |
| `--line` | `#d3dcd6` | Borders |
| `--pencil` / `--pencil-wash` | `#6a3fc9` / `#f1ecfc` | **AI only** — never used for anything a person did |
| `--brick` / `--brick-wash` | `#b3261e` / `#fbeceb` | Urgent priority, angry sentiment, errors, destructive actions |
| `--amber` | `#b26a00` | Status "In progress"; customer "waiting for your reply" |
| `--leaf` | `#2f7d4f` | Status "Resolved", active accounts |
| `--note` | `#f2b300` | Wireframe annotations only (yellow numbers), never product UI |

### Type

**Be Vietnam Pro** (OFL, bundled in `assets/fonts/`, Latin and Vietnamese subsets) for everything: it was designed for Vietnamese diacritics, which a generic sans renders poorly. Weights 400 / 500 / 600; tabular numbers everywhere.

| Use | Size / weight |
|---|---|
| Ticket title | 26 / 600, tracking −0.015em, max 36ch |
| Page title | 24 / 600 |
| Section title | 16 / 600 |
| Body, inputs | 14 / 400, line height 1.55 (1.6 in messages) |
| Secondary, labels | 13 / 400–500 |
| Meta, hints | 12 / 400 |

No all-caps labels; sentence case everywhere.

### Space and shape

Spacing steps: 4, 8, 12, 16, 20, 28, 40 px. Radius follows hierarchy: surfaces 12, controls 8, chips 6, status pills fully round. Shadows only on modals.

## Components

| Component | Notes |
|---|---|
| Sidebar (Staff, Admin) | Pine, icon + label, count badge, active item with a light bar; user and Log out at the bottom (D-14). |
| Portal top bar (Customer) | Shop name, "Yêu cầu của tôi", primary "Gửi yêu cầu mới", avatar (D-14). |
| Buttons | Primary (pine), secondary (outline), quiet (text), danger (brick). |
| **AI buttons** | Dashed violet outline with the white-on-violet **AI** mark: "Gợi ý trả lời", "Viết lại bằng AI", "Tóm tắt", "Tóm tắt lại". Solid violet only for accepting an AI result ("Dùng bản này"). |
| **AI label chip** | Dashed violet border, violet wash, small "AI" suffix. Corrected label: solid neutral chip. |
| Unclassified chip | Dashed grey, "Chưa phân loại". |
| Priority meter | 1–4 bars plus the word; `urgent` bars are brick. Never color alone. |
| Status pill | Dot + text: New (graphite dot), In progress (amber), Waiting (hollow ring), Resolved (leaf), Closed (muted). |
| Account status chip | "Hoạt động" (leaf), "Đang nghỉ" (neutral sage with a clock icon; amber stays reserved for ticket progress), "Đã khóa" (brick). |
| Confidence bar | Violet fill with the value (`0,86`); grey fill when below the threshold. |
| Pencil note | Dashed violet left rule for AI-written text (reason, summary). |
| **Citation** | A small violet numbered marker inside a suggestion, and below it a quoted policy passage with a solid graphite left rule: the source is ink because a person wrote it (D-25). |
| Review chip | Dashed grey "Cần xem lại" with a clock icon, like Unclassified: both wait for a person. |
| Message bubbles | Customer left on white; Staff right on pine-soft (the customer's own messages are on the right in the portal). |
| Composer | Card with header, borderless textarea, footer toolbar: AI rewrite left, Send / Send and wait right. |
| Tables | Light header, 12 px rows, attention rows (Unclassified) with a left rule. |
| Empty state | Round icon, one-line title, guidance, one action. |
| Notices | Error (brick wash), AI (pencil wash), neutral (sage). |
| Modals | Title + consequence sentence, quiet cancel, one primary action named by its effect ("Khóa tài khoản", not "OK"). |

## AI visual language (rules)

1. Violet appears **only** on AI output or AI actions.
2. Dashed = suggested by AI; solid = confirmed by a person.
3. Every AI element carries the text "AI", so the meaning never depends on color.
4. AI never looks like it has already acted: rewrites appear beside the draft, and nothing is sent until the person clicks **Gửi**.
5. Every AI failure shows what happened and what the person can do now (triage manually, retry, keep the draft).

## Charts (dashboard)

- Counts by status, category, and sentiment are **single-series horizontal bars** in pine, each bar labeled with its value; categories are text labels, so no categorical palette is needed.
- "Unclassified" uses a hatched texture; "Angry" uses brick plus a dot and its label.
- Bars have rounded data ends, recessive tracks, and native tooltips (`title`); each chart offers "Xem dạng bảng" (table view).
- The palette checker of the `dataviz` skill passes contrast for pine, brick, and violet; its lightness/chroma failures for pine apply to multi-series categorical palettes only, which these charts do not use.

## Accessibility and responsiveness

- Visible focus ring (2 px pine) on every control; labels on every input; icon-only buttons have `aria-label`.
- Status, priority, sentiment, and AI state always pair color with text or shape.
- Spinners respect `prefers-reduced-motion`.
- Breakpoints: ≤ 1180 px the AI column moves under the conversation; ≤ 760 px the sidebar becomes a top strip, tables scroll horizontally, and forms stack.

**Related:** [Step index](README.md)

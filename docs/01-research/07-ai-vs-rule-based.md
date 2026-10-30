# Why AI Instead of Rule-based

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

## Where rules break down

| Challenge | Example customer text | Rule-based (keywords and if/else) | LLM |
|---|---|---|---|
| No diacritics and abbreviations | "e ko dang nhap dc tk, bao sai mk hoai" (*"I can't log in, it keeps saying wrong password"*) | Every spelling variant must be listed ("đăng nhập", "dang nhap", "dn", "login"…) and lists never cover them all. | Understands this as a login or password problem. |
| Synonyms | "trả lại tiền", "hoàn tiền", "lấy lại tiền", "refund" (all mean *"refund"*) | Each synonym must be added to the keyword list by hand. | Maps all of them to the refund or billing category. |
| Several issues in one ticket | "Đơn #123 giao trễ 5 ngày mà còn bị trừ tiền 2 lần" (*"Order #123 arrived 5 days late and I was charged twice"*) | The first matching rule wins, often the less important issue. | Picks the main category and explains why in `reason`. |
| Priority depends on context | "Mai 8h shop mở bán mà trang thanh toán lỗi" (*"Our sale opens at 8 a.m. tomorrow and the payment page is broken"*) vs. "Không gấp đâu, khi nào rảnh xem giúp lỗi hiển thị" (*"Not urgent, check the display bug when you have time"*) | The keyword "lỗi" (*error*) gives both the same priority; "gấp" (*urgent*) even raises the second one. | First is `urgent`, second is `low`. |
| Sarcasm and tone | "Tuyệt vời thật, lần thứ 3 giao sai hàng rồi đấy" (*"Just great, that's the third wrong delivery"*) | "tuyệt vời" (*great*) scores as positive. | Recognizes it as `angry`. |
| New categories | Admin adds a "Warranty" category. | New keyword lists must be written, tested, and deployed. | Uses the new category right away from its description. |
| Summary and reply rewrite | A 15-message thread; a curt draft reply. | Not possible: these are language generation tasks. | Core strength. |

## Where rules stay (hybrid design)

AI is used **only where language understanding is needed**. Deterministic policies stay in code, so they are predictable and testable:

| Policy | Implemented as |
|---|---|
| If the customer chose a category, it is kept; AI sets only priority and sentiment. | Rule |
| `angry` raises priority by at least one level (`urgent` stays `urgent`). | Rule applied after the AI result |
| Confidence below the threshold (configurable, default 0.6) gives "Unclassified". | Rule |
| AI output must match the JSON schema, the enums, and the active category list. | Validation rule |
| An AI error or timeout gives "Unclassified" and ticket creation continues. | Rule |
| AI never sends a reply. | Design constraint: there is no code path for it |
| Auto-assignment of new tickets. | Rule (fewest open tickets, D-07; warm-up after leave, D-21) |

## Costs of using AI, and how they are handled

AI brings a per-call cost (R-07), latency and outages (R-02), non-deterministic answers (R-01, R-04, R-05), and data-privacy concerns (R-06). The hybrid design and the mitigations in [Risks](06-risks.md) keep these costs bounded. The label correction rate (G-04) makes AI quality visible, so the owner can decide with data whether AI pays off.

**Related:** [Step index](README.md)

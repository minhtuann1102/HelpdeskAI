# MoSCoW Prioritization

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

**Every Must and Should story is planned for this MVP.** MoSCoW only sets the build order and shows what to cut first if time runs out.

| Priority | Stories | Count |
|---|---|---|
| **Must**: the core flow cannot work without it (a customer submits, the ticket gets an owner and AI labels, Staff handle it with AI classification, summary, and rewrite) | US-01, US-02, US-03, US-06, US-07, US-08, US-11, US-12, US-13, US-15, US-16, US-17, US-19, US-20, US-21, US-23, US-25 | 17 |
| **Should**: important and planned, but the core flow still works without it | US-04, US-05, US-09, US-10, US-14, US-18, US-22, US-24, US-26, US-27, US-28, US-29 | 12 |
| **Could** | None. Every remaining item was either in the brief or explicitly requested. | 0 |
| **Won't** (this release) | W-01 real-time chat · W-02 customer-facing knowledge base or help centre (the internal policy list is in scope: D-25) · ~~W-03 RAG reply suggestions~~ moved into scope (D-25) · W-04 duplicate detection · W-05 email/Zalo intake (notification emails are in scope: D-19) · W-06 automatic SLA · W-07 AI sending replies · W-08 chatbots or autonomous AI ([Future work](../01-research/09-future-work.md)) | 7 |

Two Must stories have a **Should part** that is cut first, before the rest of the story: attachments in US-06 (AC-06.6–AC-06.9) and hiding categories in US-23 (AC-23.7–AC-23.9).

**Related:** [Step index](README.md)

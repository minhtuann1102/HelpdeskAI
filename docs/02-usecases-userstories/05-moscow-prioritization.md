# MoSCoW Prioritization

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

**Every Must and Should story is planned for this MVP.** MoSCoW only sets the build order and shows what to cut first if time runs out.

| Priority | Stories | Count |
|---|---|---|
| **Must**: the core flow cannot work without it (a customer submits, the ticket gets an owner and AI labels, Staff handle it with AI classification, summary, and rewrite) | US-01, US-02, US-05, US-06, US-07, US-08, US-10, US-12, US-13, US-14, US-16, US-17, US-18, US-20, US-22, US-24, US-25 | 17 |
| **Should**: important and planned, but the core flow still works without it | US-03, US-04, US-09, US-11, US-15, US-19, US-21, US-23, US-26, US-27, US-28, US-29 | 12 |
| **Could** | None. Every remaining item was either in the brief or explicitly requested. | 0 |
| **Won't** (this release) | W-01 real-time chat · W-02 customer-facing knowledge base or help centre (the internal policy list is in scope: D-25) · ~~W-03 RAG reply suggestions~~ moved into scope (D-25) · W-04 duplicate detection · W-05 email/Zalo intake (notification emails are in scope: D-19) · ~~W-06 automatic SLA~~ moved into scope as reply deadlines; escalation stays out (D-35) · W-07 AI sending replies · W-08 chatbots or autonomous AI ([Future work](../01-research/09-future-work.md)) | 6 |

Several Must stories have a **Should part** that is cut first, before the rest of the story:

- Attachments in US-06 (AC-06.6–AC-06.9) and hiding categories in US-20 (AC-20.7–AC-20.9).
- Reply deadlines (D-35): US-10 (AC-10.6–AC-10.11), US-12 (AC-12.5), US-13 (AC-13.8), US-14 (AC-14.5–AC-14.6), US-16 (AC-16.5), and US-24 (AC-24.17). Without them, the queue keeps the priority order of AC-10.2.
- Confidence bands (D-36): US-10 (AC-10.12), US-12 (AC-12.6), and US-16 (AC-16.6).

**Related:** [Step index](README.md)

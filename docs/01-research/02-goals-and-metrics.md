# Goals and Success Metrics

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

The targets below are **proposed values for a pilot period**. There is no current baseline because requests are not recorded today, so the first two weeks of use serve as the baseline.

| ID | Goal | Solves | Metric | Target | How it is measured |
|---|---|---|---|---|---|
| G-01 | No request is lost. | P-01 | Share of tickets that have an assignee within 1 minute of creation, while at least one Staff account is active. | 100% | `assigned_at − created_at` per ticket. |
| G-02 | AI never blocks ticket creation. | P-01 | Share of valid ticket submissions that are saved even when the LLM call fails or times out. | 100% | Fault-injection test (LLM disabled or slowed beyond the timeout). |
| G-03 | Faster first response. | P-02, P-03 | Average first response time (ticket created → first Staff or Admin reply), counted in working hours (DF-32). | ≤ 4 hours overall; ≤ 1 hour for `urgent` | Admin dashboard (BR-16). Each reply also has its own deadline (G-10). |
| G-04 | Trustworthy AI triage. | P-02 | Label correction rate: AI-labelled tickets whose final category or priority differs from the AI label, divided by all AI-labelled tickets. | ≤ 25% | Admin dashboard. Formula: [BR-10](../requirements/business-rules.md#br-10--label-correction-rate). |
| G-05 | Low fallback rate. | P-02 | Share of tickets that end up "Unclassified" because of low confidence or an AI error. | ≤ 15% | Count of AI results below the threshold or failed. |
| G-06 | Fast catch-up and drafting. | P-03, P-04 | 95th-percentile latency of the summary, rewrite, and reply suggestion actions. | ≤ 10 s each | Server-side timing of each AI call. |
| G-07 | Humans stay in control. | P-04 | Replies sent to a customer without an explicit Staff or Admin send action. | 0 | By design (no send path from AI) and verified by test. |
| G-08 | Management has data. | P-05 | Admin can see ticket counts by status, category, and sentiment, the response times, the share of replies on time, and the label correction rate without manual work. | Available from live data on page load | Admin dashboard. |
| G-09 | Grounded reply suggestions. | P-03, P-04 | **Use rate:** suggestions accepted with "Dùng bản này" ÷ suggestions shown. **Citation accuracy:** sampled suggestions whose facts all match the cited articles ÷ suggestions sampled. | Use rate ≥ 50%; citation accuracy ≥ 95% | Suggestion log (shown, accepted, cited articles); a monthly manual review of 20 sampled suggestions. Not shown on the dashboard. |
| G-10 | Replies on time. | P-02, P-03 | Share of reply deadlines met: replies sent on time ÷ (on time + late). A deadline that the ticket's closing cancelled before it passed is left out (BR-22). | ≥ 90% overall and for each priority | Admin dashboard (BR-16). |

**Related:** [Step index](README.md)

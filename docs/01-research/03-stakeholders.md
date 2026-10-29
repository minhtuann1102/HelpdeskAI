# Stakeholders

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

| Stakeholder | Relation to the system | Interests and needs | Influence |
|---|---|---|---|
| **Customer** | Actor: registers, submits and follows tickets. | Submitting a request easily, knowing its status, getting a fast and correct answer. | Medium: unhappy customers leave. |
| **Staff** | Actor: handles the tickets assigned to them. | A clear personal queue, knowing what is urgent, catching up quickly, writing good replies fast, a fair workload. | High: daily user; adoption depends on them. |
| **Admin** | Actor: manages users and categories, sees everything, can act on any ticket. | Visibility over all tickets and Staff, control over accounts and categories, numbers to judge whether AI is worth it. | High: decides and configures. |
| **Business owner** | Sponsor; often the same person as Admin. | Fewer lost customers, lower support cost, predictable AI cost. | High: pays for and approves the product. |
| **LLM provider** | External system called for classification, summary, and rewrite. | API usage within its terms. | Medium: availability, latency, price, and data-processing terms affect the product. |
| **Project team** (BA / SA / developer) | Builds the MVP. | Clear scope that fits about one week, approved step by step. | High during delivery. |

**Related:** [Step index](README.md)

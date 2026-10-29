# Context and Problem

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

## Context

Helpdesk AI is a **customer service** help desk for **small businesses** (assumption: roughly 5–50 employees, with 1–5 people handling customer support). Tickets come from the business's external customers, not from its own employees, so this is not an internal IT service desk (D-06).

The product works for any kind of small business, because Admin defines the categories. This documentation uses one sample domain throughout: **a small online shop** whose customers ask about orders, shipping, payments and refunds, returns and warranty, and their accounts.

Today these businesses receive support requests through many disconnected channels: phone calls, Zalo, Facebook Messenger, personal email, and walk-ins. Each request lives in the inbox or phone of whoever received it. There is no shared list, no owner per request, no history, and no numbers.

## Problem statement

> Small businesses receive customer requests through scattered channels and have no single place to capture, prioritize, assign, and measure them. As a result, requests are lost, urgent issues wait as long as routine ones, replies are slow and inconsistent, and the owner has no data to manage support.

| ID | Problem | Root cause | Consequence |
|---|---|---|---|
| P-01 | Requests are lost. | Requests are spread across channels and personal devices; nobody is clearly responsible for each one. | Customers never get an answer; churn and bad reviews. |
| P-02 | Urgent requests cannot be told apart from routine ones. | Requests are handled first-come-first-served or by whoever complains loudest; nobody reads every message closely. | Angry or blocked customers wait while trivial questions are answered. |
| P-03 | Responses are slow. | Staff must reread long back-and-forth threads to catch up, especially after a handover; there is no history in one place. | Long waits; repeated questions to the customer. |
| P-04 | Reply quality is inconsistent. | Replies are written in a hurry, sometimes curt or unclear. | Customer frustration grows even when the issue is solved. |
| P-05 | Management has no data. | Nothing is recorded in a structured way. | The owner cannot answer "How many requests? About what? How fast do we respond? Are customers upset?" |

## Product vision

Helpdesk AI turns every customer request into a **ticket** with an owner, a status, and a history. AI helps at three points:

1. **On creation:** it classifies the ticket (category, priority, sentiment) so urgent and angry tickets surface first.
2. **On demand:** it summarizes long tickets so Staff can catch up in seconds.
3. **On demand:** it rewrites a Staff draft into a polite, clear reply.

**AI proposes, rules enforce, humans decide.** AI never blocks ticket creation and never sends anything to a customer by itself.

**Related:** [Step index](README.md)

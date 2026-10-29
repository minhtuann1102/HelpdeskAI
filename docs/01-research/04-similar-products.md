# Similar Products

> Design status: MVP — Step 1 of 9, approved
>
> Implementation status: NOT STARTED

## Overview

| | Zendesk | Freshdesk (Freshworks) | Zoho Desk |
|---|---|---|---|
| Positioning | Market leader for mid-size and large support teams. | Popular with small and mid-size teams. | Part of the wider Zoho business suite; price-competitive. |
| Ticketing | Full ticketing, customer portal, omnichannel (email, chat, voice, social, messaging). | Full ticketing, portal, omnichannel. | Full ticketing, portal, omnichannel. |
| Assignment | Rule-based routing, including omnichannel routing by capacity. | Round-robin and load-based assignment. | Round-robin and load-based assignment. |
| AI features | Zendesk AI: intelligent triage (intent, sentiment, language), generative tools to expand or change the tone of replies, ticket summaries. | Freddy AI: summaries, rephrasing and tone improvement of replies, field suggestions (type, priority, group). | Zia: sentiment analysis, auto-tagging, reply assistance, summaries. |
| Typical limits for our target | Broad and configuration-heavy for a 3-person team. Advanced AI is a paid add-on or limited to higher plans. Per-seat pricing in USD. | Advanced AI is a paid add-on or limited to higher plans. Many features to configure. | Many modules to set up. The best value comes from adopting the wider Zoho suite. |

Sources: the products' official websites (zendesk.com, freshworks.com/freshdesk, zoho.com/desk). Product features and plans change often, so recheck before citing externally.

## Key learnings

1. **Triage, summary, and reply rewriting are now standard AI features** in mature help desks. Our three AI features match what the market has validated.
2. **Auto-assignment (round-robin or load-based) is standard.** Decision D-04 follows the same pattern.
3. Mature products are **omnichannel and broad**. That breadth is their strength and also their cost: setup effort and price per seat.
4. ML triage that **learns from historical tickets** needs data a new small business does not have yet.

## How Helpdesk AI differs

Helpdesk AI does not compete on breadth. It has no omnichannel intake, no knowledge base, and no chatbot. It is a focused MVP built on six principles:

| # | Differentiator | How |
|---|---|---|
| 1 | **Works from day one, no training data** | Classification is zero-shot: the LLM chooses from the active categories using the **descriptions Admin writes**. Adding a category means writing a description, not training a model or writing keyword rules. |
| 2 | **Vietnamese-first** | Built for customers who write without diacritics, use abbreviations, and mix several issues in one message. |
| 3 | **Measurable trust in AI** | Stores the original AI label, the final label, the confidence, and the reason. The dashboard shows the label correction rate, so the owner can see whether AI helps. |
| 4 | **Human-in-the-loop by design** | Low confidence gives "Unclassified" instead of a guess. A rewrite is only a draft that Staff review and edit. AI never sends anything. |
| 5 | **Resilient** | An AI failure or timeout never blocks ticket creation. |
| 6 | **Predictable cost** | One LLM call per ticket for classification. Summary and rewrite run only when Staff click a button. |

**Related:** [Step index](README.md)

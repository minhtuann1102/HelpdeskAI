# 04 — UI/UX Wireframes

> Design status: MVP — Step 4 of 9, approved
>
> Implementation status: NOT STARTED

Step 4 turns the [information architecture](../03-information-architecture/README.md) into high-fidelity wireframes: static HTML with one shared stylesheet, exported to PNG. They show where the AI labels and their confidence band, the reply deadlines, the **Summarize** button, the **Gợi ý trả lời** (reply suggestion) button, and the **Rewrite** button live, and how every screen behaves when it is empty, loading, failing, or when AI fails. Inputs: [Screen inventory](../03-information-architecture/04-screen-inventory.md), [UI states](../03-information-architecture/06-ui-states-and-accessibility.md), and [Acceptance criteria](../02-usecases-userstories/04-acceptance-criteria.md). It is the input for Step 9 (implementation).

| File | Content |
|---|---|
| [00-decisions.md](00-decisions.md) | Decisions D-15..D-18; defaults DF-22..DF-24 |
| [01-design-system.md](01-design-system.md) | Design concept, tokens (color, type, space, shape), components, AI visual language, chart rules |
| [02-screen-notes.md](02-screen-notes.md) | Per screen: purpose, annotated elements, and every state (empty, loading, error, AI error) |
| [wireframes/index.html](wireframes/index.html) | Gallery: open every screen and switch states and roles. Open it in a browser from a local clone; GitHub shows `.html` files as source code. |
| [`../images/`](../images/) | PNG exports by role: `common/`, `customer/`, `staff/`, `admin/` |

**Related:** [README](../../README.md) · [Previous: Information architecture](../03-information-architecture/README.md) · [Master traceability](../traceability/master-traceability.md)

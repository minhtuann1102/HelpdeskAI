# Decisions and Defaults

> Design status: MVP — Step 4 of 9, approved
>
> Implementation status: NOT STARTED

## Decisions made in this step

| ID | Decision | Source |
|---|---|---|
| D-15 | **Format:** plain static HTML pages with one shared stylesheet (`wireframes/assets/wireframe.css`), a small state switcher (`states.js`), and an inline icon sprite (`icons.js`). Every screen is exported to PNG under `docs/images/<role>/`. No framework, no network needed: the font is bundled. | User (option A) |
| D-16 | **Fidelity:** high-fidelity mockups rather than grey boxes, so the PNGs can sit in the README like the reference repo's screenshots. Designed with the `frontend-design` skill (`.claude/skills/frontend-design/`). | User ("can it look better?") |
| D-17 | **UI copy is Vietnamese**, like the reference repo's UI; documentation, annotations, and file names stay English (exception to D-01). | User (accepted the Vietnamese preview) |
| D-18 | **README §2.3 shows only the three core branches** of the mind map: Submit & track tickets, Ticket handling (Staff), and AI assistance. All other screens live in this folder and the gallery. | User |

## Defaults pending confirmation

| ID | Default |
|---|---|
| DF-22 | Customer-facing wording for `Waiting for Customer` is "Chờ bạn phản hồi" (*waiting for your reply*); Staff see "Chờ khách". |
| DF-23 | The Administrator's "All tickets" badge shows the number of Unassigned tickets and is hidden when it is zero (auto-assignment makes Unassigned rare: DF-04). |
| DF-24 | Sample data uses a fictional shop, "Lá Cọ Home", selling rattan and palm-leaf homeware, with fictional people and `example` email domains. |

**Related:** [Step index](README.md)

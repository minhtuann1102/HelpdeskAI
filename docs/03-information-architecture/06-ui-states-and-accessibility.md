# UI/UX States and Accessibility

> Design status: MVP — Step 3 of 9, approved
>
> Implementation status: NOT STARTED

## UI/UX state contract

### General states

| State | Required behavior |
|---|---|
| Initial loading | Keep the page shell; show a skeleton for the affected list or panel. |
| Empty | Say that nothing exists yet and offer the permitted next action (for example "Submit a ticket"); distinguish an empty list from "no results for these filters" (with Clear filters). |
| Validation error | Keep entered values, show the message next to the field, and focus the first error. |
| Server error | Show a short message with Retry; never show technical details. |
| Unauthorized (session ended or account locked) | Clear the session and go to SCR-01 with a message. |
| Forbidden | Show SCR-90 with a link back to the role's home page. |
| Saving | Disable the submit button to prevent double submission and show progress. |
| Success | Confirm the action, close the modal if any, and refresh the affected list. |
| Destructive confirmation | Name the item and the effect: closing a ticket is final; locking a Staff member redistributes their open tickets; hiding a category removes it from the form and AI. |

### AI states

| State | Where | Required behavior |
|---|---|---|
| Classification pending | SCR-20, SCR-21 | If the labels are not ready yet, show a "Classifying…" chip instead of empty labels; the ticket is usable. Customers never see it. |
| Unclassified (low confidence) | SCR-20, SCR-21 | "Unclassified" badge; the label panel shows the confidence and reason and asks for manual triage. |
| Unclassified (AI error or timeout) | SCR-20, SCR-21 | "Unclassified" badge; the label panel says "AI was unavailable" and asks for manual triage. |
| Priority raised by anger | SCR-20, SCR-21 | The priority chip shows that it was raised because of angry sentiment (AC-15.3). |
| Label corrected | SCR-20, SCR-21 | The "AI" marker disappears from the corrected label; the panel still shows the original AI label. |
| Summary loading | SCR-21 | Spinner in the summary panel; Summarize is disabled; the thread stays readable. |
| Summary error or timeout | SCR-21 | Inline error with Retry; nothing else on the page changes. |
| Summary outdated | SCR-21 | "Outdated" tag with the generation time and a Regenerate button. |
| Rewrite loading | SCR-21 | Spinner on Rewrite; Rewrite and Send are disabled until the result or an error arrives. |
| Rewrite result | SCR-21 | Rewrite shown next to the original draft with **Use** and **Discard**; nothing is sent. |
| Rewrite error or timeout | SCR-21 | Inline error; the draft is unchanged and can still be sent. |

## Responsive and accessibility rules

- The layout works at phone width (A-06). Tables become stacked cards on narrow screens without hiding data permanently.
- On narrow screens SCR-21 stacks: header, conversation, reply box, then the AI panels (collapsible).
- Priority, sentiment, status, and AI states are never shown by colour alone; each chip has text.
- Every input has a visible label; icon-only buttons have accessible names.
- Modals fit the viewport, trap keyboard focus, close with `Escape` unless a submission is running, and return focus to the button that opened them.
- Keyboard users can reach navigation, filters, table rows, the reply box, and AI buttons in a predictable order.
- Dates and times use one explicit format (`dd/MM/yyyy HH:mm`).

**Related:** [Step index](README.md)

# Primary User Flows

> Design status: MVP — Step 3 of 9, approved
>
> Implementation status: NOT STARTED

## Customer submits a ticket

The customer's path never waits for AI: the ticket is saved and confirmed first, and assignment and classification run in the background (BR-03, BR-08).

```mermaid
flowchart TD
    start(["Customer needs help"]) --> session{"Logged in?"}
    session -->|"No, has an account"| login["SCR-01 Login"]
    session -->|"No, new customer"| register["SCR-02 Register"]
    session -->|"Yes"| myTickets["SCR-10 My Tickets"]
    login --> myTickets
    register -->|"logged in automatically"| myTickets
    myTickets -->|"Submit a ticket"| form["SCR-11 Submit Ticket<br/>title, description,<br/>optional category, attachments"]
    form --> valid{"Input valid?"}
    valid -->|"No: field errors, input kept"| form
    valid -->|"Yes"| saved[("Ticket saved<br/>status New")]
    saved --> detail["SCR-12 Ticket Detail<br/>confirmation shown"]

    subgraph background["System, in the background"]
        direction TB
        hasStaff{"Active Staff exists?"}
        assigned["Assigned to the Staff<br/>with the fewest open tickets"]
        unassigned["Unassigned<br/>Administrator assigns"]
        classify["AI classification<br/>one LLM call"]:::ai
        result{"Valid result and<br/>confidence ≥ 0.6?"}
        labelled["Labels set<br/>angry raises priority"]
        unclassified["Unclassified<br/>manual triage"]
        hasStaff -->|"Yes"| assigned
        hasStaff -->|"No"| unassigned
        classify --> result
        result -->|"Yes"| labelled
        result -->|"No, error, or timeout"| unclassified
    end

    saved -.-> hasStaff
    saved -.-> classify

    detail --> follow["Customer follows the ticket<br/>on SCR-10 and SCR-12"]
    follow --> staffReply{"What did Staff do?"}
    staffReply -->|"Asked for information"| answer["Customer replies<br/>Waiting for Customer → In Progress"]
    staffReply -->|"Marked Resolved"| solved{"Problem solved?"}
    solved -->|"Yes"| close["Customer closes the ticket<br/>SCR-13 confirm"]
    solved -->|"No"| reopen["Customer replies<br/>Resolved → In Progress"]
    answer --> follow
    reopen --> follow

    classDef ai fill:#7b3fbf,color:#fff,stroke:#5a2d8c
    style background fill:#f8fbff,stroke:#1168bd,stroke-dasharray:5 5
```

## Staff handles a ticket with AI

The three AI features meet here: labels from classification, Summarize, and Rewrite. Every AI step has a failure path that leaves the Staff member able to continue manually.

```mermaid
flowchart TD
    start(["Staff logs in"]) --> queue["SCR-20 My queue<br/>Unclassified first, then urgent → low"]
    queue --> open["Open a ticket<br/>SCR-21 Ticket Handling"]
    open --> unclassified{"Unclassified?"}
    unclassified -->|"Yes"| triage["Set category and priority<br/>manual triage"]
    unclassified -->|"No"| labelsOk{"AI labels correct?"}
    labelsOk -->|"No"| correct["Correct the labels<br/>AI label kept for the metric"]
    labelsOk -->|"Yes"| needSummary{"Long thread or<br/>just transferred?"}
    triage --> needSummary
    correct --> needSummary

    needSummary -->|"Yes"| summarize["Click Summarize"]:::ai
    needSummary -->|"No"| draft["Write a draft reply"]
    summarize --> summaryOk{"AI answered<br/>within 20 s?"}
    summaryOk -->|"Yes"| readSummary["Read the 3–4 line summary"]
    summaryOk -->|"No"| readThread["Error with Retry<br/>read the thread instead"]
    readSummary --> draft
    readThread --> draft

    draft --> polish{"Polish the wording?"}
    polish -->|"Yes"| rewrite["Click Rewrite"]:::ai
    polish -->|"No"| sendChoice{"How to send?"}
    rewrite --> rewriteOk{"AI answered<br/>within 20 s?"}
    rewriteOk -->|"Yes"| compare["Compare with the draft<br/>Use, edit, or discard"]
    rewriteOk -->|"No"| keepDraft["Error shown<br/>draft unchanged"]
    compare --> sendChoice
    keepDraft --> sendChoice

    sendChoice -->|"Send"| sent["Reply sent<br/>first reply: New → In Progress"]
    sendChoice -->|"Send and wait"| waiting["Reply sent<br/>Waiting for Customer"]
    sent --> outcome{"Issue solved?"}
    outcome -->|"Yes"| resolved["Set Resolved"]
    outcome -->|"Needs a colleague"| transfer["SCR-23 Transfer<br/>ticket leaves my queue"]
    outcome -->|"Not yet"| back(["Back to SCR-20"])
    waiting --> back
    resolved --> back
    transfer --> back

    classDef ai fill:#7b3fbf,color:#fff,stroke:#5a2d8c
```

**Related:** [Step index](README.md)

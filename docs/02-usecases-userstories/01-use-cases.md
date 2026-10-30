# Actors and Use Cases

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

## Actors and roles

| Role | Display name in UI | Description |
|---|---|---|
| — | User (not shown) | Abstract actor: anyone with an account. It groups the use cases all roles share and is not a role of its own (D-39). |
| `CUSTOMER` | Customer | External customer of the shop. Registers, submits and tracks own tickets. |
| `STAFF` | Staff | Support employee. Handles the tickets assigned to them. |
| `ADMIN` | Administrator | Everything Staff can do, on **all** tickets, plus administration (D-03). |
| — | LLM Provider | External system called for classification, summary, rewrite, and reply suggestion. |
| — | Email Service | External system that delivers notification emails to customers (D-19). |
| — | System | Runs automatic behaviour (classification, auto-assignment, email notification) triggered by other use cases. |

## Role × use case matrix

| Use case | Customer | Staff | Admin |
|---|---|---|---|
| UC-01 Log in, UC-02 Log out | ✓ | ✓ | ✓ |
| UC-03 Update profile, UC-04 Change password | ✓ | ✓ | ✓ |
| UC-05 Register | ✓ (as visitor) | | |
| UC-06 Submit ticket | ✓ | | |
| UC-07 View own tickets | Own | | |
| UC-08 Reply to own ticket | Own | | |
| UC-09 Close own ticket | Own | | |
| UC-10 View ticket queue | | Assigned to me | All tickets |
| UC-11 Search and filter tickets | | Assigned to me | All tickets |
| UC-12 View ticket details | | Assigned to me | All tickets |
| UC-13 Reply to customer | | Assigned to me | All tickets |
| UC-14 Change ticket status | | Assigned to me | All tickets |
| UC-15 Transfer or reassign ticket | | Transfer own | Reassign any |
| UC-16 Correct AI labels | | Assigned to me | All tickets |
| UC-17 Summarize ticket | | Assigned to me | All tickets |
| UC-18 Rewrite reply | | Assigned to me | All tickets |
| UC-29 Suggest reply from policies | | Assigned to me | All tickets |
| UC-19 View dashboard | | Personal | System-wide |
| UC-20 Manage categories | | | ✓ |
| UC-21 View user list | | | ✓ |
| UC-22 Create Staff account | | | ✓ |
| UC-23 Lock or unlock account | | | ✓ |
| UC-27 Set Staff on leave or back | | | ✓ |
| UC-28 Manage policy articles | | | ✓ |
| UC-24 Classify ticket, UC-25 Auto-assign ticket | System | System | System |
| UC-26 Notify customer by email | Receives the email | System | System |

Menus and buttons are **not displayed** when the user lacks permission. Unauthorized URL access shows an "Access denied" page.

## Use case diagram

Every use case is a separate node, grouped by module inside the system boundary. UC-24, UC-25, and UC-26 have no direct actor; they are triggered by other use cases (see [Included and extending use cases](#included-and-extending-use-cases)). Thick arrows marked «generalize» point from a child actor to the parent whose use cases it inherits (D-39).

```mermaid
flowchart LR
    subgraph left["Actors"]
        direction TB
        user["<span style='font-size:40px'>👤</span><br/><b>User</b>"]
        customer["<span style='font-size:40px'>👤</span><br/><b>Customer</b>"]
        staff["<span style='font-size:40px'>👤</span><br/><b>Staff</b>"]
        admin["<span style='font-size:40px'>👤</span><br/><b>Administrator</b>"]
    end

    subgraph system["Helpdesk AI — System Boundary"]
        direction TB
        subgraph access["Access and profile"]
            direction LR
            uc01["UC-01 Log in"]
            uc02["UC-02 Log out"]
            uc03["UC-03 Update Profile"]
            uc04["UC-04 Change Password"]
            uc05["UC-05 Register"]
        end
        subgraph customerTickets["Customer tickets"]
            direction LR
            uc06["UC-06 Submit Ticket"]
            uc07["UC-07 View Own Tickets"]
            uc08["UC-08 Reply to Own Ticket"]
            uc09["UC-09 Close Own Ticket"]
        end
        subgraph handling["Ticket handling and AI"]
            direction LR
            uc10["UC-10 View Ticket Queue"]
            uc11["UC-11 Search and Filter"]
            uc12["UC-12 View Ticket Details"]
            uc13["UC-13 Reply to Customer"]
            uc14["UC-14 Change Status"]
            uc15["UC-15 Transfer or Reassign"]
            uc16["UC-16 Correct AI Labels"]
            uc17["UC-17 Summarize Ticket"]
            uc18["UC-18 Rewrite Reply"]
            uc29["UC-29 Suggest Reply from Policies"]
            uc19["UC-19 View Dashboard"]
        end
        subgraph administration["Administration"]
            direction LR
            uc20["UC-20 Manage Categories"]
            uc21["UC-21 View User List"]
            uc22["UC-22 Create Staff Account"]
            uc23["UC-23 Lock or Unlock Account"]
            uc27["UC-27 Set Staff On Leave"]
            uc28["UC-28 Manage Policy Articles"]
        end
        subgraph automatic["Automatic (System)"]
            direction LR
            uc24["UC-24 Classify Ticket"]
            uc25["UC-25 Auto-assign Ticket"]
            uc26["UC-26 Notify Customer by Email"]
        end
    end

    customer ==>|"«generalize»"| user
    staff ==>|"«generalize»"| user
    admin ==>|"«generalize»"| staff

    user --> uc01 & uc02 & uc03 & uc04
    customer --> uc05 & uc06 & uc07 & uc08 & uc09
    staff --> uc10 & uc11 & uc12 & uc13 & uc14 & uc15 & uc16 & uc17 & uc18 & uc29 & uc19
    admin --> uc20 & uc21 & uc22 & uc23 & uc27 & uc28

    classDef actor fill:none,stroke:none,color:#111
    classDef usecase fill:#1168bd,color:#fff,stroke:#0b4f9e
    classDef ai fill:#7b3fbf,color:#fff,stroke:#5a2d8c
    class user,customer,staff,admin actor
    class uc01,uc02,uc03,uc04,uc05,uc06,uc07,uc08,uc09,uc10,uc11,uc12,uc13,uc14,uc15,uc16,uc19,uc20,uc21,uc22,uc23,uc25,uc26,uc27,uc28 usecase
    class uc17,uc18,uc24,uc29 ai
    style left fill:#fff,stroke:#bbb,stroke-dasharray:5 5
    style system fill:#f8fbff,stroke:#1168bd,stroke-dasharray:5 5
```

Purple nodes use the LLM Provider.

**What the generalization means.** It says only which use cases an actor can start. Customer and Staff inherit UC-01..UC-04 from User; Administrator inherits the use cases of Staff, and through them those of User, with a wider scope shown in the [role × use case matrix](#role--use-case-matrix). UC-05 Register stays with Customer because a visitor has no account yet.

An Administrator is **not** a kind of Staff in the rules or the data: an Administrator is never auto-assigned (DF-03), never on leave (BR-18), and not listed as a transfer target (BR-04). All accounts share one table with a `role` column (D-29).

### Included and extending use cases

```mermaid
flowchart LR
    submit["UC-06 Submit Ticket"]
    reply["UC-08 Reply to Own Ticket"]
    lock["UC-23 Lock or Unlock Account"]
    leave["UC-27 Set Staff On Leave"]
    rewrite["UC-18 Rewrite Reply"]
    suggest["UC-29 Suggest Reply from Policies"]:::ai
    staffReply["UC-13 Reply to Customer"]
    changeStatus["UC-14 Change Status"]
    summarize["UC-17 Summarize Ticket"]
    classify["UC-24 Classify Ticket"]:::ai
    assign["UC-25 Auto-assign Ticket"]:::shared
    notify["UC-26 Notify Customer by Email"]:::shared
    llm(["LLM Provider"]):::external
    email(["Email Service"]):::external

    submit -.->|"«include»"| classify
    submit -.->|"«include»"| assign
    lock -.->|"«include» when a Staff with open tickets is locked"| assign
    leave -.->|"«include» when a Staff with open tickets goes on leave"| assign
    reply -.->|"«include» when reopening a ticket whose assignee is locked or on leave"| assign
    rewrite -.->|"«extend»"| staffReply
    suggest -.->|"«extend»"| staffReply
    staffReply -.->|"«include»"| notify
    changeStatus -.->|"«include»"| notify

    classify --> llm
    summarize --> llm
    rewrite --> llm
    suggest --> llm
    notify --> email

    classDef shared fill:#1168bd,color:#fff,stroke:#0b4884
    classDef ai fill:#7b3fbf,color:#fff,stroke:#5a2d8c
    classDef external fill:#e8f1fc,color:#123,stroke:#3a7bd5
```

Administrator can perform UC-10..UC-19 and UC-29 on **all** tickets; Staff only on tickets currently assigned to them (D-09).

## Use cases by actor

| Actor | Use cases |
|---|---|
| User (abstract) | UC-01 Log in · UC-02 Log out · UC-03 Update profile · UC-04 Change password |
| Customer | Inherits User · UC-05 Register · UC-06 Submit ticket · UC-07 View own tickets · UC-08 Reply to own ticket · UC-09 Close own ticket |
| Staff | Inherits User · UC-10 View ticket queue · UC-11 Search and filter · UC-12 View ticket details · UC-13 Reply to customer · UC-14 Change status · UC-15 Transfer ticket · UC-16 Correct AI labels · UC-17 Summarize ticket · UC-18 Rewrite reply · UC-29 Suggest reply from policies · UC-19 View personal dashboard |
| Administrator | Inherits Staff: UC-10..UC-19 and UC-29 on all tickets (UC-15 = reassign any ticket, UC-19 = system-wide dashboard) · UC-20 Manage categories · UC-21 View user list · UC-22 Create Staff account · UC-23 Lock or unlock account · UC-27 Set Staff on leave or back · UC-28 Manage policy articles |
| System | UC-24 Classify ticket (with LLM Provider) · UC-25 Auto-assign ticket · UC-26 Notify customer by email (with Email Service) |

**Related:** [Step index](README.md)

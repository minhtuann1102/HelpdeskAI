# Use Case Specifications

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

## UC-01 Log in

- **Actor:** all roles
- **Preconditions:** an account exists
- **Main flow:** enter email and password → system verifies credentials and account status → opens the role's home page (DF-16)
- **Alternative:** wrong credentials → generic error; locked account → "account locked" message
- **Permission:** public
- **Result:** an authenticated session · **Stories:** US-02

## UC-02 Log out

- **Actor:** all roles
- **Preconditions:** logged in
- **Main flow:** choose Log out → session ends → login page
- **Permission:** authenticated
- **Result:** protected pages are no longer accessible · **Stories:** US-03

## UC-03 Update profile

- **Actor:** all roles
- **Main flow:** open profile → edit full name or phone → save
- **Alternative:** empty full name → validation error
- **Permission:** authenticated (own profile only)
- **Result:** profile updated; email and role unchanged · **Stories:** US-05

## UC-04 Change password

- **Actor:** all roles
- **Main flow:** enter current password, new password, and confirmation → system verifies the current password → saves the new one
- **Alternative:** wrong current password, weak new password, or mismatched confirmation → error, nothing changes
- **Permission:** authenticated
- **Result:** the next login needs the new password · **Stories:** US-06

## UC-05 Register

- **Actor:** Customer (visitor)
- **Main flow:** fill in full name, email, password, confirmation, optional phone → system creates a `CUSTOMER` account → logs the customer in → My tickets
- **Alternative:** email already in use or invalid input → error, no account created
- **Permission:** public
- **Result:** a new Customer account · **Stories:** US-01

## UC-06 Submit ticket

- **Actor:** Customer · **Includes:** UC-24, UC-25
- **Preconditions:** logged in as Customer
- **Main flow:** open the form → enter title, description, optional category, optional attachments → submit → system saves the ticket as `New` → system runs UC-25 and UC-24 → confirmation and ticket detail
- **Alternative:** invalid input → field errors, nothing saved; AI fails → ticket saved, labels "Unclassified"; no active Staff → ticket Unassigned
- **Permission:** `CUSTOMER`
- **Result:** the ticket exists, with an assignee when possible, and labels · **Stories:** US-07, US-08, US-13..US-16

## UC-07 View own tickets

- **Actor:** Customer
- **Main flow:** open My tickets → filter by status → open a ticket → see its details and conversation
- **Permission:** `CUSTOMER`, own tickets only
- **Result:** internal AI data is never shown (DF-14) · **Stories:** US-09, US-10

## UC-08 Reply to own ticket

- **Actor:** Customer · **Includes:** UC-25 (only when reopening a ticket whose assignee is locked or on leave)
- **Main flow:** open own ticket → write a reply → send → reply joins the conversation; status may change (BR-06)
- **Alternative:** ticket `Closed` → no reply possible
- **Permission:** `CUSTOMER`, own tickets only
- **Result:** reply stored; a `Waiting for Customer` or `Resolved` ticket returns to `In Progress` · **Stories:** US-11

## UC-09 Close own ticket

- **Actor:** Customer
- **Main flow:** open own ticket → Close → confirm → status `Closed`
- **Permission:** `CUSTOMER`, own tickets only
- **Result:** the ticket is final · **Stories:** US-12

## UC-10 View ticket queue

- **Actor:** Staff, Administrator
- **Main flow:** open the queue → tickets ordered by urgency (DF-15) → open one
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** the most urgent work is on top · **Stories:** US-17

## UC-11 Search and filter tickets

- **Actor:** Staff, Administrator
- **Main flow:** enter a keyword and/or filters → see matching tickets
- **Permission:** within the actor's visibility (BR-02)
- **Result:** matching tickets only · **Stories:** US-18

## UC-12 View ticket details

- **Actor:** Staff, Administrator
- **Main flow:** open a ticket → see content, attachments, conversation, final labels, AI label, confidence, and reason
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** full context of the case · **Stories:** US-19

## UC-13 Reply to customer

- **Actor:** Staff, Administrator · **Includes:** UC-26 · **Extended by:** UC-18
- **Main flow:** write a reply → Send (or "Send and wait for customer") → reply joins the conversation; the first reply moves `New` to `In Progress` (D-10) → system runs UC-26
- **Alternative:** ticket `Closed` → no reply possible
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** the customer sees the reply and gets one email (BR-17) · **Stories:** US-20, US-35

## UC-14 Change ticket status

- **Actor:** Staff, Administrator · **Includes:** UC-26
- **Main flow:** choose an allowed next status (BR-06) → save → system runs UC-26
- **Alternative:** disallowed transition → rejected
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** new status visible to the customer, who gets one email (BR-17) · **Stories:** US-21, US-35

## UC-15 Transfer or reassign ticket

- **Actor:** Staff (transfer own ticket), Administrator (reassign any ticket)
- **Main flow:** choose Transfer → pick an active Staff member from the list → confirm → assignee changes; status unchanged
- **Alternative:** `Closed` ticket or locked target → rejected
- **Permission:** Staff: own tickets; Administrator: all tickets
- **Result:** the ticket moves to the new assignee's queue · **Stories:** US-22, US-23

## UC-16 Correct AI labels

- **Actor:** Staff, Administrator
- **Main flow:** change category, priority, or sentiment → save → the final label changes; the AI label is kept
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** correct labels; counted for the correction rate (BR-10) · **Stories:** US-24

## UC-17 Summarize ticket

- **Actor:** Staff, Administrator; LLM Provider
- **Main flow:** click Summarize → system sends the description and all replies to the LLM → shows and stores a 3–4 line summary with its time
- **Alternative:** AI error or timeout → error with Retry; a newer message makes the summary "Outdated"
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** a stored summary · **Stories:** US-25

## UC-18 Rewrite reply

- **Actor:** Staff, Administrator; LLM Provider · **Extends:** UC-13
- **Main flow:** write a draft → click Rewrite → system sends the draft and ticket context to the LLM → shows the rewrite next to the draft → user uses, edits, or discards it → user sends manually (UC-13)
- **Alternative:** AI error or timeout → error; the draft stays unchanged
- **Permission:** Staff: assigned to me; Administrator: all tickets
- **Result:** a better draft; nothing is sent automatically · **Stories:** US-26

## UC-19 View dashboard

- **Actor:** Staff (personal), Administrator (system-wide)
- **Main flow:** open the dashboard → choose a date range → see the metrics (BR-16)
- **Permission:** Staff: own tickets; Administrator: all tickets
- **Result:** volume, response time, and AI quality figures · **Stories:** US-33, US-34

## UC-20 Manage categories

- **Actor:** Administrator
- **Main flow:** add a category (name, description), edit it, or hide/show it
- **Alternative:** duplicate name or missing description → error
- **Permission:** `ADMIN`
- **Result:** the active categories feed the customer form and AI (BR-13) · **Stories:** US-27, US-28, US-29

## UC-21 View user list

- **Actor:** Administrator
- **Main flow:** open Users → search and filter by role and status
- **Permission:** `ADMIN`
- **Result:** list of accounts · **Stories:** US-30

## UC-22 Create Staff account

- **Actor:** Administrator
- **Main flow:** enter full name, email, initial password → system creates an active `STAFF` account
- **Alternative:** email already in use → error
- **Permission:** `ADMIN`
- **Result:** the new Staff joins auto-assignment immediately · **Stories:** US-31

## UC-23 Lock or unlock account

- **Actor:** Administrator · **Includes:** UC-25 (when a Staff with open tickets is locked)
- **Main flow:** choose Lock or Unlock on a user → confirm → status changes
- **Alternative:** own account → Lock not available
- **Permission:** `ADMIN`
- **Result:** locked users cannot log in; their open tickets are redistributed (BR-05) · **Stories:** US-32

## UC-24 Classify ticket

- **Actor:** System; LLM Provider · **Included by:** UC-06
- **Main flow:** after the ticket is saved, make one LLM call → validate the JSON → apply the rules (threshold, angry raise) → store the AI label and the final label
- **Alternative:** error, timeout, invalid output, or low confidence → "Unclassified" (BR-08)
- **Permission:** internal
- **Result:** labelled ticket · **Stories:** US-14, US-15, US-16

## UC-25 Auto-assign ticket

- **Actor:** System · **Included by:** UC-06, UC-08, UC-23, UC-27
- **Main flow:** pick the active Staff with the fewest open tickets, counting a Staff member in warm-up at the others' average (BR-03, DF-27; tie-break DF-02) → set the assignee and the assignment time
- **Alternative:** no active Staff → Unassigned (DF-04)
- **Permission:** internal
- **Result:** the ticket has an owner · **Stories:** US-13, US-32

## UC-26 Notify customer by email

- **Actor:** System; Email Service · **Included by:** UC-13, UC-14
- **Main flow:** after the reply or status change is saved, build one email (DF-25) → send it to the ticket customer's account email through the Email Service
- **Alternative:** the action came from the customer, or the customer account is locked → no email; the Email Service fails → the failure is logged, and the reply or status change stays saved
- **Permission:** internal
- **Result:** the customer knows the ticket has an update without opening the website · **Stories:** US-35

## UC-27 Set Staff on leave or back

- **Actor:** Administrator · **Includes:** UC-25 (when the Staff member has open tickets)
- **Main flow:** open Users → choose Set on leave on an `Active` Staff member → confirm → status `On leave`; their open tickets are redistributed. Later: choose End leave → status `Active`
- **Alternative:** target is not Staff, or not `Active` when setting leave → action not available; no other active Staff → the redistributed tickets become Unassigned (DF-04)
- **Permission:** `ADMIN` only; Staff cannot change their own status
- **Result:** no new tickets or transfers reach a Staff member who is away (BR-18) · **Stories:** US-36

**Related:** [Step index](README.md)

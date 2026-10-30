# Acceptance Criteria

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

Format: *Given* (context) · *When* (action) · *Then* (observable result).

## Authentication and authorization (M-01)

### US-01 — Register a customer account
UC-05 · BR-15

- **AC-01.1** *Given* the registration form, *when* I enter a full name, an unused email, a password of at least 8 characters with a matching confirmation (phone optional) and submit, *then* a `CUSTOMER` account is created, I am logged in, and I land on My tickets.
- **AC-01.2** *Given* an email that is already registered, *when* I submit, *then* I see "Email already in use", no account is created, and my entries except the passwords are kept.
- **AC-01.3** *Given* a missing required field, an invalid email, a short password, or a mismatched confirmation, *when* I submit, *then* each invalid field shows an error and no account is created.
- **AC-01.4** *Given* any registration request, *when* it is processed, *then* the role is always `CUSTOMER`, even if the request tries to set another role.

### US-02 — Log in
UC-01 · BR-05, BR-15

- **AC-02.1** *Given* an active account, *when* I enter the correct email and password, *then* I am logged in and taken to my home page: Customer → My tickets, Staff → My queue, Administrator → Dashboard (DF-16).
- **AC-02.2** *Given* a wrong email or password, *when* I submit, *then* I see "Email or password is incorrect" without revealing which one was wrong.
- **AC-02.3** *Given* a locked account, *when* I enter the correct credentials, *then* I see "Your account is locked. Please contact the administrator." and I am not logged in.

### US-03 — Log out
UC-02

- **AC-03.1** *Given* I am logged in, *when* I choose Log out, *then* my session ends and I see the login page.
- **AC-03.2** *Given* I have logged out, *when* I open a protected page (for example with the Back button), *then* I am redirected to the login page.

### US-04 — Role-based access control
All use cases · BR-01, BR-02

- **AC-04.1** *Given* I am not logged in, *when* I open any page other than login or registration, *then* I am redirected to the login page.
- **AC-04.2** *Given* I am a Customer, *when* I open a Staff or Administrator page or another customer's ticket, *then* I see an "Access denied" page and no data from it.
- **AC-04.3** *Given* I am Staff, *when* I open a ticket not assigned to me or an Administrator page, *then* I see "Access denied" (D-09).
- **AC-04.4** *Given* any role, *when* a page loads, *then* the navigation shows only the items that role may use.
- **AC-04.5** *Given* a direct request to a protected function without permission (bypassing the UI), *when* the server receives it, *then* it is rejected.

## Personal profile (M-02)

### US-05 — Update profile
UC-03 · BR-15

- **AC-05.1** *Given* my profile, *when* I change my full name or phone and save, *then* the new values are stored and shown.
- **AC-05.2** *Given* my profile, *when* it is shown, *then* email and role are displayed but cannot be edited (DF-12).
- **AC-05.3** *Given* an empty full name, *when* I save, *then* I see an error and nothing changes.

### US-06 — Change password
UC-04 · BR-15

- **AC-06.1** *Given* the correct current password and a valid new password with a matching confirmation, *when* I save, *then* the password changes and the next login needs the new password.
- **AC-06.2** *Given* a wrong current password, *when* I save, *then* I see an error and the password does not change.
- **AC-06.3** *Given* a new password under 8 characters or a mismatched confirmation, *when* I save, *then* I see an error and the password does not change.

## Submit and track tickets (M-03)

### US-07 — Submit a ticket
UC-06 · BR-03, BR-08

- **AC-07.1** *Given* I am logged in as a Customer, *when* I submit a title (required, up to 200 characters) and a description (required), *then* a ticket is created with status `New` and a ticket number, I see a confirmation, and it appears in My tickets.
- **AC-07.2** *Given* the submit form, *when* I open the category list, *then* it shows only active categories plus an empty choice "Not sure".
- **AC-07.3** *Given* a missing title or description, *when* I submit, *then* each missing field shows an error and no ticket is created.
- **AC-07.4** *Given* the AI service is down or slower than the timeout, *when* I submit a valid ticket, *then* the ticket is still created and confirmed (G-02).
- **AC-07.5** *Given* a ticket was just created, *when* creation completes, *then* auto-assignment (US-13) and AI classification (US-14) are triggered without any extra action by me.

### US-08 — Attach files to a new ticket
UC-06 · BR-14

- **AC-08.1** *Given* the submit form, *when* I attach up to 5 files of type jpg, jpeg, png, or pdf, each at most 10 MB, and submit, *then* the files are stored and listed on the ticket.
- **AC-08.2** *Given* a file of the wrong type, over 10 MB, or a sixth file, *when* I add it, *then* it is rejected with a message saying why, and my other inputs are kept.
- **AC-08.3** *Given* a ticket with attachments, *when* someone other than the owner, the assignee, or Administrator requests a file, *then* access is denied.
- **AC-08.4** *Given* a ticket with attachments, *when* AI classification runs, *then* no attachment content is sent to the LLM.

### US-09 — View my ticket list
UC-07 · BR-02

- **AC-09.1** *Given* I have tickets, *when* I open My tickets, *then* I see only my own tickets with number, title, status, category, and last update, most recently updated first.
- **AC-09.2** *Given* the list, *when* I filter by status, *then* only tickets with that status are shown.
- **AC-09.3** *Given* I have no tickets, *when* I open My tickets, *then* I see an empty state with a "Submit a ticket" action.

### US-10 — View my ticket details
UC-07 · BR-02

- **AC-10.1** *Given* my ticket, *when* I open it, *then* I see the title, description, attachments, status, category, and every message in time order with author and time.
- **AC-10.2** *Given* my ticket, *when* it is shown, *then* priority, sentiment, confidence, AI reason, and summary are not shown (DF-14).
- **AC-10.3** *Given* another customer's ticket number, *when* I try to open it, *then* access is denied.

### US-11 — Reply to my ticket
UC-08 · BR-05, BR-06, BR-07

- **AC-11.1** *Given* my ticket is `New` or `In Progress`, *when* I send a reply, *then* it appears in the conversation and the status does not change.
- **AC-11.2** *Given* my ticket is `Waiting for Customer`, *when* I send a reply, *then* the status becomes `In Progress` (T4).
- **AC-11.3** *Given* my ticket is `Resolved`, *when* I send a reply, *then* the ticket reopens to `In Progress` with the same assignee (T6); if that assignee is locked or on leave, the ticket is auto-assigned again (DF-06, BR-18).
- **AC-11.4** *Given* my ticket is `Closed`, *when* I open it, *then* there is no reply box, and a direct reply request is rejected with "This ticket is closed. Please submit a new ticket."
- **AC-11.5** *Given* an empty reply, *when* I try to send it, *then* it is not sent.

### US-12 — Close my ticket
UC-09 · BR-06

- **AC-12.1** *Given* my ticket is not `Closed`, *when* I choose Close and confirm, *then* the status becomes `Closed`.
- **AC-12.2** *Given* a `Closed` ticket, *when* anyone tries to reply or change its status, *then* the action is rejected.

### US-35 — Email notification of ticket updates
UC-26 · BR-17

- **AC-35.1** *Given* Staff or the Administrator send a reply on my ticket, *when* the reply is saved, *then* I get one email at my account email with the ticket number, title, "new reply", and a link to the ticket, but not the reply text (DF-25).
- **AC-35.2** *Given* Staff or the Administrator change my ticket's status without replying (for example to `Resolved`), *when* the change is saved, *then* I get one email that names the new status, using the customer wording (DF-22).
- **AC-35.3** *Given* one action both adds a reply and changes the status ("Send and wait for customer", or the first reply that moves `New` to `In Progress`), *when* it is saved, *then* I get exactly one email.
- **AC-35.4** *Given* I reply to or close my own ticket, or Staff transfer it or correct its labels, *when* the action is saved, *then* no email is sent.
- **AC-35.5** *Given* the Email Service fails or times out, *when* Staff send a reply or change the status, *then* the action is saved and shown as usual, and the failure is logged.
- **AC-35.6** *Given* my account is locked, *when* Staff act on my ticket, *then* no email is sent.

## Automatic behaviour: assignment and AI classification (M-04, M-05)

US-13..US-16 have **no endpoint of their own**. They run when a ticket is submitted (US-07); US-13 also runs when a Staff account is locked (US-32) or a ticket is reopened (US-11). In the Step 6 cross-check they are traced to those endpoints.

### US-13 — Auto-assign new tickets
UC-25 · BR-03

- **AC-13.1** *Given* active Staff A has 3 open tickets and B has 1, *when* a ticket is created, *then* it is assigned to B and the assignment time is recorded.
- **AC-13.2** *Given* two active Staff members with the same number of open tickets, *when* a ticket is created, *then* it goes to the one whose last assignment is older (a never-assigned Staff member first).
- **AC-13.3** *Given* a locked Staff member, a Staff member on leave, or an Administrator has fewer open tickets than anyone, *when* a ticket is created, *then* they are not chosen.
- **AC-13.4** *Given* no active Staff exists, *when* a ticket is created, *then* it is Unassigned and appears under the Administrator's "Unassigned" filter.
- **AC-13.5** *Given* the AI call fails, *when* a ticket is created, *then* it is still assigned.
- **AC-13.6** *Given* a Staff member has tickets that are `Resolved` or `Closed`, *when* the load is counted, *then* those tickets are not counted (DF-01).

### US-14 — AI classification of new tickets
UC-24 · BR-08, BR-09

- **AC-14.1** *Given* the customer did not choose a category, *when* the ticket is created, *then* exactly one LLM call is made with the title, description, and active categories (names and descriptions).
- **AC-14.2** *Given* a valid result with confidence ≥ 0.6, *when* it is processed, *then* category, priority, and sentiment are set, the confidence and reason are stored as the AI label, and the final label equals the AI label.
- **AC-14.3** *Given* the customer chose a category, *when* the ticket is classified, *then* the category stays unchanged and AI sets only priority and sentiment, in the same single call.
- **AC-14.4** *Given* the AI returns a category that is not active, a value outside the enums, or invalid JSON, *when* it is processed, *then* it is treated as a failure (US-16).
- **AC-14.5** *Given* the AI output contains extra fields or instructions, *when* it is processed, *then* only category, priority, sentiment, confidence, and reason are used, and no other action happens.

### US-15 — Angry sentiment raises priority
UC-24 · BR-08 rule 6

- **AC-15.1** *Given* the AI returns sentiment `angry` with priority `low`, `medium`, or `high`, *when* the result is processed, *then* the stored priority is `medium`, `high`, or `urgent` respectively.
- **AC-15.2** *Given* the AI returns `angry` with priority `urgent`, *when* processed, *then* the priority stays `urgent`.
- **AC-15.3** *Given* a priority was raised, *when* Staff open the ticket, *then* they can see it was raised because of angry sentiment.

### US-16 — Fallback to "Unclassified"
UC-24 · BR-08 rule 7

- **AC-16.1** *Given* the AI returns confidence below 0.6, *when* processed, *then* the AI-set labels are "Unclassified", and the confidence and reason are still stored.
- **AC-16.2** *Given* the LLM call errors or gives no answer within 10 s, *when* the ticket is created, *then* the ticket is saved, its AI-set labels are "Unclassified", and the error is logged.
- **AC-16.3** *Given* the customer chose a category and the AI fails or has low confidence, *when* processed, *then* the category is kept and priority and sentiment are "Unclassified" (DF-07).
- **AC-16.4** *Given* an Unclassified ticket, *when* its assignee opens the queue, *then* it appears at the top with an "Unclassified" badge until someone sets its labels (US-24).
- **AC-16.5** *Given* an AI failure, *when* it happens, *then* the system does not retry automatically (DF-08).

## Ticket handling (M-04, M-05)

### US-17 — View my ticket queue
UC-10 · BR-02

- **AC-17.1** *Given* I am Staff, *when* I open My queue, *then* I see only tickets assigned to me with status `New`, `In Progress`, or `Waiting for Customer` (DF-15).
- **AC-17.2** *Given* the queue, *when* it is shown, *then* it is ordered Unclassified first, then `urgent`, `high`, `medium`, `low`, then oldest first.
- **AC-17.3** *Given* the queue, *when* it is shown, *then* each row shows ticket number, title, customer name, category, priority, sentiment, status, and creation time; labels not yet corrected carry an "AI" marker.
- **AC-17.4** *Given* I am Administrator, *when* I open All tickets, *then* I see every ticket with an assignee column, including Unassigned ones.
- **AC-17.5** *Given* I have no open tickets, *when* I open My queue, *then* I see an empty state "No tickets assigned to you".

### US-18 — Search and filter tickets
UC-11 · BR-02

- **AC-18.1** *Given* a keyword, *when* I search, *then* tickets whose number, title, or description contain it are shown.
- **AC-18.2** *Given* the filters status, category (including Unclassified), priority, sentiment, and creation date range, *when* I combine them, *then* only tickets matching all of them are shown; Administrator also has an assignee filter, including Unassigned.
- **AC-18.3** *Given* I am Staff, *when* I search, *then* results never include tickets not assigned to me.
- **AC-18.4** *Given* no ticket matches, *when* results load, *then* I see "No tickets match your filters" and a Clear filters action.

### US-19 — View ticket details with AI labels
UC-12 · BR-02, BR-09

- **AC-19.1** *Given* a ticket I can act on, *when* I open it, *then* I see title, description, attachments, customer name and email, status, assignee, and the full conversation.
- **AC-19.2** *Given* the label panel, *when* it is shown, *then* it shows the final category, priority, and sentiment, plus the original AI label, confidence, and reason.
- **AC-19.3** *Given* an Unclassified ticket, *when* I open it, *then* the panel shows "Unclassified — needs manual triage" and whether the cause was low confidence or an AI error.

### US-20 — Reply to the customer
UC-13 · BR-06, BR-07

- **AC-20.1** *Given* a ticket I can act on that is not `Closed`, *when* I write a reply and click Send, *then* it is added to the conversation with my name and time, and the customer can see it.
- **AC-20.2** *Given* a `New` ticket, *when* the assignee or Administrator sends the first reply, *then* the status becomes `In Progress` and the first response time is recorded (D-10).
- **AC-20.3** *Given* a reply, *when* I choose "Send and wait for customer", *then* the reply is sent and the status becomes `Waiting for Customer`.
- **AC-20.4** *Given* an empty reply, *when* I look at the Send button, *then* it is disabled.
- **AC-20.5** *Given* a draft in the reply box, *when* I have not clicked Send, *then* nothing is sent to the customer (G-07).

### US-21 — Change ticket status
UC-14 · BR-06

- **AC-21.1** *Given* a ticket in a given status, *when* I open the status control, *then* only the transitions allowed by BR-06 are offered, and any other transition sent directly is rejected.
- **AC-21.2** *Given* I set a ticket to `Resolved`, *when* the customer opens it, *then* they see `Resolved` and can still reply (reopen) or close it.
- **AC-21.3** *Given* a `Closed` ticket, *when* I open it, *then* no status change is offered.

### US-22 — Transfer my ticket to another Staff member
UC-15 · BR-04

- **AC-22.1** *Given* a ticket assigned to me, *when* I choose Transfer, *then* I see a list of the other active Staff members with their open-ticket counts.
- **AC-22.2** *Given* I pick a colleague and confirm, *when* the transfer completes, *then* the assignee changes, the status stays the same, the ticket leaves my queue, and I no longer have access to it (D-09).
- **AC-22.3** *Given* a `Closed` ticket or a locked target, *when* I try to transfer, *then* the transfer is rejected.

### US-23 — Reassign any ticket
UC-15 · BR-04

- **AC-23.1** *Given* any non-closed ticket, *when* I (Administrator) choose an active Staff member or myself and confirm, *then* the assignee changes and the assignment time is recorded.
- **AC-23.2** *Given* an Unassigned ticket, *when* I assign it, *then* it appears in the new assignee's queue.

### US-24 — Correct AI labels and triage Unclassified tickets
UC-16 · BR-09, BR-10

- **AC-24.1** *Given* a ticket I can act on, *when* I change the category (active categories only), priority, or sentiment and save, *then* the final label changes and the AI label stays unchanged.
- **AC-24.2** *Given* an Unclassified ticket, *when* I set its category and priority, *then* the "Unclassified" badge disappears and the ticket takes its normal place in the queue order.
- **AC-24.3** *Given* I changed an AI-chosen category or the AI priority, *when* the dashboard is calculated, *then* the ticket counts as corrected (BR-10); changing only the sentiment does not count.

### US-25 — Summarize a ticket with AI
UC-17 · BR-11

- **AC-25.1** *Given* a ticket I can act on, *when* I click Summarize, *then* within 20 s I see 3–4 lines covering the main issue, what has been done, and what is pending, with the time it was created.
- **AC-25.2** *Given* a summary exists, *when* a new message is added, *then* the summary is labelled "Outdated" and a Regenerate action appears.
- **AC-25.3** *Given* an outdated summary, *when* I click Regenerate, *then* the new summary replaces the old one.
- **AC-25.4** *Given* the AI errors or times out, *when* I click Summarize, *then* I see an error with Retry, and the ticket is not affected.
- **AC-25.5** *Given* a summary exists, *when* the customer views the ticket, *then* the summary is not shown.

### US-26 — Rewrite my reply with AI
UC-18 · BR-12

- **AC-26.1** *Given* a non-empty draft, *when* I click Rewrite, *then* the rewritten text is shown next to my original draft.
- **AC-26.2** *Given* the fixed test set of 10 sample drafts, *when* each is rewritten, *then* no result contains a commitment, date, amount, or number that is not in its draft.
- **AC-26.3** *Given* a rewrite is shown, *when* I choose Use, edit it further, or Discard, *then* the reply box updates accordingly, and nothing is sent until I click Send (US-20).
- **AC-26.4** *Given* an empty draft, *when* I look at the Rewrite button, *then* it is disabled.
- **AC-26.5** *Given* the AI errors or does not answer within 20 s, *when* I click Rewrite, *then* I see an error and my draft is unchanged.

## Category management (M-06)

### US-27 — Add a category
UC-20 · BR-13

- **AC-27.1** *Given* a unique name (up to 100 characters) and a description, *when* I save, *then* the category is active and appears in the customer form and in the AI category list.
- **AC-27.2** *Given* a name that already exists (ignoring case), *when* I save, *then* I see an error.
- **AC-27.3** *Given* an empty description, *when* I save, *then* I see "Description is required; AI uses it to classify tickets".

### US-28 — Edit a category
UC-20 · BR-13

- **AC-28.1** *Given* an existing category, *when* I change its name or description and save, *then* the next AI classification uses the new values.
- **AC-28.2** *Given* tickets in that category, *when* I rename it, *then* they show the new name.
- **AC-28.3** *Given* a name used by another category, *when* I save, *then* I see an error.

### US-29 — Hide or show a category
UC-20 · BR-13

- **AC-29.1** *Given* an active category, *when* I hide it, *then* it disappears from the customer form, the AI category list, and the label-correction choices, while existing tickets keep it and filters still show it.
- **AC-29.2** *Given* a hidden category, *when* I show it again, *then* it becomes available everywhere again.
- **AC-29.3** *Given* any category, *when* I look for a delete action, *then* none exists (DF-18).

## User management (M-07)

### US-30 — View the user list
UC-21 · BR-01

- **AC-30.1** *Given* users exist, *when* I open Users, *then* I see name, email, role, status (Active, On leave, or Locked), and creation date for each.
- **AC-30.2** *Given* the list, *when* I search by name or email or filter by role and status, *then* only matching users are shown.

### US-31 — Create a Staff account
UC-22 · BR-01, BR-15

- **AC-31.1** *Given* a full name, an unused email, and an initial password of at least 8 characters, *when* I save, *then* an active `STAFF` account is created and joins auto-assignment immediately.
- **AC-31.2** *Given* an email already in use, *when* I save, *then* I see an error.
- **AC-31.3** *Given* the create form, *when* it is shown, *then* the role is fixed to Staff and cannot be changed (DF-13).

### US-32 — Lock or unlock an account
UC-23 · BR-05

- **AC-32.1** *Given* an active user, *when* I lock the account and confirm, *then* its status becomes Locked, the user cannot log in, and any current session ends on its next request.
- **AC-32.2** *Given* a Staff member with open tickets, *when* I lock the account, *then* each open ticket is reassigned by the auto-assignment rule among the remaining active Staff, or becomes Unassigned if none remain (DF-05).
- **AC-32.3** *Given* a locked user, *when* I unlock the account, *then* they can log in again, and a Staff member rejoins auto-assignment; tickets moved away are not moved back.
- **AC-32.4** *Given* my own Administrator account, *when* I look for Lock, *then* it is not available.

### US-36 — Set a Staff member on leave
UC-27 · BR-03, BR-04, BR-18

- **AC-36.1** *Given* an `Active` Staff member with 2 open tickets, *when* I (Administrator) choose Set on leave and confirm, *then* their status becomes `On leave` and both tickets are reassigned by the auto-assignment rule among the other active Staff, or become Unassigned if none remain.
- **AC-36.2** *Given* a Staff member on leave, *when* a ticket is created, *then* it is never assigned to them, and they do not appear in the transfer or reassign list.
- **AC-36.3** *Given* a Staff member on leave, *when* they log in, *then* they can use the system, but the tickets moved away are no longer visible to them (D-09).
- **AC-36.4** *Given* a Staff member on leave, *when* I choose End leave, *then* their status becomes `Active`, they rejoin auto-assignment immediately, and the moved tickets are not moved back.
- **AC-36.5** *Given* a Staff member is logged in, *when* they look for a way to change their own status, *then* there is none, and a direct request to change it is rejected (D-20).
- **AC-36.6** *Given* a Customer, an Administrator, or a `Locked` account, *when* I look at its row, *then* Set on leave is not available.
- **AC-36.7** *Given* a `Resolved` ticket whose assignee is on leave, *when* the customer replies, *then* the ticket reopens and is auto-assigned again (BR-05).

## Dashboard (M-08)

### US-33 — System-wide dashboard
UC-19 · BR-10, BR-16

- **AC-33.1** *Given* I open the dashboard, *when* it loads, *then* it covers the last 30 days by creation date, and I can choose another range.
- **AC-33.2** *Given* tickets in the range, *when* it loads, *then* I see counts by status, by category, and by sentiment, with Unclassified as its own group.
- **AC-33.3** *Given* tickets in the range, *when* it loads, *then* I see the average first response time over tickets that have a reply, plus the count of tickets still waiting for a first reply.
- **AC-33.4** *Given* tickets in the range, *when* it loads, *then* I see the label correction rate (BR-10) with its numerator and denominator.
- **AC-33.5** *Given* no tickets in the range, *when* it loads, *then* I see zeros and an empty state, not an error.

### US-34 — Personal dashboard
UC-19 · BR-16

- **AC-34.1** *Given* I am Staff, *when* I open the dashboard, *then* every metric is calculated only from tickets currently assigned to me.
- **AC-34.2** *Given* I am Staff, *when* I use the dashboard, *then* I cannot see system-wide numbers or other Staff members' numbers.

**Related:** [Step index](README.md)

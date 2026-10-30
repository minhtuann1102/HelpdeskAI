# Acceptance Criteria

> Design status: MVP — Step 2 of 9, approved
>
> Implementation status: NOT STARTED

Format: *Given* (context) · *When* (action) · *Then* (observable result). Each story covers one use case and has its number: US-01 is UC-01 (D-27). A bold line groups the criteria of one part of it, and *Should* marks a part that MoSCoW cuts before the rest of a Must story.

## US-01 — Log in and use only my role's functions
UC-01 · BR-01, BR-02, BR-05, BR-15

- **AC-01.1** *Given* an active account, *when* I enter the correct email and password, *then* I am logged in and taken to my home page: Customer → My tickets, Staff → My queue, Administrator → Dashboard (DF-16).
- **AC-01.2** *Given* a wrong email or password, *when* I submit, *then* I see "Email or password is incorrect" without revealing which one was wrong.
- **AC-01.3** *Given* a locked account, *when* I enter the correct credentials, *then* I see "Your account is locked. Please contact the administrator." and I am not logged in.

**Role-based access**, checked on every use case · BR-01, BR-02

- **AC-01.4** *Given* I am not logged in, *when* I open any page other than login or registration, *then* I am redirected to the login page.
- **AC-01.5** *Given* I am a Customer, *when* I open a Staff or Administrator page or another customer's ticket, *then* I see an "Access denied" page and no data from it.
- **AC-01.6** *Given* I am Staff, *when* I open a ticket not assigned to me or an Administrator page, *then* I see "Access denied" (D-09).
- **AC-01.7** *Given* any role, *when* a page loads, *then* the navigation shows only the items that role may use.
- **AC-01.8** *Given* a direct request to a protected function without permission (bypassing the UI), *when* the server receives it, *then* it is rejected.

## US-02 — Log out
UC-02

- **AC-02.1** *Given* I am logged in, *when* I choose Log out, *then* my session ends and I see the login page.
- **AC-02.2** *Given* I have logged out, *when* I open a protected page (for example with the Back button), *then* I am redirected to the login page.

## US-03 — Update profile
UC-03 · BR-15

- **AC-03.1** *Given* my profile, *when* I change my full name or phone and save, *then* the new values are stored and shown.
- **AC-03.2** *Given* my profile, *when* it is shown, *then* email and role are displayed but cannot be edited (DF-12).
- **AC-03.3** *Given* an empty full name, *when* I save, *then* I see an error and nothing changes.

## US-04 — Change password
UC-04 · BR-15

- **AC-04.1** *Given* the correct current password and a valid new password with a matching confirmation, *when* I save, *then* the password changes and the next login needs the new password.
- **AC-04.2** *Given* a wrong current password, *when* I save, *then* I see an error and the password does not change.
- **AC-04.3** *Given* a new password under 8 characters or a mismatched confirmation, *when* I save, *then* I see an error and the password does not change.

## US-05 — Register a customer account
UC-05 · BR-15

- **AC-05.1** *Given* the registration form, *when* I enter a full name, an unused email, a password of at least 8 characters with a matching confirmation (phone optional) and submit, *then* a `CUSTOMER` account is created, I am logged in, and I land on My tickets.
- **AC-05.2** *Given* an email that is already registered, *when* I submit, *then* I see "Email already in use", no account is created, and my entries except the passwords are kept.
- **AC-05.3** *Given* a missing required field, an invalid email, a short password, or a mismatched confirmation, *when* I submit, *then* each invalid field shows an error and no account is created.
- **AC-05.4** *Given* any registration request, *when* it is processed, *then* the role is always `CUSTOMER`, even if the request tries to set another role.

## US-06 — Submit a ticket with optional attachments
UC-06 · BR-03, BR-08, BR-14, BR-22

- **AC-06.1** *Given* I am logged in as a Customer, *when* I submit a title (required, up to 200 characters) and a description (required), *then* a ticket is created with status `New` and a ticket number, I see a confirmation, and it appears in My tickets.
- **AC-06.2** *Given* the submit form, *when* I open the category list, *then* it shows only active categories plus an empty choice "Not sure".
- **AC-06.3** *Given* a missing title or description, *when* I submit, *then* each missing field shows an error and no ticket is created.
- **AC-06.4** *Given* the AI service is down or slower than the timeout, *when* I submit a valid ticket, *then* the ticket is still created and confirmed (G-02).
- **AC-06.5** *Given* a ticket was just created, *when* creation completes, *then* auto-assignment (US-25) and AI classification (US-24) are triggered without any extra action by me.

**Attachments** · BR-14 · *Should*

- **AC-06.6** *Given* the submit form, *when* I attach up to 5 files of type jpg, jpeg, png, or pdf, each at most 10 MB, and submit, *then* the files are stored and listed on the ticket.
- **AC-06.7** *Given* a file of the wrong type, over 10 MB, or a sixth file, *when* I add it, *then* it is rejected with a message saying why, and my other inputs are kept.
- **AC-06.8** *Given* a ticket with attachments, *when* someone other than the owner, the assignee, or Administrator requests a file, *then* access is denied.
- **AC-06.9** *Given* a ticket with attachments, *when* AI classification runs, *then* no attachment content is sent to the LLM.

## US-07 — View my tickets and their conversations
UC-07 · BR-02

- **AC-07.1** *Given* I have tickets, *when* I open My tickets, *then* I see only my own tickets with number, title, status, category, and last update, most recently updated first.
- **AC-07.2** *Given* the list, *when* I filter by status, *then* only tickets with that status are shown.
- **AC-07.3** *Given* I have no tickets, *when* I open My tickets, *then* I see an empty state with a "Submit a ticket" action.

**Ticket details**

- **AC-07.4** *Given* my ticket, *when* I open it, *then* I see the title, description, attachments, status, category, and every message in time order with author and time.
- **AC-07.5** *Given* my ticket, *when* it is shown, *then* priority, sentiment, confidence and its band, AI reason, classification status, summary, and reply deadlines are not shown (DF-14).
- **AC-07.6** *Given* another customer's ticket number, *when* I try to open it, *then* access is denied.

## US-08 — Reply to my ticket
UC-08 · BR-05, BR-06, BR-07, BR-22

- **AC-08.1** *Given* my ticket is `New` or `In Progress`, *when* I send a reply, *then* it appears in the conversation and the status does not change.
- **AC-08.2** *Given* my ticket is `Waiting for Customer`, *when* I send a reply, *then* the status becomes `In Progress` (T4).
- **AC-08.3** *Given* my ticket is `Resolved`, *when* I send a reply, *then* the ticket reopens to `In Progress` with the same assignee (T6); if that assignee is locked or on leave, the ticket is auto-assigned again (DF-06, BR-18).
- **AC-08.4** *Given* my ticket is `Closed`, *when* I open it, *then* there is no reply box, and a direct reply request is rejected with "This ticket is closed. Please submit a new ticket."
- **AC-08.5** *Given* an empty reply, *when* I try to send it, *then* it is not sent.

## US-09 — Close my ticket
UC-09 · BR-06, BR-22

- **AC-09.1** *Given* my ticket is not `Closed`, *when* I choose Close and confirm, *then* the status becomes `Closed`.
- **AC-09.2** *Given* a `Closed` ticket, *when* anyone tries to reply or change its status, *then* the action is rejected.

## US-10 — View my ticket queue
UC-10 · BR-02, BR-22, BR-23

- **AC-10.1** *Given* I am Staff, *when* I open My queue, *then* I see only tickets assigned to me with status `New`, `In Progress`, or `Waiting for Customer` (DF-15).
- **AC-10.2** *Given* the queue, *when* it is shown, *then* it is ordered Unclassified and `Pending` first, then `urgent`, `high`, `medium`, `low`, then oldest first. With reply deadlines, AC-10.7 replaces the order after the Unclassified and `Pending` tickets.
- **AC-10.3** *Given* the queue, *when* it is shown, *then* each row shows ticket number, title, customer name, category, priority, sentiment, status, and creation time; labels that no person has set yet carry an "AI" marker (BR-23).
- **AC-10.4** *Given* I am Administrator, *when* I open All tickets, *then* I see every ticket with an assignee column, including Unassigned ones.
- **AC-10.5** *Given* I have no open tickets, *when* I open My queue, *then* I see an empty state "No tickets assigned to you".

**Reply deadlines** · BR-22 · *Should*

- **AC-10.6** *Given* a customer is waiting for a reply (the ticket is new, or the customer wrote after the last Staff or Administrator reply), *when* the queue is shown, *then* the row shows the time left in working hours, for example "còn 1 giờ 20 phút"; "Sắp trễ, còn 20 phút" when at most a quarter of the target is left; "Trễ 1 giờ 10 phút" after the deadline; and "Tạm dừng" while the clock is paused (DF-31..DF-33).
- **AC-10.7** *Given* the queue, *when* it is shown, *then* after the Unclassified and `Pending` tickets come the tickets with a running clock, soonest deadline first, so overdue ones lead; then the other open tickets, `In Progress` before `Waiting for Customer`, least recently updated first (DF-15).
- **AC-10.8** *Given* a `low` ticket due in 20 minutes and an `urgent` ticket due in 50 minutes, *when* the queue is shown, *then* the `low` ticket is above the `urgent` one, and both rows show their time left.
- **AC-10.9** *Given* some tickets in my queue are overdue, *when* I open it, *then* the toolbar shows "Trễ hạn (n)", and choosing it shows only those tickets.
- **AC-10.10** *Given* the queue, *when* it is shown, *then* each row also shows when the ticket last changed ("cập nhật 2 ngày trước"), and I can sort by "Lâu chưa cập nhật", least recently updated first, so a ticket whose last message is from Staff still surfaces.
- **AC-10.11** *Given* a reply becomes due soon or overdue, *when* that happens, *then* nobody gets an email or another alert, and the ticket is not reassigned (BR-22 rule 9).

**Uncertain AI labels** · BR-23 · *Should*

- **AC-10.12** *Given* AI labels in the confidence band "Vừa" that no person has set, *when* the queue is shown, *then* the row's AI marker reads "AI chưa chắc"; it disappears once a person corrects or confirms the labels (AC-16.6).

## US-11 — Search and filter tickets
UC-11 · BR-02

- **AC-11.1** *Given* a keyword, *when* I search, *then* tickets whose number, title, or description contain it are shown.
- **AC-11.2** *Given* the filters status, category (including Unclassified), priority, sentiment, and creation date range, *when* I combine them, *then* only tickets matching all of them are shown; Administrator also has an assignee filter, including Unassigned.
- **AC-11.3** *Given* I am Staff, *when* I search, *then* results never include tickets not assigned to me.
- **AC-11.4** *Given* no ticket matches, *when* results load, *then* I see "No tickets match your filters" and a Clear filters action.

## US-12 — View ticket details with AI labels
UC-12 · BR-02, BR-08, BR-09, BR-22, BR-23

- **AC-12.1** *Given* a ticket I can act on, *when* I open it, *then* I see title, description, attachments, customer name and email, status, assignee, and the full conversation.
- **AC-12.2** *Given* the label panel, *when* it is shown, *then* it shows the final category, priority, and sentiment, plus the original AI label, confidence, and reason.
- **AC-12.3** *Given* an Unclassified ticket, *when* I open it, *then* the panel shows "Unclassified — needs manual triage" and whether the cause was low confidence or an AI error.
- **AC-12.4** *Given* the ticket's classification is `Pending`, *when* I keep it open, *then* the label panel shows "AI đang phân loại…", the page re-checks every 3 s, and the labels appear as soon as they are ready; after 30 s it shows the Unclassified (AI error) state (DF-28).

**Reply deadline and confidence band** · BR-22, BR-23 · *Should*

- **AC-12.5** *Given* a customer is waiting for a reply, *when* I open the ticket, *then* the header shows the deadline and the time left, for example "Phản hồi trước 14:30 · còn 40 phút", or "Trễ hạn" after it; a paused clock shows "Tạm dừng" with the time that will be left when it resumes.
- **AC-12.6** *Given* the label panel of a `Classified` ticket, *when* it is shown, *then* the confidence carries its band next to the value: "Cao" from 0.85, "Vừa" from 0.60 (DF-34).

## US-13 — Reply to the customer
UC-13 · BR-06, BR-07, BR-19, BR-22

- **AC-13.1** *Given* a ticket I can act on that is not `Closed`, *when* I write a reply and click Send, *then* it is added to the conversation with my name and time, and the customer can see it.
- **AC-13.2** *Given* a `New` ticket, *when* the assignee or Administrator sends the first reply, *then* the status becomes `In Progress` and the first response time is recorded (D-10).
- **AC-13.3** *Given* a reply, *when* I choose "Send and wait for customer", *then* the reply is sent and the status becomes `Waiting for Customer`.
- **AC-13.4** *Given* an empty reply, *when* I look at the Send button, *then* it is disabled.
- **AC-13.5** *Given* a draft in the reply box, *when* I have not clicked Send, *then* nothing is sent to the customer (G-07).
- **AC-13.6** *Given* the ticket was transferred to someone else while I was writing, *when* I click Send, *then* the reply is rejected, my draft stays in the reply box so I can copy it, and I see a message with a link back to my queue (BR-19).
- **AC-13.7** *Given* someone else changed the ticket after I opened it, *when* I choose "Send and wait for customer", *then* neither the reply nor the status change is saved, my draft stays, and I am asked to reload (BR-19).

**Reply deadline** · BR-22 · *Should*

- **AC-13.8** *Given* a customer is waiting for a reply, *when* the assignee or Administrator sends one (Send or "Send and wait for customer"), *then* the clock ends, on time before the deadline and late after it, and the customer's next message starts a new clock.

## US-14 — Change ticket status
UC-14 · BR-06, BR-19, BR-22

- **AC-14.1** *Given* a ticket in a given status, *when* I open the status control, *then* only the transitions allowed by BR-06 are offered, and any other transition sent directly is rejected.
- **AC-14.2** *Given* I set a ticket to `Resolved`, *when* the customer opens it, *then* they see `Resolved` and can still reply (reopen) or close it.
- **AC-14.3** *Given* a `Closed` ticket, *when* I open it, *then* no status change is offered.
- **AC-14.4** *Given* the customer replied after I opened the ticket, *when* I set it to `Resolved` from my outdated page, *then* nothing changes and I see "Ticket vừa được cập nhật. Tải lại để xem thay đổi." (BR-19).

**Reply deadline** · BR-22 · *Should*

- **AC-14.5** *Given* a running clock, *when* I set the ticket to `Waiting for Customer` or `Resolved` without replying, *then* the clock pauses and keeps the time already used; when the ticket returns to `In Progress`, by a customer reply or by hand, the clock resumes and never restarts from zero.
- **AC-14.6** *Given* a running or paused clock, *when* the ticket is `Closed`, *then* the clock ends: late if the deadline had passed, otherwise cancelled and left out of the on-time share (G-10).

## US-15 — Transfer or reassign a ticket
UC-15 · BR-04, BR-19, BR-22

- **AC-15.1** *Given* a ticket assigned to me, *when* I choose Transfer, *then* I see a list of the other active Staff members with their open-ticket counts.
- **AC-15.2** *Given* I pick a colleague and confirm, *when* the transfer completes, *then* the assignee changes, the status stays the same, the ticket leaves my queue, and I no longer have access to it (D-09).
- **AC-15.3** *Given* a `Closed` ticket or a locked target, *when* I try to transfer, *then* the transfer is rejected.
- **AC-15.4** *Given* the ticket changed after I opened it (for example a new customer message), *when* I confirm a transfer, *then* nothing changes and I am asked to reload (BR-19).

**Reassign any ticket** (Administrator)

- **AC-15.5** *Given* any non-closed ticket, *when* I (Administrator) choose an active Staff member or myself and confirm, *then* the assignee changes and the assignment time is recorded.
- **AC-15.6** *Given* an Unassigned ticket, *when* I assign it, *then* it appears in the new assignee's queue.
- **AC-15.7** *Given* the ticket changed after I opened it, *when* I confirm a reassignment, *then* nothing changes and I am asked to reload (BR-19).

**Reply deadline** · BR-22

- **AC-15.8** *Given* a ticket with a running clock, *when* it is transferred, reassigned, or redistributed because a Staff member is locked or set on leave, *then* its deadline does not change; the clock of an Unassigned ticket keeps running.

## US-16 — Correct AI labels and triage Unclassified tickets
UC-16 · BR-09, BR-10, BR-19, BR-22, BR-23

- **AC-16.1** *Given* a ticket I can act on, *when* I change the category (active categories only), priority, or sentiment and save, *then* the final label changes and the AI label stays unchanged.
- **AC-16.2** *Given* an Unclassified ticket, *when* I set its category and priority, *then* the "Unclassified" badge disappears and the ticket takes its normal place in the queue order.
- **AC-16.3** *Given* I changed an AI-chosen category or the AI priority, *when* the dashboard is calculated, *then* the ticket counts as corrected (BR-10); changing only the sentiment does not count.
- **AC-16.4** *Given* someone else corrected the labels after I opened the ticket, *when* I save my correction or confirmation, *then* nothing changes and I am asked to reload, so neither change is lost silently (BR-19).

**Reply deadline and confirmation** · BR-22, BR-23 · *Should*

- **AC-16.5** *Given* a running clock, *when* I change the priority and save, *then* the deadline is recalculated from when the clock started with the target of the new priority, never from now (DF-31).
- **AC-16.6** *Given* AI labels that are right, *when* I choose "Xác nhận nhãn" and save without changes, *then* "AI chưa chắc" and the "AI" markers disappear, the panel shows who confirmed and when, and the ticket does not count as corrected (BR-10, BR-23).

## US-17 — Summarize a ticket with AI
UC-17 · BR-11

- **AC-17.1** *Given* a ticket I can act on, *when* I click Summarize, *then* within 20 s I see 3–4 lines covering the main issue, what has been done, and what is pending, with the time it was created.
- **AC-17.2** *Given* a summary exists, *when* a new message is added, *then* the summary is labelled "Outdated" and a Regenerate action appears.
- **AC-17.3** *Given* an outdated summary, *when* I click Regenerate, *then* the new summary replaces the old one.
- **AC-17.4** *Given* the AI errors or times out, *when* I click Summarize, *then* I see an error with Retry, and the ticket is not affected.
- **AC-17.5** *Given* a summary exists, *when* the customer views the ticket, *then* the summary is not shown.

## US-18 — Rewrite my reply with AI
UC-18 · BR-12

- **AC-18.1** *Given* a non-empty draft, *when* I click Rewrite, *then* the rewritten text is shown next to my original draft.
- **AC-18.2** *Given* the fixed test set of 10 sample drafts, *when* each is rewritten, *then* no result contains a commitment, date, amount, or number that is not in its draft.
- **AC-18.3** *Given* a rewrite is shown, *when* I choose Use, edit it further, or Discard, *then* the reply box updates accordingly, and nothing is sent until I click Send (US-13).
- **AC-18.4** *Given* an empty draft, *when* I look at the Rewrite button, *then* it is disabled.
- **AC-18.5** *Given* the AI errors or does not answer within 20 s, *when* I click Rewrite, *then* I see an error and my draft is unchanged.

## US-19 — View the dashboard
UC-19 · BR-10, BR-16, BR-22, BR-23

**System-wide dashboard** (Administrator)

- **AC-19.1** *Given* I open the dashboard, *when* it loads, *then* it covers the last 30 days by creation date, and I can choose another range.
- **AC-19.2** *Given* tickets in the range, *when* it loads, *then* I see counts by status, by category, and by sentiment, with Unclassified as its own group.
- **AC-19.3** *Given* tickets in the range, *when* it loads, *then* I see the first response time in working hours (DF-32), its average and its 90th percentile, over tickets that have a reply, plus the count of tickets still waiting for a first reply.
- **AC-19.4** *Given* tickets in the range, *when* it loads, *then* I see the label correction rate (BR-10) with its numerator and denominator.
- **AC-19.5** *Given* no tickets in the range, *when* it loads, *then* I see zeros and an empty state, not an error.

**Personal dashboard** (Staff)

- **AC-19.6** *Given* I am Staff, *when* I open the dashboard, *then* every metric is calculated only from tickets currently assigned to me.
- **AC-19.7** *Given* I am Staff, *when* I use the dashboard, *then* I cannot see system-wide numbers or other Staff members' numbers.

**Replies on time and AI confidence** · BR-16, BR-22, BR-23

- **AC-19.8** *Given* response clocks that ended in the range, *when* it loads, *then* I see the share of replies on time, on time ÷ (on time + late), overall and for each priority, with the counts; clocks cancelled because the ticket was closed before the deadline are left out (G-10).
- **AC-19.9** *Given* replies that are overdue right now, *when* it loads, *then* I see how many there are, and choosing the number opens the queue filtered to them (AC-10.9).
- **AC-19.10** *Given* `Classified` tickets in the range, *when* it loads, *then* I see for each confidence band the number of tickets, how many were corrected (BR-10), and the rate; a band with fewer than 20 tickets shows "Chưa đủ dữ liệu" instead of a rate (DF-34).

## US-20 — Manage categories
UC-20 · BR-13

**Add a category**

- **AC-20.1** *Given* a unique name (up to 100 characters) and a description, *when* I save, *then* the category is active and appears in the customer form and in the AI category list.
- **AC-20.2** *Given* a name that already exists (ignoring case), *when* I save, *then* I see an error.
- **AC-20.3** *Given* an empty description, *when* I save, *then* I see "Description is required; AI uses it to classify tickets".

**Edit a category**

- **AC-20.4** *Given* an existing category, *when* I change its name or description and save, *then* the next AI classification uses the new values.
- **AC-20.5** *Given* tickets in that category, *when* I rename it, *then* they show the new name.
- **AC-20.6** *Given* a name used by another category, *when* I save, *then* I see an error.

**Hide or show a category** · *Should*

- **AC-20.7** *Given* an active category, *when* I hide it, *then* it disappears from the customer form, the AI category list, and the label-correction choices, while existing tickets keep it and filters still show it.
- **AC-20.8** *Given* a hidden category, *when* I show it again, *then* it becomes available everywhere again.
- **AC-20.9** *Given* any category, *when* I look for a delete action, *then* none exists (DF-18).

## US-21 — View the user list
UC-21 · BR-01

- **AC-21.1** *Given* users exist, *when* I open Users, *then* I see name, email, role, status (Active, On leave, or Locked), and creation date for each.
- **AC-21.2** *Given* the list, *when* I search by name or email or filter by role and status, *then* only matching users are shown.

## US-22 — Create a Staff account
UC-22 · BR-01, BR-15

- **AC-22.1** *Given* a full name, an unused email, and an initial password of at least 8 characters, *when* I save, *then* an active `STAFF` account is created and joins auto-assignment immediately with the 4-hour warm-up of BR-03 (AC-25.7).
- **AC-22.2** *Given* an email already in use, *when* I save, *then* I see an error.
- **AC-22.3** *Given* the create form, *when* it is shown, *then* the role is fixed to Staff and cannot be changed (DF-13).

## US-23 — Lock or unlock an account
UC-23 · BR-05

- **AC-23.1** *Given* an active user, *when* I lock the account and confirm, *then* its status becomes Locked, the user cannot log in, and any current session ends on its next request.
- **AC-23.2** *Given* a Staff member with open tickets, *when* I lock the account, *then* each open ticket is reassigned by the auto-assignment rule among the remaining active Staff, or becomes Unassigned if none remain (DF-05).
- **AC-23.3** *Given* a locked user, *when* I unlock the account, *then* they can log in again, and a Staff member rejoins auto-assignment with the 4-hour warm-up of BR-03 (AC-25.7); tickets moved away are not moved back.
- **AC-23.4** *Given* my own Administrator account, *when* I look for Lock, *then* it is not available.

## US-24 — AI classification of new tickets
UC-24 · BR-08, BR-09, BR-22

US-24 and US-25 have **no endpoint of their own**. They run when a ticket is submitted (US-06); US-25 also runs when a Staff account is locked (US-23) or a ticket is reopened (US-08). In the Step 6 cross-check they are traced to those endpoints.

- **AC-24.1** *Given* the customer did not choose a category, *when* the ticket is created, *then* exactly one LLM call is made with the title, description, and active categories (names and descriptions).
- **AC-24.2** *Given* a valid result with confidence ≥ 0.6, *when* it is processed, *then* category, priority, and sentiment are set, the confidence and reason are stored as the AI label, and the final label equals the AI label.
- **AC-24.3** *Given* the customer chose a category, *when* the ticket is classified, *then* the category stays unchanged and AI sets only priority and sentiment, in the same single call.
- **AC-24.4** *Given* the AI returns a category that is not active, a value outside the enums, or invalid JSON, *when* it is processed, *then* it is treated as a failure (AC-24.11).
- **AC-24.5** *Given* the AI output contains extra fields or instructions, *when* it is processed, *then* only category, priority, sentiment, confidence, and reason are used, and no other action happens.
- **AC-24.6** *Given* a ticket was just created, *when* its AI call is still running, *then* its classification status is `Pending`; once the result is processed, it becomes `Classified`, or `Unclassified` with the cause (D-22, BR-08 rule 9).

**Angry sentiment raises priority** · BR-08 rule 6

- **AC-24.7** *Given* the AI returns sentiment `angry` with priority `low`, `medium`, or `high`, *when* the result is processed, *then* the stored priority is `medium`, `high`, or `urgent` respectively.
- **AC-24.8** *Given* the AI returns `angry` with priority `urgent`, *when* processed, *then* the priority stays `urgent`.
- **AC-24.9** *Given* a priority was raised, *when* Staff open the ticket, *then* they can see it was raised because of angry sentiment.

**Fallback to "Unclassified"** · BR-08 rule 7

- **AC-24.10** *Given* the AI returns confidence below 0.6, *when* processed, *then* the AI-set labels are "Unclassified", and the confidence and reason are still stored.
- **AC-24.11** *Given* the LLM call errors or gives no answer within 10 s, *when* the ticket is created, *then* the ticket is saved, its AI-set labels are "Unclassified", and the error is logged.
- **AC-24.12** *Given* the customer chose a category and the AI fails or has low confidence, *when* processed, *then* the category is kept and priority and sentiment are "Unclassified" (DF-07).
- **AC-24.13** *Given* an Unclassified ticket, *when* its assignee opens the queue, *then* it appears at the top with an "Unclassified" badge until someone sets its labels (US-16).
- **AC-24.14** *Given* an AI failure, *when* it happens, *then* the system does not retry automatically (DF-08).
- **AC-24.15** *Given* a ticket is still `Pending` 30 s after creation (for example after a server restart), *when* it is shown or counted, *then* it is treated as `Unclassified` (AI error), and a later AI result for it is discarded (DF-28).
- **AC-24.16** *Given* Staff set the labels while classification is `Pending`, *when* the AI result arrives, *then* only the AI label is filled, and the final labels Staff set stay unchanged (BR-08 rule 10).

**Reply deadline** · BR-22 · *Should*

- **AC-24.17** *Given* a new ticket, *when* it is created, *then* its first-response clock starts at creation and uses the `high` target while the classification is `Pending` or Unclassified; when AI or a person sets the priority, the deadline is recalculated from creation (DF-31).

## US-25 — Auto-assign new tickets
UC-25 · BR-03

- **AC-25.1** *Given* active Staff A has 3 open tickets and B has 1, *when* a ticket is created, *then* it is assigned to B and the assignment time is recorded.
- **AC-25.2** *Given* two active Staff members with the same number of open tickets, *when* a ticket is created, *then* it goes to the one whose last assignment is older (a never-assigned Staff member first).
- **AC-25.3** *Given* a locked Staff member, a Staff member on leave, or an Administrator has fewer open tickets than anyone, *when* a ticket is created, *then* they are not chosen.
- **AC-25.4** *Given* no active Staff exists, *when* a ticket is created, *then* it is Unassigned and appears under the Administrator's "Unassigned" filter.
- **AC-25.5** *Given* the AI call fails, *when* a ticket is created, *then* it is still assigned.
- **AC-25.6** *Given* a Staff member has tickets that are `Resolved` or `Closed`, *when* the load is counted, *then* those tickets are not counted (DF-01).
- **AC-25.7** *Given* active Staff B and C each have 6 open tickets, and Staff A joined auto-assignment 1 hour ago with 0 open tickets (new account, leave ended, or unlocked), *when* new tickets are created, *then* A's load counts as 6, so the new tickets are shared among A, B, and C (about one in three each) instead of all going to A; 4 hours after joining, A's actual count is used again (D-21, DF-27).
- **AC-25.8** *Given* A just joined auto-assignment and A is the only active Staff, *when* a ticket is created, *then* it is assigned to A; the warm-up never leaves a ticket Unassigned.

## US-26 — Email notification of ticket updates
UC-26 · BR-17

- **AC-26.1** *Given* Staff or the Administrator send a reply on my ticket, *when* the reply is saved, *then* I get one email at my account email with the ticket number, title, "new reply", and a link to the ticket, but not the reply text (DF-25).
- **AC-26.2** *Given* Staff or the Administrator change my ticket's status without replying (for example to `Resolved`), *when* the change is saved, *then* I get one email that names the new status, using the customer wording (DF-22).
- **AC-26.3** *Given* one action both adds a reply and changes the status ("Send and wait for customer", or the first reply that moves `New` to `In Progress`), *when* it is saved, *then* I get exactly one email.
- **AC-26.4** *Given* I reply to or close my own ticket, or Staff transfer it or correct or confirm its labels, or a reply to me becomes due soon or overdue, *when* that happens, *then* no email is sent.
- **AC-26.5** *Given* the Email Service fails or times out, *when* Staff send a reply or change the status, *then* the action is saved and shown as usual, and the failure is logged.
- **AC-26.6** *Given* my account is locked, *when* Staff act on my ticket, *then* no email is sent.

## US-27 — Set a Staff member on leave
UC-27 · BR-03, BR-04, BR-18

- **AC-27.1** *Given* an `Active` Staff member with 2 open tickets, *when* I (Administrator) choose Set on leave and confirm, *then* their status becomes `On leave` and both tickets are reassigned by the auto-assignment rule among the other active Staff, or become Unassigned if none remain.
- **AC-27.2** *Given* a Staff member on leave, *when* a ticket is created, *then* it is never assigned to them, and they do not appear in the transfer or reassign list.
- **AC-27.3** *Given* a Staff member on leave, *when* they log in, *then* they can use the system, but the tickets moved away are no longer visible to them (D-09), and logging in does not end their leave.
- **AC-27.4** *Given* a Staff member on leave, *when* I choose End leave, *then* their status becomes `Active`, they rejoin auto-assignment immediately with the 4-hour warm-up of BR-03 (AC-25.7), and the moved tickets are not moved back.
- **AC-27.5** *Given* a Staff member is logged in, *when* they look for a way to change their own status, *then* there is none, and a direct request to change it is rejected (D-20).
- **AC-27.6** *Given* a Customer, an Administrator, or a `Locked` account, *when* I look at its row, *then* Set on leave is not available.
- **AC-27.7** *Given* a `Resolved` ticket whose assignee is on leave, *when* the customer replies, *then* the ticket reopens and is auto-assigned again (BR-05).

## US-28 — Manage policy articles
UC-28 · BR-20

**Add a policy article**

- **AC-28.1** *Given* a unique title (up to 150 characters, ignoring case) and a body (up to 5,000 characters), *when* I save, *then* the article is active, its last-reviewed date is today, and suggestions can use it.
- **AC-28.2** *Given* a title that already exists (ignoring case), *when* I save, *then* I see an error and nothing is saved.
- **AC-28.3** *Given* an empty title or body, *when* I save, *then* each empty field shows an error and nothing is saved.
- **AC-28.4** *Given* a body that repeats another article's body (ignoring case, spacing, and how accents are encoded), *when* I save, *then* I see an error that names that article, and nothing is saved.

**Edit a policy article and mark it reviewed**

- **AC-28.5** *Given* an existing article, *when* I change its title or body and save, *then* the next suggestion uses only the new text, the old text is kept as an earlier revision and never given to AI again, and its last-reviewed date becomes today.
- **AC-28.6** *Given* an article that is still correct, *when* I choose "Đánh dấu đã xem lại", *then* its last-reviewed date becomes today without other changes.
- **AC-28.7** *Given* an article last reviewed more than 180 days ago, *when* the list is shown, *then* it carries a "Cần xem lại" chip, and suggestions do not use it until it is reviewed (DF-29).
- **AC-28.8** *Given* an existing article, *when* I save it without changing its title or body, *then* no revision is added and only its last-reviewed date becomes today.

**Hide or show a policy article**

- **AC-28.9** *Given* an active article, *when* I hide it, *then* suggestions never use it, its text is kept, and the list shows it as hidden.
- **AC-28.10** *Given* a hidden article, *when* I show it again, *then* suggestions can use it again, unless it is overdue for review.
- **AC-28.11** *Given* any article, *when* I look for a delete action, *then* none exists.

## US-29 — Suggest a reply from the shop's policies
UC-29 · BR-20, BR-21

- **AC-29.1** *Given* a ticket I can act on that is not `Closed`, *when* I click "Gợi ý trả lời", *then* within 20 s I see a suggested reply next to my current draft, with the title and quoted passage of each article it cites.
- **AC-29.2** *Given* a suggestion is shown, *when* I choose "Dùng bản này", *then* it replaces the text in the reply box; "Bỏ qua" keeps my draft; nothing is sent until I click Send (US-13).
- **AC-29.3** *Given* the fixed test set of 10 sample tickets that each have a matching article, *when* each gets a suggestion, *then* no suggestion contains a fact, date, amount, or commitment that is not in an article it cites.
- **AC-29.4** *Given* the AI errors or does not answer within 20 s, *when* I click "Gợi ý trả lời", *then* I see an error with Retry, and my draft is unchanged.
- **AC-29.5** *Given* a suggestion was created, *when* the customer views the ticket, *then* no suggestion or citation is visible (DF-14), and the ticket version is unchanged (BR-19).
- **AC-29.6** *Given* a suggestion is shown, *when* it is shown and when I choose "Dùng bản này", *then* the system records the time, the ticket, the outcome, the suggested text, each cited article with its revision and quoted passage, and whether it was accepted (G-09).
- **AC-29.7** *Given* an article that a suggestion cites is edited while AI is writing it, *when* the result arrives, *then* it is discarded, I see "Chính sách vừa được cập nhật…" with Retry, and my draft is unchanged (D-26).

**No suggestion when no policy fits** · BR-21

- **AC-29.8** *Given* no active, reviewed article is relevant to the ticket, *when* I click "Gợi ý trả lời", *then* I see "Không tìm thấy chính sách phù hợp" and no suggested text.
- **AC-29.9** *Given* the AI output cites no article it was given, cites a hidden or overdue article, or quotes a passage that is not in the cited article, *when* it is processed, *then* it is discarded and I see the same message as AC-29.8.
- **AC-29.10** *Given* the fixed test set also has 5 tickets with no relevant article, *when* each is run, *then* none produces a suggestion.
- **AC-29.11** *Given* there is no active, reviewed article at all, *when* I look at "Gợi ý trả lời", *then* it is disabled with the hint "Chưa có chính sách nào để AI dựa vào".

**Related:** [Step index](README.md)

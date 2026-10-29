# Navigation

> Design status: MVP — Step 3 of 9, approved
>
> Implementation status: NOT STARTED

## Global navigation (D-14)

| Role | Layout | Items |
|---|---|---|
| Customer | Top bar | Logo → My Tickets · **Submit a ticket** (primary button) · Account menu (Profile, Log out) |
| Staff | Left sidebar + top bar | **My queue** (badge: number of open tickets) · Dashboard · Account menu in top bar (Profile, Log out) |
| Administrator | Left sidebar + top bar | **All tickets** (badge: number of Unassigned tickets) · Dashboard · Categories · Users · Account menu in top bar (Profile, Log out) |

## Local and contextual navigation

- **List → detail:** opening a ticket from SCR-10 or SCR-20 opens its detail page; "Back" returns to the list with the same filters and scroll position.
- **Breadcrumb** on detail pages: `My tickets / #1024` (Customer) or `My queue / #1024` (Staff), `All tickets / #1024` (Administrator).
- **After submitting a ticket:** go to SCR-12 for that ticket, with a confirmation message.
- **After a transfer:** the Staff member returns to SCR-20, because they no longer have access to the ticket (D-09).
- **After login:** go to the role's home page; **after logout or session end:** go to SCR-01.
- There are no notifications in the MVP (A-03); the queue badge and the list order show new work.

**Related:** [Step index](README.md)

# Feature Specification: Recurring Expenses

**Feature Branch**: `005-recurring-expenses`
**Created**: 2026-04-23
**Status**: Draft

## Context

Users want to mark expenses as recurring so they don't
have to manually add the same expenses every week, month
or year. Recurring expenses are automatically added on
the appropriate date silently in the background.

## User Scenarios & Testing

### User Story 1 - Mark an Expense as Recurring
(Priority: P1)

A user wants to mark an expense as recurring when adding
it so it gets automatically added in future periods.

**Why this priority**: Core feature — without this
nothing else in this feature works.

**Independent Test**: Add an expense with "Mark as
recurring" checked, select Monthly interval. Verify it
appears in the expense list and in the recurring expenses
management section.

**Acceptance Scenarios**:

1. **Given** the Add Expense form is open, **When** the
   user ticks "Mark as recurring" checkbox, **Then** an
   interval dropdown appears (Weekly, Monthly, Yearly)
2. **Given** the recurring checkbox is ticked and interval
   selected, **When** the user clicks Add, **Then** the
   expense is added normally AND saved as a recurring
   template
3. **Given** a recurring expense is added, **Then** it
   appears in the Recurring Expenses management section
4. **Given** the recurring checkbox is not ticked,
   **Then** the expense is added as a normal one-time
   expense

---

### User Story 2 - Manage Recurring Expenses
(Priority: P1)

A user wants to view and delete recurring expense
templates so they can manage their recurring costs.

**Why this priority**: Users need a way to stop
unwanted recurring expenses.

**Independent Test**: Open the recurring expenses section.
Verify all recurring templates are listed with their
interval. Delete one — verify it no longer appears and
won't be auto-added in future.

**Acceptance Scenarios**:

1. **Given** recurring expenses exist, **Then** the
   recurring expenses section shows all templates with
   title, amount, category and interval
2. **Given** the user clicks Delete on a recurring
   template, **Then** the template is removed and will
   no longer be auto-added
3. **Given** no recurring expenses exist, **Then** a
   friendly empty state message is shown
4. **Given** a recurring template is deleted, **Then**
   previously auto-added expenses are NOT deleted —
   only future ones are stopped

---

### User Story 3 - Auto-Add Recurring Expenses
(Priority: P2)

The app automatically adds recurring expenses on the
correct date without any user action.

**Why this priority**: This is the main value of the
feature but requires User Stories 1 and 2 first.

**Independent Test**: Create a Monthly recurring expense.
Simulate the 1st of next month loading the app. Verify
the expense was automatically added to the expense list.

**Acceptance Scenarios**:

1. **Given** a Monthly recurring expense exists, **When**
   the app loads on the 1st of a new month, **Then** the
   expense is automatically added with today's date
2. **Given** a Weekly recurring expense exists, **When**
   the app loads on the correct weekday, **Then** the
   expense is automatically added with today's date
3. **Given** a Yearly recurring expense exists, **When**
   the app loads on the correct date, **Then** the
   expense is automatically added with today's date
4. **Given** a recurring expense was already added this
   period, **When** the app loads again, **Then** it is
   NOT added again (no duplicates)
5. **Given** auto-add happens, **Then** no notification
   is shown — it happens silently

---

### Edge Cases

- What if the app wasn't opened for 2 months? Only add
  once for the current period — don't backfill missed
  periods
- What if a recurring expense amount changes? The
  template stores the original amount — edit the
  template to change future amounts
- What if two recurring expenses have the same title?
  Allow it — they are independent templates

## Requirements

### Functional Requirements

- **FR-001**: AddExpenseForm MUST have a "Mark as
  recurring" checkbox
- **FR-002**: When checkbox is ticked, an interval
  dropdown MUST appear with Weekly, Monthly, Yearly
- **FR-003**: System MUST save recurring templates
  separately from regular expenses
- **FR-004**: System MUST display all recurring templates
  in a dedicated management section
- **FR-005**: System MUST allow deleting recurring
  templates
- **FR-006**: System MUST auto-add Monthly recurring
  expenses on the 1st of each month
- **FR-007**: System MUST auto-add Weekly recurring
  expenses on the same day each week
- **FR-008**: System MUST auto-add Yearly recurring
  expenses on the same date each year
- **FR-009**: System MUST NOT add duplicates — track
  last added date per template
- **FR-010**: Auto-add MUST happen silently with no
  notification

### Key Entities

- **RecurringTemplate**: Stored in localStorage
  - id (unique identifier)
  - title (string)
  - amount (number)
  - category (string)
  - interval ("weekly" | "monthly" | "yearly")
  - dayOfWeek (0-6, for weekly only)
  - dayOfMonth (1-31, for monthly — day template
    was created)
  - monthAndDay (MM-DD, for yearly)
  - lastAddedDate (ISO date string — tracks when
    last auto-added)
  - createdAt (timestamp)

## Success Criteria

- **SC-001**: Recurring checkbox appears on Add Expense
  form and works correctly
- **SC-002**: All recurring templates visible in
  management section
- **SC-003**: Deleting template stops future auto-adds
- **SC-004**: Auto-add works correctly for all three
  intervals
- **SC-005**: No duplicate expenses created

## Clarifications

Clarified on 2026-04-23:

- **Intervals**: Weekly, Monthly, Yearly
- **Auto-add behaviour**: Silently on correct date
  when app loads
- **Mark as recurring**: Checkbox on form AND dedicated
  management section
- **Notification**: No notification on auto-add
- **Missed periods**: Only add for current period,
  no backfilling

## Assumptions

- Recurring templates are stored separately from expenses
- Deleting a template does not delete past auto-added
  expenses
- Auto-add checks happen when the app loads
- Weekly recurrence uses the same day of week as when
  the template was created
- Monthly recurrence uses the same day of month as when
  the template was created
- Yearly recurrence uses the same month and day as when
  the template was created
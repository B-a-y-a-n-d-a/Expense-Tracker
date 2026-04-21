# Feature Specification: Expense Tracker

**Feature Branch**: `001-expense-tracker`
**Created**: 2026-04-20
**Status**: Complete

## User Scenarios & Testing

### User Story 1 - Add an Expense (Priority: P1)

A user wants to record a new expense by entering a title, amount,
category, and date so they can keep track of their spending.

**Why this priority**: This is the core feature — without it nothing
else works.

**Independent Test**: Can be tested by filling in the add expense
form and verifying the expense appears in the list below.

**Acceptance Scenarios**:

1. **Given** the app is open, **When** the user fills in title,
   amount, category and date and clicks Add, **Then** the expense
   appears in the expense list
2. **Given** the user leaves the title empty, **When** they click
   Add, **Then** an error message is shown and the expense is not
   saved
3. **Given** the user enters a negative amount, **When** they click
   Add, **Then** an error message is shown and the expense is not
   saved
4. **Given** a valid expense is added, **When** the page is
   refreshed, **Then** the expense is still visible (persisted)

---

### User Story 2 - View All Expenses (Priority: P1)

A user wants to see all their recorded expenses in a list sorted
by date so they can review their spending history.

**Why this priority**: Core feature — the list is the main view
of the app.

**Independent Test**: Can be tested by adding multiple expenses
and verifying they appear sorted by date descending (newest first).

**Acceptance Scenarios**:

1. **Given** expenses exist, **When** the app loads, **Then** all
   expenses are displayed sorted by date descending
2. **Given** no expenses exist, **When** the app loads, **Then**
   a friendly empty state message is shown
3. **Given** expenses are displayed, **Then** each item shows
   title, amount, category and date

---

### User Story 3 - Delete an Expense (Priority: P2)

A user wants to delete an expense they added by mistake so their
records stay accurate.

**Why this priority**: Important for data accuracy but the app
still works without it.

**Independent Test**: Can be tested by adding an expense then
deleting it and verifying it disappears from the list.

**Acceptance Scenarios**:

1. **Given** an expense exists, **When** the user clicks Delete,
   **Then** a confirmation prompt appears
2. **Given** the user confirms deletion, **Then** the expense is
   removed from the list and from localStorage
3. **Given** the user cancels deletion, **Then** the expense
   remains in the list

---

### User Story 4 - Filter by Category (Priority: P2)

A user wants to filter their expenses by category so they can
see how much they're spending in a specific area.

**Why this priority**: Useful but not critical for MVP.

**Independent Test**: Can be tested by adding expenses in
different categories, selecting a filter, and verifying only
matching expenses are shown.

**Acceptance Scenarios**:

1. **Given** expenses in multiple categories exist, **When** the
   user selects a category filter, **Then** only expenses in that
   category are shown
2. **Given** a filter is active, **When** the user selects "All",
   **Then** all expenses are shown again
3. **Given** a filter is active, **Then** the summary updates to
   reflect only the filtered expenses

---

### User Story 5 - View Spending Summary (Priority: P3)

A user wants to see their total spending and a breakdown by
category so they understand where their money is going.

**Why this priority**: Nice to have — adds value but app works
without it.

**Independent Test**: Can be tested by adding expenses across
categories and verifying the summary totals are correct.

**Acceptance Scenarios**:

1. **Given** expenses exist, **Then** the summary shows the total
   amount spent
2. **Given** expenses exist across multiple categories, **Then**
   the summary shows a breakdown of total per category
3. **Given** no expenses exist, **Then** the summary shows R0.00

---

### Edge Cases

- What happens when localStorage is full or unavailable?
- What happens when an invalid date is entered?
- What happens when the amount has more than 2 decimal places?
- What happens when the title is extremely long?

## Requirements

### Functional Requirements

- **FR-001**: System MUST allow users to add an expense with
  title, amount, category and date
- **FR-002**: System MUST validate that title is not empty
- **FR-003**: System MUST validate that amount is a positive number
- **FR-004**: System MUST validate that a date is selected
- **FR-005**: System MUST persist all expenses in localStorage
- **FR-006**: System MUST display all expenses sorted by date
  descending
- **FR-007**: System MUST allow users to delete an expense with
  confirmation
- **FR-008**: System MUST allow filtering expenses by category
- **FR-009**: System MUST display total spending and per-category
  breakdown
- **FR-010**: System MUST handle localStorage errors gracefully

### Key Entities

- **Expense**: Represents a single expense record
  - id (unique identifier)
  - title (string, required)
  - amount (positive whole number, required)
  - category (one of: Food, Transport, Entertainment, Bills, Other)
  - date (date string, required)
  - createdAt (timestamp)

- **Category**: Fixed list of allowed categories
  - Food
  - Transport
  - Entertainment
  - Bills
  - Other

## Success Criteria

- **SC-001**: User can add a new expense in under 30 seconds
- **SC-002**: Expenses survive a full page refresh
- **SC-003**: Filtering returns only matching expenses with 100%
  accuracy
- **SC-004**: Summary totals match the sum of all visible expenses
- **SC-005**: App works correctly on both desktop and mobile
  screen sizes

## Clarifications

These were clarified on 2026-04-20:

- **Date input**: No default date — user must always manually
  pick a date
- **Amount format**: Whole numbers only — no decimals
  (e.g. R25, not R25.50)
- **Expense list**: All expenses shown at once in a scrollable
  list — no pagination
- **Category filter**: Displayed as tabs at the top of the
  expense list
- **Summary location**: Spending summary displayed at the bottom
  of the page
- **Delete confirmation**: Inline confirmation — "Are you sure?"
  appears next to the item, not a browser popup
- **Category breakdown**: All categories always shown in summary,
  even those with R0.00 spending

## Assumptions

- Single user app — no login or authentication needed
- South African Rand (R) is the only currency
- No backend — all data stored in localStorage
- Browser support: modern browsers only (Chrome, Edge, Firefox)
- No expense editing — overridden by spec 002-edit-expense
- Amount is whole numbers only — no decimal/cents support
- Date has no default — user must always select it manually
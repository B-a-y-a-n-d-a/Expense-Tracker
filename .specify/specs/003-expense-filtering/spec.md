# Feature Specification: Expense Filtering

**Feature Branch**: `003-expense-filtering`
**Created**: 2026-04-21
**Status**: Draft

## Context

This feature adds three complementary filtering and sorting
capabilities to the expense list: date range filter, keyword
search, and sort options. All three filters work together
simultaneously to narrow and order the expense list.

## User Scenarios & Testing

### User Story 1 - Filter by Date Range (Priority: P1)

A user wants to filter expenses by a time period so they can
focus on spending within a specific window.

**Why this priority**: Most useful filter — users naturally
think in monthly terms for budgeting.

**Independent Test**: Add expenses across different months.
Select "This Month" — only current month expenses show.
Select "All Time" — all expenses show again.

**Acceptance Scenarios**:

1. **Given** expenses exist across multiple months, **When**
   the user selects "This Month", **Then** only expenses with
   a date in the current calendar month are shown
2. **Given** the user selects "Last Month", **Then** only
   expenses from the previous calendar month are shown
3. **Given** the user selects "This Year", **Then** only
   expenses from the current calendar year are shown
4. **Given** the user selects "All Time", **Then** all
   expenses are shown regardless of date
5. **Given** a date range filter is active, **Then** the
   spending summary updates to reflect only filtered expenses

---

### User Story 2 - Search by Keyword (Priority: P1)

A user wants to search expenses by keyword so they can quickly
find a specific expense.

**Why this priority**: Core productivity feature — saves
time scrolling through long lists.

**Independent Test**: Add expenses with different titles and
categories. Type a keyword — only matching expenses show.
Clear the search — all expenses show again.

**Acceptance Scenarios**:

1. **Given** expenses exist, **When** the user types a keyword
   in the search box, **Then** only expenses whose title OR
   category contains the keyword are shown
2. **Given** the user types "food", **Then** expenses with
   title "Grocery food" and category "Food" both match
3. **Given** search is case insensitive, **When** the user
   types "FOOD", **Then** it matches the same results as "food"
4. **Given** the user clears the search box, **Then** all
   expenses are shown again
5. **Given** no expenses match the search, **Then** the message
   "No expenses match your filters" is shown

---

### User Story 3 - Sort Expenses (Priority: P2)

A user wants to sort expenses by different criteria so they
can view them in the most useful order.

**Why this priority**: Enhances usability but app works
without it.

**Independent Test**: Add expenses with different amounts,
dates and titles. Change sort option — verify list reorders
correctly.

**Acceptance Scenarios**:

1. **Given** expenses exist, **When** the user selects
   "Amount: High to Low", **Then** expenses are sorted by
   amount descending
2. **Given** the user selects "Amount: Low to High", **Then**
   expenses are sorted by amount ascending
3. **Given** the user selects "Date: Newest First", **Then**
   expenses are sorted by date descending
4. **Given** the user selects "Date: Oldest First", **Then**
   expenses are sorted by date ascending
5. **Given** the user selects "Title: A to Z", **Then**
   expenses are sorted alphabetically by title
6. **Given** no sort is selected, **Then** default sort is
   Amount: High to Low

---

### User Story 4 - Combined Filters (Priority: P2)

A user wants to use multiple filters simultaneously so they
can narrow results precisely.

**Why this priority**: Makes the filtering system truly
powerful.

**Independent Test**: Apply category tab + date range +
search + sort simultaneously — verify all four work together
correctly.

**Acceptance Scenarios**:

1. **Given** a category filter, date range, search and sort
   are all active, **Then** the list shows only expenses that
   match ALL active filters, sorted by the selected sort
2. **Given** multiple filters are active, **When** the user
   clicks "Clear All Filters", **Then** search is cleared,
   date range resets to "All Time", sort resets to
   "Amount: High to Low", and category resets to "All"
3. **Given** combined filters return no results, **Then**
   "No expenses match your filters" is shown

---

### Edge Cases

- What if search keyword matches nothing? Show empty state
  with "No expenses match your filters"
- What if "This Month" has no expenses? Show empty state
- What if all filters are at default? Show all expenses
  normally

## Requirements

### Functional Requirements

- **FR-001**: System MUST provide date range filter with
  options: All Time, This Month, Last Month, This Year
- **FR-002**: System MUST provide a keyword search that
  matches title and category (case insensitive)
- **FR-003**: System MUST provide sort options: Amount High
  to Low, Amount Low to High, Date Newest First, Date Oldest
  First, Title A to Z
- **FR-004**: Default sort MUST be Amount: High to Low
- **FR-005**: All filters MUST work simultaneously
- **FR-006**: System MUST show "No expenses match your
  filters" when combined filters return no results
- **FR-007**: System MUST provide a "Clear All Filters"
  button that resets all filters including category tabs
- **FR-008**: Spending summary MUST update to reflect
  currently filtered expenses

### Key Entities

- **FilterState**: Represents the current filter configuration
  - searchKeyword (string, default "")
  - dateRange (one of: "all", "thisMonth", "lastMonth",
    "thisYear", default "all")
  - sortBy (one of: "amountDesc", "amountAsc", "dateDesc",
    "dateAsc", "titleAsc", default "amountDesc")
  - activeCategory (string, default "All")

## Success Criteria

- **SC-001**: All four filters work correctly independently
- **SC-002**: All four filters work correctly combined
- **SC-003**: Clear All Filters resets everything in one click
- **SC-004**: Summary always reflects currently visible expenses
- **SC-005**: Empty state message is contextually correct

## Clarifications

These were clarified on 2026-04-21:

- **Filter controls location**: All in a new filter bar below
  the category tabs
- **Default sort**: Amount: High to Low
- **Filters stack**: Yes — all filters work simultaneously
- **Search scope**: Matches title AND category
- **Case sensitivity**: Case insensitive search
- **This Month**: Current calendar month (e.g. April 1–30)
- **Empty state**: "No expenses match your filters" when
  filters return no results
- **Clear All Filters**: Resets search, date range, sort AND
  category tab back to defaults

## Assumptions

- No URL persistence of filter state — filters reset on
  page refresh
- Filter bar is always visible — not collapsible
- Sort and date range are dropdowns
- Search is a text input with a clear button
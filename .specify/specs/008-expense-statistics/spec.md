# Feature Specification: Expense Statistics

**Feature Branch**: `008-expense-statistics`
**Created**: 2026-04-24
**Status**: Draft

## Context

Users want to see insightful statistics about their
spending patterns for the current month so they can
make better financial decisions.

## User Scenarios & Testing

### User Story 1 - View Expense Statistics (Priority: P1)

A user wants to see key statistics about their current
month spending in a collapsible section.

**Why this priority**: Core feature — this is the
entire purpose of this spec.

**Independent Test**: Add several expenses across
different categories and days. Open the statistics
section. Verify all 6 statistics show correct values.

**Acceptance Scenarios**:

1. **Given** the statistics section is collapsed,
   **When** the user clicks "Show Statistics", **Then**
   the section expands showing all 6 statistics
2. **Given** the section is expanded, **When** the
   user clicks "Hide Statistics", **Then** it collapses
3. **Given** current month expenses exist, **Then**
   average daily spend shows total divided by days
   elapsed in current month
4. **Given** current month expenses exist, **Then**
   highest single expense shows the largest amount
   with its title
5. **Given** current month expenses exist, **Then**
   most used category shows the category with the
   most expense entries
6. **Given** current month expenses exist, **Then**
   most expensive category shows the category with
   the highest total amount
7. **Given** current month expenses exist, **Then**
   total number of expenses shows the count
8. **Given** current month expenses exist, **Then**
   busiest day shows the day of the week with the
   most expenses
9. **Given** no expenses exist for current month,
   **Then** each statistic shows a friendly empty
   state (e.g. "No data yet")
10. **Given** collapse state is saved, **When** the
    page is refreshed, **Then** the section stays
    in its last state

---

### Edge Cases

- What if two categories tie for most used? Show
  the first one alphabetically
- What if two days tie for busiest? Show the first
  one found
- What if there is only one expense? Show it as
  both highest and average
- What if the month just started (day 1)? Average
  daily spend = total spent (divided by 1 day)

## Requirements

### Functional Requirements

- **FR-001**: Statistics section MUST be collapsible
- **FR-002**: Collapse state MUST persist in localStorage
- **FR-003**: ALL statistics MUST be based on current
  month expenses only
- **FR-004**: Average daily spend MUST be calculated
  as total spent divided by number of days elapsed
  in current month (minimum 1 day)
- **FR-005**: Highest expense MUST show amount and
  title of the single most expensive expense
- **FR-006**: Most used category MUST show the
  category name with the most expense entries
- **FR-007**: Most expensive category MUST show the
  category with the highest total amount
- **FR-008**: Total expenses MUST show count of
  current month expenses
- **FR-009**: Busiest day MUST show the day of the
  week (e.g. "Monday") with the most expenses
- **FR-010**: All statistics MUST show "No data yet"
  when no current month expenses exist

### Key Entities

- **Statistics**: Calculated — not stored
  - averageDailySpend (number)
  - highestExpense ({ title, amount })
  - mostUsedCategory (string)
  - mostExpensiveCategory (string)
  - totalExpenseCount (number)
  - busiestDay (string — day name)

## Success Criteria

- **SC-001**: All 6 statistics calculate correctly
- **SC-002**: Empty state shown when no data
- **SC-003**: Collapse state persists on refresh
- **SC-004**: Statistics update when expenses change

## Clarifications

Clarified on 2026-04-24:

- **Location**: Collapsible section like the calendar
- **Data source**: Current month expenses only
- **Statistics**: Average daily spend, highest expense,
  most used category, most expensive category, total
  count, busiest day of week
- **Ties**: Show first alphabetically / first found
- **Empty state**: "No data yet" for each statistic

## Assumptions

- Statistics are read-only — no user input needed
- Statistics recalculate automatically when expenses
  change
- Days elapsed = today's date (minimum 1)
- Busiest day uses full day name (Monday, Tuesday etc)
- Section is collapsed by default
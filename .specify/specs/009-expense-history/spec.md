# Feature Specification: Expense History

**Feature Branch**: `009-expense-history`
**Created**: 2026-05-05
**Status**: Draft

## Context

Users want to compare their spending across any two
months to understand trends and changes in their
spending behaviour. This feature is integrated into
the existing statistics section as a comparison tab.

## User Scenarios & Testing

### User Story 1 - Compare Two Months (Priority: P1)

A user wants to select any two months and see a side
by side breakdown of their spending so they can
understand how their habits have changed.

**Why this priority**: Core feature — this is the
entire purpose of this spec.

**Independent Test**: Add expenses across multiple
months. Open the history comparison. Select two
different months. Verify the side by side breakdown
shows correct totals, counts and per category amounts.

**Acceptance Scenarios**:

1. **Given** the statistics section is open, **When**
   the user clicks the "History" tab, **Then** the
   comparison view appears with two month selectors
2. **Given** two months are selected, **Then** each
   column shows total spent, expense count and per
   category totals for that month
3. **Given** two months are selected, **Then** each
   row shows an arrow and percentage difference
   between the two months
4. **Given** spending went DOWN from month A to
   month B, **Then** the difference is shown in
   green with a downward arrow
5. **Given** spending went UP from month A to
   month B, **Then** the difference is shown in
   red with an upward arrow
6. **Given** spending is the SAME, **Then** the
   difference shows 0% with a neutral indicator
7. **Given** a month has no expenses, **Then** it
   shows R0 for all values
8. **Given** the user changes either month selector,
   **Then** the comparison updates immediately

---

### User Story 2 - Month Selection (Priority: P1)

A user wants to pick any two months from a dropdown
so they can compare months of their choice.

**Acceptance Scenarios**:

1. **Given** the comparison view is open, **Then**
   two month dropdowns are shown — one for each
   column
2. **Given** expenses exist across multiple months,
   **Then** all months that have expenses appear
   as options in both dropdowns
3. **Given** the current month always appears as
   an option, **Then** the user can compare any
   past month with the current month
4. **Given** Month A selector defaults to current
   month, **Then** Month B selector defaults to
   previous month

---

### Edge Cases

- What if only one month has data? Show zeros for
  the empty month
- What if both months are the same? Allow it —
  show identical values with 0% difference
- What if there are no expenses at all? Show empty
  state message

## Requirements

### Functional Requirements

- **FR-001**: History comparison MUST be integrated
  into the statistics section as a tab
- **FR-002**: Two month dropdowns MUST allow selecting
  any month that has expenses plus current month
- **FR-003**: Month A MUST default to current month
- **FR-004**: Month B MUST default to previous month
- **FR-005**: Comparison MUST show total spent per
  month side by side
- **FR-006**: Comparison MUST show expense count
  per month side by side
- **FR-007**: Comparison MUST show per category
  totals side by side for all 5 categories
- **FR-008**: Each row MUST show percentage difference
  with up/down arrow
- **FR-009**: Difference MUST be green when spending
  decreased, red when increased
- **FR-010**: Comparison MUST update immediately
  when month selection changes

### Key Entities

- **MonthSummary**: Calculated — not stored
  - monthKey (string — "YYYY-MM")
  - monthLabel (string — "January 2026")
  - total (number)
  - count (number)
  - byCategory (object — category totals)

- **ComparisonRow**: Calculated — not stored
  - label (string)
  - valueA (number)
  - valueB (number)
  - difference (number — B minus A)
  - percentageDiff (number)
  - trend ("up" | "down" | "neutral")

## Success Criteria

- **SC-001**: Month dropdowns show all available months
- **SC-002**: Side by side comparison is accurate
- **SC-003**: Colour coding and arrows are correct
- **SC-004**: Defaults to current vs previous month
- **SC-005**: Updates immediately on month change

## Clarifications

Clarified on 2026-05-05:

- **Comparison**: User picks any two months
- **Location**: Integrated into statistics section
  as a tab alongside the existing statistics view
- **Content**: Total, count, per category totals
- **Difference display**: Arrow + percentage,
  colour coded green (down) / red (up)
- **Defaults**: Month A = current, Month B = previous

## Assumptions

- Month options are derived from existing expense
  dates plus current month
- Month labels use format "January 2026"
- Month keys use format "YYYY-MM" for calculations
- Percentage is calculated as
  ((B - A) / A) * 100, or 0 when A is 0
- Statistics and History share the same collapsible
  section with tabs to switch between them
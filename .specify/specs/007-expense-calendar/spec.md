# Feature Specification: Expense Calendar

**Feature Branch**: `007-expense-calendar`
**Created**: 2026-04-24
**Status**: Draft

## Context

Users want to see their expenses on a monthly calendar
view so they can understand their spending patterns
over time. The calendar is in a collapsible section.
Days with expenses show dots. Hovering over a day
shows a tooltip with expense details.

## User Scenarios & Testing

### User Story 1 - View Expense Calendar (Priority: P1)

A user wants to see a monthly calendar showing which
days have expenses so they can spot spending patterns.

**Why this priority**: Core feature — the calendar view
is the entire purpose of this spec.

**Independent Test**: Add expenses on different days.
Open the calendar section. Verify dots appear on days
that have expenses. Verify empty days have no dots.

**Acceptance Scenarios**:

1. **Given** the calendar section is collapsed, **When**
   the user clicks "Show Calendar", **Then** the
   calendar expands and shows the current month
2. **Given** the calendar is visible, **Then** it shows
   the correct month name and year
3. **Given** the calendar is visible, **Then** it shows
   all days of the month in a 7-column grid (Mon-Sun)
4. **Given** a day has one or more expenses, **Then**
   a coloured dot appears on that day
5. **Given** a day has no expenses, **Then** no dot
   appears
6. **Given** the user is viewing April 2026, **When**
   they click the previous arrow, **Then** March 2026
   is shown
7. **Given** the user is viewing April 2026, **When**
   they click the next arrow, **Then** May 2026 is shown

---

### User Story 2 - Hover to See Expenses (Priority: P1)

A user wants to hover over a day to see a tooltip
listing that day's expenses.

**Why this priority**: Core interaction — without this
the calendar is just decorative.

**Independent Test**: Add 2 expenses on the same day.
Hover over that day on the calendar. Verify tooltip
shows both expenses with title and amount.

**Acceptance Scenarios**:

1. **Given** a day has expenses, **When** the user
   hovers over it, **Then** a tooltip appears showing
   each expense with title and amount
2. **Given** a day has no expenses, **When** the user
   hovers over it, **Then** no tooltip appears
3. **Given** a day has multiple expenses, **Then** all
   expenses are listed in the tooltip
4. **Given** the user moves the mouse away, **Then**
   the tooltip disappears

---

### User Story 3 - Collapse Calendar (Priority: P2)

A user wants to collapse the calendar to save screen
space when not needed.

**Acceptance Scenarios**:

1. **Given** the calendar is expanded, **When** the
   user clicks "Hide Calendar", **Then** it collapses
2. **Given** the user collapses the calendar, **When**
   the page is refreshed, **Then** it stays collapsed
3. **Given** the user expands the calendar, **When**
   the page is refreshed, **Then** it stays expanded

---

### Edge Cases

- What if a month has expenses from a previous year?
  Show them correctly based on the viewed month/year
- What if today has no expenses? Show today with a
  subtle highlight but no dot
- What if the month starts on a Wednesday? Show empty
  cells for Monday and Tuesday

## Requirements

### Functional Requirements

- **FR-001**: Calendar MUST be in a collapsible section
- **FR-002**: Collapse/expand state MUST persist in
  localStorage
- **FR-003**: Calendar MUST show current month by
  default
- **FR-004**: Calendar MUST have previous/next month
  navigation arrows
- **FR-005**: Days with expenses MUST show a coloured
  dot
- **FR-006**: Hovering over a day with expenses MUST
  show a tooltip with title and amount for each expense
- **FR-007**: Today's date MUST be visually highlighted
- **FR-008**: Calendar MUST show day headers
  (Mon Tue Wed Thu Fri Sat Sun)
- **FR-009**: Calendar MUST respect active filters —
  only show dots for currently filtered expenses

### Key Entities

- **CalendarDay**: Calculated — not stored
  - date (string YYYY-MM-DD)
  - dayNumber (1-31)
  - isCurrentMonth (boolean)
  - isToday (boolean)
  - expenses (array of expenses on this day)
  - hasExpenses (boolean)

## Success Criteria

- **SC-001**: Calendar shows correct days for any month
- **SC-002**: Dots appear only on days with expenses
- **SC-003**: Tooltip shows correct expenses on hover
- **SC-004**: Month navigation works correctly
- **SC-005**: Collapse state persists on refresh

## Clarifications

Clarified on 2026-04-24:

- **Expense display**: Dots by default, tooltip on hover
- **Interaction**: Hover for tooltip (not click)
- **Location**: Collapsible section — user can show/hide
- **Collapse persistence**: Saved in localStorage

## Assumptions

- Calendar week starts on Monday
- Only expenses matching current active filters are
  shown on calendar
- Tooltip appears on CSS hover — no JS needed for
  basic tooltip
- No editing from calendar — view only
- Calendar shows one month at a time
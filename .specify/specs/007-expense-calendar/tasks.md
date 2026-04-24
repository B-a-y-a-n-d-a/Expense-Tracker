# Tasks: Expense Calendar

**Input**: `.specify/specs/007-expense-calendar/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Calendar Utils

**Purpose**: Pure calendar calculation functions
tested in isolation first

### Tests First

- [ ] T001 Create `src/tests/calendarUtils.test.js`
      covering:

  **getCalendarDays(year, month)**
  - returns 35 or 42 days (5 or 6 weeks)
  - first day of month falls on correct weekday
  - includes padding days from previous month
  - includes padding days from next month
  - all current month days have isCurrentMonth true
  - padding days have isCurrentMonth false

  **getExpensesForDate(expenses, dateString)**
  - returns expenses matching the date string
  - returns empty array when no expenses on date
  - returns multiple expenses when date has many

  **buildTooltipText(expenses)**
  - returns empty string when no expenses
  - returns formatted string with title and amount
  - handles multiple expenses with line separator

- [ ] T002 Add calendar storage tests to
      `src/tests/storageService.test.js` covering:
      - getCalendarOpen returns true when nothing
        stored (default open)
      - saveCalendarOpen persists value
      - getCalendarOpen returns saved value

### Implementation

- [ ] T003 Add CALENDAR_KEY to
      `src/utils/constants.js`:
      `export const CALENDAR_KEY =
      "expense-tracker-calendar-open"`

- [ ] T004 Create `src/utils/calendarUtils.js`:
      - getCalendarDays(year, month)
      - getExpensesForDate(expenses, dateString)
      - buildTooltipText(expenses)

- [ ] T005 Add to `src/services/storageService.js`:
      - getCalendarOpen() — returns true by default
      - saveCalendarOpen(isOpen) — saves boolean

- [ ] T006 Run tests: `npm run test` — T001 and
      T002 must PASS

**Checkpoint**: All calendar utility and storage
tests pass

---

## Phase 2: ExpenseCalendar Component

**Purpose**: Calendar UI with dots and tooltips

### Tests First

- [ ] T007 Create `src/tests/ExpenseCalendar.test.jsx`
      covering:
      - renders Show Calendar button when collapsed
      - renders calendar grid when expanded
      - renders 7 day headers (Mon-Sun)
      - renders correct month name and year
      - previous arrow navigates to previous month
      - next arrow navigates to next month
      - days with expenses show dot element
      - days without expenses show no dot

### Implementation

- [ ] T008 Create `src/components/ExpenseCalendar.jsx`:
      - collapsible section with show/hide toggle
      - header row: prev arrow, "Month Year", next
        arrow, collapse button
      - day headers: Mon Tue Wed Thu Fri Sat Sun
      - grid of calendar days:
        - each day shows day number
        - days outside current month are dimmed
        - today gets .today class
        - days with expenses get a .expense-dot
        - days with expenses get data-tooltip
          attribute with tooltip text
      - manages viewMonth and viewYear state
        (default: current month/year)
      - manages isOpen state from localStorage
      - saves isOpen to localStorage on toggle

- [ ] T009 Run tests: `npm run test` — T007 must
      PASS

**Checkpoint**: Calendar renders correctly with
dots and navigation

---

## Phase 3: App Wiring

**Purpose**: Add ExpenseCalendar to App

### Implementation

- [ ] T010 Update `src/App.jsx`:
      - import ExpenseCalendar
      - render below FilterBar, above ExpenseList
      - pass filteredExpenses as prop

- [ ] T011 Run `npm run test` — ALL tests must
      still PASS

- [ ] T012 Manual browser test:
      - add expenses on different days
      - open calendar — verify dots on correct days
      - hover over a day with expenses — tooltip shows
      - navigate to previous month — correct days shown
      - navigate to next month — correct days shown
      - collapse calendar — stays collapsed on refresh
      - expand calendar — stays expanded on refresh
      - apply category filter — dots update to match

**Checkpoint**: Calendar fully working end to end

---

## Phase 4: Styling

**Purpose**: Style calendar cleanly with dark mode
support

- [ ] T013 Add CSS to `src/App.css`:
      - .calendar-section — white card matching
        other sections
      - .calendar-header — flex row with arrows,
        month title and toggle button
      - .calendar-nav-btn — prev/next arrow buttons
      - .calendar-grid — 7-column CSS grid
      - .calendar-day-header — Mon-Sun labels,
        muted text
      - .calendar-day — individual day cell
      - .calendar-day.other-month — dimmed opacity
        for padding days
      - .calendar-day.today — subtle blue highlight
        for today
      - .expense-dot — small coloured circle
      - .calendar-day[data-tooltip]:hover::after —
        CSS tooltip styling, dark background,
        white text, positioned above the day

**Final Checkpoint**: Calendar looks clean and
professional. Tooltip readable. Works in both
light and dark mode. All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → must complete first (utils before UI)
- Phase 2 → depends on Phase 1
- Phase 3 → depends on Phase 2
- Phase 4 → depends on Phase 3

## Notes

- Calendar week starts on Monday (ISO standard)
- Tooltip is pure CSS — no JS event listeners needed
- data-tooltip attribute holds the tooltip text
- Calendar respects filteredExpenses from App —
  dots only show for visible expenses
- isOpen defaults to true (calendar open by default)
  so new users see it immediately
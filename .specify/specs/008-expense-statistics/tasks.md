# Tasks: Expense Statistics

**Input**: `.specify/specs/008-expense-statistics/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Statistics Utils

**Purpose**: Pure calculation functions tested
in isolation first

### Tests First

- [ ] T001 Create `src/tests/statisticsUtils.test.js`
      covering:

  **getAverageDailySpend(expenses)**
  - returns 0 when no expenses
  - returns correct average based on days elapsed
  - rounds to nearest whole number

  **getHighestExpense(expenses)**
  - returns null when no expenses
  - returns expense with highest amount
  - returns correct expense when multiple exist

  **getMostUsedCategory(expenses)**
  - returns null when no expenses
  - returns category with most entries
  - returns first alphabetically when tied

  **getMostExpensiveCategory(expenses)**
  - returns null when no expenses
  - returns category with highest total amount
  - handles multiple categories correctly

  **getBusiestDay(expenses)**
  - returns null when no expenses
  - returns correct day name for expenses
  - returns day with most expenses

  **getCurrentMonthStats(expenses)**
  - filters to current month before calculating
  - returns all 6 statistics in one object
  - returns empty/null values when no current
    month expenses

- [ ] T002 Add stats storage tests to
      `src/tests/storageService.test.js` covering:
      - getStatsOpen returns false when nothing
        stored (default collapsed)
      - saveStatsOpen persists value
      - getStatsOpen returns saved value

### Implementation

- [ ] T003 Add STATS_KEY to `src/utils/constants.js`:
      `export const STATS_KEY =
      "expense-tracker-stats-open"`

- [ ] T004 Create `src/utils/statisticsUtils.js`:
      - getAverageDailySpend(expenses)
      - getHighestExpense(expenses)
      - getMostUsedCategory(expenses)
      - getMostExpensiveCategory(expenses)
      - getBusiestDay(expenses)
      - getCurrentMonthStats(expenses)

- [ ] T005 Add to `src/services/storageService.js`:
      - getStatsOpen() — returns false by default
      - saveStatsOpen(isOpen) — saves boolean

- [ ] T006 Run tests: `npm run test` — T001 and
      T002 must PASS

**Checkpoint**: All statistics utility and storage
tests pass

---

## Phase 2: ExpenseStatistics Component

**Purpose**: Collapsible statistics UI

### Tests First

- [ ] T007 Create `src/tests/ExpenseStatistics.test.jsx`
      covering:
      - renders "Show Statistics" button when collapsed
      - renders statistics section when expanded
      - shows "No data yet" when no current month
        expenses
      - shows average daily spend when expenses exist
      - shows highest expense title and amount
      - shows most used category
      - shows most expensive category
      - shows total expense count
      - shows busiest day

### Implementation

- [ ] T008 Create `src/components/ExpenseStatistics.jsx`:
      - collapsible section with show/hide toggle
      - heading "Monthly Statistics"
      - 6 statistic cards in a grid:
        1. Average Daily Spend — formatted amount
        2. Highest Expense — title + amount
        3. Most Used Category — category name
        4. Most Expensive Category — category name
        5. Total Expenses — count with "expenses"
        6. Busiest Day — day name
      - each card has a label and a value
      - "No data yet" shown when value is null
      - manages isOpen state from localStorage
      - saves isOpen on toggle
      - receives expenses prop from App
      - filters to current month internally using
        getCurrentMonthStats

- [ ] T009 Run tests: `npm run test` — T007 must
      PASS

**Checkpoint**: Statistics component renders and
calculates correctly

---

## Phase 3: App Wiring

**Purpose**: Add ExpenseStatistics to App

### Implementation

- [ ] T010 Update `src/App.jsx`:
      - import ExpenseStatistics
      - render below SpendingSummary at bottom
      - pass expenses (all, not filtered) as prop
        so statistics always show current month
        regardless of active filters

- [ ] T011 Run `npm run test` — ALL tests must
      still PASS

- [ ] T012 Manual browser test:
      - add expenses across different days/categories
      - open statistics section
      - verify all 6 values are correct
      - verify "No data yet" for empty states
      - collapse — stays collapsed on refresh
      - expand — stays expanded on refresh

**Checkpoint**: Statistics fully working end to end

---

## Phase 4: Styling

**Purpose**: Style statistics section cleanly

- [ ] T013 Add CSS to `src/App.css`:
      - .statistics-section — white card matching
        other sections
      - .statistics-header — flex row with title
        and toggle button
      - .statistics-grid — 2 or 3 column CSS grid
        responsive layout
      - .stat-card — individual statistic card with
        subtle border, padding, rounded corners
      - .stat-label — muted text, small font
      - .stat-value — large bold text, primary colour
      - .stat-empty — muted "No data yet" text
      - dark mode support via CSS variables

**Final Checkpoint**: Statistics section looks clean
and professional in both light and dark mode.
All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → must complete first
- Phase 2 → depends on Phase 1
- Phase 3 → depends on Phase 2
- Phase 4 → depends on Phase 3

## Notes

- Statistics always use ALL expenses filtered to
  current month — not the filtered expenses from
  App state — so they always reflect real month
  spending regardless of UI filters
- Section is collapsed by default (getStatsOpen
  returns false)
- Average daily spend uses today's day of month
  as denominator (minimum 1)
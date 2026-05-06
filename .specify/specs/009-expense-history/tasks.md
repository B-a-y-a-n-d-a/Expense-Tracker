# Tasks: Expense History

**Input**: `.specify/specs/009-expense-history/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: History Utils

**Purpose**: Pure calculation functions tested
in isolation first

### Tests First

- [ ] T001 Create `src/tests/historyUtils.test.js`
      covering:

  **getAvailableMonths(expenses)**
  - returns current month even when no expenses
  - returns all months that have expenses
  - returns months sorted newest first
  - deduplicates months correctly

  **formatMonthLabel(monthKey)**
  - returns "January 2026" for "2026-01"
  - returns "December 2025" for "2025-12"
  - returns correct label for current month

  **getMonthSummary(expenses, monthKey)**
  - returns zero total when no expenses for month
  - returns correct total for month expenses
  - returns correct count for month expenses
  - returns correct per category totals
  - excludes expenses from other months

  **getDifference(valueA, valueB)**
  - returns trend "up" when B > A
  - returns trend "down" when B < A
  - returns trend "neutral" when B === A
  - returns correct percentage difference
  - returns 0% when valueA is 0

### Implementation

- [ ] T002 Create `src/utils/historyUtils.js`:
      - getAvailableMonths(expenses)
      - formatMonthLabel(monthKey)
      - getMonthSummary(expenses, monthKey)
      - getDifference(valueA, valueB)

- [ ] T003 Run tests: `npm run test` — T001 must
      PASS

**Checkpoint**: All history utility tests pass

---

## Phase 2: MonthComparison Component

**Purpose**: Side by side month comparison UI

### Tests First

- [ ] T004 Create `src/tests/MonthComparison.test.jsx`
      covering:
      - renders two month dropdowns
      - renders month A and month B column headers
      - renders Total Spent row
      - renders Expense Count row
      - renders one row per category (5 rows)
      - shows green colour when spending decreased
      - shows red colour when spending increased
      - shows neutral when values are equal
      - updating month A dropdown changes column A
      - updating month B dropdown changes column B

### Implementation

- [ ] T005 Create `src/components/MonthComparison.jsx`:
      - two month dropdowns side by side:
        - Month A (left) — defaults to current month
        - Month B (right) — defaults to previous month
        - both populated from getAvailableMonths
      - comparison table with rows:
        - Total Spent
        - Expense Count
        - Food
        - Transport
        - Entertainment
        - Bills
        - Other
      - each row shows:
        - label (left)
        - Month A value (middle-left)
        - Month B value (middle-right)
        - difference indicator (right):
          - ↑ percentage in red when up
          - ↓ percentage in green when down
          - = 0% in grey when neutral
      - uses getMonthSummary and getDifference
        from historyUtils.js
      - uses formatCurrency from formatters.js
      - receives expenses prop

- [ ] T006 Run tests: `npm run test` — T004 must
      PASS

**Checkpoint**: MonthComparison renders and
calculates correctly in isolation

---

## Phase 3: Integrate into ExpenseStatistics

**Purpose**: Add tab system to ExpenseStatistics

### Implementation

- [ ] T007 Update
      `src/components/ExpenseStatistics.jsx`:
      - add activeTab state (default "statistics")
      - add tab buttons below the section header:
        - "Statistics" tab
        - "History" tab
      - show existing statistics grid when
        activeTab === "statistics"
      - show MonthComparison when
        activeTab === "history"
      - pass expenses to MonthComparison

- [ ] T008 Run `npm run test` — ALL tests must
      still PASS

- [ ] T009 Manual browser test:
      - open statistics section
      - click History tab — comparison appears
      - verify default months are current and
        previous month
      - change month dropdowns — comparison updates
      - add expenses in different months — verify
        they appear as options
      - verify green/red colour coding is correct
      - verify arrows point correct direction
      - click Statistics tab — original stats return
      - works correctly in dark mode

**Checkpoint**: Full history comparison working
end to end integrated with statistics section

---

## Phase 4: Styling

**Purpose**: Style tabs and comparison table

- [ ] T010 Add CSS to `src/App.css`:
      - .stats-tabs — horizontal tab buttons below
        section header
      - .stats-tab-btn — individual tab button,
        underline style active indicator
      - .stats-tab-btn.active — blue underline,
        bold text
      - .comparison-selectors — flex row with two
        month dropdowns
      - .comparison-table — full width table layout
      - .comparison-row — single comparison row
      - .comparison-label — row label (left)
      - .comparison-value — month value cell
      - .comparison-diff — difference indicator
      - .diff-up — red colour for increased spending
      - .diff-down — green colour for decreased
      - .diff-neutral — grey for no change
      - dark mode support via CSS variables

**Final Checkpoint**: Tabs look clean. Comparison
table is readable. Colour coding clear. Works in
both light and dark mode. All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → must complete first (utils before UI)
- Phase 2 → depends on Phase 1
- Phase 3 → depends on Phase 2
- Phase 4 → depends on Phase 3

## Notes

- Month selection is session state only — no
  localStorage needed for selected months
- getAvailableMonths always includes current month
  even if it has no expenses
- Percentage diff when A is 0: show 0% not infinity
- Both dropdowns show same list of months —
  user can select same month in both if they want
- Currency formatting uses existing formatCurrency
# Tasks: Expense Filtering

**Input**: `.specify/specs/003-expense-filtering/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Filter Utilities

**Purpose**: Pure filter and sort functions that all UI
depends on — tested in isolation first

### Tests First

- [ ] T001 Create `src/tests/filters.test.js` covering:

  **filterByDateRange(expenses, dateRange)**
  - returns all expenses when dateRange is "all"
  - returns only current month expenses for "thisMonth"
  - returns only last month expenses for "lastMonth"
  - returns only current year expenses for "thisYear"
  - returns empty array when no expenses match

  **filterByKeyword(expenses, keyword)**
  - returns all expenses when keyword is empty
  - matches expenses by title (case insensitive)
  - matches expenses by category (case insensitive)
  - returns empty array when no matches found
  - matches partial keywords (e.g. "groc" matches "Groceries")

  **sortExpenses(expenses, sortBy)**
  - sorts by amount descending for "amountDesc"
  - sorts by amount ascending for "amountAsc"
  - sorts by date descending for "dateDesc"
  - sorts by date ascending for "dateAsc"
  - sorts by title A to Z for "titleAsc"
  - returns expenses unchanged for unknown sortBy value

  **applyAllFilters(expenses, filterState)**
  - applies category, dateRange, keyword and sort together
  - returns correctly filtered and sorted results

### Implementation

- [ ] T002 Create `src/utils/filters.js`:
      - filterByDateRange(expenses, dateRange)
      - filterByKeyword(expenses, keyword)
      - sortExpenses(expenses, sortBy)
      - applyAllFilters(expenses, filterState)

- [ ] T003 Add DEFAULT_FILTER_STATE to
      `src/utils/constants.js`:
```javascript
      export const DEFAULT_FILTER_STATE = {
        searchKeyword: '',
        dateRange: 'all',
        sortBy: 'amountDesc',
        activeCategory: 'All',
      }
```

- [ ] T004 Run tests: `npm run test` — T001 tests must PASS

**Checkpoint**: All filter utility functions work correctly
in isolation with full test coverage

---

## Phase 2: FilterBar Component

**Purpose**: UI controls for search, date range and sort

### Tests First

- [ ] T005 Create `src/tests/FilterBar.test.jsx` covering:
      - renders search input
      - renders date range dropdown with all 4 options
      - renders sort dropdown with all 5 options
      - renders Clear All Filters button
      - typing in search calls onSearchChange with value
      - changing date range calls onDateRangeChange
      - changing sort calls onSortChange
      - clicking Clear All Filters calls onClearAll

### Implementation

- [ ] T006 Create `src/components/FilterBar.jsx`:
      - search text input with placeholder "Search by
        title or category..."
      - date range dropdown:
        - All Time (value: "all")
        - This Month (value: "thisMonth")
        - Last Month (value: "lastMonth")
        - This Year (value: "thisYear")
      - sort dropdown:
        - Amount: High to Low (value: "amountDesc")
        - Amount: Low to High (value: "amountAsc")
        - Date: Newest First (value: "dateDesc")
        - Date: Oldest First (value: "dateAsc")
        - Title: A to Z (value: "titleAsc")
      - Clear All Filters button
      - accepts props: filterState, onSearchChange,
        onDateRangeChange, onSortChange, onClearAll

- [ ] T007 Run tests: `npm run test` — T005 tests must PASS

**Checkpoint**: FilterBar renders correctly and fires all
callbacks

---

## Phase 3: App Wiring

**Purpose**: Connect FilterBar and filter logic to App state

### Implementation

- [ ] T008 Update `src/utils/constants.js` to export
      DEFAULT_FILTER_STATE (if not done in T003)

- [ ] T009 Update `src/App.jsx`:
      - replace separate activeFilter state with single
        filterState object using DEFAULT_FILTER_STATE
      - import applyAllFilters from filters.js
      - import DEFAULT_FILTER_STATE from constants.js
      - add handlers:
        - handleSearchChange(keyword)
        - handleDateRangeChange(dateRange)
        - handleSortChange(sortBy)
        - handleClearAll() — resets to DEFAULT_FILTER_STATE
        - update handleFilterChange to update
          filterState.activeCategory
      - replace filteredExpenses calculation with
        applyAllFilters(expenses, filterState)
      - render FilterBar below CategoryTabs
      - pass filterState and all handlers to FilterBar
      - update CategoryTabs to use
        filterState.activeCategory

- [ ] T010 Update `src/components/ExpenseList.jsx`:
      - update empty state message logic:
        - if no expenses at all: "No expenses yet.
          Add one above!"
        - if expenses exist but filters return nothing:
          "No expenses match your filters"
      - accept hasActiveFilters prop from App

- [ ] T011 Run `npm run test` — ALL tests must still PASS

**Checkpoint**: All filters work together correctly in
the browser. Clear All Filters resets everything including
category tabs.

---

## Phase 4: Styling

**Purpose**: Style the filter bar cleanly

- [ ] T012 Add CSS to `src/App.css`:
      - .filter-bar — horizontal row of controls with
        gap and wrap for mobile
      - .search-input — full width text input matching
        existing input style
      - .filter-select — dropdown matching existing
        select style
      - .clear-btn — subtle grey button that stands out
        only when filters are active

**Final Checkpoint**: Filter bar looks clean and consistent
with existing UI. All filters work. All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → must complete first (logic before UI)
- Phase 2 → depends on Phase 1 (FilterBar uses filter types)
- Phase 3 → depends on Phase 2 (App wires FilterBar)
- Phase 4 → depends on Phase 3 (style after logic works)

## Notes

- All filtering is pure functions — no side effects
- applyAllFilters is the single entry point for all
  filter logic in App.jsx
- ExpenseList sorting is now handled by applyAllFilters,
  remove any existing sort logic from ExpenseList
- Category filter moves from separate state into filterState
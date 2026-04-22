# Implementation Plan: Expense Filtering

**Branch**: `003-expense-filtering` | **Date**: 2026-04-21
**Spec**: `.specify/specs/003-expense-filtering/spec.md`

## Summary

Add a filter bar below the category tabs containing three
controls: a keyword search input, a date range dropdown and
a sort dropdown. All filters work simultaneously with the
existing category tabs. A "Clear All Filters" button resets
everything. All filtering and sorting logic lives in App.jsx
as pure functions operating on the expenses array.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**: FilterBar.jsx
**Modified Files**: App.jsx, ExpenseList.jsx, App.css
**Storage**: No storage changes needed
**Testing**: Vitest (existing)

## Constitution Check

- ✅ Simplicity First — all filtering is pure JS array
  operations, no new libraries needed
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — filter logic tested before
  UI wired up
- ✅ Component-Based UI — FilterBar is a new focused
  component, under 150 lines
- ✅ Data Persistence — no changes to storage layer

## What Changes vs What Stays the Same

### Files to ADD
- `src/components/FilterBar.jsx` — search, date range,
  sort controls and clear button
- `src/utils/filters.js` — pure filter and sort functions

### Files to MODIFY
- `src/App.jsx` — add filterState, handlers, apply filters
- `src/App.css` — add FilterBar styles

### Files UNCHANGED
- `src/components/AddExpenseForm.jsx`
- `src/components/ExpenseItem.jsx`
- `src/components/CategoryTabs.jsx`
- `src/components/SpendingSummary.jsx`
- `src/services/storageService.js`
- `src/utils/validators.js`
- `src/utils/formatters.js`
- `src/utils/constants.js`

## Filter Logic

All filtering and sorting is applied in this order:

```text
expenses (all)
  → filter by activeCategory (existing)
  → filter by dateRange (new)
  → filter by searchKeyword (new)
  → sort by sortBy (new)
  → pass to ExpenseList and SpendingSummary
```

## Data Flow

```text
App.jsx (new state: filterState)
  ├── CategoryTabs → onFilterChange → updates
  │                                   filterState.activeCategory
  ├── FilterBar → onSearchChange → updates
  │                                filterState.searchKeyword
  ├── FilterBar → onDateRangeChange → updates
  │                                   filterState.dateRange
  ├── FilterBar → onSortChange → updates filterState.sortBy
  ├── FilterBar → onClearAll → resets entire filterState
  ├── ExpenseList (receives fully filtered + sorted expenses)
  └── SpendingSummary (receives fully filtered + sorted expenses)
```

## FilterState Default

```javascript
const DEFAULT_FILTER_STATE = {
  searchKeyword: '',
  dateRange: 'all',
  sortBy: 'amountDesc',
  activeCategory: 'All',
}
```

## Sort Logic

```javascript
// amountDesc — highest first
expenses.sort((a, b) => b.amount - a.amount)

// amountAsc — lowest first
expenses.sort((a, b) => a.amount - b.amount)

// dateDesc — newest first
expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

// dateAsc — oldest first
expenses.sort((a, b) => new Date(a.date) - new Date(b.date))

// titleAsc — A to Z
expenses.sort((a, b) => a.title.localeCompare(b.title))
```

## Date Range Logic

```javascript
// thisMonth
const now = new Date()
expense.date starts with `${now.getFullYear()}-${month}`

// lastMonth
const last = new Date(now.getFullYear(), now.getMonth() - 1)
expense.date starts with last month prefix

// thisYear
expense.date starts with current year
```

## Complexity Tracking

No constitution violations. Pure JS array operations,
one new component, one new utility file.
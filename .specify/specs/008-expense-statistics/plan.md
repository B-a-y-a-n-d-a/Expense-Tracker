# Implementation Plan: Expense Statistics

**Branch**: `008-expense-statistics` | **Date**: 2026-04-24
**Spec**: `.specify/specs/008-expense-statistics/spec.md`

## Summary

Add a collapsible statistics section that shows 6 key
metrics calculated from current month expenses only.
All calculations are pure JS functions in a new
statisticsUtils.js file. The component receives
all expenses and filters to current month internally.
Collapse state persists in localStorage.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**: ExpenseStatistics.jsx
**New Utils**: statisticsUtils.js
**Modified Files**:
  - App.jsx — render ExpenseStatistics
  - storageService.js — add getStatsOpen, saveStatsOpen
  - constants.js — add STATS_KEY
  - App.css — add statistics styles

## Constitution Check

- ✅ Simplicity First — pure JS calculations, no
  new libraries, one new focused component
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — statistics utils
  tested before UI
- ✅ Component-Based UI — ExpenseStatistics is
  focused, single responsibility, under 150 lines
- ✅ Data Persistence — collapse state in localStorage

## What Changes vs What Stays the Same

### Files to ADD
- `src/components/ExpenseStatistics.jsx`
- `src/utils/statisticsUtils.js`

### Files to MODIFY
- `src/services/storageService.js` — add getStatsOpen,
  saveStatsOpen
- `src/utils/constants.js` — add STATS_KEY
- `src/App.jsx` — render ExpenseStatistics
- `src/App.css` — statistics styles

### Files UNCHANGED
- All other components
- All other utility files

## Statistics Calculation Logic

```javascript
// Average daily spend
function getAverageDailySpend(expenses) {
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const daysElapsed = new Date().getDate() // day of month
  return Math.round(total / daysElapsed)
}

// Highest single expense
function getHighestExpense(expenses) {
  return expenses.reduce((max, e) =>
    e.amount > (max?.amount ?? 0) ? e : max, null)
}

// Most used category (by count)
function getMostUsedCategory(expenses) {
  const counts = {}
  expenses.forEach(e => {
    counts[e.category] = (counts[e.category] ?? 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0]
}

// Most expensive category (by total amount)
function getMostExpensiveCategory(expenses) {
  const totals = {}
  expenses.forEach(e => {
    totals[e.category] = (totals[e.category] ?? 0) + e.amount
  })
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])[0]?.[0]
}

// Busiest day of week
function getBusiestDay(expenses) {
  const days = ['Sunday','Monday','Tuesday','Wednesday',
                'Thursday','Friday','Saturday']
  const counts = {}
  expenses.forEach(e => {
    const day = days[new Date(e.date + 'T00:00:00').getDay()]
    counts[day] = (counts[day] ?? 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])[0]?.[0]
}
```

## Data Flow

```text
App.jsx
  └── ExpenseStatistics
        ├── receives all expenses from App
        ├── filters to current month internally
        ├── calculates all 6 statistics
        ├── manages isOpen state from localStorage
        └── renders collapsible section
```

## Complexity Tracking

No constitution violations. Pure JS math, one new
component, one new utility file.
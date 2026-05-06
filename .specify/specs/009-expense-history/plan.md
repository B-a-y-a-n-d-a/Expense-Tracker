# Implementation Plan: Expense History

**Branch**: `009-expense-history` | **Date**: 2026-05-05
**Spec**: `.specify/specs/009-expense-history/spec.md`

## Summary

Extend the existing statistics section with a tab
system. The existing statistics view becomes the
"Statistics" tab. A new "History" tab shows a side
by side month comparison with two month dropdowns,
full breakdown rows and colour coded difference
indicators. All calculation logic lives in a new
historyUtils.js file.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**: MonthComparison.jsx
**New Utils**: historyUtils.js
**Modified Files**:
  - ExpenseStatistics.jsx — add tab system
  - App.css — add tab and comparison styles

## Constitution Check

- ✅ Simplicity First — pure JS calculations,
  CSS tabs, no new libraries
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — history utils
  tested before UI
- ✅ Component-Based UI — MonthComparison is
  focused, single responsibility
- ✅ Data Persistence — no new storage needed,
  month selection is session state only

## What Changes vs What Stays the Same

### Files to ADD
- `src/components/MonthComparison.jsx`
- `src/utils/historyUtils.js`

### Files to MODIFY
- `src/components/ExpenseStatistics.jsx` — add
  tab system (Statistics | History)
- `src/App.css` — add tab and comparison styles

### Files UNCHANGED
- All other components
- statisticsUtils.js
- All storage functions
- All other utility files

## History Calculation Logic

```javascript
// Get all available months from expenses
function getAvailableMonths(expenses) {
  const months = new Set()
  expenses.forEach(e => {
    months.add(e.date.slice(0, 7)) // "YYYY-MM"
  })
  // Always include current month
  const now = new Date()
  const current = `${now.getFullYear()}-${String(
    now.getMonth() + 1).padStart(2, '0')}`
  months.add(current)
  return Array.from(months).sort().reverse()
}

// Get summary for a specific month
function getMonthSummary(expenses, monthKey) {
  const monthExpenses = expenses.filter(e =>
    e.date.startsWith(monthKey))
  const total = monthExpenses.reduce(
    (s, e) => s + e.amount, 0)
  const byCategory = {}
  CATEGORIES.forEach(cat => {
    byCategory[cat] = monthExpenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + e.amount, 0)
  })
  return {
    monthKey,
    monthLabel: formatMonthLabel(monthKey),
    total,
    count: monthExpenses.length,
    byCategory,
  }
}

// Calculate difference between two values
function getDifference(valueA, valueB) {
  const difference = valueB - valueA
  const percentageDiff = valueA === 0
    ? 0
    : Math.round((difference / valueA) * 100)
  return {
    difference,
    percentageDiff,
    trend: difference > 0 ? 'up'
         : difference < 0 ? 'down'
         : 'neutral'
  }
}

// Format month key to label
function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-')
  const date = new Date(Number(year),
    Number(month) - 1, 1)
  return date.toLocaleDateString('en-ZA', {
    month: 'long', year: 'numeric'
  })
}
```

## Tab System in ExpenseStatistics

```jsx
// Add tab state to ExpenseStatistics
const [activeTab, setActiveTab] = useState('statistics')

// Tab buttons in header
<div className="stats-tabs">
  <button
    className={activeTab === 'statistics' ? 'active' : ''}
    onClick={() => setActiveTab('statistics')}
  >
    Statistics
  </button>
  <button
    className={activeTab === 'history' ? 'active' : ''}
    onClick={() => setActiveTab('history')}
  >
    History
  </button>
</div>

// Conditional rendering
{activeTab === 'statistics' && <StatisticsGrid ... />}
{activeTab === 'history' && <MonthComparison ... />}
```

## Data Flow

```text
App.jsx
  └── ExpenseStatistics (receives all expenses)
        ├── Statistics tab (existing)
        │     └── getCurrentMonthStats(expenses)
        └── History tab (new)
              └── MonthComparison
                    ├── getAvailableMonths(expenses)
                    ├── getMonthSummary(expenses, monthA)
                    ├── getMonthSummary(expenses, monthB)
                    └── getDifference(valueA, valueB)
```

## Complexity Tracking

No constitution violations. Two new files, one
modified component. Pure JS date and math logic.
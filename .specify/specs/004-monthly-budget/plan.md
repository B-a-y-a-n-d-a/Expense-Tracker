# Implementation Plan: Monthly Budget

**Branch**: `004-monthly-budget` | **Date**: 2026-04-23
**Spec**: `.specify/specs/004-monthly-budget/spec.md`

## Summary

Add a budget section above the expense list where users
can set an overall monthly budget and per category budgets.
Progress bars show spending vs budget with colour coded
warnings. Budget progress is based on current month
expenses only and resets automatically on the 1st of
each month. Budget amounts are stored in localStorage.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**:
  - BudgetSection.jsx — budget inputs and progress bars
**New Utils**:
  - budgetUtils.js — budget calculation functions
**Modified Files**:
  - App.jsx — add budget state and handlers
  - storageService.js — add budget storage functions
  - App.css — add budget styles

## Constitution Check

- ✅ Simplicity First — no new libraries, pure JS
  calculations, one new component
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — budget utils and storage
  tested before UI
- ✅ Component-Based UI — BudgetSection is focused,
  single responsibility
- ✅ Data Persistence — budget stored in localStorage

## What Changes vs What Stays the Same

### Files to ADD
- `src/components/BudgetSection.jsx`
- `src/utils/budgetUtils.js`

### Files to MODIFY
- `src/services/storageService.js` — add getBudget,
  saveBudget functions
- `src/App.jsx` — add budget state and handlers
- `src/App.css` — add budget styles

### Files UNCHANGED
- All existing components
- validators.js
- formatters.js
- filters.js
- constants.js

## Budget Storage Schema

```javascript
// Key used in localStorage
const BUDGET_KEY = "expense-tracker-budget"

// Value stored
{
  overall: 5000,
  categories: {
    Food: 1500,
    Transport: 800,
    Entertainment: 500,
    Bills: 1200,
    Other: 300
  }
}
```

## Budget Calculation Logic

```javascript
// Get current month expenses only
function getCurrentMonthExpenses(expenses) {
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(
    now.getMonth() + 1).padStart(2, '0')}`
  return expenses.filter(e => e.date.startsWith(prefix))
}

// Calculate progress for a budget amount
function calculateProgress(spent, budget) {
  if (!budget || budget === 0) return null
  const percentage = (spent / budget) * 100
  return {
    spent,
    budget,
    percentage: Math.round(percentage),
    status: percentage >= 100 ? 'exceeded'
          : percentage >= 80  ? 'warning'
          : 'good'
  }
}
```

## Component Responsibilities

- **BudgetSection.jsx** — displays budget inputs for
  overall and each category, shows progress bars,
  handles save. Receives budget, expenses and onSave
  as props.

## Data Flow

```text
App.jsx (new state: budget)
  ├── loads budget from localStorage on mount
  ├── handleSaveBudget(budget) → saves to localStorage
  │                              updates budget state
  └── BudgetSection
        ├── receives budget + currentMonthExpenses
        ├── calculates progress internally
        └── calls onSave(budget) on save
```

## Complexity Tracking

No constitution violations. One new component, one new
utility file, two new storage functions.
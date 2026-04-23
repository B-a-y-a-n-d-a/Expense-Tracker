# Implementation Plan: Recurring Expenses

**Branch**: `005-recurring-expenses` | **Date**: 2026-04-23
**Spec**: `.specify/specs/005-recurring-expenses/spec.md`

## Summary

Add recurring expense functionality. Users can mark any
expense as recurring (Weekly, Monthly, Yearly) via a
checkbox on the Add Expense form. Recurring templates
are stored separately in localStorage. A dedicated
management section shows all templates with a delete
option. When the app loads, it checks if any recurring
expenses are due and adds them silently.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**:
  - RecurringSection.jsx — management section
**New Utils**:
  - recurringUtils.js — due date checking and
    auto-add logic
**Modified Files**:
  - AddExpenseForm.jsx — add recurring checkbox
    and interval dropdown
  - storageService.js — add recurring template
    storage functions
  - App.jsx — add recurring state, auto-add on mount
  - App.css — add recurring styles

## Constitution Check

- ✅ Simplicity First — no new libraries, pure JS
  date logic, two new focused components
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — recurring utils and
  storage tested before UI
- ✅ Component-Based UI — RecurringSection is focused,
  single responsibility
- ✅ Data Persistence — templates stored in localStorage

## What Changes vs What Stays the Same

### Files to ADD
- `src/components/RecurringSection.jsx`
- `src/utils/recurringUtils.js`

### Files to MODIFY
- `src/components/AddExpenseForm.jsx` — add recurring
  checkbox and interval dropdown
- `src/services/storageService.js` — add template
  storage functions
- `src/App.jsx` — add recurring state and auto-add
- `src/App.css` — add recurring styles

### Files UNCHANGED
- ExpenseItem.jsx
- ExpenseList.jsx
- CategoryTabs.jsx
- FilterBar.jsx
- SpendingSummary.jsx
- BudgetSection.jsx
- validators.js
- formatters.js
- filters.js
- budgetUtils.js

## Recurring Template Storage Schema

```javascript
const RECURRING_KEY = "expense-tracker-recurring"

// Value stored — array of RecurringTemplate objects
[
  {
    id: "abc123",
    title: "Netflix",
    amount: 199,
    category: "Entertainment",
    interval: "monthly",
    dayOfMonth: 15,
    dayOfWeek: null,
    monthAndDay: null,
    lastAddedDate: "2026-04-15",
    createdAt: 1713600000000
  }
]
```

## Auto-Add Logic

```javascript
// Check if a recurring template is due today
function isDue(template, today) {
  // Prevent duplicates — already added today
  if (template.lastAddedDate === today) return false

  const date = new Date(today)

  if (template.interval === 'monthly') {
    return date.getDate() === template.dayOfMonth
  }
  if (template.interval === 'weekly') {
    return date.getDay() === template.dayOfWeek
  }
  if (template.interval === 'yearly') {
    const [mm, dd] = template.monthAndDay.split('-')
    return date.getMonth() + 1 === Number(mm)
        && date.getDate() === Number(dd)
  }
  return false
}
```

## Data Flow

```text
App.jsx mounts
  └── checkAndAddRecurring(expenses, templates)
        ├── finds all due templates
        ├── creates new expense for each
        ├── adds to expenses state + localStorage
        └── updates lastAddedDate on each template

App.jsx (new state: recurringTemplates)
  ├── handleAddRecurring(template) — saves template
  ├── handleDeleteRecurring(id) — removes template
  └── RecurringSection
        ├── receives templates
        └── calls onDelete(id) on delete
```

## Complexity Tracking

No constitution violations. Two new files, three
modified files. Auto-add logic is pure JS date
comparison — no external libraries needed.
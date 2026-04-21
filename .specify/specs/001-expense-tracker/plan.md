# Implementation Plan: Expense Tracker

**Branch**: `001-expense-tracker` | **Date**: 2026-04-20
**Spec**: `.specify/specs/001-expense-tracker/spec.md`

## Summary

A single-page expense tracking web application built with React
and Vite. Users can add, view, filter and delete expenses. All
data is stored in localStorage. No backend, no authentication,
no build complexity beyond what Vite provides out of the box.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite
**Primary Dependencies**: React, React-DOM, Vite
**Storage**: localStorage (browser)
**Testing**: Vitest + React Testing Library
**Target Platform**: Modern browsers (Chrome, Edge, Firefox)
**Project Type**: Single-page web application
**Performance Goals**: Loads in under 2 seconds, instant UI
interactions
**Constraints**: No backend, no TypeScript, no external APIs,
offline-capable
**Scale/Scope**: Single user, up to ~500 expenses comfortably

## Constitution Check

- ✅ Simplicity First — React + Vite is the minimal setup for
  a component-based UI. No Redux, no router, no unnecessary
  libraries.
- ✅ JavaScript Only — No TypeScript, plain JS throughout.
- ✅ Test-Driven Development — Vitest + React Testing Library
  chosen for unit and component tests.
- ✅ Component-Based UI — React components, each with single
  responsibility, max 150 lines.
- ✅ Data Persistence — localStorage used for all expense data
  with error handling.

## Project Structure

### Documentation (this feature)

```text
.specify/specs/001-expense-tracker/
├── spec.md
├── plan.md          (this file)
├── data-model.md
└── tasks.md
```

### Source Code

```text
expense-tracker/
├── index.html
├── vite.config.js
├── package.json
│
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   │
│   ├── components/
│   │   ├── AddExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseItem.jsx
│   │   ├── CategoryTabs.jsx
│   │   └── SpendingSummary.jsx
│   │
│   ├── services/
│   │   └── storageService.js
│   │
│   └── utils/
│       ├── validators.js
│       ├── formatters.js
│       └── constants.js
│
└── src/tests/
    ├── validators.test.js
    └── storageService.test.js
```

**Structure Decision**: Single project structure. No backend
needed. Components are separated by responsibility. Services
layer isolates localStorage logic so it can be tested
independently from UI.

## Component Responsibilities

- **App.jsx** — Holds global state (expenses list, active
  filter). Passes data and callbacks down to children.
- **AddExpenseForm.jsx** — Controlled form with validation.
  Calls onAdd callback on valid submit. Shows inline errors.
- **ExpenseList.jsx** — Receives filtered expenses array,
  renders ExpenseItem for each one. Shows empty state when
  array is empty.
- **ExpenseItem.jsx** — Displays one expense. Handles inline
  delete confirmation state (show/hide "Are you sure?").
- **CategoryTabs.jsx** — Renders All + 5 category tabs.
  Highlights active tab. Calls onFilterChange callback.
- **SpendingSummary.jsx** — Receives expenses array, calculates
  and displays total + per-category breakdown. Always shows
  all categories.

## Data Flow

```text
App.jsx (state: expenses, activeFilter)
  ├── AddExpenseForm → onAdd(newExpense) → App updates state
  │                                        + saves to localStorage
  ├── CategoryTabs → onFilterChange(category) → App updates
  │                                              activeFilter
  ├── ExpenseList (receives filtered expenses)
  │     └── ExpenseItem → onDelete(id) → App updates state
  │                                      + removes from localStorage
  └── SpendingSummary (receives filtered expenses)
```

## Complexity Tracking

No constitution violations. All choices are minimal and
justified by the spec requirements.
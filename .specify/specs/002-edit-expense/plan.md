# Implementation Plan: Edit Expense

**Branch**: `002-edit-expense` | **Date**: 2026-04-21
**Spec**: `.specify/specs/002-edit-expense/spec.md`

## Summary

Add inline edit functionality to existing expense items. When a user
clicks Edit, the expense item is replaced by a pre-filled form
identical to the Add Expense form. The user can save or cancel.
Only one expense can be in edit mode at a time. If a second edit is
triggered while one is open, a warning appears.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite
**Changes Required**:
  - storageService.js — add updateExpense function
  - ExpenseItem.jsx — add Edit button and edit form state
  - App.jsx — add editingId state and handleEdit, handleUpdate,
    handleCancelEdit handlers
**Storage**: localStorage (existing)
**Testing**: Vitest + React Testing Library (existing)

## Constitution Check

- ✅ Simplicity First — edit is inline, no modal, no new pages,
  no new libraries
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — tests written before implementation
- ✅ Component-Based UI — edit form lives inside ExpenseItem,
  single responsibility maintained
- ✅ Data Persistence — updateExpense added to storageService

## What Changes vs What Stays the Same

### Files to MODIFY
- `src/services/storageService.js` — add updateExpense()
- `src/components/ExpenseItem.jsx` — add edit mode UI
- `src/App.jsx` — add editingId state and handlers

### Files UNCHANGED
- `src/utils/validators.js` — validation rules reused as-is
- `src/utils/formatters.js` — formatting reused as-is
- `src/utils/constants.js` — categories reused as-is
- `src/components/AddExpenseForm.jsx` — not touched
- `src/components/ExpenseList.jsx` — not touched
- `src/components/CategoryTabs.jsx` — not touched
- `src/components/SpendingSummary.jsx` — not touched

## Data Flow

```text
App.jsx (new state: editingId)
  └── ExpenseList
        └── ExpenseItem
              ├── Edit button clicked
              │     └── onEdit(id) → App sets editingId
              ├── Edit form visible (when expense.id === editingId)
              │     ├── Save → onUpdate(updatedExpense) → App updates
              │     │         state + localStorage, clears editingId
              │     └── Cancel → onCancelEdit() → App clears editingId
              └── Warning shown (when another expense is in edit mode)
                    ├── Discard → App sets editingId to new id
                    └── Keep Editing → warning closes, nothing changes
```

## Complexity Tracking

No constitution violations. All changes are minimal and contained
to existing files plus one new function in storageService.
# Tasks: Edit Expense

**Input**: `.specify/specs/002-edit-expense/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Storage Layer

**Purpose**: Add updateExpense function to storageService before
any UI work begins

### Tests First

- [ ] T001 Add tests for updateExpense in
      `src/tests/storageService.test.js` covering:
      - updates expense with matching id
      - does not change id or createdAt
      - saves updated list to localStorage
      - returns updated expenses array

### Implementation

- [ ] T002 Add updateExpense function to
      `src/services/storageService.js`:
      - finds expense by id
      - merges updated fields
      - preserves id and createdAt
      - saves and returns updated array

- [ ] T003 Run tests: `npm run test` — T001 tests must PASS

**Checkpoint**: updateExpense works correctly in isolation

---

## Phase 2: ExpenseItem Edit UI

**Purpose**: Add edit mode to ExpenseItem component

### Tests First

- [ ] T004 Add tests for edit mode in
      `src/tests/ExpenseItem.test.jsx` covering:
      - Edit button is visible next to Delete button
      - clicking Edit calls onEdit with correct id
      - Delete button is hidden when in edit mode
      - edit form is pre-filled with existing values
      - clicking Save calls onUpdate with updated expense
      - clicking Cancel calls onCancelEdit
      - validation errors shown when title is empty on save
      - validation errors shown when amount is invalid on save

### Implementation

- [ ] T005 Update `src/components/ExpenseItem.jsx`:
      - add Edit button next to Delete button
      - accept new props: isEditing, onEdit, onUpdate,
        onCancelEdit, hasUnsavedWarning, onDiscardEdit,
        onKeepEditing
      - when isEditing is true:
        - hide Delete button
        - show edit form pre-filled with expense values
        - show Save and Cancel buttons
        - show inline validation errors
      - when hasUnsavedWarning is true:
        - show warning "You have unsaved changes. Discard them
          and edit this expense instead?"
        - show Discard and Keep Editing buttons

- [ ] T006 Run tests: `npm run test` — T004 tests must PASS

**Checkpoint**: ExpenseItem shows edit form correctly and
handles all interactions

---

## Phase 3: App State Wiring

**Purpose**: Connect edit functionality through App.jsx

### Tests First

- [ ] T007 Manually test the full edit flow in the browser:
      - click Edit on an expense
      - verify form appears pre-filled
      - change values and click Save
      - verify updated values appear in list
      - refresh page and verify changes persisted
      - click Edit, then click Cancel
      - verify original values unchanged
      - click Edit on one expense, then click Edit on another
      - verify warning appears
      - click Discard — verify first edit closes, second opens
      - click Keep Editing — verify warning closes, first stays open

### Implementation

- [ ] T008 Update `src/App.jsx`:
      - add state: editingId (null by default)
      - add state: pendingEditId (null by default)
      - handleEdit(id) — if editingId is null, set editingId to id
        else set pendingEditId to id (triggers warning)
      - handleUpdate(updatedExpense) — call updateExpense from
        storageService, update expenses state, clear editingId
      - handleCancelEdit() — clear editingId
      - handleDiscardEdit() — set editingId to pendingEditId,
        clear pendingEditId
      - handleKeepEditing() — clear pendingEditId
      - pass all handlers and editingId down to ExpenseList
        and ExpenseItem

- [ ] T009 Update `src/components/ExpenseList.jsx`:
      - accept and pass through editingId, onEdit, onUpdate,
        onCancelEdit, pendingEditId, onDiscardEdit, onKeepEditing
        props to each ExpenseItem

- [ ] T010 Run `npm run test` — ALL existing tests must still PASS

**Checkpoint**: Full edit flow works end-to-end in the browser.
All existing tests still pass.

---

## Phase 4: Styling

**Purpose**: Style the edit form to match the Add Expense form

- [ ] T011 Add CSS for edit form in `src/App.css`:
      - .edit-form — same styling as .add-expense-form
      - .unsaved-warning — yellow warning banner with Discard
        and Keep Editing buttons

**Final Checkpoint**: Edit feature fully working, styled, and
all tests passing.

---

## Dependencies & Execution Order

- Phase 1 → must complete first (storage layer)
- Phase 2 → depends on Phase 1 (UI needs updateExpense)
- Phase 3 → depends on Phase 2 (App wires up ExpenseItem)
- Phase 4 → depends on Phase 3 (style after logic works)

## Notes

- validators.js is reused unchanged — no new validation logic needed
- The edit form reuses the same field structure as AddExpenseForm
- Keep ExpenseItem under 150 lines per constitution — split into
  EditExpenseForm component if needed
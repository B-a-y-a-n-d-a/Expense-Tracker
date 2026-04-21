# Tasks: Expense Tracker

**Input**: `.specify/specs/001-expense-tracker/`
**Prerequisites**: spec.md ✅ plan.md ✅ data-model.md ✅
**Status**: COMPLETE ✅

---

## Phase 1: Setup ✅

- [x] T001 Initialise Vite + React project:
      `npm create vite@4 . -- --template react`
- [x] T002 Install dependencies:
      `npm install` then `npm install -D vitest
      @testing-library/react @testing-library/jest-dom jsdom`
- [x] T003 Configure Vitest in `vite.config.js`
- [x] T004 Create folder structure:
      `src/components/`, `src/services/`, `src/utils/`,
      `src/tests/`
- [x] T005 Create `src/utils/constants.js` with CATEGORIES
      array and STORAGE_KEY constant

**Checkpoint**: ✅ Blank React app loads at localhost:5173

---

## Phase 2: Foundation ✅

- [x] T006 Write tests for validators in
      `src/tests/validators.test.js`
- [x] T007 Write tests for storageService in
      `src/tests/storageService.test.js`
- [x] T008 Implement `src/utils/validators.js`
- [x] T009 Implement `src/utils/formatters.js`
- [x] T010 Implement `src/services/storageService.js`
- [x] T011 Run tests — 22 passing ✅

**Checkpoint**: ✅ All foundation tests pass

---

## Phase 3: User Story 1 + 2 - Add & View Expenses ✅

- [x] T012 Write tests for AddExpenseForm
- [x] T013 Write tests for ExpenseList
- [x] T014 Implement `src/components/AddExpenseForm.jsx`
- [x] T015 Implement `src/components/ExpenseItem.jsx`
- [x] T016 Implement `src/components/ExpenseList.jsx`
- [x] T017 Implement `src/App.jsx`
- [x] T018 Run tests ✅

**Checkpoint**: ✅ Add expense, view in list, refresh persists

---

## Phase 4: User Story 3 - Delete ✅

- [x] T019 Write tests for ExpenseItem delete flow
- [x] T020 Verify delete flow end-to-end in browser
- [x] T021 Run tests ✅

**Checkpoint**: ✅ Delete with inline confirmation works

---

## Phase 5: User Story 4 - Filter by Category ✅

- [x] T022 Write tests for CategoryTabs
- [x] T023 Implement `src/components/CategoryTabs.jsx`
- [x] T024 Update `src/App.jsx` to wire up filtering
- [x] T025 Run tests ✅

**Checkpoint**: ✅ Category tabs filter expenses correctly

---

## Phase 6: User Story 5 - Spending Summary ✅

- [x] T026 Write tests for SpendingSummary
- [x] T027 Implement `src/components/SpendingSummary.jsx`
- [x] T028 Add SpendingSummary to `src/App.jsx`
- [x] T029 Run tests ✅

**Checkpoint**: ✅ Summary shows correct totals per category

---

## Phase 7: Polish ✅

- [x] T030 Add CSS styling in `src/App.css`
- [x] T031 Add page title and layout in `index.html`
      and `App.jsx`
- [x] T032 Handle localStorage errors gracefully in
      `src/services/storageService.js`
- [x] T033 Run full test suite — 26 passing ✅
- [x] T034 Manually verified all 5 user stories against
      spec acceptance scenarios ✅

**Final Checkpoint**: ✅ All tests pass. All user stories
verified manually.

---

## Dependencies & Execution Order

- Phase 1 → must complete first
- Phase 2 → depends on Phase 1, blocks all components
- Phase 3 → depends on Phase 2, this is the MVP
- Phase 4 → depends on Phase 3
- Phase 5 → depends on Phase 3
- Phase 6 → depends on Phase 3
- Phase 7 → depends on all phases complete

## Notes

- Feature 001 assumption "No expense editing" was overridden
  by spec 002-edit-expense
- All 26 tests passing as of 2026-04-21
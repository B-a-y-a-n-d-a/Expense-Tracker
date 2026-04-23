# Tasks: Monthly Budget

**Input**: `.specify/specs/004-monthly-budget/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Storage + Utils

**Purpose**: Budget storage and calculation functions
tested in isolation first

### Tests First

- [ ] T001 Create `src/tests/budgetUtils.test.js` covering:

  **getCurrentMonthExpenses(expenses)**
  - returns only expenses from current month
  - returns empty array when no current month expenses
  - excludes expenses from previous months
  - excludes expenses from future months

  **calculateProgress(spent, budget)**
  - returns null when budget is 0 or null
  - returns percentage of spent vs budget
  - returns status "good" when under 80%
  - returns status "warning" when between 80-99%
  - returns status "exceeded" when 100% or over
  - returns correct percentage value

  **calculateAllProgress(expenses, budget)**
  - returns overall progress when overall budget set
  - returns per category progress for each category
  - skips categories with no budget set
  - correctly sums expenses per category

- [ ] T002 Add tests for budget storage in
      `src/tests/storageService.test.js` covering:
      - getBudget returns null when nothing stored
      - saveBudget persists budget to localStorage
      - getBudget returns saved budget

### Implementation

- [ ] T003 Add BUDGET_KEY to `src/utils/constants.js`:
      `export const BUDGET_KEY = "expense-tracker-budget"`

- [ ] T004 Create `src/utils/budgetUtils.js`:
      - getCurrentMonthExpenses(expenses)
      - calculateProgress(spent, budget)
      - calculateAllProgress(expenses, budget)

- [ ] T005 Add to `src/services/storageService.js`:
      - getBudget() — reads from localStorage
      - saveBudget(budget) — saves to localStorage

- [ ] T006 Run tests: `npm run test` — T001 and T002
      must PASS

**Checkpoint**: All budget utility and storage tests pass

---

## Phase 2: BudgetSection Component

**Purpose**: UI for setting budgets and viewing progress

### Tests First

- [ ] T007 Create `src/tests/BudgetSection.test.jsx`
      covering:
      - renders overall budget input
      - renders one input per category
      - renders Save Budget button
      - shows progress bar when budget is set
      - progress bar is green when under 80%
      - progress bar is yellow when between 80-99%
      - progress bar is red when exceeded
      - calls onSave with correct budget object on save
      - shows "Over budget" when exceeded

### Implementation

- [ ] T008 Create `src/components/BudgetSection.jsx`:
      - heading "Monthly Budget"
      - overall budget input (label: "Overall Budget (R)")
      - one input per CATEGORY (label: "{category} (R)")
      - Save Budget button
      - progress bars for each set budget showing:
        - category name
        - spent vs budget (e.g. "R 800 / R 1500")
        - percentage bar with correct colour
        - "Over budget!" label when exceeded
      - uses calculateAllProgress from budgetUtils.js
      - uses getCurrentMonthExpenses internally
      - calls onSave(budget) prop on save

- [ ] T009 Run tests: `npm run test` — T007 must PASS

**Checkpoint**: BudgetSection renders and behaves
correctly in isolation

---

## Phase 3: App Wiring

**Purpose**: Connect BudgetSection to App state

### Implementation

- [ ] T010 Update `src/App.jsx`:
      - add state: budget (loaded from getBudget on mount)
      - handleSaveBudget(newBudget) — saves to storage,
        updates state
      - render BudgetSection above CategoryTabs
      - pass budget, expenses and handleSaveBudget
        to BudgetSection

- [ ] T011 Run `npm run test` — ALL tests must still PASS

- [ ] T012 Manual browser test:
      - set overall budget of R5000
      - set Food budget of R1000
      - add R500 Food expense for this month
      - verify Food progress bar shows 50% green
      - add another R400 Food expense
      - verify progress bar turns yellow (90%)
      - add another R200 Food expense
      - verify progress bar turns red (110%) with
        "Over budget!"
      - refresh page — budget amounts still there
      - progress still correct

**Checkpoint**: Full budget flow works end to end

---

## Phase 4: Styling

**Purpose**: Style budget section and progress bars

- [ ] T013 Add CSS to `src/App.css`:
      - .budget-section — white card, same style as
        other sections
      - .budget-inputs — grid layout for category inputs
      - .budget-input-group — label + input pair
      - .progress-bar-container — full width grey background
      - .progress-bar — coloured fill, transition animation
      - .progress-bar.good — green (#27ae60)
      - .progress-bar.warning — yellow (#f39c12)
      - .progress-bar.exceeded — red (#e74c3c)
      - .budget-progress-label — shows spent/budget text
      - .over-budget-label — red "Over budget!" text

**Final Checkpoint**: Budget section looks clean and
consistent with the rest of the app. All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → must complete first (logic before UI)
- Phase 2 → depends on Phase 1 (component uses utils)
- Phase 3 → depends on Phase 2 (App wires component)
- Phase 4 → depends on Phase 3 (style after logic works)

## Notes

- Budget progress only uses CURRENT MONTH expenses
- Month reset is automatic — no manual trigger needed
- Budget amounts never reset — only progress resets
- Empty input = no budget for that item
- Overall and category budgets are independent
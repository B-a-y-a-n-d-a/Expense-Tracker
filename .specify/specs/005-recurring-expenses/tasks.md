# Tasks: Recurring Expenses

**Input**: `.specify/specs/005-recurring-expenses/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Storage + Utils

**Purpose**: Recurring template storage and due date
logic tested in isolation first

### Tests First

- [ ] T001 Create `src/tests/recurringUtils.test.js`
      covering:

  **isDue(template, today)**
  - returns false when lastAddedDate equals today
    (prevents duplicates)
  - returns true for monthly template on correct
    day of month
  - returns false for monthly template on wrong
    day of month
  - returns true for weekly template on correct
    day of week
  - returns false for weekly template on wrong
    day of week
  - returns true for yearly template on correct
    month and day
  - returns false for yearly template on wrong date

  **createTemplateFromExpense(expense, interval)**
  - returns template with correct interval
  - sets dayOfMonth from expense date for monthly
  - sets dayOfWeek from expense date for weekly
  - sets monthAndDay from expense date for yearly
  - sets lastAddedDate to expense date
  - preserves title, amount, category from expense

  **getDueTemplates(templates, today)**
  - returns all templates due today
  - returns empty array when none are due
  - excludes already added templates (lastAddedDate
    equals today)

- [ ] T002 Add recurring storage tests to
      `src/tests/storageService.test.js` covering:
      - getRecurringTemplates returns empty array
        when nothing stored
      - saveRecurringTemplates persists to localStorage
      - getRecurringTemplates returns saved templates

### Implementation

- [ ] T003 Add RECURRING_KEY to
      `src/utils/constants.js`:
      `export const RECURRING_KEY =
      "expense-tracker-recurring"`

- [ ] T004 Create `src/utils/recurringUtils.js`:
      - isDue(template, today)
      - createTemplateFromExpense(expense, interval)
      - getDueTemplates(templates, today)

- [ ] T005 Add to `src/services/storageService.js`:
      - getRecurringTemplates() — reads from
        localStorage
      - saveRecurringTemplates(templates) — saves
        to localStorage
      - addRecurringTemplate(template) — adds one
        template, saves
      - deleteRecurringTemplate(id) — removes by id,
        saves
      - updateRecurringTemplate(template) — updates
        lastAddedDate after auto-add

- [ ] T006 Run tests: `npm run test` — T001 and T002
      must PASS

**Checkpoint**: All recurring utility and storage
tests pass

---

## Phase 2: AddExpenseForm Update

**Purpose**: Add recurring checkbox and interval
dropdown to the existing form

### Tests First

- [ ] T007 Update `src/tests/AddExpenseForm.test.jsx`
      to add tests covering:
      - recurring checkbox is visible and unchecked
        by default
      - interval dropdown is hidden when checkbox
        is unchecked
      - interval dropdown appears when checkbox
        is checked
      - interval dropdown has Weekly, Monthly,
        Yearly options
      - onAdd is called with isRecurring and interval
        when checkbox is checked

### Implementation

- [ ] T008 Update `src/components/AddExpenseForm.jsx`:
      - add isRecurring state (default false)
      - add interval state (default "monthly")
      - add checkbox: "Mark as recurring"
      - add interval dropdown (visible only when
        isRecurring is true):
        - Weekly (value: "weekly")
        - Monthly (value: "monthly")
        - Yearly (value: "yearly")
      - include isRecurring and interval in onAdd
        callback data
      - reset isRecurring and interval on form clear

- [ ] T009 Run tests: `npm run test` — T007 must PASS

**Checkpoint**: AddExpenseForm correctly handles
recurring checkbox and interval

---

## Phase 3: RecurringSection Component

**Purpose**: Management section showing all recurring
templates

### Tests First

- [ ] T010 Create `src/tests/RecurringSection.test.jsx`
      covering:
      - renders heading "Recurring Expenses"
      - shows empty state when no templates
      - renders each template with title, amount,
        category and interval
      - Delete button visible for each template
      - clicking Delete calls onDelete with correct id

### Implementation

- [ ] T011 Create `src/components/RecurringSection.jsx`:
      - heading "Recurring Expenses"
      - empty state: "No recurring expenses set up yet"
      - list of templates showing:
        - title
        - amount (formatted)
        - category
        - interval (e.g. "Monthly", "Weekly", "Yearly")
        - Delete button
      - calls onDelete(id) prop on delete

- [ ] T012 Run tests: `npm run test` — T010 must PASS

**Checkpoint**: RecurringSection renders and behaves
correctly in isolation

---

## Phase 4: App Wiring + Auto-Add

**Purpose**: Connect everything to App state and
implement auto-add on mount

### Implementation

- [ ] T013 Update `src/App.jsx`:
      - add state: recurringTemplates (loaded from
        getRecurringTemplates on mount)
      - on mount: run checkAndAddRecurring — finds
        due templates, adds expenses, updates
        lastAddedDate on templates
      - handleAdd update — if expense.isRecurring,
        create template via createTemplateFromExpense
        and save it
      - handleDeleteRecurring(id) — removes template
        from state and storage
      - render RecurringSection below BudgetSection
      - pass recurringTemplates and handleDeleteRecurring
        to RecurringSection

- [ ] T014 Run `npm run test` — ALL tests must still
      PASS

- [ ] T015 Manual browser test:
      - add a Monthly recurring expense "Netflix R199
        Entertainment"
      - verify it appears in expense list
      - verify it appears in RecurringSection
      - delete the template from RecurringSection
      - verify it disappears from RecurringSection
      - verify the original expense is still in list
      - add another recurring expense
      - verify it auto-adds correctly when due

**Checkpoint**: Full recurring flow works end to end

---

## Phase 5: Styling

**Purpose**: Style recurring section consistently
with rest of app

- [ ] T016 Add CSS to `src/App.css`:
      - .recurring-section — white card, same style
        as other sections
      - .recurring-list — list of templates
      - .recurring-item — single template row with
        details and delete button
      - .recurring-interval-badge — pill badge showing
        interval (Weekly/Monthly/Yearly) with distinct
        colours
      - .recurring-checkbox-group — checkbox + label
        styling in AddExpenseForm
      - .interval-select — dropdown styling in
        AddExpenseForm

**Final Checkpoint**: Recurring section looks clean
and consistent. All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → must complete first (storage + utils)
- Phase 2 → depends on Phase 1 (form needs interval)
- Phase 3 → depends on Phase 1 (section needs templates)
- Phase 4 → depends on Phases 2 + 3 (App wires both)
- Phase 5 → depends on Phase 4 (style after logic)

## Notes

- Auto-add only runs once per period — lastAddedDate
  prevents duplicates
- Deleting a template never deletes past expenses
- Weekly interval uses day of week from creation date
- Monthly interval uses day of month from creation date
- Yearly interval uses month + day from creation date
- If app not opened for months — only current period
  is added, no backfilling
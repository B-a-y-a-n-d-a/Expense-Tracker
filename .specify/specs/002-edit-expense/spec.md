# Feature Specification: Edit Expense

**Feature Branch**: `002-edit-expense`
**Created**: 2026-04-21
**Status**: Draft

## Context

This feature overrides the assumption in spec 001 that stated 
"No expense editing — delete and re-add if correction needed."
Users have requested the ability to edit existing expenses in place
without having to delete and re-add them.

## User Scenarios & Testing

### User Story 1 - Edit an Existing Expense (Priority: P1)

A user wants to edit an existing expense to correct a mistake or
update details without losing the original record or having to
delete and re-add it.

**Why this priority**: Core feature — this is the entire purpose
of this spec.

**Independent Test**: Click Edit on an existing expense, change
the title and amount, click Save, verify the updated values appear
in the list.

**Acceptance Scenarios**:

1. **Given** an expense exists in the list, **When** the user clicks
   Edit, **Then** an inline edit form appears pre-filled with the
   existing expense values
2. **Given** the edit form is open, **When** the user changes values
   and clicks Save, **Then** the expense is updated in the list and
   in localStorage
3. **Given** the edit form is open, **When** the user clicks Cancel,
   **Then** the form closes and the original expense values are
   unchanged
4. **Given** the edit form is open, **When** the user clears the
   title and clicks Save, **Then** an error message is shown and
   the expense is not saved
5. **Given** the edit form is open, **When** the user enters a
   negative amount and clicks Save, **Then** an error message is
   shown and the expense is not saved
6. **Given** a valid edit is saved, **When** the page is refreshed,
   **Then** the updated expense values are still shown

---

### Edge Cases

- What happens if two expenses are in edit mode at the same time?
  Only one expense can be in edit mode at a time.
- What happens if the user edits and saves without changing anything?
  The expense is saved as-is with no errors.

## Requirements

### Functional Requirements

- **FR-001**: System MUST allow users to edit an existing expense
- **FR-002**: Edit form MUST be pre-filled with existing expense values
- **FR-003**: System MUST validate edited values using the same rules
  as adding (title required, amount positive whole number, date
  required)
- **FR-004**: System MUST update the expense in localStorage on save
- **FR-005**: System MUST allow users to cancel editing without saving
- **FR-006**: Only one expense can be in edit mode at a time
- **FR-007**: The expense id and createdAt must not change on edit

### Key Entities

- **Expense** (unchanged from spec 001):
  - id — must not change on edit
  - title — editable
  - amount — editable
  - category — editable
  - date — editable
  - createdAt — must not change on edit

## Success Criteria

- **SC-001**: User can edit an expense in under 30 seconds
- **SC-002**: Edited expense survives a full page refresh
- **SC-003**: Cancelling edit leaves the original expense unchanged
- **SC-004**: Validation errors shown correctly on invalid edit

## Clarifications

These were clarified on 2026-04-21:

- **Edit button location**: Edit button appears next to the Delete 
  button on every expense item at all times
- **Edit form layout**: Edit form looks identical to the Add Expense 
  form — all fields stacked vertically, replacing the expense item row
- **Save behaviour**: After saving, expense stays in its current 
  position in the list — no re-sorting
- **Edit + Delete visibility**: When edit form is open, Delete button 
  is hidden until user cancels or saves
- **Unsaved changes warning**: If user clicks Edit on a different 
  expense while one is already being edited, a warning appears: 
  "You have unsaved changes. Discard them and edit this expense instead?"
  with Discard and Keep Editing buttons

## Assumptions

- Edit is inline — no separate page or modal
- Only one expense can be in edit mode at a time
- The edit form appears in place of the expense item row
- id and createdAt are never modified during an edit
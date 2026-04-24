# Implementation Plan: Expense Calendar

**Branch**: `007-expense-calendar` | **Date**: 2026-04-24
**Spec**: `.specify/specs/007-expense-calendar/spec.md`

## Summary

Add a collapsible calendar section that shows expenses
as coloured dots on their respective days. Hovering
over a day with expenses shows a CSS tooltip listing
each expense title and amount. Users can navigate
between months. The calendar respects active filters.
Collapse state persists in localStorage.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**: ExpenseCalendar.jsx
**New Utils**: calendarUtils.js
**Modified Files**:
  - App.jsx — render ExpenseCalendar, pass filtered
    expenses
  - storageService.js — add getCalendarOpen,
    saveCalendarOpen
  - constants.js — add CALENDAR_KEY
  - App.css — add calendar styles and tooltip

## Constitution Check

- ✅ Simplicity First — pure JS date calculations,
  CSS tooltip (no library), one new component
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — calendar utils
  tested before UI
- ✅ Component-Based UI — ExpenseCalendar is
  focused, single responsibility
- ✅ Data Persistence — collapse state in localStorage

## What Changes vs What Stays the Same

### Files to ADD
- `src/components/ExpenseCalendar.jsx`
- `src/utils/calendarUtils.js`

### Files to MODIFY
- `src/services/storageService.js` — add collapse
  state storage
- `src/utils/constants.js` — add CALENDAR_KEY
- `src/App.jsx` — render ExpenseCalendar
- `src/App.css` — calendar and tooltip styles

### Files UNCHANGED
- All other components
- validators.js, formatters.js, filters.js
- budgetUtils.js, recurringUtils.js

## Calendar Grid Logic

```javascript
// Get all days to display for a month
// including padding days from prev/next month
function getCalendarDays(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Monday = 0, Sunday = 6
  // getDay() returns 0=Sun, adjust to Mon=0
  let startPadding = (firstDay.getDay() + 6) % 7

  const days = []

  // Add padding days from previous month
  for (let i = startPadding - 1; i >= 0; i--) {
    const d = new Date(year, month, -i)
    days.push({ date: formatDateKey(d),
      isCurrentMonth: false })
  }

  // Add all days of current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d)
    days.push({ date: formatDateKey(date),
      isCurrentMonth: true })
  }

  // Pad to complete the last week
  const remaining = 7 - (days.length % 7)
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i)
      days.push({ date: formatDateKey(d),
        isCurrentMonth: false })
    }
  }
  return days
}
```

## Tooltip Strategy

Pure CSS tooltip using data attribute and ::after
pseudo-element. No JavaScript needed for show/hide.

```css
.calendar-day[data-tooltip]:hover::after {
  content: attr(data-tooltip);
  /* position and style */
}
```

## Data Flow

```text
App.jsx
  └── ExpenseCalendar
        ├── receives filteredExpenses from App
        ├── manages viewMonth, viewYear state
        ├── manages isOpen state (from localStorage)
        ├── uses getCalendarDays for grid
        ├── maps expenses to dates for dot display
        └── builds tooltip text per day
```

## Complexity Tracking

No constitution violations. Pure JS date math,
CSS tooltip, one new component and utility file.
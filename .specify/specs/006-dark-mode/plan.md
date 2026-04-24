# Implementation Plan: Dark Mode

**Branch**: `006-dark-mode` | **Date**: 2026-04-24
**Spec**: `.specify/specs/006-dark-mode/spec.md`

## Summary

Implement dark mode by converting all hardcoded CSS
colours to CSS custom properties (variables). A class
of "dark" on the document body switches the variable
values to dark theme colours. A sun/moon toggle button
in the app header saves the preference to localStorage
and applies it on load.

## Technical Context

**Language/Version**: JavaScript (ES2022)
**Framework**: React 18 with Vite (existing)
**New Components**: None
**Modified Files**:
  - App.css — convert colours to CSS variables,
    add dark theme variable overrides
  - App.jsx — add theme state, toggle handler,
    apply dark class to body
  - storageService.js — add getTheme, saveTheme
**New Constants**: THEME_KEY in constants.js

## Constitution Check

- ✅ Simplicity First — CSS variables are the
  simplest possible dark mode implementation.
  No new libraries needed.
- ✅ JavaScript Only — plain JS throughout
- ✅ Test-Driven Development — theme storage
  and toggle logic tested
- ✅ Component-Based UI — no new components,
  existing components inherit theme via CSS
- ✅ Data Persistence — theme stored in localStorage

## What Changes vs What Stays the Same

### Files to MODIFY
- `src/App.css` — convert all hardcoded colours
  to CSS variables, add .dark overrides
- `src/App.jsx` — add theme state, toggle button,
  apply class to body
- `src/services/storageService.js` — add getTheme
  and saveTheme
- `src/utils/constants.js` — add THEME_KEY

### Files UNCHANGED
- All components (they inherit theme via CSS)
- All utility files
- All test files (except storageService.test.js)

## CSS Variable Strategy

```css
/* Light mode defaults on :root */
:root {
  --bg-primary: #f5f5f5;
  --bg-card: #ffffff;
  --text-primary: #333333;
  --text-secondary: #555555;
  --text-muted: #999999;
  --border-color: #dddddd;
  --accent-blue: #3498db;
  --accent-green: #27ae60;
  --accent-red: #e74c3c;
  --accent-yellow: #f39c12;
  --shadow: rgba(0,0,0,0.08);
}

/* Dark mode overrides on body.dark */
body.dark {
  --bg-primary: #1a1a2e;
  --bg-card: #16213e;
  --text-primary: #e0e0e0;
  --text-secondary: #b0b0b0;
  --text-muted: #707070;
  --border-color: #2a2a4a;
  --accent-blue: #4aa3df;
  --accent-green: #2ecc71;
  --accent-red: #e74c3c;
  --accent-yellow: #f39c12;
  --shadow: rgba(0,0,0,0.3);
}
```

## Toggle Button

```jsx
/* In App.jsx header */
<button
  className="theme-toggle"
  onClick={handleThemeToggle}
  aria-label="Toggle dark mode"
>
  {isDark ? '☀️' : '🌙'}
</button>
```

## Data Flow

```text
App.jsx mounts
  └── loads theme from localStorage
        ├── if "dark" → add class "dark" to body
        └── if "light" or null → no class on body

User clicks toggle
  └── handleThemeToggle
        ├── toggles isDark state
        ├── toggles "dark" class on document.body
        └── saves new theme to localStorage
```

## Complexity Tracking

No constitution violations. CSS variables are the
industry standard approach for theming. Zero new
dependencies.
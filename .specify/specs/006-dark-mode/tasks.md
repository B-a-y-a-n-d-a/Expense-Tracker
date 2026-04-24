# Tasks: Dark Mode

**Input**: `.specify/specs/006-dark-mode/`
**Prerequisites**: spec.md ✅ plan.md ✅

---

## Phase 1: Storage

**Purpose**: Theme persistence in localStorage

### Tests First

- [ ] T001 Add theme storage tests to
      `src/tests/storageService.test.js` covering:
      - getTheme returns null when nothing stored
      - saveTheme persists theme to localStorage
      - getTheme returns saved theme value

### Implementation

- [ ] T002 Add THEME_KEY to `src/utils/constants.js`:
      `export const THEME_KEY = "expense-tracker-theme"`

- [ ] T003 Add to `src/services/storageService.js`:
      - getTheme() — reads theme from localStorage
      - saveTheme(theme) — saves theme to localStorage

- [ ] T004 Run tests: `npm run test` — T001 must PASS

**Checkpoint**: Theme storage works correctly

---

## Phase 2: CSS Variables

**Purpose**: Convert all hardcoded colours to CSS
variables to support both themes

### Implementation

- [ ] T005 Update `src/App.css`:
      - add :root block with all CSS variables for
        light mode
      - add body.dark block with dark mode overrides
      - replace ALL hardcoded colour values with
        CSS variable references throughout the file
      - colours to convert:
        - #f5f5f5 → var(--bg-primary)
        - #ffffff → var(--bg-card)
        - #333, #333333 → var(--text-primary)
        - #555 → var(--text-secondary)
        - #999 → var(--text-muted)
        - #ddd → var(--border-color)
        - #3498db → var(--accent-blue)
        - #27ae60 → var(--accent-green)
        - #e74c3c → var(--accent-red)
        - #f39c12 → var(--accent-yellow)
        - rgba(0,0,0,0.08) → var(--shadow)

- [ ] T006 Manual check: open browser, verify app
      still looks correct in light mode after CSS
      variable conversion

**Checkpoint**: App looks identical to before in
light mode — all CSS variables working correctly

---

## Phase 3: Toggle + App Wiring

**Purpose**: Add theme toggle button and wire up
theme switching in App.jsx

### Tests First

- [ ] T007 No automated UI tests for toggle —
      verify manually in browser per T009

### Implementation

- [ ] T008 Update `src/App.jsx`:
      - add isDark state:
        `const [isDark, setIsDark] = useState(false)`
      - on mount: load theme from getTheme(), if
        "dark" set isDark to true AND add class
        "dark" to document.body
      - handleThemeToggle():
        - toggle isDark state
        - toggle "dark" class on document.body
        - save new theme to localStorage via saveTheme
      - add toggle button to header:
        - className="theme-toggle"
        - shows ☀️ when isDark is true
        - shows 🌙 when isDark is false
        - calls handleThemeToggle on click

- [ ] T009 Run `npm run test` — ALL tests must
      still PASS

- [ ] T010 Manual browser test:
      - click moon icon → app switches to dark mode
      - verify ALL sections look correct in dark mode:
        header, add form, category tabs, filter bar,
        expense list, budget section, recurring section,
        spending summary
      - click sun icon → app switches back to light mode
      - refresh in dark mode → dark mode persists
      - refresh in light mode → light mode persists

**Checkpoint**: Theme toggle works correctly and
persists. All sections styled correctly in both themes.

---

## Phase 4: Toggle Button Styling

**Purpose**: Style the theme toggle button

- [ ] T011 Add CSS to `src/App.css`:
      - .theme-toggle — circular button in header,
        no background border, large emoji, cursor
        pointer, hover effect
      - position it to the right of the h1 in header
      - update .app-header to use flexbox with
        space-between so h1 is left and button is right

**Final Checkpoint**: Toggle button looks clean in
header. Dark mode fully working across all components.
All tests pass.

---

## Dependencies & Execution Order

- Phase 1 → storage first
- Phase 2 → CSS variables (independent of Phase 1)
- Phase 3 → depends on Phase 1 + 2
- Phase 4 → styling after logic works

## Notes

- CSS variables are the key — once variables are in
  place, dark mode is just changing variable values
- body.dark class is toggled on document.body directly
  from App.jsx — this affects ALL CSS in the app
- No component changes needed — they all inherit
  colours from CSS variables automatically
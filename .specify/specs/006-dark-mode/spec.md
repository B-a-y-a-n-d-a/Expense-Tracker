# Feature Specification: Dark Mode

**Feature Branch**: `006-dark-mode`
**Created**: 2026-04-24
**Status**: Draft

## Context

Users want to switch between light and dark themes for
comfortable viewing in different lighting conditions.
The preference persists across page refreshes via
localStorage.

## User Scenarios & Testing

### User Story 1 - Toggle Dark Mode (Priority: P1)

A user wants to switch between light and dark mode using
a sun/moon icon button in the app header.

**Why this priority**: Core feature — this is the entire
purpose of this spec.

**Independent Test**: Click the sun/moon button in the
header. Verify the app switches to dark mode. Refresh
the page — verify dark mode is still active.

**Acceptance Scenarios**:

1. **Given** the app is in light mode, **When** the user
   clicks the moon icon, **Then** the app switches to
   dark mode and the icon changes to a sun
2. **Given** the app is in dark mode, **When** the user
   clicks the sun icon, **Then** the app switches to
   light mode and the icon changes to a moon
3. **Given** the user has selected dark mode, **When**
   the page is refreshed, **Then** dark mode is still
   active
4. **Given** the user has selected light mode, **When**
   the page is refreshed, **Then** light mode is still
   active
5. **Given** no preference is stored, **Then** the app
   defaults to light mode

---

### Edge Cases

- What if localStorage is unavailable? Default to
  light mode gracefully
- What if the user's system is in dark mode? App
  defaults to light mode unless user explicitly toggles

## Requirements

### Functional Requirements

- **FR-001**: App header MUST have a sun/moon icon
  toggle button
- **FR-002**: Clicking the button MUST switch between
  light and dark mode
- **FR-003**: Dark mode preference MUST persist in
  localStorage
- **FR-004**: App MUST default to light mode when no
  preference is stored
- **FR-005**: ALL components MUST respect the active
  theme — no components left in light mode when dark
  mode is active
- **FR-006**: Theme switching MUST be instant with no
  page reload

### Key Entities

- **Theme**: "light" | "dark" (stored in localStorage)
- **THEME_KEY**: "expense-tracker-theme"

## Success Criteria

- **SC-001**: Toggle switches theme instantly
- **SC-002**: Theme persists on page refresh
- **SC-003**: All components styled correctly in both
  themes
- **SC-004**: Sun icon shown in dark mode, moon icon
  in light mode

## Clarifications

Clarified on 2026-04-24:

- **Toggle location**: In the app header
- **Toggle appearance**: Sun/moon icon button
- **Persistence**: Yes — saved in localStorage
- **Default**: Light mode when no preference stored
- **System preference**: Ignored — user toggle only

## Assumptions

- Dark mode uses CSS custom properties (variables)
  on the root element — no separate stylesheet needed
- Theme is applied by toggling a class on the
  document body (e.g. class="dark")
- All existing CSS colours are converted to CSS
  variables to support both themes
- No animation on theme switch — instant change
# Expense Tracker Constitution

## Core Principles

### I. Simplicity First
Keep the codebase as simple as possible. No over-engineering.
Every decision should favour the simplest solution that works.
Avoid adding libraries, abstractions, or patterns unless clearly 
necessary.

### II. JavaScript Only
All code must be written in plain JavaScript.
No TypeScript — keep it simple and accessible.
Use JSDoc comments where type clarity is needed.

### III. Test-Driven Development
Write tests before writing implementation code.
Every feature must have unit tests covering the main logic.
Tests must pass before a feature is considered complete.

### IV. Component-Based UI
UI is broken into small, focused, reusable React components.
Each component has a single responsibility.
No component should exceed 150 lines of code.

### V. Data Persistence
All expense data must persist between browser sessions using 
localStorage.
Data must be validated before saving.
Data corruption must be handled gracefully with a fallback to 
empty state.

## Quality Standards
- No console errors in the browser
- All amounts must be validated as positive numbers
- Dates must be validated before saving
- Categories must come from a fixed predefined list
- The UI must be responsive and work on both desktop and mobile

## Development Workflow
- Each feature is built against the spec before any code is written
- Implementation follows the task breakdown order
- No skipping tasks or reordering without updating the task list
- New features are added via new numbered specs in .specify/specs/
- Existing assumptions can be overridden by a new feature spec

## Governance
This constitution supersedes all other decisions.
Any deviation must be documented with a clear reason.
Simplicity and correctness take priority over speed.

**Version**: 1.1.0 | **Ratified**: 2026-04-20 | **Last Amended**: 2026-04-21
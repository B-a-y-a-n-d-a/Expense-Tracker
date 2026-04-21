# 💸 Expense Tracker

A personal expense tracking web application built with React and Vite,
developed using **Spec-Driven Development (SDD)** methodology.

## 🌟 Live Features

- **Add expenses** with title, amount, category and date
- **View all expenses** sorted by date (newest first)
- **Delete expenses** with inline confirmation
- **Filter by category** using tabs (Food, Transport, Entertainment,
  Bills, Other)
- **Spending summary** with total and per-category breakdown
- **Edit expenses** inline with validation and unsaved changes warning
- **Persistent storage** — data survives page refreshes via localStorage
- **Fully responsive** — works on desktop and mobile

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 4
- **Language**: JavaScript (ES2022)
- **Styling**: Plain CSS
- **Storage**: localStorage (no backend)
- **Testing**: Vitest + React Testing Library
- **Methodology**: Spec-Driven Development (spec-kit)

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- npm

### Installation

Clone the repository and install dependencies:

    git clone https://github.com/B-a-y-a-n-d-a/Expense-Tracker.git
    cd Expense-Tracker
    npm install
    npm run dev

Open http://localhost:5173 in your browser.

### Running Tests

    npm run test

All 26 tests should pass.

## 📁 Project Structure

    expense-tracker/
    ├── src/
    │   ├── components/
    │   │   ├── AddExpenseForm.jsx
    │   │   ├── ExpenseList.jsx
    │   │   ├── ExpenseItem.jsx
    │   │   ├── CategoryTabs.jsx
    │   │   └── SpendingSummary.jsx
    │   ├── services/
    │   │   └── storageService.js
    │   ├── utils/
    │   │   ├── validators.js
    │   │   ├── formatters.js
    │   │   └── constants.js
    │   ├── tests/
    │   │   ├── validators.test.js
    │   │   └── storageService.test.js
    │   └── App.jsx
    │
    └── .specify/
        ├── memory/
        │   └── constitution.md
        └── specs/
            ├── 001-expense-tracker/
            └── 002-edit-expense/

## 📋 Spec-Driven Development

This project was built using the
[spec-kit](https://github.com/github/spec-kit) SDD methodology.
Instead of jumping straight into code, every feature was:

1. **Specced** — user stories, acceptance scenarios, requirements
2. **Clarified** — ambiguities resolved before planning
3. **Planned** — tech stack, architecture, data model defined
4. **Tasked** — broken into ordered, testable implementation steps
5. **Implemented** — TDD, tests written before code

All specification documents live in .specify/specs/:

| Feature | Status |
|---------|--------|
| 001 — Core Expense Tracker | ✅ Complete |
| 002 — Edit Expense | ✅ Complete |

## 🧪 Test Coverage

| Test File | Tests | Status |
|-----------|-------|--------|
| validators.test.js | 14 | ✅ Passing |
| storageService.test.js | 12 | ✅ Passing |
| **Total** | **26** | **✅ All passing** |

## 📐 Architecture Decisions

- **No backend** — single user app, localStorage is sufficient
- **No TypeScript** — plain JavaScript per project constitution
- **No Redux** — React useState is sufficient for this scope
- **No routing** — single page, no navigation needed
- **Component max 150 lines** — enforced by constitution

## 🏛️ Project Constitution

The project is governed by .specify/memory/constitution.md which
defines non-negotiable rules:

- **Simplicity First** — no over-engineering
- **JavaScript Only** — no TypeScript
- **Test-Driven Development** — tests before code
- **Component-Based UI** — single responsibility, max 150 lines
- **Data Persistence** — localStorage with error handling

## 📄 License

MIT
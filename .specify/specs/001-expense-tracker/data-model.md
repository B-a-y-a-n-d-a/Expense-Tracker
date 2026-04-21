# Data Model: Expense Tracker

## Expense Object

```javascript
{
  id: "uuid-v4-string",        // Unique identifier
  title: "Groceries",          // Non-empty string, max 100 chars
  amount: 250,                 // Positive whole number (Rands)
  category: "Food",            // One of the 5 fixed categories
  date: "2026-04-20",          // ISO date string YYYY-MM-DD
  createdAt: 1713600000000     // Unix timestamp (Date.now())
}
```

## Categories (Fixed List)

```javascript
const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Bills",
  "Other"
]
```

## localStorage Schema

```javascript
// Key used in localStorage
const STORAGE_KEY = "expense-tracker-expenses"

// Value stored — array of Expense objects
[
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    title: "Groceries",
    amount: 250,
    category: "Food",
    date: "2026-04-20",
    createdAt: 1713600000000
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    title: "Uber to work",
    amount: 85,
    category: "Transport",
    date: "2026-04-19",
    createdAt: 1713513600000
  }
]
```

## Validation Rules

| Field     | Rule                                      |
|-----------|-------------------------------------------|
| title     | Required, non-empty, max 100 characters   |
| amount    | Required, whole number, greater than 0    |
| category  | Required, must be one of CATEGORIES list  |
| date      | Required, valid date                      |

## Summary Calculation

```javascript
// Total spent
total = expenses.reduce((sum, e) => sum + e.amount, 0)

// Per category
byCategory = CATEGORIES.map(cat => ({
  category: cat,
  total: expenses
    .filter(e => e.category === cat)
    .reduce((sum, e) => sum + e.amount, 0)
}))
```
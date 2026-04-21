import { useState } from 'react'
import { CATEGORIES } from '../utils/constants'
import { validateExpense } from '../utils/validators'

export default function AddExpenseForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})

  function handleSubmit(e) {
    e.preventDefault()
    const expense = { title, amount: Number(amount), category, date }
    const validationErrors = validateExpense(expense)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onAdd(expense)
    setTitle('')
    setAmount('')
    setCategory(CATEGORIES[0])
    setDate('')
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit} className="add-expense-form">
      <h2>Add Expense</h2>

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. Groceries"
        />
        {errors.title && (
          <span className="error">{errors.title}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount (R)</label>
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="e.g. 250"
          min="1"
        />
        {errors.amount && (
          <span className="error">{errors.amount}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        {errors.date && (
          <span className="error">{errors.date}</span>
        )}
      </div>

      <button type="submit">Add Expense</button>
    </form>
  )
}
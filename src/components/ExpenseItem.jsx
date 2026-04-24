import { useState } from 'react'
import { formatCurrency, formatDate } from '../utils/formatters'
import { CATEGORIES } from '../utils/constants'
import { validateExpense } from '../utils/validators'

export default function ExpenseItem({
  expense,
  onDelete,
  isEditing,
  onEdit,
  onUpdate,
  onCancelEdit,
  hasUnsavedWarning,
  onDiscardEdit,
  onKeepEditing,
}) {
  const [confirming, setConfirming] = useState(false)
  const [editTitle, setEditTitle] = useState(expense.title)
  const [editAmount, setEditAmount] = useState(expense.amount)
  const [editCategory, setEditCategory] = useState(expense.category)
  const [editDate, setEditDate] = useState(expense.date)
  const [editIsRecurring, setEditIsRecurring] = useState(!!expense.isRecurring)
  const [editInterval, setEditInterval] = useState(expense.interval ?? 'monthly')
  const [errors, setErrors] = useState({})

  function handleDeleteClick() {
    setConfirming(true)
  }

  function handleConfirmDelete() {
    onDelete(expense.id)
    setConfirming(false)
  }

  function handleCancelDelete() {
    setConfirming(false)
  }

  function handleEditClick() {
    setEditTitle(expense.title)
    setEditAmount(expense.amount)
    setEditCategory(expense.category)
    setEditDate(expense.date)
    setEditIsRecurring(!!expense.isRecurring)
    setEditInterval(expense.interval ?? 'monthly')
    setErrors({})
    onEdit(expense.id)
  }

  function handleSave() {
    const updated = {
      ...expense,
      title: editTitle,
      amount: Number(editAmount),
      category: editCategory,
      date: editDate,
      isRecurring: editIsRecurring,
      interval: editInterval,
    }
    const validationErrors = validateExpense(updated)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    onUpdate(updated)
  }

  function handleCancel() {
    setErrors({})
    onCancelEdit()
  }

  if (isEditing) {
    return (
      <div className="expense-item editing">
        <div className="edit-form">
          <h3>Edit Expense</h3>

          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
            />
            {errors.title && (
              <span className="error">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label>Amount (R)</label>
            <input
              type="number"
              value={editAmount}
              onChange={e => setEditAmount(e.target.value)}
              min="1"
            />
            {errors.amount && (
              <span className="error">{errors.amount}</span>
            )}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={editCategory}
              onChange={e => setEditCategory(e.target.value)}
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              value={editDate}
              onChange={e => setEditDate(e.target.value)}
            />
            {errors.date && (
              <span className="error">{errors.date}</span>
            )}
          </div>

          <div className="recurring-checkbox-group">
            <input
              id={`isRecurring-${expense.id}`}
              type="checkbox"
              checked={editIsRecurring}
              onChange={e => setEditIsRecurring(e.target.checked)}
            />
            <label htmlFor={`isRecurring-${expense.id}`}>Mark as recurring</label>
          </div>

          {editIsRecurring && (
            <div className="form-group">
              <label htmlFor={`interval-${expense.id}`}>Repeat</label>
              <select
                id={`interval-${expense.id}`}
                className="interval-select"
                value={editInterval}
                onChange={e => setEditInterval(e.target.value)}
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          )}

          <div className="edit-actions">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="expense-item">
      {hasUnsavedWarning && (
        <div className="unsaved-warning">
          <span>You have unsaved changes. Discard them and
            edit this expense instead?</span>
          <button className="discard-btn" onClick={onDiscardEdit}>
            Discard
          </button>
          <button className="keep-btn" onClick={onKeepEditing}>
            Keep Editing
          </button>
        </div>
      )}

      <div className="expense-details">
        <span className="expense-title">{expense.title}</span>
        <span className="expense-category">{expense.category}</span>
        <span className="expense-date">{formatDate(expense.date)}</span>
        <span className="expense-amount">
          {formatCurrency(expense.amount)}
        </span>
      </div>

      <div className="expense-actions">
        <button className="edit-btn" onClick={handleEditClick}>
          Edit
        </button>
        {!confirming ? (
          <button className="delete-btn" onClick={handleDeleteClick}>
            Delete
          </button>
        ) : (
          <div className="confirm-delete">
            <span>Are you sure?</span>
            <button className="confirm-yes" onClick={handleConfirmDelete}>
              Yes
            </button>
            <button className="confirm-no" onClick={handleCancelDelete}>
              No
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
import ExpenseItem from './ExpenseItem'

export default function ExpenseList({
  expenses,
  onDelete,
  editingId,
  pendingEditId,
  onEdit,
  onUpdate,
  onCancelEdit,
  onDiscardEdit,
  onKeepEditing,
}) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses yet. Add one above!</p>
      </div>
    )
  }

  const sorted = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="expense-list">
      {sorted.map(expense => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          isEditing={editingId === expense.id}
          hasUnsavedWarning={pendingEditId === expense.id}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onCancelEdit={onCancelEdit}
          onDiscardEdit={onDiscardEdit}
          onKeepEditing={onKeepEditing}
        />
      ))}
    </div>
  )
}
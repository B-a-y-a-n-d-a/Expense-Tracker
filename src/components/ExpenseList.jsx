import ExpenseItem from './ExpenseItem'

export default function ExpenseList({
  expenses,
  totalExpenses,
  hasActiveFilters,
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
    const message = totalExpenses > 0 && hasActiveFilters
      ? 'No expenses match your filters'
      : 'No expenses yet. Add one above!'

    return (
      <div className="empty-state">
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div className="expense-list">
      {expenses.map(expense => (
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

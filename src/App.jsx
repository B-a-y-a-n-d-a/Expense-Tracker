import { useState, useEffect } from 'react'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import CategoryTabs from './components/CategoryTabs'
import SpendingSummary from './components/SpendingSummary'
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  generateId,
} from './services/storageService'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [editingId, setEditingId] = useState(null)
  const [pendingEditId, setPendingEditId] = useState(null)

  useEffect(() => {
    const saved = getExpenses()
    setExpenses(saved)
  }, [])

  function handleAdd(expense) {
    const newExpense = {
      ...expense,
      id: generateId(),
      createdAt: Date.now(),
    }
    const updated = addExpense(newExpense)
    setExpenses(updated)
  }

  function handleDelete(id) {
    const updated = deleteExpense(id)
    setExpenses(updated)
    if (editingId === id) setEditingId(null)
  }

  function handleFilterChange(category) {
    setActiveFilter(category)
  }

  function handleEdit(id) {
    if (editingId === null) {
      setEditingId(id)
    } else {
      setPendingEditId(id)
    }
  }

  function handleUpdate(updatedExpense) {
    const updated = updateExpense(updatedExpense)
    setExpenses(updated)
    setEditingId(null)
  }

  function handleCancelEdit() {
    setEditingId(null)
  }

  function handleDiscardEdit() {
    setEditingId(pendingEditId)
    setPendingEditId(null)
  }

  function handleKeepEditing() {
    setPendingEditId(null)
  }

  const filteredExpenses = activeFilter === 'All'
    ? expenses
    : expenses.filter(e => e.category === activeFilter)

  return (
    <div className="app">
      <header className="app-header">
        <h1>💸 Expense Tracker</h1>
      </header>

      <main className="app-main">
        <AddExpenseForm onAdd={handleAdd} />
        <CategoryTabs
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={handleDelete}
          editingId={editingId}
          pendingEditId={pendingEditId}
          onEdit={handleEdit}
          onUpdate={handleUpdate}
          onCancelEdit={handleCancelEdit}
          onDiscardEdit={handleDiscardEdit}
          onKeepEditing={handleKeepEditing}
        />
        <SpendingSummary expenses={filteredExpenses} />
      </main>
    </div>
  )
}
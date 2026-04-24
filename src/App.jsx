import { useState, useEffect } from 'react'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import CategoryTabs from './components/CategoryTabs'
import SpendingSummary from './components/SpendingSummary'
import FilterBar from './components/FilterBar'
import BudgetSection from './components/BudgetSection'
import {
  getExpenses,
  addExpense,
  deleteExpense,
  updateExpense,
  generateId,
  getBudget,
  saveBudget,
  getTheme,
  saveTheme,
} from './services/storageService'
import { applyAllFilters } from './utils/filters'
import { DEFAULT_FILTER_STATE } from './utils/constants'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState({})
  const [filterState, setFilterState] = useState(DEFAULT_FILTER_STATE)
  const [editingId, setEditingId] = useState(null)
  const [pendingEditId, setPendingEditId] = useState(null)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setExpenses(getExpenses())
    setBudget(getBudget() ?? {})
    if (getTheme() === 'dark') {
      setIsDark(true)
      document.body.classList.add('dark')
    }
  }, [])

  function handleThemeToggle() {
    const next = !isDark
    setIsDark(next)
    document.body.classList.toggle('dark', next)
    saveTheme(next ? 'dark' : 'light')
  }

  function handleSaveBudget(newBudget) {
    saveBudget(newBudget)
    setBudget(newBudget)
  }

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
    setFilterState(prev => ({ ...prev, activeCategory: category }))
  }

  function handleSearchChange(keyword) {
    setFilterState(prev => ({ ...prev, searchKeyword: keyword }))
  }

  function handleDateRangeChange(dateRange) {
    setFilterState(prev => ({ ...prev, dateRange }))
  }

  function handleSortChange(sortBy) {
    setFilterState(prev => ({ ...prev, sortBy }))
  }

  function handleClearAll() {
    setFilterState(DEFAULT_FILTER_STATE)
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

  const filteredExpenses = applyAllFilters(expenses, filterState)

  const hasActiveFilters =
    filterState.searchKeyword !== DEFAULT_FILTER_STATE.searchKeyword ||
    filterState.dateRange !== DEFAULT_FILTER_STATE.dateRange ||
    filterState.sortBy !== DEFAULT_FILTER_STATE.sortBy ||
    filterState.activeCategory !== DEFAULT_FILTER_STATE.activeCategory

  return (
    <div className="app">
      <header className="app-header">
        <h1>💸 Expense Tracker</h1>
        <button
          className="theme-toggle"
          onClick={handleThemeToggle}
          aria-label="Toggle dark mode"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </header>

      <main className="app-main">
        <AddExpenseForm onAdd={handleAdd} />
        <BudgetSection
          budget={budget}
          expenses={expenses}
          onSave={handleSaveBudget}
        />
        <CategoryTabs
          activeFilter={filterState.activeCategory}
          onFilterChange={handleFilterChange}
        />
        <FilterBar
          filterState={filterState}
          onSearchChange={handleSearchChange}
          onDateRangeChange={handleDateRangeChange}
          onSortChange={handleSortChange}
          onClearAll={handleClearAll}
        />
        <ExpenseList
          expenses={filteredExpenses}
          totalExpenses={expenses.length}
          hasActiveFilters={hasActiveFilters}
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

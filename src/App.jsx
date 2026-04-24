import { useState, useEffect } from 'react'
import AddExpenseForm from './components/AddExpenseForm'
import ExpenseList from './components/ExpenseList'
import CategoryTabs from './components/CategoryTabs'
import SpendingSummary from './components/SpendingSummary'
import FilterBar from './components/FilterBar'
import BudgetSection from './components/BudgetSection'
import ExpenseCalendar from './components/ExpenseCalendar'
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
  getRecurringTemplates,
  addRecurringTemplate,
  deleteRecurringTemplate,
  updateRecurringTemplate,
  saveExpenses,
  saveRecurringTemplates,
} from './services/storageService'
import { applyAllFilters } from './utils/filters'
import { DEFAULT_FILTER_STATE } from './utils/constants'
import { createTemplateFromExpense, getDueTemplates } from './utils/recurringUtils'
import './App.css'

export default function App() {
  const [expenses, setExpenses] = useState([])
  const [budget, setBudget] = useState({})
  const [filterState, setFilterState] = useState(DEFAULT_FILTER_STATE)
  const [editingId, setEditingId] = useState(null)
  const [pendingEditId, setPendingEditId] = useState(null)
  const [isDark, setIsDark] = useState(false)
  const [recurringTemplates, setRecurringTemplates] = useState([])

  useEffect(() => {
    const loadedExpenses = getExpenses()
    const loadedTemplates = getRecurringTemplates()
    setBudget(getBudget() ?? {})
    if (getTheme() === 'dark') {
      setIsDark(true)
      document.body.classList.add('dark')
    }

    const today = new Date().toISOString().slice(0, 10)
    const due = getDueTemplates(loadedTemplates, today)
    if (due.length > 0) {
      const newExpenses = due.map(t => ({
        id: generateId(),
        title: t.title,
        amount: t.amount,
        category: t.category,
        date: today,
        templateId: t.id,
        createdAt: Date.now(),
      }))
      const allExpenses = [...loadedExpenses, ...newExpenses]
      saveExpenses(allExpenses)
      const updatedTemplates = loadedTemplates.map(t =>
        due.find(d => d.id === t.id) ? { ...t, lastAddedDate: today } : t
      )
      saveRecurringTemplates(updatedTemplates)
      setExpenses(allExpenses)
      setRecurringTemplates(updatedTemplates)
    } else {
      setExpenses(loadedExpenses)
      setRecurringTemplates(loadedTemplates)
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

  function handleAdd(rawExpense) {
    const { isRecurring, interval, ...fields } = rawExpense
    const id = generateId()
    const expense = { ...fields, id, createdAt: Date.now() }
    if (isRecurring) {
      const templateId = generateId()
      const template = { ...createTemplateFromExpense({ ...rawExpense }), id: templateId }
      setRecurringTemplates(addRecurringTemplate(template))
      setExpenses(addExpense({ ...expense, templateId }))
    } else {
      setExpenses(addExpense(expense))
    }
  }

  function handleDeleteRecurring(id) {
    setRecurringTemplates(deleteRecurringTemplate(id))
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
    if (updatedExpense.templateId) {
      const updatedTemplates = updateRecurringTemplate({
        id: updatedExpense.templateId,
        title: updatedExpense.title,
        amount: updatedExpense.amount,
        category: updatedExpense.category,
      })
      setRecurringTemplates(updatedTemplates)
    }
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
        <ExpenseCalendar expenses={filteredExpenses} />
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

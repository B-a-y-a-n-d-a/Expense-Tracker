import { STORAGE_KEY, BUDGET_KEY } from '../utils/constants'

/**
 * Generates a simple unique id
 * @returns {string}
 */
export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

/**
 * Retrieves all expenses from localStorage
 * @returns {Array}
 */
export function getExpenses() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load expenses:', error)
    return []
  }
}

/**
 * Saves expenses array to localStorage
 * @param {Array} expenses
 */
export function saveExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.error('Failed to save expenses:', error)
  }
}

/**
 * Adds a new expense and saves
 * @param {object} expense
 * @returns {Array} updated expenses
 */
export function addExpense(expense) {
  const expenses = getExpenses()
  const updated = [...expenses, expense]
  saveExpenses(updated)
  return updated
}

/**
 * Deletes an expense by id and saves
 * @param {string} id
 * @returns {Array} updated expenses
 */
export function deleteExpense(id) {
  const expenses = getExpenses()
  const updated = expenses.filter(e => e.id !== id)
  saveExpenses(updated)
  return updated
}

export function getBudget() {
  try {
    const data = localStorage.getItem(BUDGET_KEY)
    if (!data) return null
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load budget:', error)
    return null
  }
}

export function saveBudget(budget) {
  try {
    localStorage.setItem(BUDGET_KEY, JSON.stringify(budget))
  } catch (error) {
    console.error('Failed to save budget:', error)
  }
}

/**
 * Updates an existing expense by id and saves
 * @param {object} updatedExpense
 * @returns {Array} updated expenses
 */
export function updateExpense(updatedExpense) {
  const expenses = getExpenses()
  const updated = expenses.map(e => {
    if (e.id !== updatedExpense.id) return e
    return {
      ...updatedExpense,
      id: e.id,
      createdAt: e.createdAt,
    }
  })
  saveExpenses(updated)
  return updated
}
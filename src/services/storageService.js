import { STORAGE_KEY, BUDGET_KEY, THEME_KEY, CALENDAR_KEY, RECURRING_KEY } from '../utils/constants'

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

export function getTheme() {
  return localStorage.getItem(THEME_KEY)
}

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme)
}

export function getCalendarOpen() {
  const data = localStorage.getItem(CALENDAR_KEY)
  if (data === null) return true
  return data === 'true'
}

export function saveCalendarOpen(isOpen) {
  localStorage.setItem(CALENDAR_KEY, String(isOpen))
}

export function getRecurringTemplates() {
  try {
    const data = localStorage.getItem(RECURRING_KEY)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error('Failed to load recurring templates:', error)
    return []
  }
}

export function saveRecurringTemplates(templates) {
  try {
    localStorage.setItem(RECURRING_KEY, JSON.stringify(templates))
  } catch (error) {
    console.error('Failed to save recurring templates:', error)
  }
}

export function addRecurringTemplate(template) {
  const templates = getRecurringTemplates()
  const updated = [...templates, template]
  saveRecurringTemplates(updated)
  return updated
}

export function deleteRecurringTemplate(id) {
  const templates = getRecurringTemplates()
  const updated = templates.filter(t => t.id !== id)
  saveRecurringTemplates(updated)
  return updated
}

export function updateRecurringTemplate(updatedTemplate) {
  const templates = getRecurringTemplates()
  const updated = templates.map(t => t.id !== updatedTemplate.id ? t : { ...t, ...updatedTemplate })
  saveRecurringTemplates(updated)
  return updated
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
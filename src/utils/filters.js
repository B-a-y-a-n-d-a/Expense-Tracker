/**
 * @param {Array} expenses
 * @param {string} dateRange - "all" | "thisMonth" | "lastMonth" | "thisYear"
 */
export function filterByDateRange(expenses, dateRange) {
  if (dateRange === 'all') return expenses

  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  if (dateRange === 'thisMonth') {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`
    return expenses.filter(e => e.date.startsWith(prefix))
  }

  if (dateRange === 'lastMonth') {
    const last = new Date(year, month - 1)
    const prefix = `${last.getFullYear()}-${String(last.getMonth() + 1).padStart(2, '0')}`
    return expenses.filter(e => e.date.startsWith(prefix))
  }

  if (dateRange === 'thisYear') {
    return expenses.filter(e => e.date.startsWith(String(year)))
  }

  return expenses
}

/**
 * @param {Array} expenses
 * @param {string} keyword
 */
export function filterByKeyword(expenses, keyword) {
  if (!keyword) return expenses
  const lower = keyword.toLowerCase()
  return expenses.filter(
    e =>
      e.title.toLowerCase().includes(lower) ||
      e.category.toLowerCase().includes(lower)
  )
}

/**
 * @param {Array} expenses
 * @param {string} sortBy - "amountDesc" | "amountAsc" | "dateDesc" | "dateAsc" | "titleAsc"
 */
export function sortExpenses(expenses, sortBy) {
  const sorted = [...expenses]
  switch (sortBy) {
    case 'amountDesc':
      return sorted.sort((a, b) => b.amount - a.amount)
    case 'amountAsc':
      return sorted.sort((a, b) => a.amount - b.amount)
    case 'dateDesc':
      return sorted.sort((a, b) => new Date(b.date) - new Date(a.date))
    case 'dateAsc':
      return sorted.sort((a, b) => new Date(a.date) - new Date(b.date))
    case 'titleAsc':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return expenses
  }
}

/**
 * @param {Array} expenses
 * @param {{ activeCategory: string, dateRange: string, searchKeyword: string, sortBy: string }} filterState
 */
export function applyAllFilters(expenses, filterState) {
  const { activeCategory, dateRange, searchKeyword, sortBy } = filterState

  let result = expenses

  if (activeCategory && activeCategory !== 'All') {
    result = result.filter(e => e.category === activeCategory)
  }

  result = filterByDateRange(result, dateRange)
  result = filterByKeyword(result, searchKeyword)
  result = sortExpenses(result, sortBy)

  return result
}

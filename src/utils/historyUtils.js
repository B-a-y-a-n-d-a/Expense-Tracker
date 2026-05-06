import { CATEGORIES } from './constants'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export function getAvailableMonths(expenses) {
  const months = new Set()
  expenses.forEach(e => months.add(e.date.slice(0, 7)))
  const now = new Date()
  const current = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  months.add(current)
  return Array.from(months).sort().reverse()
}

export function formatMonthLabel(monthKey) {
  const [year, month] = monthKey.split('-')
  return `${MONTH_NAMES[Number(month) - 1]} ${year}`
}

export function getMonthSummary(expenses, monthKey) {
  const monthExpenses = expenses.filter(e => e.date.startsWith(monthKey))
  const total = monthExpenses.reduce((s, e) => s + e.amount, 0)
  const byCategory = {}
  CATEGORIES.forEach(cat => {
    byCategory[cat] = monthExpenses
      .filter(e => e.category === cat)
      .reduce((s, e) => s + e.amount, 0)
  })
  return {
    monthKey,
    monthLabel: formatMonthLabel(monthKey),
    total,
    count: monthExpenses.length,
    byCategory,
  }
}

export function getDifference(valueA, valueB) {
  const difference = valueB - valueA
  const percentageDiff = valueA === 0
    ? 0
    : Math.round((difference / valueA) * 100)
  return {
    difference,
    percentageDiff,
    trend: difference > 0 ? 'up' : difference < 0 ? 'down' : 'neutral',
  }
}

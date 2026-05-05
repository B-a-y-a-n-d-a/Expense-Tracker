export function getAverageDailySpend(expenses) {
  if (expenses.length === 0) return 0
  const total = expenses.reduce((s, e) => s + e.amount, 0)
  const daysElapsed = new Date().getDate()
  return Math.round(total / daysElapsed)
}

export function getHighestExpense(expenses) {
  if (expenses.length === 0) return null
  const max = expenses.reduce((m, e) => e.amount > m.amount ? e : m)
  return { title: max.title, amount: max.amount }
}

export function getMostUsedCategory(expenses) {
  if (expenses.length === 0) return null
  const counts = {}
  expenses.forEach(e => {
    counts[e.category] = (counts[e.category] ?? 0) + 1
  })
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0]
}

export function getMostExpensiveCategory(expenses) {
  if (expenses.length === 0) return null
  const totals = {}
  expenses.forEach(e => {
    totals[e.category] = (totals[e.category] ?? 0) + e.amount
  })
  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0]
}

export function getBusiestDay(expenses) {
  if (expenses.length === 0) return null
  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const counts = {}
  expenses.forEach(e => {
    const day = DAY_NAMES[new Date(e.date + 'T00:00:00').getDay()]
    counts[day] = (counts[day] ?? 0) + 1
  })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0]
}

export function getCurrentMonthStats(expenses) {
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  const current = expenses.filter(e => e.date.startsWith(prefix))
  return {
    averageDailySpend: getAverageDailySpend(current),
    highestExpense: getHighestExpense(current),
    mostUsedCategory: getMostUsedCategory(current),
    mostExpensiveCategory: getMostExpensiveCategory(current),
    totalExpenseCount: current.length,
    busiestDay: getBusiestDay(current),
  }
}

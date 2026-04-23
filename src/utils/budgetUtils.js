export function getCurrentMonthExpenses(expenses) {
  const now = new Date()
  const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  return expenses.filter(e => e.date.startsWith(prefix))
}

export function calculateProgress(spent, budget) {
  if (!budget || budget === 0) return null
  const percentage = (spent / budget) * 100
  return {
    spent,
    budget,
    percentage: Math.round(percentage),
    status: percentage >= 100 ? 'exceeded' : percentage >= 80 ? 'warning' : 'good',
  }
}

export function calculateAllProgress(expenses, budget) {
  const current = getCurrentMonthExpenses(expenses)
  const result = {}

  const totalSpent = current.reduce((sum, e) => sum + e.amount, 0)
  result.overall = calculateProgress(totalSpent, budget.overall)

  for (const [key, val] of Object.entries(budget)) {
    if (key === 'overall') continue
    const spent = current
      .filter(e => e.category === key)
      .reduce((sum, e) => sum + e.amount, 0)
    result[key] = calculateProgress(spent, val)
  }

  return result
}

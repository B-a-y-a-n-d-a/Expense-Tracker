export function isDue(template, today) {
  if (template.lastAddedDate === today) return false
  const date = new Date(today + 'T00:00:00')
  if (template.interval === 'monthly') return date.getDate() === template.dayOfMonth
  if (template.interval === 'weekly') return date.getDay() === template.dayOfWeek
  if (template.interval === 'yearly') {
    const [mm, dd] = template.monthAndDay.split('-')
    return date.getMonth() + 1 === Number(mm) && date.getDate() === Number(dd)
  }
  return false
}

export function createTemplateFromExpense(expense) {
  const date = new Date(expense.date + 'T00:00:00')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return {
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    interval: expense.interval,
    dayOfWeek: date.getDay(),
    dayOfMonth: date.getDate(),
    monthAndDay: `${mm}-${dd}`,
    lastAddedDate: expense.date,
    createdAt: Date.now(),
  }
}

export function getDueTemplates(templates, today) {
  return templates.filter(t => isDue(t, today))
}

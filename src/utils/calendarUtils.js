import { formatCurrency } from './formatters'

function formatDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Returns all calendar day objects for a month grid (5 or 6 weeks).
 * Week starts on Monday. month is 1-indexed (1=January).
 * @param {number} year
 * @param {number} month  1–12
 * @returns {Array<{date, dayNumber, isCurrentMonth, isToday}>}
 */
export function getCalendarDays(year, month) {
  const firstDay = new Date(year, month - 1, 1)
  const lastDay = new Date(year, month, 0)
  const today = formatDateKey(new Date())

  // Convert JS getDay() (0=Sun) to Mon-first index (0=Mon, 6=Sun)
  const startPadding = (firstDay.getDay() + 6) % 7

  const days = []

  // Padding days from previous month
  for (let i = startPadding - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, -i)
    const date = formatDateKey(d)
    days.push({ date, dayNumber: d.getDate(), isCurrentMonth: false, isToday: date === today })
  }

  // Days of current month
  for (let n = 1; n <= lastDay.getDate(); n++) {
    const d = new Date(year, month - 1, n)
    const date = formatDateKey(d)
    days.push({ date, dayNumber: n, isCurrentMonth: true, isToday: date === today })
  }

  // Padding days to complete the last week
  const remaining = 7 - (days.length % 7)
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month, i)
      const date = formatDateKey(d)
      days.push({ date, dayNumber: d.getDate(), isCurrentMonth: false, isToday: date === today })
    }
  }

  return days
}

/**
 * Returns expenses that fall on a given date string (YYYY-MM-DD).
 * @param {Array} expenses
 * @param {string} dateString
 * @returns {Array}
 */
export function getExpensesForDate(expenses, dateString) {
  return expenses.filter(e => e.date === dateString)
}

/**
 * Builds tooltip text for a list of expenses.
 * Returns empty string when no expenses.
 * @param {Array} expenses
 * @returns {string}
 */
export function buildTooltipText(expenses) {
  if (expenses.length === 0) return ''
  return expenses.map(e => `${e.title}: ${formatCurrency(e.amount)}`).join('\n')
}

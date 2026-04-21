/**
 * Formats a number as South African Rand
 * @param {number} amount
 * @returns {string} e.g. "R 250"
 */
export function formatCurrency(amount) {
  return `R ${Number(amount).toLocaleString('en-ZA')}`
}

/**
 * Formats an ISO date string to readable format
 * @param {string} dateString e.g. "2026-04-20"
 * @returns {string} e.g. "20 Apr 2026"
 */
export function formatDate(dateString) {
  const date = new Date(dateString + 'T00:00:00')
  return date.toLocaleDateString('en-ZA', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
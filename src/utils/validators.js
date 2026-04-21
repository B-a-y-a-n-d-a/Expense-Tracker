/**
 * Validates an expense title
 * @param {string} title
 * @returns {string|null} error message or null if valid
 */
export function validateTitle(title) {
  if (!title || title.trim() === '') {
    return 'Title is required'
  }
  if (title.length > 100) {
    return 'Title must be 100 characters or less'
  }
  return null
}

/**
 * Validates an expense amount
 * @param {number|string} amount
 * @returns {string|null} error message or null if valid
 */
export function validateAmount(amount) {
  if (amount === '' || amount === null || amount === undefined) {
    return 'Amount is required'
  }
  if (isNaN(amount)) {
    return 'Amount must be a valid number'
  }
  if (Number(amount) <= 0) {
    return 'Amount must be greater than zero'
  }
  return null
}

/**
 * Validates an expense date
 * @param {string} date
 * @returns {string|null} error message or null if valid
 */
export function validateDate(date) {
  if (!date || date.trim() === '') {
    return 'Date is required'
  }
  const parsed = new Date(date)
  if (isNaN(parsed.getTime())) {
    return 'Please enter a valid date'
  }
  return null
}

/**
 * Validates all expense fields
 * @param {object} expense
 * @returns {object} errors object — empty if all valid
 */
export function validateExpense(expense) {
  const errors = {}
  const titleError = validateTitle(expense.title)
  const amountError = validateAmount(expense.amount)
  const dateError = validateDate(expense.date)
  if (titleError) errors.title = titleError
  if (amountError) errors.amount = amountError
  if (dateError) errors.date = dateError
  return errors
}
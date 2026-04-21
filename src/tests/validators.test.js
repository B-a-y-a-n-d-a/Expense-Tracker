import { describe, it, expect } from 'vitest'
import {
  validateTitle,
  validateAmount,
  validateDate,
  validateExpense,
} from '../utils/validators'

describe('validateTitle', () => {
  it('returns error when title is empty', () => {
    expect(validateTitle('')).toBe('Title is required')
  })

  it('returns error when title is only spaces', () => {
    expect(validateTitle('   ')).toBe('Title is required')
  })

  it('returns error when title exceeds 100 characters', () => {
    expect(validateTitle('a'.repeat(101))).toBe(
      'Title must be 100 characters or less'
    )
  })

  it('returns null when title is valid', () => {
    expect(validateTitle('Groceries')).toBeNull()
  })
})

describe('validateAmount', () => {
  it('returns error when amount is empty', () => {
    expect(validateAmount('')).toBe('Amount is required')
  })

  it('returns error when amount is zero', () => {
    expect(validateAmount(0)).toBe('Amount must be greater than zero')
  })

  it('returns error when amount is negative', () => {
    expect(validateAmount(-50)).toBe('Amount must be greater than zero')
  })

  it('returns error when amount is not a number', () => {
    expect(validateAmount('abc')).toBe('Amount must be a valid number')
  })

  it('returns null when amount is valid', () => {
    expect(validateAmount(250)).toBeNull()
  })
})

describe('validateDate', () => {
  it('returns error when date is empty', () => {
    expect(validateDate('')).toBe('Date is required')
  })

  it('returns error when date is invalid', () => {
    expect(validateDate('not-a-date')).toBe('Please enter a valid date')
  })

  it('returns null when date is valid', () => {
    expect(validateDate('2026-04-20')).toBeNull()
  })
})

describe('validateExpense', () => {
  it('returns errors for all invalid fields', () => {
    const errors = validateExpense({ title: '', amount: 0, date: '' })
    expect(errors.title).toBe('Title is required')
    expect(errors.amount).toBe('Amount must be greater than zero')
    expect(errors.date).toBe('Date is required')
  })

  it('returns empty object when all fields are valid', () => {
    const errors = validateExpense({
      title: 'Groceries',
      amount: 250,
      date: '2026-04-20',
    })
    expect(Object.keys(errors)).toHaveLength(0)
  })
})
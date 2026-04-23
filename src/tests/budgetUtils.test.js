import { describe, it, expect } from 'vitest'
import {
  getCurrentMonthExpenses,
  calculateProgress,
  calculateAllProgress,
} from '../utils/budgetUtils'

const THIS_MONTH = '2026-04-15'
const LAST_MONTH = '2026-03-15'
const NEXT_MONTH = '2026-05-15'

const makeExpense = (date, category = 'Food', amount = 100) => ({
  id: Math.random().toString(),
  title: 'Test',
  amount,
  category,
  date,
})

describe('getCurrentMonthExpenses', () => {
  it('returns only expenses from current month', () => {
    const expenses = [makeExpense(THIS_MONTH), makeExpense(LAST_MONTH)]
    const result = getCurrentMonthExpenses(expenses)
    expect(result).toHaveLength(1)
    expect(result[0].date).toBe(THIS_MONTH)
  })

  it('returns empty array when no current month expenses', () => {
    const expenses = [makeExpense(LAST_MONTH), makeExpense(NEXT_MONTH)]
    expect(getCurrentMonthExpenses(expenses)).toHaveLength(0)
  })

  it('excludes expenses from previous months', () => {
    const expenses = [makeExpense(LAST_MONTH)]
    expect(getCurrentMonthExpenses(expenses)).toHaveLength(0)
  })

  it('excludes expenses from future months', () => {
    const expenses = [makeExpense(NEXT_MONTH)]
    expect(getCurrentMonthExpenses(expenses)).toHaveLength(0)
  })
})

describe('calculateProgress', () => {
  it('returns null when budget is 0', () => {
    expect(calculateProgress(500, 0)).toBeNull()
  })

  it('returns null when budget is null', () => {
    expect(calculateProgress(500, null)).toBeNull()
  })

  it('returns correct percentage value', () => {
    const result = calculateProgress(800, 1000)
    expect(result.percentage).toBe(80)
  })

  it('returns status "good" when under 80%', () => {
    const result = calculateProgress(500, 1000)
    expect(result.status).toBe('good')
  })

  it('returns status "warning" when between 80-99%', () => {
    const result = calculateProgress(900, 1000)
    expect(result.status).toBe('warning')
  })

  it('returns status "exceeded" when 100% or over', () => {
    const result = calculateProgress(1000, 1000)
    expect(result.status).toBe('exceeded')
  })

  it('returns status "exceeded" when over 100%', () => {
    const result = calculateProgress(1200, 1000)
    expect(result.status).toBe('exceeded')
  })
})

describe('calculateAllProgress', () => {
  const expenses = [
    makeExpense(THIS_MONTH, 'Food', 500),
    makeExpense(THIS_MONTH, 'Food', 300),
    makeExpense(THIS_MONTH, 'Transport', 200),
    makeExpense(LAST_MONTH, 'Food', 999),
  ]

  const budget = {
    overall: 2000,
    Food: 1000,
    Transport: 0,
  }

  it('returns overall progress when overall budget is set', () => {
    const result = calculateAllProgress(expenses, budget)
    expect(result.overall).not.toBeNull()
    expect(result.overall.percentage).toBe(50)
  })

  it('returns per category progress for each category with a budget', () => {
    const result = calculateAllProgress(expenses, budget)
    expect(result.Food).not.toBeNull()
    expect(result.Food.percentage).toBe(80)
  })

  it('skips categories with no budget set', () => {
    const result = calculateAllProgress(expenses, budget)
    expect(result.Transport).toBeNull()
  })

  it('correctly sums expenses per category', () => {
    const result = calculateAllProgress(expenses, budget)
    expect(result.Food.spent).toBe(800)
  })
})

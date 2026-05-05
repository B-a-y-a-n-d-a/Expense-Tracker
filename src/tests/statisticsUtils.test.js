import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getAverageDailySpend,
  getHighestExpense,
  getMostUsedCategory,
  getMostExpensiveCategory,
  getBusiestDay,
  getCurrentMonthStats,
} from '../utils/statisticsUtils'

// Fake date: 2026-05-05 (Tuesday, day 5 of month — days elapsed = 5)
// 2026-05-04 = Monday, 2026-05-05 = Tuesday

describe('getAverageDailySpend', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-05T12:00:00'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns 0 when no expenses', () => {
    expect(getAverageDailySpend([])).toBe(0)
  })

  it('returns correct average based on days elapsed', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 60, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Uber', amount: 40, category: 'Transport', date: '2026-05-02' },
    ]
    // total = 100, days elapsed = 5, average = 20
    expect(getAverageDailySpend(expenses)).toBe(20)
  })

  it('rounds to nearest whole number', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 103, category: 'Food', date: '2026-05-01' },
    ]
    // total = 103, days elapsed = 5, 103/5 = 20.6 → rounds to 21
    expect(getAverageDailySpend(expenses)).toBe(21)
  })
})

describe('getHighestExpense', () => {
  it('returns null when no expenses', () => {
    expect(getHighestExpense([])).toBeNull()
  })

  it('returns expense with highest amount', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
    ]
    expect(getHighestExpense(expenses)).toEqual({ title: 'Coffee', amount: 30 })
  })

  it('returns correct expense when multiple exist', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Laptop', amount: 500, category: 'Bills', date: '2026-05-02' },
      { id: '3', title: 'Uber', amount: 85, category: 'Transport', date: '2026-05-03' },
    ]
    expect(getHighestExpense(expenses)).toEqual({ title: 'Laptop', amount: 500 })
  })
})

describe('getMostUsedCategory', () => {
  it('returns null when no expenses', () => {
    expect(getMostUsedCategory([])).toBeNull()
  })

  it('returns category with most entries', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Lunch', amount: 50, category: 'Food', date: '2026-05-02' },
      { id: '3', title: 'Uber', amount: 85, category: 'Transport', date: '2026-05-03' },
    ]
    expect(getMostUsedCategory(expenses)).toBe('Food')
  })

  it('returns first alphabetically when tied', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Lunch', amount: 50, category: 'Food', date: '2026-05-02' },
      { id: '3', title: 'Internet', amount: 100, category: 'Bills', date: '2026-05-03' },
      { id: '4', title: 'Phone', amount: 200, category: 'Bills', date: '2026-05-04' },
    ]
    // Food: 2 entries, Bills: 2 entries — tie → 'Bills' comes first alphabetically
    expect(getMostUsedCategory(expenses)).toBe('Bills')
  })
})

describe('getMostExpensiveCategory', () => {
  it('returns null when no expenses', () => {
    expect(getMostExpensiveCategory([])).toBeNull()
  })

  it('returns category with highest total amount', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Laptop', amount: 500, category: 'Bills', date: '2026-05-02' },
    ]
    expect(getMostExpensiveCategory(expenses)).toBe('Bills')
  })

  it('handles multiple categories correctly', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Lunch', amount: 80, category: 'Food', date: '2026-05-02' },
      // Food total: 110
      { id: '3', title: 'Uber', amount: 50, category: 'Transport', date: '2026-05-03' },
      { id: '4', title: 'Movie', amount: 40, category: 'Entertainment', date: '2026-05-04' },
      // Transport: 50, Entertainment: 40
    ]
    expect(getMostExpensiveCategory(expenses)).toBe('Food')
  })
})

describe('getBusiestDay', () => {
  it('returns null when no expenses', () => {
    expect(getBusiestDay([])).toBeNull()
  })

  it('returns correct day name for expenses', () => {
    const expenses = [
      // 2026-05-04 is a Monday
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-04' },
    ]
    expect(getBusiestDay(expenses)).toBe('Monday')
  })

  it('returns day with most expenses', () => {
    const expenses = [
      // Monday: 2 expenses
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-04' },
      { id: '2', title: 'Lunch', amount: 50, category: 'Food', date: '2026-05-04' },
      // Tuesday: 1 expense
      { id: '3', title: 'Uber', amount: 85, category: 'Transport', date: '2026-05-05' },
    ]
    expect(getBusiestDay(expenses)).toBe('Monday')
  })
})

describe('getCurrentMonthStats', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-05T12:00:00'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('filters to current month before calculating', () => {
    const expenses = [
      { id: '1', title: 'April Coffee', amount: 30, category: 'Food', date: '2026-04-20' },
      { id: '2', title: 'May Coffee', amount: 50, category: 'Food', date: '2026-05-01' },
    ]
    const stats = getCurrentMonthStats(expenses)
    expect(stats.totalExpenseCount).toBe(1)
  })

  it('returns all 6 statistics in one object', () => {
    const expenses = [
      { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
      { id: '2', title: 'Uber', amount: 50, category: 'Transport', date: '2026-05-04' },
    ]
    const stats = getCurrentMonthStats(expenses)
    expect(stats).toHaveProperty('averageDailySpend')
    expect(stats).toHaveProperty('highestExpense')
    expect(stats).toHaveProperty('mostUsedCategory')
    expect(stats).toHaveProperty('mostExpensiveCategory')
    expect(stats).toHaveProperty('totalExpenseCount')
    expect(stats).toHaveProperty('busiestDay')
  })

  it('returns empty/null values when no current month expenses', () => {
    const expenses = [
      { id: '1', title: 'April Coffee', amount: 30, category: 'Food', date: '2026-04-20' },
    ]
    const stats = getCurrentMonthStats(expenses)
    expect(stats.averageDailySpend).toBe(0)
    expect(stats.highestExpense).toBeNull()
    expect(stats.mostUsedCategory).toBeNull()
    expect(stats.mostExpensiveCategory).toBeNull()
    expect(stats.totalExpenseCount).toBe(0)
    expect(stats.busiestDay).toBeNull()
  })
})

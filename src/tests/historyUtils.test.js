import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getAvailableMonths,
  formatMonthLabel,
  getMonthSummary,
  getDifference,
} from '../utils/historyUtils'

const EXPENSES = [
  { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-01' },
  { id: '2', title: 'Uber', amount: 50, category: 'Transport', date: '2026-04-15' },
  { id: '3', title: 'Movie', amount: 80, category: 'Entertainment', date: '2026-04-20' },
  // April total: 130 (50 + 80), count: 2
  { id: '4', title: 'Groceries', amount: 100, category: 'Food', date: '2026-03-10' },
]

describe('getAvailableMonths', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-06T12:00:00'))
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns current month even when no expenses', () => {
    const months = getAvailableMonths([])
    expect(months).toContain('2026-05')
  })

  it('returns all months that have expenses', () => {
    const months = getAvailableMonths(EXPENSES)
    expect(months).toContain('2026-05')
    expect(months).toContain('2026-04')
    expect(months).toContain('2026-03')
  })

  it('returns months sorted newest first', () => {
    const months = getAvailableMonths(EXPENSES)
    expect(months[0]).toBe('2026-05')
    expect(months[1]).toBe('2026-04')
    expect(months[2]).toBe('2026-03')
  })

  it('deduplicates months correctly', () => {
    // EXPENSES has two April entries — should only appear once
    const months = getAvailableMonths(EXPENSES)
    expect(months.filter(m => m === '2026-04')).toHaveLength(1)
  })
})

describe('formatMonthLabel', () => {
  it('returns "January 2026" for "2026-01"', () => {
    expect(formatMonthLabel('2026-01')).toBe('January 2026')
  })

  it('returns "December 2025" for "2025-12"', () => {
    expect(formatMonthLabel('2025-12')).toBe('December 2025')
  })

  it('returns correct label for current month', () => {
    expect(formatMonthLabel('2026-05')).toBe('May 2026')
  })
})

describe('getMonthSummary', () => {
  it('returns zero total when no expenses for month', () => {
    const summary = getMonthSummary(EXPENSES, '2026-01')
    expect(summary.total).toBe(0)
    expect(summary.count).toBe(0)
  })

  it('returns correct total for month expenses', () => {
    const summary = getMonthSummary(EXPENSES, '2026-04')
    expect(summary.total).toBe(130)
  })

  it('returns correct count for month expenses', () => {
    const summary = getMonthSummary(EXPENSES, '2026-04')
    expect(summary.count).toBe(2)
  })

  it('returns correct per category totals', () => {
    const summary = getMonthSummary(EXPENSES, '2026-04')
    expect(summary.byCategory.Transport).toBe(50)
    expect(summary.byCategory.Entertainment).toBe(80)
  })

  it('excludes expenses from other months', () => {
    // April should not include the May or March expense
    const summary = getMonthSummary(EXPENSES, '2026-04')
    expect(summary.total).toBe(130)
    expect(summary.count).toBe(2)
  })
})

describe('getDifference', () => {
  it('returns trend "up" when B > A', () => {
    expect(getDifference(100, 150).trend).toBe('up')
  })

  it('returns trend "down" when B < A', () => {
    expect(getDifference(150, 100).trend).toBe('down')
  })

  it('returns trend "neutral" when B === A', () => {
    expect(getDifference(100, 100).trend).toBe('neutral')
  })

  it('returns correct percentage difference', () => {
    // ((150 - 100) / 100) * 100 = 50
    expect(getDifference(100, 150).percentageDiff).toBe(50)
  })

  it('returns 0% when valueA is 0', () => {
    expect(getDifference(0, 100).percentageDiff).toBe(0)
  })
})

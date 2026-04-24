import { describe, it, expect } from 'vitest'
import {
  getCalendarDays,
  getExpensesForDate,
  buildTooltipText,
} from '../utils/calendarUtils'

describe('getCalendarDays', () => {
  it('returns 35 days for April 2026 (5 weeks)', () => {
    expect(getCalendarDays(2026, 4)).toHaveLength(35)
  })

  it('returns 42 days for March 2026 (6 weeks)', () => {
    expect(getCalendarDays(2026, 3)).toHaveLength(42)
  })

  it('first day of April 2026 falls at index 2 (Wednesday)', () => {
    const days = getCalendarDays(2026, 4)
    expect(days[2].date).toBe('2026-04-01')
    expect(days[2].dayNumber).toBe(1)
    expect(days[2].isCurrentMonth).toBe(true)
  })

  it('first day of March 2026 falls at index 6 (Sunday)', () => {
    const days = getCalendarDays(2026, 3)
    expect(days[6].date).toBe('2026-03-01')
    expect(days[6].dayNumber).toBe(1)
    expect(days[6].isCurrentMonth).toBe(true)
  })

  it('includes padding days from previous month', () => {
    const days = getCalendarDays(2026, 4)
    expect(days[0].date).toBe('2026-03-30')
    expect(days[0].isCurrentMonth).toBe(false)
    expect(days[1].date).toBe('2026-03-31')
    expect(days[1].isCurrentMonth).toBe(false)
  })

  it('includes padding days from next month', () => {
    const days = getCalendarDays(2026, 4)
    expect(days[32].date).toBe('2026-05-01')
    expect(days[32].isCurrentMonth).toBe(false)
    expect(days[34].date).toBe('2026-05-03')
    expect(days[34].isCurrentMonth).toBe(false)
  })

  it('all current month days have isCurrentMonth true', () => {
    const days = getCalendarDays(2026, 4)
    const currentMonth = days.filter(d => d.isCurrentMonth)
    expect(currentMonth).toHaveLength(30)
  })

  it('padding days have isCurrentMonth false', () => {
    const days = getCalendarDays(2026, 4)
    const padding = days.filter(d => !d.isCurrentMonth)
    expect(padding).toHaveLength(5)
    expect(padding.every(d => !d.isCurrentMonth)).toBe(true)
  })
})

describe('getExpensesForDate', () => {
  const expenses = [
    { id: '1', title: 'Coffee', amount: 30,
      category: 'Food', date: '2026-04-15' },
    { id: '2', title: 'Uber', amount: 85,
      category: 'Transport', date: '2026-04-15' },
    { id: '3', title: 'Netflix', amount: 200,
      category: 'Entertainment', date: '2026-04-20' },
  ]

  it('returns expenses matching the date string', () => {
    const result = getExpensesForDate(expenses, '2026-04-20')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Netflix')
  })

  it('returns empty array when no expenses on date', () => {
    expect(getExpensesForDate(expenses, '2026-04-01')).toEqual([])
  })

  it('returns multiple expenses when date has many', () => {
    const result = getExpensesForDate(expenses, '2026-04-15')
    expect(result).toHaveLength(2)
  })
})

describe('buildTooltipText', () => {
  it('returns empty string when no expenses', () => {
    expect(buildTooltipText([])).toBe('')
  })

  it('returns formatted string with title and amount', () => {
    const result = buildTooltipText([{ title: 'Coffee', amount: 30 }])
    expect(result).toContain('Coffee')
    expect(result).toContain('30')
  })

  it('handles multiple expenses with line separator', () => {
    const result = buildTooltipText([
      { title: 'Coffee', amount: 30 },
      { title: 'Uber', amount: 85 },
    ])
    expect(result).toContain('Coffee')
    expect(result).toContain('Uber')
    expect(result.split('\n').length).toBeGreaterThan(1)
  })
})

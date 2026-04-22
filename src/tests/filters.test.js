import { describe, it, expect } from 'vitest'
import {
  filterByDateRange,
  filterByKeyword,
  sortExpenses,
  applyAllFilters,
} from '../utils/filters'

const now = new Date()
const thisYear = now.getFullYear()
const thisMonth = now.getMonth()

const thisMonthDate = new Date(thisYear, thisMonth, 10)
  .toISOString()
  .split('T')[0]

const lastMonthDate = new Date(thisYear, thisMonth - 1, 10)
  .toISOString()
  .split('T')[0]

const lastYearDate = new Date(thisYear - 1, thisMonth, 10)
  .toISOString()
  .split('T')[0]

const expenses = [
  { id: '1', title: 'Grocery shopping', category: 'Food', amount: 150, date: thisMonthDate },
  { id: '2', title: 'Bus ticket', category: 'Transport', amount: 20, date: lastMonthDate },
  { id: '3', title: 'Netflix', category: 'Entertainment', amount: 80, date: lastYearDate },
  { id: '4', title: 'Electricity bill', category: 'Bills', amount: 300, date: thisMonthDate },
]

describe('filterByDateRange', () => {
  it('returns all expenses when dateRange is "all"', () => {
    expect(filterByDateRange(expenses, 'all')).toHaveLength(4)
  })

  it('returns only current month expenses for "thisMonth"', () => {
    const result = filterByDateRange(expenses, 'thisMonth')
    expect(result).toHaveLength(2)
    expect(result.map(e => e.id)).toEqual(expect.arrayContaining(['1', '4']))
  })

  it('returns only last month expenses for "lastMonth"', () => {
    const result = filterByDateRange(expenses, 'lastMonth')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns only current year expenses for "thisYear"', () => {
    const result = filterByDateRange(expenses, 'thisYear')
    expect(result.every(e => e.date.startsWith(String(thisYear)))).toBe(true)
    expect(result).not.toContainEqual(expect.objectContaining({ id: '3' }))
  })

  it('returns empty array when no expenses match', () => {
    const futureDate = new Date(thisYear + 1, thisMonth, 10)
      .toISOString()
      .split('T')[0]
    const futureExpenses = [{ id: '5', title: 'Future', category: 'Other', amount: 10, date: futureDate }]
    expect(filterByDateRange(futureExpenses, 'thisMonth')).toHaveLength(0)
  })
})

describe('filterByKeyword', () => {
  it('returns all expenses when keyword is empty', () => {
    expect(filterByKeyword(expenses, '')).toHaveLength(4)
  })

  it('matches expenses by title (case insensitive)', () => {
    const result = filterByKeyword(expenses, 'GROCERY')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('matches expenses by category (case insensitive)', () => {
    const result = filterByKeyword(expenses, 'transport')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  it('returns empty array when no matches found', () => {
    expect(filterByKeyword(expenses, 'zzznomatch')).toHaveLength(0)
  })

  it('matches partial keywords', () => {
    const result = filterByKeyword(expenses, 'groc')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })
})

describe('sortExpenses', () => {
  it('sorts by amount descending for "amountDesc"', () => {
    const result = sortExpenses(expenses, 'amountDesc')
    expect(result[0].amount).toBe(300)
    expect(result[result.length - 1].amount).toBe(20)
  })

  it('sorts by amount ascending for "amountAsc"', () => {
    const result = sortExpenses(expenses, 'amountAsc')
    expect(result[0].amount).toBe(20)
    expect(result[result.length - 1].amount).toBe(300)
  })

  it('sorts by date descending for "dateDesc"', () => {
    const result = sortExpenses(expenses, 'dateDesc')
    expect(result[0].date >= result[1].date).toBe(true)
  })

  it('sorts by date ascending for "dateAsc"', () => {
    const result = sortExpenses(expenses, 'dateAsc')
    expect(result[0].date <= result[result.length - 1].date).toBe(true)
  })

  it('sorts by title A to Z for "titleAsc"', () => {
    const result = sortExpenses(expenses, 'titleAsc')
    expect(result[0].title.localeCompare(result[1].title)).toBeLessThanOrEqual(0)
  })

  it('returns expenses unchanged for unknown sortBy value', () => {
    const result = sortExpenses(expenses, 'unknown')
    expect(result).toEqual(expenses)
  })
})

describe('applyAllFilters', () => {
  it('applies category, dateRange, keyword and sort together', () => {
    const filterState = {
      activeCategory: 'Food',
      dateRange: 'thisMonth',
      searchKeyword: 'groc',
      sortBy: 'amountDesc',
    }
    const result = applyAllFilters(expenses, filterState)
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  it('returns correctly filtered and sorted results', () => {
    const filterState = {
      activeCategory: 'All',
      dateRange: 'thisMonth',
      searchKeyword: '',
      sortBy: 'amountAsc',
    }
    const result = applyAllFilters(expenses, filterState)
    expect(result).toHaveLength(2)
    expect(result[0].amount).toBeLessThanOrEqual(result[1].amount)
  })
})

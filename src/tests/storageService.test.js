import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
  getExpenses,
  saveExpenses,
  addExpense,
  deleteExpense,
  generateId,
  updateExpense,
  getBudget,
  saveBudget,
  getTheme,
  saveTheme,
  getCalendarOpen,
  saveCalendarOpen,
} from '../services/storageService'

// Mock localStorage for testing
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    removeItem: vi.fn((key) => { delete store[key] }),
    clear: vi.fn(() => { store = {} }),
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

beforeEach(() => {
  localStorageMock.clear()
  vi.clearAllMocks()
})

describe('generateId', () => {
  it('returns a non-empty string', () => {
    expect(typeof generateId()).toBe('string')
    expect(generateId().length).toBeGreaterThan(0)
  })

  it('returns unique ids', () => {
    expect(generateId()).not.toBe(generateId())
  })
})

describe('getExpenses', () => {
  it('returns empty array when nothing stored', () => {
    expect(getExpenses()).toEqual([])
  })

  it('returns saved expenses', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20' }
    ]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(expenses))
    expect(getExpenses()).toEqual(expenses)
  })

  it('returns empty array when localStorage has corrupted data', () => {
    localStorageMock.getItem.mockReturnValueOnce('not-valid-json')
    expect(getExpenses()).toEqual([])
  })
})

describe('saveExpenses', () => {
  it('saves expenses to localStorage', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20' }
    ]
    saveExpenses(expenses)
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'expense-tracker-expenses',
      JSON.stringify(expenses)
    )
  })
})

describe('addExpense', () => {
  it('adds expense and returns updated list', () => {
    const expense = { id: '1', title: 'Groceries', amount: 250,
      category: 'Food', date: '2026-04-20' }
    const result = addExpense(expense)
    expect(result).toHaveLength(1)
    expect(result[0]).toEqual(expense)
  })
})

describe('deleteExpense', () => {
  it('removes expense by id and returns updated list', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20' },
      { id: '2', title: 'Uber', amount: 85,
        category: 'Transport', date: '2026-04-19' }
    ]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(expenses))
    const result = deleteExpense('1')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })
})

describe('updateExpense', () => {
  it('updates expense with matching id', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20', createdAt: 1000 },
      { id: '2', title: 'Uber', amount: 85,
        category: 'Transport', date: '2026-04-19', createdAt: 2000 }
    ]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(expenses))
    const updated = updateExpense({
      id: '1', title: 'Supermarket', amount: 300,
      category: 'Food', date: '2026-04-20', createdAt: 1000
    })
    expect(updated[0].title).toBe('Supermarket')
    expect(updated[0].amount).toBe(300)
  })

  it('does not change id or createdAt', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20', createdAt: 1000 }
    ]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(expenses))
    const updated = updateExpense({
      id: '1', title: 'Supermarket', amount: 300,
      category: 'Food', date: '2026-04-20', createdAt: 9999
    })
    expect(updated[0].id).toBe('1')
    expect(updated[0].createdAt).toBe(1000)
  })

  it('saves updated list to localStorage', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20', createdAt: 1000 }
    ]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(expenses))
    updateExpense({
      id: '1', title: 'Supermarket', amount: 300,
      category: 'Food', date: '2026-04-20', createdAt: 1000
    })
    expect(localStorageMock.setItem).toHaveBeenCalled()
  })

  it('returns updated expenses array', () => {
    const expenses = [
      { id: '1', title: 'Groceries', amount: 250,
        category: 'Food', date: '2026-04-20', createdAt: 1000 }
    ]
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(expenses))
    const result = updateExpense({
      id: '1', title: 'Supermarket', amount: 300,
      category: 'Food', date: '2026-04-20', createdAt: 1000
    })
    expect(Array.isArray(result)).toBe(true)
    expect(result).toHaveLength(1)
  })
})

describe('getBudget', () => {
  it('returns null when nothing stored', () => {
    expect(getBudget()).toBeNull()
  })

  it('returns saved budget', () => {
    const budget = { overall: 5000, Food: 1000, Transport: 500 }
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(budget))
    expect(getBudget()).toEqual(budget)
  })
})

describe('saveBudget', () => {
  it('persists budget to localStorage', () => {
    const budget = { overall: 5000, Food: 1000, Transport: 500 }
    saveBudget(budget)
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'expense-tracker-budget',
      JSON.stringify(budget)
    )
  })
})

describe('getTheme', () => {
  it('returns null when nothing stored', () => {
    expect(getTheme()).toBeNull()
  })

  it('returns saved theme value', () => {
    localStorageMock.getItem.mockReturnValueOnce('dark')
    expect(getTheme()).toBe('dark')
  })
})

describe('saveTheme', () => {
  it('persists theme to localStorage', () => {
    saveTheme('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'expense-tracker-theme',
      'dark'
    )
  })
})

describe('getCalendarOpen', () => {
  it('returns true when nothing stored (default open)', () => {
    expect(getCalendarOpen()).toBe(true)
  })

  it('returns saved value', () => {
    localStorageMock.getItem.mockReturnValueOnce('false')
    expect(getCalendarOpen()).toBe(false)
  })
})

describe('saveCalendarOpen', () => {
  it('persists value to localStorage', () => {
    saveCalendarOpen(false)
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'expense-tracker-calendar-open',
      'false'
    )
  })
})
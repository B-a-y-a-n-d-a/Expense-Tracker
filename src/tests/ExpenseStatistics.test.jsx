import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ExpenseStatistics from '../components/ExpenseStatistics'

const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, value) => { store[key] = value }),
    clear: vi.fn(() => { store = {} }),
  }
})()

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
})

// Fake date: 2026-05-05 (Tuesday, day 5 — daysElapsed = 5)
// 2026-05-04 = Monday, 2026-05-05 = Tuesday
const MAY_EXPENSES = [
  { id: '1', title: 'Coffee', amount: 30, category: 'Food', date: '2026-05-04' },
  { id: '2', title: 'Lunch', amount: 40, category: 'Food', date: '2026-05-04' },
  // Food: 2 entries (most used), Monday: 2 expenses (busiest)
  { id: '3', title: 'Laptop', amount: 500, category: 'Bills', date: '2026-05-05' },
  // Bills total: 500 (most expensive), total: 3 expenses
  // Grand total: 570, days=5, average=114 → "R 114"
]

describe('ExpenseStatistics', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-05T12:00:00'))
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders "Show Statistics" button when collapsed', () => {
    render(<ExpenseStatistics expenses={[]} />)
    expect(screen.getByText('Show Statistics')).toBeInTheDocument()
  })

  it('renders statistics section when expanded', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={[]} />)
    expect(screen.getByText('Monthly Statistics')).toBeInTheDocument()
  })

  it('shows "No data yet" when no current month expenses', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={[]} />)
    const noDataItems = screen.getAllByText('No data yet')
    expect(noDataItems.length).toBeGreaterThan(0)
  })

  it('shows average daily spend when expenses exist', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={MAY_EXPENSES} />)
    // 570 / 5 = 114 → formatCurrency(114) = "R 114"
    expect(screen.getByText('R 114')).toBeInTheDocument()
  })

  it('shows highest expense title and amount', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={MAY_EXPENSES} />)
    expect(screen.getByText('Laptop')).toBeInTheDocument()
    expect(screen.getByText('R 500')).toBeInTheDocument()
  })

  it('shows most used category', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={MAY_EXPENSES} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
  })

  it('shows most expensive category', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={MAY_EXPENSES} />)
    expect(screen.getByText('Bills')).toBeInTheDocument()
  })

  it('shows total expense count', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={MAY_EXPENSES} />)
    expect(screen.getByText('3 expenses')).toBeInTheDocument()
  })

  it('shows busiest day', () => {
    localStorageMock.getItem.mockReturnValueOnce('true')
    render(<ExpenseStatistics expenses={MAY_EXPENSES} />)
    expect(screen.getByText('Monday')).toBeInTheDocument()
  })
})

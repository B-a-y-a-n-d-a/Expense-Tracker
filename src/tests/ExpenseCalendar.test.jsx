import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ExpenseCalendar from '../components/ExpenseCalendar'

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

const EXPENSES = [
  { id: '1', title: 'Coffee', amount: 30,
    category: 'Food', date: '2026-04-15' },
  { id: '2', title: 'Uber', amount: 85,
    category: 'Transport', date: '2026-04-20' },
]

describe('ExpenseCalendar', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-04-15T12:00:00'))
    localStorageMock.clear()
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders Show Calendar button when collapsed', () => {
    localStorageMock.getItem.mockReturnValueOnce('false')
    render(<ExpenseCalendar expenses={[]} />)
    expect(screen.getByText('Show Calendar')).toBeInTheDocument()
  })

  it('renders calendar grid when expanded', () => {
    render(<ExpenseCalendar expenses={[]} />)
    expect(screen.getByText('Mon')).toBeInTheDocument()
  })

  it('renders 7 day headers (Mon-Sun)', () => {
    render(<ExpenseCalendar expenses={[]} />)
    ;['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].forEach(h => {
      expect(screen.getByText(h)).toBeInTheDocument()
    })
  })

  it('renders correct month name and year', () => {
    render(<ExpenseCalendar expenses={[]} />)
    expect(screen.getByText('April 2026')).toBeInTheDocument()
  })

  it('previous arrow navigates to previous month', () => {
    render(<ExpenseCalendar expenses={[]} />)
    fireEvent.click(screen.getByRole('button', { name: 'Previous month' }))
    expect(screen.getByText('March 2026')).toBeInTheDocument()
  })

  it('next arrow navigates to next month', () => {
    render(<ExpenseCalendar expenses={[]} />)
    fireEvent.click(screen.getByRole('button', { name: 'Next month' }))
    expect(screen.getByText('May 2026')).toBeInTheDocument()
  })

  it('days with expenses show dot element', () => {
    const { container } = render(<ExpenseCalendar expenses={EXPENSES} />)
    expect(container.querySelectorAll('.expense-dot').length).toBeGreaterThan(0)
  })

  it('days without expenses show no dot', () => {
    const { container } = render(<ExpenseCalendar expenses={[]} />)
    expect(container.querySelectorAll('.expense-dot')).toHaveLength(0)
  })
})

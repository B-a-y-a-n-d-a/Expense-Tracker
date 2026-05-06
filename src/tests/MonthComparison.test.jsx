import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import MonthComparison from '../components/MonthComparison'

// Fake date: 2026-05-06 — Month A default = 2026-05, Month B default = 2026-04
const EXPENSES = [
  { id: '1', title: 'Coffee', amount: 200, category: 'Food', date: '2026-05-01' },
  // May:   Food=200, total=200
  { id: '2', title: 'Movie', amount: 50, category: 'Entertainment', date: '2026-04-15' },
  // April: Entertainment=50, total=50
  { id: '3', title: 'Bills', amount: 777, category: 'Bills', date: '2026-03-10' },
  // March: Bills=777, total=777  ← unique sentinel for dropdown-change tests
]

// May Food=100, April Food=100 — all rows neutral
const EQUAL_EXPENSES = [
  { id: '1', title: 'Coffee', amount: 100, category: 'Food', date: '2026-05-01' },
  { id: '2', title: 'Lunch', amount: 100, category: 'Food', date: '2026-04-15' },
]

describe('MonthComparison', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-05-06T12:00:00'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders two month dropdowns', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    expect(screen.getAllByRole('combobox')).toHaveLength(2)
  })

  it('renders month A and month B column headers', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    // defaults: A = current month (May 2026), B = previous month (April 2026)
    expect(screen.getAllByText('May 2026').length).toBeGreaterThan(0)
    expect(screen.getAllByText('April 2026').length).toBeGreaterThan(0)
  })

  it('renders Total Spent row', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    expect(screen.getByText('Total Spent')).toBeInTheDocument()
  })

  it('renders Expense Count row', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    expect(screen.getByText('Expense Count')).toBeInTheDocument()
  })

  it('renders one row per category (5 rows)', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    expect(screen.getByText('Food')).toBeInTheDocument()
    expect(screen.getByText('Transport')).toBeInTheDocument()
    expect(screen.getByText('Entertainment')).toBeInTheDocument()
    expect(screen.getByText('Bills')).toBeInTheDocument()
    expect(screen.getByText('Other')).toBeInTheDocument()
  })

  it('shows green colour when spending decreased', () => {
    // A (May) total=200, B (April) total=50 → B < A → .diff-down (green)
    const { container } = render(<MonthComparison expenses={EXPENSES} />)
    expect(container.querySelector('.diff-down')).not.toBeNull()
  })

  it('shows red colour when spending increased', () => {
    // A (May) Entertainment=0, B (April) Entertainment=50 → B > A → .diff-up (red)
    const { container } = render(<MonthComparison expenses={EXPENSES} />)
    expect(container.querySelector('.diff-up')).not.toBeNull()
  })

  it('shows neutral when values are equal', () => {
    // May Food=100, April Food=100 → equal on all rows → .diff-neutral
    const { container } = render(<MonthComparison expenses={EQUAL_EXPENSES} />)
    expect(container.querySelector('.diff-neutral')).not.toBeNull()
  })

  it('updating month A dropdown changes column A', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    const [selectA] = screen.getAllByRole('combobox')
    fireEvent.change(selectA, { target: { value: '2026-03' } })
    // March Bills=777 → formatCurrency(777) = "R 777" appears somewhere in column A
    expect(screen.getAllByText('R 777').length).toBeGreaterThan(0)
  })

  it('updating month B dropdown changes column B', () => {
    render(<MonthComparison expenses={EXPENSES} />)
    const [, selectB] = screen.getAllByRole('combobox')
    fireEvent.change(selectB, { target: { value: '2026-03' } })
    // March Bills=777 → formatCurrency(777) = "R 777" appears somewhere in column B
    expect(screen.getAllByText('R 777').length).toBeGreaterThan(0)
  })
})

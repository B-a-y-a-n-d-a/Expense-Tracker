import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import FilterBar from '../components/FilterBar'
import { DEFAULT_FILTER_STATE } from '../utils/constants'

function renderFilterBar(overrides = {}, handlers = {}) {
  const props = {
    filterState: { ...DEFAULT_FILTER_STATE, ...overrides },
    onSearchChange: handlers.onSearchChange ?? vi.fn(),
    onDateRangeChange: handlers.onDateRangeChange ?? vi.fn(),
    onSortChange: handlers.onSortChange ?? vi.fn(),
    onClearAll: handlers.onClearAll ?? vi.fn(),
  }
  render(<FilterBar {...props} />)
  return props
}

describe('FilterBar', () => {
  it('renders search input', () => {
    renderFilterBar()
    expect(
      screen.getByPlaceholderText('Search by title or category...')
    ).toBeInTheDocument()
  })

  it('renders date range dropdown with all 4 options', () => {
    renderFilterBar()
    const select = screen.getByDisplayValue('All Time')
    expect(select).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'All Time' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'This Month' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Last Month' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'This Year' })).toBeInTheDocument()
  })

  it('renders sort dropdown with all 5 options', () => {
    renderFilterBar()
    expect(screen.getByDisplayValue('Amount: High to Low')).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Amount: High to Low' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Amount: Low to High' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Date: Newest First' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Date: Oldest First' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Title: A to Z' })).toBeInTheDocument()
  })

  it('renders Clear All Filters button', () => {
    renderFilterBar()
    expect(screen.getByRole('button', { name: 'Clear All Filters' })).toBeInTheDocument()
  })

  it('typing in search calls onSearchChange with value', () => {
    const onSearchChange = vi.fn()
    renderFilterBar({}, { onSearchChange })
    fireEvent.change(
      screen.getByPlaceholderText('Search by title or category...'),
      { target: { value: 'food' } }
    )
    expect(onSearchChange).toHaveBeenCalledWith('food')
  })

  it('changing date range calls onDateRangeChange', () => {
    const onDateRangeChange = vi.fn()
    renderFilterBar({}, { onDateRangeChange })
    fireEvent.change(screen.getByDisplayValue('All Time'), {
      target: { value: 'thisMonth' },
    })
    expect(onDateRangeChange).toHaveBeenCalledWith('thisMonth')
  })

  it('changing sort calls onSortChange', () => {
    const onSortChange = vi.fn()
    renderFilterBar({}, { onSortChange })
    fireEvent.change(screen.getByDisplayValue('Amount: High to Low'), {
      target: { value: 'dateDesc' },
    })
    expect(onSortChange).toHaveBeenCalledWith('dateDesc')
  })

  it('clicking Clear All Filters calls onClearAll', () => {
    const onClearAll = vi.fn()
    renderFilterBar({}, { onClearAll })
    fireEvent.click(screen.getByRole('button', { name: 'Clear All Filters' }))
    expect(onClearAll).toHaveBeenCalledTimes(1)
  })
})

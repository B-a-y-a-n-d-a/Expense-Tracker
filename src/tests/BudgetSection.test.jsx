import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import BudgetSection from '../components/BudgetSection'
import { CATEGORIES } from '../utils/constants'

const TODAY = new Date().toISOString().slice(0, 10)

const makeExpense = (amount, category = 'Food') => ({
  id: Math.random().toString(),
  title: 'Test',
  amount,
  category,
  date: TODAY,
})

function renderBudgetSection(budget = {}, expenses = [], handlers = {}) {
  const onSave = handlers.onSave ?? vi.fn()
  const { container } = render(
    <BudgetSection budget={budget} expenses={expenses} onSave={onSave} />
  )
  return { onSave, container }
}

describe('BudgetSection', () => {
  it('renders overall budget input', () => {
    renderBudgetSection()
    expect(screen.getByLabelText('Overall Budget (R)')).toBeInTheDocument()
  })

  it('renders one input per category', () => {
    renderBudgetSection()
    for (const category of CATEGORIES) {
      expect(screen.getByLabelText(`${category} (R)`)).toBeInTheDocument()
    }
  })

  it('renders Save Budget button', () => {
    renderBudgetSection()
    expect(screen.getByRole('button', { name: 'Save Budget' })).toBeInTheDocument()
  })

  it('shows progress bar when budget is set', () => {
    const budget = { Food: 1000 }
    const expenses = [makeExpense(400, 'Food')]
    const { container } = renderBudgetSection(budget, expenses)
    expect(container.querySelector('.progress-bar')).toBeTruthy()
  })

  it('progress bar is green when under 80%', () => {
    const budget = { Food: 1000 }
    const expenses = [makeExpense(500, 'Food')] // 50%
    const { container } = renderBudgetSection(budget, expenses)
    expect(container.querySelector('.progress-bar.good')).toBeTruthy()
  })

  it('progress bar is yellow when between 80-99%', () => {
    const budget = { Food: 1000 }
    const expenses = [makeExpense(900, 'Food')] // 90%
    const { container } = renderBudgetSection(budget, expenses)
    expect(container.querySelector('.progress-bar.warning')).toBeTruthy()
  })

  it('progress bar is red when exceeded', () => {
    const budget = { Food: 1000 }
    const expenses = [makeExpense(1100, 'Food')] // 110%
    const { container } = renderBudgetSection(budget, expenses)
    expect(container.querySelector('.progress-bar.exceeded')).toBeTruthy()
  })

  it('calls onSave with correct budget object on save', () => {
    const onSave = vi.fn()
    renderBudgetSection({}, [], { onSave })
    fireEvent.change(screen.getByLabelText('Overall Budget (R)'), {
      target: { value: '5000' },
    })
    fireEvent.change(screen.getByLabelText('Food (R)'), {
      target: { value: '1000' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Save Budget' }))
    expect(onSave).toHaveBeenCalledWith(
      expect.objectContaining({ overall: 5000, Food: 1000 })
    )
  })

  it('shows "Over budget!" when exceeded', () => {
    const budget = { Food: 1000 }
    const expenses = [makeExpense(1100, 'Food')] // 110%
    renderBudgetSection(budget, expenses)
    expect(screen.getByText('Over budget!')).toBeInTheDocument()
  })
})

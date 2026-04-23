import { useState } from 'react'
import { CATEGORIES } from '../utils/constants'
import { formatCurrency } from '../utils/formatters'
import { calculateAllProgress } from '../utils/budgetUtils'

export default function BudgetSection({ budget, expenses, onSave }) {
  const [form, setForm] = useState(() => ({
    overall: budget.overall ?? '',
    ...Object.fromEntries(CATEGORIES.map(cat => [cat, budget[cat] ?? ''])),
  }))

  const progress = calculateAllProgress(expenses, budget)

  function handleChange(key, value) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function handleSave() {
    const saved = { overall: Number(form.overall) || 0 }
    for (const cat of CATEGORIES) {
      saved[cat] = Number(form[cat]) || 0
    }
    onSave(saved)
  }

  return (
    <div className="budget-section">
      <h2>Monthly Budget</h2>

      <div className="budget-inputs">
        <div className="budget-input-group">
          <label htmlFor="budget-overall">Overall Budget (R)</label>
          <input
            id="budget-overall"
            type="number"
            min="0"
            value={form.overall}
            onChange={e => handleChange('overall', e.target.value)}
          />
        </div>
        {CATEGORIES.map(cat => (
          <div key={cat} className="budget-input-group">
            <label htmlFor={`budget-${cat}`}>{cat} (R)</label>
            <input
              id={`budget-${cat}`}
              type="number"
              min="0"
              value={form[cat]}
              onChange={e => handleChange(cat, e.target.value)}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSave}>Save Budget</button>

      <div className="budget-progress">
        {progress.overall && (
          <ProgressBar label="Overall" data={progress.overall} />
        )}
        {CATEGORIES.map(cat =>
          progress[cat]
            ? <ProgressBar key={cat} label={cat} data={progress[cat]} />
            : null
        )}
      </div>
    </div>
  )
}

function ProgressBar({ label, data }) {
  const { spent, budget, percentage, status } = data
  return (
    <div className="budget-progress-item">
      <div className="budget-progress-label">
        <span>{label}</span>
        <span>{formatCurrency(spent)} / {formatCurrency(budget)}</span>
      </div>
      <div className="progress-bar-container">
        <div
          className={`progress-bar ${status}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      {status === 'exceeded' && (
        <span className="over-budget-label">Over budget!</span>
      )}
    </div>
  )
}

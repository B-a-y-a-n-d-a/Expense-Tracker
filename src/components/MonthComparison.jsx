import { useState } from 'react'
import { CATEGORIES } from '../utils/constants'
import { getAvailableMonths, getMonthSummary, getDifference, formatMonthLabel } from '../utils/historyUtils'
import { formatCurrency } from '../utils/formatters'

function DiffIndicator({ valueA, valueB }) {
  const { trend, percentageDiff } = getDifference(valueA, valueB)
  if (trend === 'up') return <span className="comparison-diff diff-up">↑ {percentageDiff}%</span>
  if (trend === 'down') return <span className="comparison-diff diff-down">↓ {Math.abs(percentageDiff)}%</span>
  return <span className="comparison-diff diff-neutral">= 0%</span>
}

function ComparisonRow({ label, valueA, valueB, format }) {
  return (
    <div className="comparison-row">
      <span className="comparison-label">{label}</span>
      <span className="comparison-value">{format(valueA)}</span>
      <span className="comparison-value">{format(valueB)}</span>
      <DiffIndicator valueA={valueA} valueB={valueB} />
    </div>
  )
}

export default function MonthComparison({ expenses }) {
  const months = getAvailableMonths(expenses)
  const [monthA, setMonthA] = useState(() => months[0])
  const [monthB, setMonthB] = useState(() => months[1] ?? months[0])

  const summaryA = getMonthSummary(expenses, monthA)
  const summaryB = getMonthSummary(expenses, monthB)

  return (
    <div className="month-comparison">
      <div className="comparison-selectors">
        <select value={monthA} onChange={e => setMonthA(e.target.value)}>
          {months.map(m => (
            <option key={m} value={m}>{formatMonthLabel(m)}</option>
          ))}
        </select>
        <select value={monthB} onChange={e => setMonthB(e.target.value)}>
          {months.map(m => (
            <option key={m} value={m}>{formatMonthLabel(m)}</option>
          ))}
        </select>
      </div>

      <div className="comparison-table">
        <div className="comparison-row comparison-header">
          <span className="comparison-label"></span>
          <span className="comparison-value">{summaryA.monthLabel}</span>
          <span className="comparison-value">{summaryB.monthLabel}</span>
          <span className="comparison-diff"></span>
        </div>

        <ComparisonRow
          label="Total Spent"
          valueA={summaryA.total}
          valueB={summaryB.total}
          format={formatCurrency}
        />
        <ComparisonRow
          label="Expense Count"
          valueA={summaryA.count}
          valueB={summaryB.count}
          format={v => v}
        />
        {CATEGORIES.map(cat => (
          <ComparisonRow
            key={cat}
            label={cat}
            valueA={summaryA.byCategory[cat]}
            valueB={summaryB.byCategory[cat]}
            format={formatCurrency}
          />
        ))}
      </div>
    </div>
  )
}

import { useState } from 'react'
import { getCurrentMonthStats } from '../utils/statisticsUtils'
import { formatCurrency } from '../utils/formatters'
import { getStatsOpen, saveStatsOpen } from '../services/storageService'
import MonthComparison from './MonthComparison'

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <div className="stat-value">{value}</div>
    </div>
  )
}

export default function ExpenseStatistics({ expenses }) {
  const [isOpen, setIsOpen] = useState(() => getStatsOpen())
  const [activeTab, setActiveTab] = useState('statistics')

  function handleToggle() {
    const next = !isOpen
    setIsOpen(next)
    saveStatsOpen(next)
  }

  if (!isOpen) {
    return (
      <div className="statistics-section">
        <button onClick={handleToggle}>Show Statistics</button>
      </div>
    )
  }

  const {
    averageDailySpend,
    highestExpense,
    mostUsedCategory,
    mostExpensiveCategory,
    totalExpenseCount,
    busiestDay,
  } = getCurrentMonthStats(expenses)

  const noData = <span className="stat-empty">No data yet</span>

  return (
    <div className="statistics-section">
      <div className="statistics-header">
        <h2>Monthly Statistics</h2>
        <button className="statistics-toggle-btn" onClick={handleToggle}>
          Hide Statistics
        </button>
      </div>
      <div className="stats-tabs">
        <button
          className={`stats-tab-btn${activeTab === 'statistics' ? ' active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </button>
        <button
          className={`stats-tab-btn${activeTab === 'history' ? ' active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History
        </button>
      </div>
      {activeTab === 'statistics' && (
        <div className="statistics-grid">
          <StatCard
            label="Average Daily Spend"
            value={averageDailySpend === 0 ? noData : formatCurrency(averageDailySpend)}
          />
          <StatCard
            label="Highest Expense"
            value={highestExpense === null ? noData : (
              <>
                <span>{highestExpense.title}</span>
                <span>{formatCurrency(highestExpense.amount)}</span>
              </>
            )}
          />
          <StatCard
            label="Most Used Category"
            value={mostUsedCategory ?? noData}
          />
          <StatCard
            label="Most Expensive Category"
            value={mostExpensiveCategory ?? noData}
          />
          <StatCard
            label="Total Expenses"
            value={totalExpenseCount === 0 ? noData : `${totalExpenseCount} expenses`}
          />
          <StatCard
            label="Busiest Day"
            value={busiestDay ?? noData}
          />
        </div>
      )}
      {activeTab === 'history' && <MonthComparison expenses={expenses} />}
    </div>
  )
}

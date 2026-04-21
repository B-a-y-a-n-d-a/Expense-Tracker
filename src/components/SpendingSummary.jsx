import { CATEGORIES } from '../utils/constants'
import { formatCurrency } from '../utils/formatters'

export default function SpendingSummary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0)

  const byCategory = CATEGORIES.map(cat => ({
    category: cat,
    total: expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0),
  }))

  return (
    <div className="spending-summary">
      <h2>Spending Summary</h2>

      <div className="summary-total">
        <span>Total Spent</span>
        <span className="total-amount">{formatCurrency(total)}</span>
      </div>

      <div className="summary-breakdown">
        <h3>By Category</h3>
        {byCategory.map(({ category, total: catTotal }) => (
          <div key={category} className="summary-row">
            <span className="summary-category">{category}</span>
            <span className="summary-amount">{formatCurrency(catTotal)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
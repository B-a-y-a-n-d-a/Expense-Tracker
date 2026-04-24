export default function RecurringSection({ templates, onDelete }) {
  return (
    <div className="recurring-section">
      <h2>Recurring Expenses</h2>
      {templates.length === 0 ? (
        <p className="recurring-empty">No recurring expenses set up yet.</p>
      ) : (
        <ul className="recurring-list">
          {templates.map(t => (
            <li key={t.id} className="recurring-item">
              <div className="recurring-item-details">
                <span className="recurring-title">{t.title}</span>
                <span className="recurring-amount">R {t.amount.toFixed(2)}</span>
                <span className="recurring-category">{t.category}</span>
                <span className={`recurring-interval-badge ${t.interval}`}>{t.interval}</span>
              </div>
              <button
                className="delete-btn"
                onClick={() => onDelete(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

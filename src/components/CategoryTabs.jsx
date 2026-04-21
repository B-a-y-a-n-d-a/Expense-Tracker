import { CATEGORIES } from '../utils/constants'

export default function CategoryTabs({ activeFilter, onFilterChange }) {
  const tabs = ['All', ...CATEGORIES]

  return (
    <div className="category-tabs">
      {tabs.map(tab => (
        <button
          key={tab}
          className={`tab-btn ${activeFilter === tab ? 'active' : ''}`}
          onClick={() => onFilterChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
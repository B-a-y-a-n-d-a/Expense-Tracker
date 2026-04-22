export default function FilterBar({
  filterState,
  onSearchChange,
  onDateRangeChange,
  onSortChange,
  onClearAll,
}) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search by title or category..."
        value={filterState.searchKeyword}
        onChange={e => onSearchChange(e.target.value)}
      />

      <select
        className="filter-select"
        value={filterState.dateRange}
        onChange={e => onDateRangeChange(e.target.value)}
      >
        <option value="all">All Time</option>
        <option value="thisMonth">This Month</option>
        <option value="lastMonth">Last Month</option>
        <option value="thisYear">This Year</option>
      </select>

      <select
        className="filter-select"
        value={filterState.sortBy}
        onChange={e => onSortChange(e.target.value)}
      >
        <option value="amountDesc">Amount: High to Low</option>
        <option value="amountAsc">Amount: Low to High</option>
        <option value="dateDesc">Date: Newest First</option>
        <option value="dateAsc">Date: Oldest First</option>
        <option value="titleAsc">Title: A to Z</option>
      </select>

      <button className="clear-btn" onClick={onClearAll}>
        Clear All Filters
      </button>
    </div>
  )
}

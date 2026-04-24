import { useState } from 'react'
import { getCalendarDays, getExpensesForDate, buildTooltipText } from '../utils/calendarUtils'
import { getCalendarOpen, saveCalendarOpen } from '../services/storageService'

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]
const DAY_HEADERS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function ExpenseCalendar({ expenses }) {
  const [isOpen, setIsOpen] = useState(() => getCalendarOpen())
  const [viewYear, setViewYear] = useState(() => new Date().getFullYear())
  const [viewMonth, setViewMonth] = useState(() => new Date().getMonth() + 1)

  function handleToggle() {
    const next = !isOpen
    setIsOpen(next)
    saveCalendarOpen(next)
  }

  function handlePrev() {
    if (viewMonth === 1) {
      setViewMonth(12)
      setViewYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
  }

  function handleNext() {
    if (viewMonth === 12) {
      setViewMonth(1)
      setViewYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
  }

  if (!isOpen) {
    return (
      <div className="calendar-section">
        <button onClick={handleToggle}>Show Calendar</button>
      </div>
    )
  }

  const days = getCalendarDays(viewYear, viewMonth)

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <button
          className="calendar-nav-btn"
          onClick={handlePrev}
          aria-label="Previous month"
        >
          ‹
        </button>
        <span className="calendar-month-title">
          {MONTH_NAMES[viewMonth - 1]} {viewYear}
        </span>
        <button
          className="calendar-nav-btn"
          onClick={handleNext}
          aria-label="Next month"
        >
          ›
        </button>
        <button className="calendar-toggle-btn" onClick={handleToggle}>
          Hide Calendar
        </button>
      </div>

      <div className="calendar-grid">
        {DAY_HEADERS.map(h => (
          <div key={h} className="calendar-day-header">{h}</div>
        ))}
        {days.map(day => {
          const dayExpenses = getExpensesForDate(expenses, day.date)
          const tooltip = buildTooltipText(dayExpenses)
          const className = [
            'calendar-day',
            !day.isCurrentMonth && 'other-month',
            day.isToday && 'today',
          ].filter(Boolean).join(' ')

          return (
            <div
              key={day.date}
              className={className}
              {...(tooltip ? { 'data-tooltip': tooltip } : {})}
            >
              <span className="calendar-day-number">{day.dayNumber}</span>
              {dayExpenses.length > 0 && <span className="expense-dot" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

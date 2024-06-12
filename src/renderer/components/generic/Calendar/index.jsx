import './styles.css';

const Calendar = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const currentDay = today.getDate();

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="calendar__empty-day"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div key={day} className={day == currentDay ? 'calendar__day calendar__day--active' : 'calendar__day'}>
        {day}
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        {today.toLocaleString('default', { month: 'long' })} {currentYear}
      </div>
      <div className="calendar__days">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="calendar__day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="calendar__dates">{days}</div>
    </div>
  );
};

export default Calendar;

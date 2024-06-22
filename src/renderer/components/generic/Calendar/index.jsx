import styles from './styles.module.css';

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
    days.push(<div key={`empty-${i}`} className={styles.calendar__emptyDay} data-testid="empty-day"></div>);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div key={day} className={`${styles.calendar__day} ${day === currentDay ? styles.calendar__dayActive : ''}`}>
        {day}
      </div>
    );
  }

  return (
    <div className={styles.calendar}>
      <h2 className={styles.calendar__header}>
        {today.toLocaleString('default', { month: 'long' })} {currentYear}
      </h2>
      <div className={styles.calendar__days}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <small key={day} className={styles.calendar__dayName}>
            {day}
          </small>
        ))}
      </div>
      <div className={styles.calendar__dates}>{days}</div>
    </div>
  );
};

export default Calendar;

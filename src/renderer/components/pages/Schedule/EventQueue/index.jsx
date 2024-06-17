import { DaysOfWeek } from '@shared/constants';
import styles from './styles.module.css'

const EventQueue = ({ timetable }) => {
  const sortedTimetable = timetable
    .filter((slot) => DaysOfWeek[new Date().getDay()] === slot.schedule.day)
    .sort((a, b) => a.schedule.startTime - b.schedule.startTime);

  return (
    <div className={styles.eventQueue}>
      <h3>Events Today</h3>
      <div className={styles.eventQueue__list}>
        {sortedTimetable.map((slot, index) => {
          return <Event key={index} slot={slot} />;
        })}
      </div>
    </div>
  );
};

const Event = ({ slot }) => {
  return (
    <div className={styles.event}>
      <h4>{slot.title}</h4>
      <small className={styles.event__subtitle}>{slot.description}</small>
    </div>
  );
};

export default EventQueue;

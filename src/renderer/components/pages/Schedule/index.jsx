import { useState } from 'react';
import { useSelector } from 'react-redux';

import Calendar from '@components/generic/Calendar';
import EventQueue from '@components/pages/Schedule/EventQueue';
import Filter from '@components/pages/Schedule/Filter';
import Tools from '@components/pages/Schedule/Tools';
import ScheduleTimetable from '@components/pages/Schedule/ScheduleTimetable';
import styles from './styles.module.css';

const Schedule = () => {
  const filterState = (state) => {
    switch (filter) {
      case 'all':
        return state;
      case 'tasks':
        return state.filter((slot) => slot.type === 'task');
      case 'classes':
        return state.filter((slot) => slot.type === 'timetable');
      default:
        return state;
    }
  };

  const [filter, setFilter] = useState('all');
  const timetable = useSelector((state) => filterState(state.timetable));

  return (
    <div className={styles.schedule}>
      <div className={styles.schedule__main}>
        <Filter filter={filter} setFilter={setFilter} />
        <ScheduleTimetable timetable={timetable} />
      </div>
      <div className={styles.schedule__sidebar}>
        <Calendar />
        <EventQueue timetable={timetable} />
        <Tools />
      </div>
    </div>
  );
};


export default Schedule;

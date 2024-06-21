import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { DaysOfWeek } from '@shared/constants';
import { optimizeTimetable } from '@services/timetable';

import Calendar from '@components/generic/Calendar';
import EventQueue from '@components/pages/Schedule/EventQueue';
import Filter from '@components/pages/Schedule/Filter';
import Button from '@components/generic/Button';
import AddSlotModal from '@components/pages/Schedule/AddSlotModal';
import EditSlotModal from '@components/pages/Schedule/EditSlotModal';
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
        <ScheduleTools />
      </div>
    </div>
  );
};

const ScheduleTools = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.scheduleTools}>
        <Button onClick={() => setAddModalIsOpen(true)}>Add slot</Button>
        <Button onClick={() => optimizeTimetable()}>Optimize timetable</Button>
      </div>
      {addModalIsOpen && <AddSlotModal onClose={() => setAddModalIsOpen(false)} />}
    </>
  );
};

const TIME = Array.from({ length: 96 + 1 }, (_, i) => i * 15);
const PX_PER_MINUTE = (64 * 4) / 60;

const ScheduleTimetable = ({ timetable }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    scrollableRef.current.scrollTop = (currentTime.getHours() - 1.5) * 60 * PX_PER_MINUTE;
    handleRealTime();
    const interval = setInterval(handleRealTime, 60000 - new Date().getSeconds() * 1000);
    return () => clearInterval(interval);
  }, []);

  const currentTimeLineRef = useRef(null);
  const todayTimeLineRef = useRef(null);
  const scrollableRef = useRef(null);

  const handleRealTime = () => {
    setCurrentTime(new Date());
    const minutesSinceMidnight = currentTime.getHours() * 60 + currentTime.getMinutes();
    currentTimeLineRef.current.style.top = `${minutesSinceMidnight * PX_PER_MINUTE}px`;
    todayTimeLineRef.current.style.left = `calc(100% / 7 * ${currentTime.getDay()})`;
  };

  return (
    <div className={styles.scheduleTimetable}>
      <div className={styles.scheduleTimetable__header}>
        <div className={styles.scheduleTimetable__timeLabel}>GMT{new Date().getTimezoneOffset() / 60}</div>
        <div className={styles.scheduleTimetable__days}>
          {DaysOfWeek.map((day) => (
            <div key={day} className={styles.scheduleTimetable__day}>
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.scheduleTimetable__scrollable} ref={scrollableRef}>
        <div className={styles.scheduleTimetable__content}>
          <div className={styles.scheduleTimetable__hours}>
            {TIME.map((time) => (
              <div key={time} className={styles.scheduleTimetable__hour}>
                <time
                  className={styles.scheduleTimetable__time}
                >{`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}</time>
              </div>
            ))}
          </div>
          <div className={styles.scheduleTimetable__slots}>
            {DaysOfWeek.map((day, index) => (
              <div key={index} className={styles.scheduleTimetable__slotsDay}>
                {timetable
                  .filter((slot) => slot.schedule.day === day)
                  .reduce((acc, curr, index, arr) => {
                    return acc.concat(
                      <ScheduleTimetableSlot
                        key={index}
                        slot={curr}
                        height={PX_PER_MINUTE * (curr.schedule.endTime - curr.schedule.startTime)}
                        marginTop={
                          index === 0
                            ? PX_PER_MINUTE * curr.schedule.startTime
                            : PX_PER_MINUTE * (curr.schedule.startTime - arr[index - 1].schedule.endTime)
                        }
                      />
                    );
                  }, [])}
              </div>
            ))}
            <div className={styles.scheduleTimetable__now} ref={currentTimeLineRef}>
              <div className={styles.scheduleTimetable__nowTime}>
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className={styles.scheduleTimetable__nowLine} ref={todayTimeLineRef}>
                <div className={styles.scheduleTimetable__nowCircle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScheduleTimetableSlot = ({ slot, height, marginTop }) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  return (
    <>
      <div
        className={styles.scheduleTimetableSlot}
        style={{ height, marginTop }}
        onClick={() => setEditModalIsOpen(true)}
      >
        <h4 className={styles.scheduleTimetableSlot__title}>{slot.title}</h4>
        <div className={styles.scheduleTimetableSlot__time}>
          {`${Math.floor(slot.schedule.startTime / 60)}:${String(slot.schedule.startTime % 60).padStart(2, '0')}`} -
          {`${Math.floor(slot.schedule.endTime / 60)}:${String(slot.schedule.endTime % 60).padStart(2, '0')}`}
        </div>
      </div>
      {editModalIsOpen && <EditSlotModal slot={slot} onClose={() => setEditModalIsOpen(false)} />}
    </>
  );
};

export default Schedule;

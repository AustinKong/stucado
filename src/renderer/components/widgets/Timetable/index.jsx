import { useRef, useEffect, useState } from 'react';
import { UploadSimple, CalendarBlank, BookmarkSimple } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

import { DaysOfWeek } from '@shared/constants';
import Widget, { InteractionButton } from '@components/widgets/Widget';
import styles from './styles.module.css';
import UploadModal from '@components/widgets/Timetable/UploadModal';

// Minutes since midnight in increments of 15
const TIME = Array.from({ length: 96 + 1 }, (_, i) => i * 15);
// 48px per 15 minutes
const PX_PER_MINUTE = (48 * 4) / 60;

const Timetable = () => {
  const timetable = useSelector((state) => state.timetable);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);

  useEffect(() => {
    handleRealTime();
    const interval = setInterval(handleRealTime, 60000 - new Date().getSeconds() * 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollableRef = useRef(null);
  const currentTimeRef = useRef(null);

  const handleRealTime = () => {
    const minutesSinceMidnight = new Date().getHours() * 60 + new Date().getMinutes();
    // Subtract a default offset of 2 hours before
    scrollableRef.current.scrollLeft = minutesSinceMidnight * PX_PER_MINUTE - PX_PER_MINUTE * 120;
    currentTimeRef.current.style.left = `${minutesSinceMidnight * PX_PER_MINUTE}px`;
  };

  return (
    <>
      <Widget
        className={styles.timetable}
        title={`Schedule (${new Date().toLocaleDateString('en-US', { weekday: 'long' })})`}
        interaction={
          <InteractionButton icon={<UploadSimple />} text="Upload" onClick={() => setUploadModalIsOpen(true)} />
        }
      >
        <div className={styles.timetable__container}>
          <div className={styles.timetable__days}>
            {DaysOfWeek.map((day) => (
              <TimetableDay key={day} day={day} />
            ))}
          </div>
          <div className={styles.timetable__scrollable} ref={scrollableRef}>
            <div className={styles.timetable__hours}>
              {TIME.map((time) => (
                <TimetableHour key={time} time={`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`} />
              ))}
            </div>
            <div className={styles.timetable__slots}>
              {DaysOfWeek.map((day, index) => (
                <div
                  key={day}
                  className={
                    index === new Date().getDay()
                      ? `${styles.timetable__slotsDay} ${styles.timetable__slotsDayActive}`
                      : `${styles.timetable__slotsDay}`
                  }
                >
                  {timetable
                    .filter((slot) => slot.schedule.day === day)
                    .reduce((acc, curr, index, arr) => {
                      return acc.concat(
                        <TimetableSlot
                          key={index}
                          slot={curr}
                          width={PX_PER_MINUTE * (curr.schedule.endTime - curr.schedule.startTime)}
                          marginLeft={
                            index === 0
                              ? PX_PER_MINUTE * curr.schedule.startTime
                              : PX_PER_MINUTE * (curr.schedule.startTime - arr[index - 1].schedule.endTime)
                          }
                        />
                      );
                    }, [])}
                </div>
              ))}
            </div>
            <div className={styles.timetable__currentTime} ref={currentTimeRef} />
          </div>
        </div>
      </Widget>
      {uploadModalIsOpen && <UploadModal onClose={() => setUploadModalIsOpen(false)} />}
    </>
  );
};

const TimetableHour = ({ time }) => {
  return (
    <div className={styles.timetableHour}>
      <time className={styles.timetableHour__text}>{time}</time>
    </div>
  );
};

const TimetableDay = ({ day }) => {
  return (
    <div className={styles.timetableDay}>
      <span
        className={
          day === DaysOfWeek[new Date().getDay()]
            ? `${styles.timetableDay__text} ${styles.timetableDay__textActive}`
            : styles.timetableDay__text
        }
      >
        {day.slice(0, 3)}
      </span>
    </div>
  );
};

const TimetableSlot = ({ slot, width, marginLeft }) => {
  return (
    <div className={styles.timetableSlot} style={{ width, marginLeft }}>
      {slot.type === 'timetable' && <CalendarBlank className={styles.timetableSlot__icon} size="16px" />}
      {slot.type !== 'timetable' && <BookmarkSimple className={styles.timetableSlot__icon} size="16px" />}
      <span className={styles.timetableSlot__title}>{slot.title}</span>
    </div>
  );
};

export default Timetable;

import { useRef, useEffect } from 'react';
import { Upload, CalendarBlank } from '@phosphor-icons/react';

import { DaysOfWeek } from '@shared/constants';
import { Widget, InteractionButton } from '@components/widgets/Widget';
import '@styles/widgets/timetable.css';

// Minutes since midnight in increments of 15
const TIME = Array.from({ length: 96 + 1 }, (_, i) => i * 15);
// 48px per 15 minutes
const PX_PER_MINUTE = (48 * 4) / 60;

const DUMMY_SLOTS = [
  {
    title: 'Maths',
    description: 'Mathematics class @ Classroom A',
    schedule: {
      day: 'Monday',
      start: 60,
      end: 120,
    },
  },
  {
    title: 'Physics',
    description: 'Physics class @ Classroom C',
    schedule: {
      day: 'Monday',
      start: 360,
      end: 550,
    },
  },
  {
    title: 'Chemistry',
    description: 'Chemistry class @ Classroom B',
    schedule: {
      day: 'Tuesday',
      start: 180,
      end: 240,
    },
  },
];

const Timetable = () => {
  const scrollableRef = useRef(null);
  useEffect(() => {
    const minutesSinceMidnight = new Date().getHours() * 60 + new Date().getMinutes();
    // Subtract a default offset of 2 hours before
    scrollableRef.current.scrollLeft = minutesSinceMidnight * PX_PER_MINUTE - PX_PER_MINUTE * 120;
  });

  return (
    <Widget
      className="timetable"
      title={'Schedule (Monday)'}
      interaction={<InteractionButton icon={<Upload />} text="Upload timetable" onClick={() => console.log('click')} />}
    >
      <div className="timetable__container">
        <div className="timetable__days">
          {DaysOfWeek.map((day) => (
            <TimetableDay key={day} day={day} />
          ))}
        </div>
        <div className="timetable__scrollable" ref={scrollableRef}>
          <div className="timetable__hours">
            {TIME.map((time) => (
              <TimetableHour key={time} time={time} />
            ))}
          </div>
          <div className="timetable__slots">
            {DaysOfWeek.map((day) => (
              <div key={day} className="timetable__slots-day">
                {DUMMY_SLOTS.filter((slot) => slot.schedule.day === day).reduce((acc, curr, index, arr) => {
                  return acc.concat(
                    <TimetableSlot
                      key={index}
                      slot={curr}
                      width={PX_PER_MINUTE * (curr.schedule.end - curr.schedule.start)}
                      marginLeft={
                        index === 0
                          ? PX_PER_MINUTE * curr.schedule.start
                          : PX_PER_MINUTE * (curr.schedule.start - arr[index - 1].schedule.end)
                      }
                    />
                  );
                }, [])}
              </div>
            ))}
          </div>
        </div>
      </div>
    </Widget>
  );
};

const TimetableHour = ({ time }) => {
  return (
    <div className="timetable-hour">
      <time className="timetable-hour__text">{time}</time>
    </div>
  );
};

const TimetableDay = ({ day }) => {
  return (
    <div className="timetable-day">
      <span className="timetable-day__text">{day.slice(0, 3)}</span>
    </div>
  );
};

const TimetableSlot = ({ slot, width, marginLeft }) => {
  return (
    <div className="timetable-slot" style={{ width, marginLeft }}>
      <CalendarBlank size="24px" />
      <span className="timetable-slot__title">{slot.title}</span>
    </div>
  );
};

export default Timetable;

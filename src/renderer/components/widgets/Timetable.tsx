import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { uploadTimetable } from 'Renderer/services/timetable';

import { DaysOfWeek } from 'Types/main.types';
import { TimetableSlot } from 'Types/timetable.types';
import { RootState } from 'Renderer/data/store';

import 'Styles/widgets/timetable.css';
import UploadIcon from 'Assets/icons/upload.svg?react';
import Modal from 'Components/generic/Modal';

const PERCENTAGE_PER_MINUTE = 100 / 60 / 24;

const COLORS = [
  '#FF6F61', // Coral
  '#6B5B95', // Royal Purple
  '#88B04B', // Yellow-Green
  '#F7CAC9', // Rose Quartz
  '#92A8D1', // Serenity
  '#F7786B'  // Peach Echo
];

const Timetable: React.FC = () => {
  const timetable: TimetableSlot[] = useSelector((state: RootState) => state.timetable);
  const [date, setDate] = useState(new Date());
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60 * 1000 - new Date().getMilliseconds());
    // To cleanup and prevent memory leaks
    return () => clearInterval(interval);
  });

  const handleSubmitUrl = () => {
    void uploadTimetable(inputUrl);
    setUploadModalIsOpen(false);
    setInputUrl('');
  }

  return (
    <div className='timetable'>
      <h2 className='timetable__title'>
        Schedule
        &nbsp;
        <span className='timetable__subtitle'>
          ({DaysOfWeek[date.getDay() - 1]})
        </span>

        <UploadIcon 
          className='timetable__upload'
          onClick={() => setUploadModalIsOpen(!uploadModalIsOpen)}
        />
      </h2>

      <div className='timetable__content'>

        {/* Hours of the day (12 AM ... 12 PM) on the top */}
        <div className='timetable__hours'>
          {Array.from({ length: 25 }, (_, index) => index)
            .map(time => (
              <time 
                key={time}
                className='timetable__hour'
                style={{
                  left: `${time * 60 * PERCENTAGE_PER_MINUTE}%`
                }}
              >
                {+time > 12 ? `${time - 12} PM` : +time === 0 ? '12 PM' : `${time} AM`}
              </time>
            ))}
        </div>
        
        {/* Timetable slots */}
        <ol className='timetable__days'>
          {DaysOfWeek.map((day, index) => (
            <li 
              key={index} 
              className={`timetable__day ${day === DaysOfWeek[date.getDay() - 1] ? 'timetable__day--active' : ''}`}
            >
              <div 
                key={index}
                className='timetable__day-of-week'
              >
                <span>
                  {day.substring(0, 3)}
                </span>
              </div>
              
              <div className='timetable__slot-container'>
                {timetable
                  .filter(slot => slot.schedule.day === day)
                  .map((slot, index) => (
                    <Slot
                      key={index}
                      title={slot.title}
                      description={slot.description as string}
                      color={COLORS[slot.id % COLORS.length]}
                      left={`${slot.schedule.startTime * PERCENTAGE_PER_MINUTE}%`}
                      width={`${(slot.schedule.endTime - slot.schedule.startTime) * PERCENTAGE_PER_MINUTE}%`}
                    />
                  ))}
              </div>
            </li>
          ))}
          <div
            className='timetable__indicator'
            style={{ left: `${(date.getHours() * 60 + date.getMinutes()) * PERCENTAGE_PER_MINUTE}%` }}
          >
            <p className='timetable__indicator-time'>
              {Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date).substring(0, 5)}
            </p>
            <div className='timetable__indicator-line'/>
          </div>
        </ol>
      </div>

      <Modal
        isOpen={uploadModalIsOpen}
        onClose={() => setUploadModalIsOpen(false)}
      >
        <input
          type='text'
          placeholder='Paste your NUSMods URL here...'
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        <button onClick={handleSubmitUrl}>
          Submit URL
        </button>
      </Modal>
    </div>
  )
}

const Slot: React.FC<{ title: string, description: string, color: string, left: string, width: string }> = ({ title, description, color, left, width }) => {
  return (
    <div
      className='timetable-slot'
      style={{ 
        color,
        left,
        width
      }}
    >
      <div 
        className='timetable-slot__trim'
        style={{ backgroundColor: color }}
      />
      <div className='timetable-slot__content'>
        <h3 className='timetable-slot__title'>
          {title}
        </h3>
        <p className='timetable-slot__description'>
          {description}
        </p>
      </div>
    </div>
  )
}

/*
const Timetable: React.FC = () => {
  const timetable: TimetableSlot[] = useSelector((state: RootState) => state.timetable);

  const [inputUrl, setInputUrl] = useState<string>('');
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState<boolean>(false);

  const timetableRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (timetableRef.current) {
      timetableRef.current.scrollTop = (new Date().getHours() * 60 + new Date().getMinutes()) * REM_PER_MINUTE * 16 - 300;
    }
  }, []);

  const dayOfWeekToday = DaysOfWeek[new Date().getDay() - 1];

  const handleSubmitUrl = (url: string) => {
    setInputUrl('');
    void uploadTimetable(url);
  };

  return (
    <div className='widget timetable'>
      <span className='widget__header'>
        <h2 className='widget__title'>Schedule</h2>
        <h2 className='widget__subtitle'>({dayOfWeekToday})</h2>
        <button
          className='timetable__upload'
          onClick={() => setUploadModalIsOpen(true)}
        >
          <UploadIcon />
        </button>
      </span>

      <div 
        className='timetable__timetable'
        ref={timetableRef}
      >
        <div className='timetable__hours'>
          {Array.from({ length: 25 }, (_, index) => index)
            .map(time => (
              <time 
                key={time}
                style={{ top: `${(time * 60) * REM_PER_MINUTE}rem` }}
              >
                {+time.toLocaleString() > 12 ? `${time - 12} PM` : `${time} AM`}
              </time>
            ))}
        </div>

        <div className='timetable__slots'>
          {timetable
            .filter(slot => slot.schedule.day === dayOfWeekToday)
            .map((slot, index) => {
              return <TimetableSlotItem 
                key={index} 
                slot={slot} 
                offset={REM_PER_MINUTE * slot.schedule.startTime}
                height={REM_PER_MINUTE * (slot.schedule.endTime - slot.schedule.startTime)}
              />
            })
          }
        </div>

        <div 
          className='timetable__current-time-indicator'
          style={{ top: `${(new Date().getHours() * 60 + new Date().getMinutes()) * REM_PER_MINUTE}rem` }}
        >
          <time>{`${new Date().getHours() > 12 ? new Date().getHours() - 12 : new Date().getHours()}:${new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes()}`}</time>
          <div className='timetable__current-time-line' />
        </div>
      </div>

      <Modal isOpen={uploadModalIsOpen} onClose={() => setUploadModalIsOpen(false)}>
        <input
          type='text'
          placeholder='Paste your NUSMods URL here...'
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
        />
        {inputUrl && (
          <button onClick={() => handleSubmitUrl(inputUrl)}>Submit URL</button>
        )}
      </Modal>

    </div>
  );
};

const TimetableSlotItem: React.FC<{ slot: TimetableSlot, offset: number, height: number }> = ({ slot, offset, height }) => {
  return (
    <div 
      className='timetable__slot'
      style={{ top: `${offset}rem`, height: `${height}rem` }}
    >
      <p className='timetable__item-title'>{slot.title}</p>
      <p className='timetable__item-description'>{slot.description}</p>
    </div>
  );
}

export default Timetable;

*/

export default Timetable;
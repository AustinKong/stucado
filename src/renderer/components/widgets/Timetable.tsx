import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimetable } from '@/main/services/timetable';
import { DaysOfWeek } from '@/shared/types/main.types';
import { TimetableSlot } from '@/shared/types/timetable.types';
import { setTimetable } from 'Data/slices/timetable';
import 'Styles/widgets/timetable.css';
import { RootState } from 'Data/store';
import UploadIcon from 'Assets/icons/upload.svg?react';
import Modal from 'Components/generic/Modal';

const REM_PER_MINUTE = 0.08;

const Timetable: React.FC = () => {
  const dispatch = useDispatch();
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

  // TODO: URL validation
  const handleSubmitUrl = (url: string) => {
    setInputUrl('');
    getTimetable(url)
      .then(response => dispatch(setTimetable(response)))
      .catch((e) => console.error(e));
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

        {/* TODO: Make the current time indicator real-time * format the time */}
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

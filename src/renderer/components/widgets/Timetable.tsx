import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTimetable } from 'Services/timetable';
import { DaysOfWeek } from 'Data/types/main.types';
import { TimetableSlot } from 'Data/types/timetable.types';
import { setTimetable } from 'Data/slices/timetable';
import 'Styles/widgets/timetable.css';
import { RootState } from 'Data/store';
import UploadIcon from 'Assets/icons/upload.svg?react';

const Timetable: React.FC = () => {
  const dispatch = useDispatch();
  const timetable = useSelector((state: RootState) => state.timetable);
  const [inputUrl, setInputUrl] = useState<string>('');
  const [uploadIsShown, setUploadIsShown] = useState<boolean>(false);

  const dayOfWeekToday = DaysOfWeek[new Date().getDay()];

  // TODO: URL validation
  const handleSubmitUrl = (url: string) => {
    setInputUrl('');
    getTimetable(url)
      .then((response: TimetableSlot[]) => dispatch(setTimetable(response)))
      .catch((e) => console.error(e));
  };

  return (
    <div className='widget timetable'>
      <span className='widget__header'>
        <h2 className='widget__title'>Schedule</h2>
        <h2 className='widget__subtitle'>({dayOfWeekToday})</h2>
        <button
          className='timetable__upload'
          onClick={() => setUploadIsShown(!uploadIsShown)}
        >
          <UploadIcon />
        </button>
      </span>

      <div className='timetable'>
        <div className='timetable__hours'>
          {Array.from({ length: 25 }, (_, index) => index)
            .map(time => +time.toLocaleString() > 12 ? `${time - 12} PM` : `${time} AM`)
            .map(time => <time key={time}>{time}</time>)}
        </div>

        <div className='timetable__slots'>
          {timetable
            .filter((slot) => slot.schedule.day === dayOfWeekToday)
            .map((slot, index) => <TimetableSlotItem key={index} slot={slot} />)}
        </div>
      </div>

      <input
        type='text'
        placeholder='Paste your NUSMods URL here...'
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
      />
      {inputUrl && (
        <button onClick={() => handleSubmitUrl(inputUrl)}>Submit URL</button>
      )}
    </div>
  );
};

const TimetableSlotItem: React.FC<{ slot: TimetableSlot }> = ({ slot }) => {
  return (
    <div className='timetable__slot'>
      <p className='timetable__item-title'>{slot.title}</p>
      <p className='timetable__item-description'>{slot.description}</p>
    </div>
  );
}

export default Timetable;

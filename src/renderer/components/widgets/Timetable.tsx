import React, { useState } from 'react';
import { getTimetable } from 'Services/timetable';
import { DaysOfWeek } from 'Types/main.types';
import { TimetableSlot } from 'Types/timetable.types';
import 'Styles/widgets/timetable.css';

const Timetable: React.FC = () => {
  const [timetable, setTimetable] = useState<TimetableSlot[]>([]);
  const [inputUrl, setInputUrl] = useState<string>('');

  // TODO: URL validation
  const handleSubmitUrl = (url: string) => {
    setInputUrl('');
    getTimetable(url)
      .then((response: TimetableSlot[]) => {
        setTimetable(response);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <h2>Timetable</h2>
      <div className='timetable'>
        <div className='timetable__scrollable'>
          <div className='timetable__header'>
            {Array.from({ length: 25 }, (_, index) => index)
              .map(
                (time) =>
                  `${time.toLocaleString('en-US', {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                  })}00`
              )
              .map((time) => {
                return (
                  <time key={time} className='timetable__time'>
                    {time}
                  </time>
                );
              })}
          </div>

          <ul className='timetable__rows'>
            {DaysOfWeek.map((day: string) => {
              return (
                <li key={day} className='timetable__row'>
                  <div className='timetable__day-of-week'>
                    <span>{day}</span>
                  </div>
                  <div className='timetable__slots'>
                    {timetable
                      .filter((slotData) => slotData.schedule.day === day)
                      .map((slotData, index) => {
                        return (
                          <div
                            key={index}
                            className='timetable__slot'
                            style={{
                              width: `${
                                (1 / 24) *
                                (+slotData.schedule.endTime -
                                  +slotData.schedule.startTime)
                              }%`,
                              left: `${
                                (1 / 24) * +slotData.schedule.startTime
                              }%`,
                            }}
                          >
                            <p className='timetable__item-title'>
                              {slotData.title}
                            </p>
                            <p className='timetable__item-description'>
                              {slotData.description}
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </li>
              );
            })}
          </ul>
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

export default Timetable;

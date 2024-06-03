import { useRef, useEffect, useState } from 'react';
import { Upload, CalendarBlank } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

import { DaysOfWeek } from '@shared/constants';
import { Widget, InteractionButton } from '@components/widgets/Widget';
import {
  Modal,
  ModalTextInput,
  ModalFooter,
  ModalButtonPrimary,
  ModalButtonSecondary,
  ModalNotice
} from '@components/generic/Modal';
import { uploadTimetable } from '@services/timetable';
import '@styles/widgets/timetable.css';

// Minutes since midnight in increments of 15
const TIME = Array.from({ length: 96 + 1 }, (_, i) => i * 15);
// 48px per 15 minutes
const PX_PER_MINUTE = (48 * 4) / 60;

const Timetable = () => {
  const schedule = useSelector((state) => state.timetable);
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
    <Widget
      className="timetable"
      title={'Schedule (Monday)'}
      interaction={
        <InteractionButton icon={<Upload />} text="Upload timetable" onClick={() => setUploadModalIsOpen(true)} />
      }
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
              <TimetableHour key={time} time={`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`} />
            ))}
          </div>
          <div className="timetable__slots">
            {DaysOfWeek.map((day, index) => (
              <div
                key={day}
                className={
                  index === new Date().getDay()
                    ? 'timetable__slots-day timetable__slots-day--active'
                    : 'timetable__slots-day'
                }
              >
                {schedule
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
          <div className="timetable__current-time" ref={currentTimeRef} />
        </div>
      </div>
      <UploadModal isOpen={uploadModalIsOpen} onClose={() => setUploadModalIsOpen(false)} />
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
      <span
        className={
          day === DaysOfWeek[new Date().getDay()]
            ? 'timetable-day__text timetable-day__text--active'
            : 'timetable-day__text'
        }
      >
        {day.slice(0, 3)}
      </span>
    </div>
  );
};

const TimetableSlot = ({ slot, width, marginLeft }) => {
  return (
    <div className="timetable-slot" style={{ width, marginLeft }}>
      <CalendarBlank className="timetable-slot__icon" size="20px" />
      <span className="timetable-slot__title">{slot.title}</span>
    </div>
  );
};

const UploadModal = ({ isOpen, onClose }) => {
  const [formContent, setFormContent] = useState({ url: '' });

  const handleChange = (event) => {
    setFormContent({ ...formContent, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void uploadTimetable(formContent.url);
    setFormContent({ url: '' });
    onClose();
  };

  return (
    <Modal title="Upload timetable" subtitle="Paste your NUS Mods timetable URL here" isOpen={isOpen} onClose={onClose}>
      <ModalNotice title="Notice">
        New academic year starts on August 1st! Any timetables uploaded before that will have last year&apos;s classes.
        This is because NUS Mods API (which we use) does not update their data that early.
      </ModalNotice>
      <ModalTextInput
        title="Timetable URL"
        nameKey="url"
        value={formContent.url}
        onChange={handleChange}
        required={true}
      />
      <ModalFooter
        left={<ModalButtonSecondary text="Cancel" onClick={onClose} />}
        right={<ModalButtonPrimary text="Submit" onClick={handleSubmit} />}
      />
    </Modal>
  );
};

export default Timetable;

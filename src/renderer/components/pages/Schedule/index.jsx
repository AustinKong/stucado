import { IconContext, GridFour, CheckSquare, Student } from '@phosphor-icons/react';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
  Modal,
  ModalTextInput,
  ModalNumberInput,
  ModalBeside,
  ModalFooter,
  ModalButtonPrimary,
  ModalButtonSecondary,
} from '@components/generic/Modal';

import { clamp } from '@shared/utils.js';
import { DaysOfWeek } from '@shared/constants';
import Calendar from '@components/generic/Calendar';
import './styles.css';

const Schedule = () => {
  const [filter, setFilter] = useState('all');
  const timetable = useSelector((state) => state.timetable);

  return (
    <div className="schedule">
      <div className="schedule__main">
        <ScheduleFilter filter={filter} setFilter={setFilter} />
        <ScheduleTimetable timetable={timetable} />
      </div>
      <div className="schedule__sidebar">
        <Calendar />
        <ScheduleEventQueue timetable={timetable} />
        <ScheduleTools />
      </div>
    </div>
  );
};

const SCHEDULE_FILTERS = [
  { label: 'All scheduled', icon: <GridFour />, value: 'all' },
  { label: 'Tasks', icon: <CheckSquare />, value: 'tasks' },
  { label: 'Classes', icon: <Student />, value: 'classes' },
];

const ScheduleFilter = ({ filter, setFilter }) => {
  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="schedule-filter__bar">
      {SCHEDULE_FILTERS.map((f) => {
        return (
          <div
            className={
              filter === f.value ? 'schedule-filter__tab schedule-filter__tab--active' : 'schedule-filter__tab'
            }
            onClick={() => handleFilterChange(f.value)}
            key={f.value}
          >
            <IconContext.Provider value={{ size: '24px' }}>{f.icon}</IconContext.Provider>
            {f.label}
          </div>
        );
      })}
    </div>
  );
};

const ScheduleEventQueue = ({ timetable }) => {
  const sortedTimetable = timetable
    .filter((slot) => DaysOfWeek[new Date().getDay()] === slot.schedule.day)
    .sort((a, b) => a.schedule.startTime - b.schedule.startTime);

  return (
    <div className="schedule-event-queue">
      <div className="schedule-event-queue__title">Events Today</div>
      <div className="schedule-event-queue__list">
        {sortedTimetable.map((slot, index) => {
          return <ScheduleEvent key={index} slot={slot} />;
        })}
      </div>
    </div>
  );
};

const ScheduleEvent = ({ slot }) => {
  return (
    <div className="schedule-event">
      <div className="schedule-event__title">{slot.title}</div>
      <div className="schedule-event__subtitle">{slot.description}</div>
    </div>
  );
};

const ScheduleTools = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <div className="schedule-tools">
      <button className="schedule-tools__add" onClick={() => setAddModalIsOpen(true)}>
        Add new timetable slot
      </button>
      <AddTimetableSlotModal isOpen={addModalIsOpen} onClose={() => setAddModalIsOpen(false)} />
    </div>
  );
};

const TIME = Array.from({ length: 96 + 1 }, (_, i) => i * 15);
const PX_PER_MINUTE = (48 * 4) / 60;

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
    <div className="schedule-timetable">
      <div className="schedule-timetable__header">
        <div className="schedule-timetable__time-label">GMT{new Date().getTimezoneOffset() / 60}</div>
        <div className="schedule-timetable__days">
          {DaysOfWeek.map((day) => (
            <div key={day} className="schedule-timetable__day">
              {day}
            </div>
          ))}
        </div>
      </div>

      <div className="schedule-timetable__scrollable" ref={scrollableRef}>
        <div className="schedule-timetable__content">
          <div className="schedule-timetable__hours">
            {TIME.map((time) => (
              <div key={time} className="schedule-timetable__hour">
                <time className="schedule-timetable__time">{`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}</time>
              </div>
            ))}
          </div>
          <div className="schedule-timetable__slots">
            {DaysOfWeek.map((day, index) => (
              <div key={index} className="schedule-timetable__slots-day">
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
            <div className="schedule-timetable__now" ref={currentTimeLineRef}>
              <div className="schedule-timetable__now-time">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="schedule-timetable__now-line" ref={todayTimeLineRef}>
                <div className="schedule-timetable__now-circle" />
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
      <div className="schedule-timetable-slot" style={{ height, marginTop }} onClick={() => setEditModalIsOpen(true)}>
        <div className="schedule-timetable-slot__title">{slot.title}</div>
        <div className="schedule-timetable-slot__time">
          {`${Math.floor(slot.schedule.startTime / 60)}:${String(slot.schedule.startTime % 60).padStart(2, '0')}`} -
          {`${Math.floor(slot.schedule.endTime / 60)}:${String(slot.schedule.endTime % 60).padStart(2, '0')}`}
        </div>
      </div>
      <EditTimetableSlotModal slot={slot} isOpen={editModalIsOpen} onClose={() => setEditModalIsOpen(false)} />
    </>
  );
};

const EditTimetableSlotModal = ({ slot, isOpen, onClose }) => {
  const defaultState = {
    title: slot.title,
    description: slot.description,
    startTimeHours: Math.floor(slot.schedule.startTime / 60),
    startTimeMinutes: slot.schedule.startTime % 60,
    endTimeHours: Math.floor(slot.schedule.endTime / 60),
    endTimeMinutes: slot.schedule.endTime % 60,
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    if (event.target.name === 'startTimeHours' || event.target.name === 'endTimeHours') {
      const value = clamp(Number(event.target.value), 0, 23).toString();
      setFormContent({ ...formContent, [event.target.name]: value });
    } else if (event.target.name === 'startTimeMinutes' || event.target.name === 'endTimeMinutes') {
      const value = clamp(Number(event.target.value), 0, 59).toString();
      setFormContent({ ...formContent, [event.target.name]: value });
    } else {
      setFormContent({ ...formContent, [event.target.name]: event.target.value });
    }
  };

  const handleDelete = (event) => {
    event.preventDefault();
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formContent);
    onClose();
  };

  return (
    <Modal title="Edit timetable slot" subtitle="Modify timetable slot information" isOpen={isOpen} onClose={onClose}>
      <ModalTextInput title="Title" nameKey="title" value={formContent.title} onChange={handleChange} required={true} />
      <ModalTextInput
        title="Description"
        nameKey="description"
        value={formContent.description}
        onChange={handleChange}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Start time (hours)"
          nameKey="startTimeHours"
          value={formContent.startTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="Start time (minutes)"
          nameKey="startTimeMinutes"
          value={formContent.startTimeMinutes}
          onChange={handleChange}
        />
      </ModalBeside>
      <ModalBeside>
        <ModalNumberInput
          title="End time (hours)"
          nameKey="endTimeHours"
          value={formContent.endTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="End time (minutes)"
          nameKey="endTimeMinutes"
          value={formContent.endTimeMinutes}
          onChange={handleChange}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Delete" onClick={handleDelete} />}
        right={
          <>
            <ModalButtonSecondary text="Cancel" onClick={handleCancel} />
            <ModalButtonPrimary text="Submit" onClick={handleSubmit} />
          </>
        }
      />
    </Modal>
  );
};

const AddTimetableSlotModal = ({ isOpen, onClose }) => {
  const defaultState = {
    title: '',
    description: '',
    day: DaysOfWeek[new Date().getDay()],
    startTimeHours: Math.floor(new Date().getHours()),
    startTimeMinutes: new Date().getMinutes(),
    endTimeHours: Math.floor(new Date().getHours()),
    endTimeMinutes: new Date().getMinutes(),
  };

  const [formContent, setFormContent] = useState(defaultState);

  const handleChange = (event) => {
    if (event.target.name === 'startTimeHours' || event.target.name === 'endTimeHours') {
      const value = clamp(Number(event.target.value), 0, 23).toString();
      setFormContent({ ...formContent, [event.target.name]: value });
    } else if (event.target.name === 'startTimeMinutes' || event.target.name === 'endTimeMinutes') {
      const value = clamp(Number(event.target.value), 0, 59).toString();
      setFormContent({ ...formContent, [event.target.name]: value });
    } else {
      setFormContent({ ...formContent, [event.target.name]: event.target.value });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(defaultState);
    onClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formContent);
    onClose();
  };

  return (
    <Modal
      title="Add timetable slot"
      subtitle="Create a new recurring timetable slot"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalTextInput title="Title" nameKey="title" value={formContent.title} onChange={handleChange} required={true} />
      <ModalTextInput
        title="Description"
        nameKey="description"
        value={formContent.description}
        onChange={handleChange}
      />
      <ModalBeside>
        <ModalNumberInput
          title="Start time (hours)"
          nameKey="startTimeHours"
          value={formContent.startTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="Start time (minutes)"
          nameKey="startTimeMinutes"
          value={formContent.startTimeMinutes}
          onChange={handleChange}
        />
      </ModalBeside>
      <ModalBeside>
        <ModalNumberInput
          title="End time (hours)"
          nameKey="endTimeHours"
          value={formContent.endTimeHours}
          onChange={handleChange}
        />
        <ModalNumberInput
          title="End time (minutes)"
          nameKey="endTimeMinutes"
          value={formContent.endTimeMinutes}
          onChange={handleChange}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Cancel" onClick={handleCancel} />}
        right={<ModalButtonPrimary text="Submit" onClick={handleSubmit} />}
      />
    </Modal>
  );
};

export default Schedule;

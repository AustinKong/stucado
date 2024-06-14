import { IconContext, GearSix, FastForward, Play, Pause, Stop } from '@phosphor-icons/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { clamp } from '@shared/utils.js';

import {
  Modal,
  ModalBeside,
  ModalNumberInput,
  ModalFooter,
  ModalButtonPrimary,
  ModalButtonSecondary,
} from '@components/generic/Modal';
import { pausePomodoro, startPomodoro, stopPomodoro, skipPomodoro, updatePomodoroDurations } from '@services/pomodoro';
import { Widget, InteractionButton } from '@components/widgets/Widget';
import './styles.css';

const FULL_DASH_ARRAY = 2 * Math.PI * 45;

const Pomodoro = () => {
  const [editPomodoroModalIsOpen, setEditPomodoroModalIsOpen] = useState(false);

  return (
    <Widget
      className="pomodoro"
      title="Pomodoro"
      interaction={
        <InteractionButton text="Edit" icon={<GearSix />} onClick={() => setEditPomodoroModalIsOpen(true)} />
      }
    >
      <div className="pomodoro__content">
        <PomodoroTimer />
        <PomodoroControls />
      </div>
      <EditPomodoroModal isOpen={editPomodoroModalIsOpen} onClose={() => setEditPomodoroModalIsOpen(false)} />
    </Widget>
  );
};

const PomodoroTimer = () => {
  const timer = useSelector((state) => state.pomodoro.timer);

  const getStateText = () => {
    if (!timer.isRunning) {
      return 'Paused';
    }

    switch (timer.state) {
      case 'work':
        return 'Focused';
      case 'shortBreak':
        return 'Short break';
      case 'longBreak':
        return 'Long break';
    }
  };

  return (
    <div className="pomodoro-timer">
      <svg className="pomodoro-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className="pomodoro-timer__circle">
          <circle className="pomodoro-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            strokeDasharray={`${(timer.percentageLeft / 100) * FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`}
            className="pomodoro-timer__path-remaining"
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          />
        </g>
      </svg>
      <div className="pomodoro-timer__label">
        {`${Math.floor(timer.timeLeft / 60)}:${String(timer.timeLeft % 60).padStart(2, '0')}`}
        <span className="pomodoro-timer__state">{getStateText()}</span>
      </div>
    </div>
  );
};

const PomodoroControls = () => {
  const timer = useSelector((state) => state.pomodoro.timer);

  const handleTogglePlayPause = () => {
    if (timer.isRunning) {
      void pausePomodoro();
    } else {
      void startPomodoro();
    }
  };

  const handleSkip = () => {
    void skipPomodoro();
  };

  const handleStop = () => {
    void stopPomodoro();
  };

  return (
    <div className="pomodoro-controls">
      <IconContext.Provider
        value={{
          size: 32,
          weight: 'fill',
        }}
      >
        <div className="pomodoro-controls__secondary" onClick={handleSkip}>
          <FastForward className="pomodoro-controls__skip" />
        </div>
        <div className="pomodoro-controls__main" onClick={handleTogglePlayPause}>
          {!timer.isRunning ? (
            <Play className="pomodoro-controls__play" />
          ) : (
            <Pause className="pomodoro-controls__pause" />
          )}
        </div>
        <div className="pomodoro-controls__secondary" onClick={handleStop}>
          <Stop className="pomodoro-controls__stop" />
        </div>
      </IconContext.Provider>
    </div>
  );
};

const EditPomodoroModal = ({ isOpen, onClose }) => {
  const pomodoroSettings = useSelector((state) => state.pomodoro.settings);
  const pomodoroSettingsConverted = {
    workDurationMinutes: Math.floor(pomodoroSettings.workDuration / 60),
    shortBreakDurationMinutes: Math.floor(pomodoroSettings.shortBreakDuration / 60),
    longBreakDurationMinutes: Math.floor(pomodoroSettings.longBreakDuration / 60),
  };

  const [formContent, setFormContent] = useState(pomodoroSettingsConverted);

  const handleChange = (event) => {
    const formattedTime = clamp(Number(event.target.value), 0, 180).toString();
    setFormContent({ ...formContent, [event.target.name]: formattedTime });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    void updatePomodoroDurations(
      formContent.workDurationMinutes * 60,
      formContent.shortBreakDurationMinutes * 60,
      formContent.longBreakDurationMinutes * 60
    );
    onClose();
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setFormContent(pomodoroSettingsConverted);
    onClose();
  };

  return (
    <Modal
      title="Edit Pomodoro Settings"
      subtitle="Edit Pomodoro duration (minutes) settings"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalBeside>
        <ModalNumberInput
          title="Work duration"
          nameKey="workDurationMinutes"
          value={formContent.workDurationMinutes}
          onChange={handleChange}
          required={true}
        />
        <ModalNumberInput
          title="Short break duration"
          nameKey="shortBreakDurationMinutes"
          value={formContent.shortBreakDurationMinutes}
          onChange={handleChange}
          required={true}
        />
        <ModalNumberInput
          title="Long break duration"
          nameKey="longBreakDurationMinutes"
          value={formContent.longBreakDurationMinutes}
          onChange={handleChange}
          required={true}
        />
      </ModalBeside>
      <ModalFooter
        left={<ModalButtonSecondary text="Cancel" onClick={handleCancel} />}
        right={<ModalButtonPrimary text="Save" onClick={handleSubmit} />}
      />
    </Modal>
  );
};

export default Pomodoro;

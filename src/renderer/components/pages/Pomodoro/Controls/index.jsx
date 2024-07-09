import styles from './styles.module.css';
import { IconContext, FastForward, Play, Pause, Stop } from '@phosphor-icons/react';
import { pausePomodoro, startPomodoro, stopPomodoro, skipPomodoro } from '@services/pomodoro';
import { useSelector } from 'react-redux';
import Button from '@components/generic/Button';
import { useState } from 'react';
import EditPomodoroModal from '../EditPomodoroModal';
import { Gear, BellSimple } from '@phosphor-icons/react';

const Controls = () => {
  const timer = useSelector((state) => state.pomodoro.timer);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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

  const notificationsOff = true;

  return (
    <>
      <div className={styles.controls}>
        <div className={styles.controls__title}>
          <h2 className={styles.controls__state}>Current: {getStateText()}</h2>
          <Gear onClick={() => setIsSettingsOpen(true)} size={24} className={styles.controls__settings} />
        </div>
        <div className={styles.controls__notification}>
          <IconContext.Provider
            value={{
              size: 24,
              weight: notificationsOff ? 'regular' : 'fill',
            }}
          >
            <BellSimple size={24} />
          </IconContext.Provider>
          {notificationsOff ? 'Turn on notifications' : 'Turn off notifications'}
        </div>
        <div className={styles.controls__buttons}>
          <IconContext.Provider
            value={{
              size: 24,
              weight: 'fill',
            }}
          >
            <Button onClick={handleTogglePlayPause} className={styles.controls__play}>
              {!timer.isRunning ? <Play /> : <Pause />}
              {timer.isRunning ? 'Pause' : 'Start'}
            </Button>
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 24,
              weight: 'fill',
            }}
          >
            <Button onClick={handleSkip} className={styles.controls__buttonSecondary}>
              <FastForward />
              Skip
            </Button>
            <Button onClick={handleStop} className={styles.controls__buttonSecondary}>
              <Stop />
              Stop
            </Button>
          </IconContext.Provider>
        </div>
      </div>
      {isSettingsOpen && <EditPomodoroModal onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};

export default Controls;

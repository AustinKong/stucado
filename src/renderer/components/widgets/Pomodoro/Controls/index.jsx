import styles from './styles.module.css';
import { IconContext, FastForward, Play, Pause, Stop } from '@phosphor-icons/react';
import { pausePomodoro, startPomodoro, stopPomodoro, skipPomodoro } from '@services/pomodoro';
import { useSelector } from 'react-redux';

const Controls = () => {
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
    <div className={styles.controls}>
      <IconContext.Provider
        value={{
          size: 32,
          weight: 'fill',
        }}
      >
        <div className={styles.controls__secondary} onClick={handleSkip}>
          <FastForward className={styles.controls__skip} />
        </div>
        <div className={styles.controls__main} onClick={handleTogglePlayPause}>
          {!timer.isRunning ? <Play className={styles.controls__play} /> : <Pause className={styles.controls__pause} />}
        </div>
        <div className={styles.controls__secondary} onClick={handleStop}>
          <Stop className={styles.controls__stop} />
        </div>
      </IconContext.Provider>
    </div>
  );
};

export default Controls;

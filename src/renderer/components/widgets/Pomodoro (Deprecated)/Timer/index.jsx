import { useSelector } from 'react-redux';
import styles from './styles.module.css';
const FULL_DASH_ARRAY = 2 * Math.PI * 45;

const Timer = () => {
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
    <div className={styles.timer}>
      <svg className={styles.timer__svg} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g className={styles.timer__circle}>
          <circle className={styles.timer__pathElapsed} cx="50" cy="50" r="45" />
          <path
            strokeDasharray={`${(timer.percentageLeft / 100) * FULL_DASH_ARRAY} ${FULL_DASH_ARRAY}`}
            className={styles.timer__pathRemaining}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          />
        </g>
      </svg>
      <div className={styles.timer__label}>
        <h1>{`${Math.floor(timer.timeLeft / 60)}:${String(timer.timeLeft % 60).padStart(2, '0')}`}</h1>
        <h3 className={styles.timer__state}>{getStateText()}</h3>
      </div>
    </div>
  );
};

export default Timer;

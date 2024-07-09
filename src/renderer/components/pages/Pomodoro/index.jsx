import styles from './styles.module.css';
import Timer from './Timer';
import Controls from './Controls';

const Pomodoro = () => {
  return (
    <>
      <div className={styles.pomodoro}>
        <div className={styles.pomodoro__container}>
          <Timer />
          <Controls />
        </div>
      </div>
    </>
  );
};

export default Pomodoro;

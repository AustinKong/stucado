import styles from './styles.module.css';
import Timer from './Timer';
import Controls from './Controls';
import { Gear } from '@phosphor-icons/react';
import { useState } from 'react';
import EditPomodoroModal from './EditPomodoroModal';

const Pomodoro = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className={styles.pomodoro}>
        <Timer />
        <Controls />
        <Gear className={styles.pomodoro__settings} onClick={() => setIsSettingsOpen(true)} size={32} />
      </div>
      {isSettingsOpen && <EditPomodoroModal onClose={() => setIsSettingsOpen(false)} />}
    </>
  );
};

export default Pomodoro;

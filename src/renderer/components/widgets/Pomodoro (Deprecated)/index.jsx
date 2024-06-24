import { GearSix } from '@phosphor-icons/react';
import { useState } from 'react';
import styles from './styles.module.css';

import Widget, { InteractionButton } from '@components/widgets/Widget';
import Timer from '@components/widgets/Pomodoro/Timer';
import Controls from '@components/widgets/Pomodoro/Controls';
import EditPomodoroModal from '@components/widgets/Pomodoro/EditPomodoroModal';

const Pomodoro = () => {
  const [editPomodoroModalIsOpen, setEditPomodoroModalIsOpen] = useState(false);

  return (
    <Widget
      className={styles.pomodoro}
      title="Pomodoro"
      interaction={
        <InteractionButton text="Edit" icon={<GearSix />} onClick={() => setEditPomodoroModalIsOpen(true)} />
      }
    >
      <div className={styles.pomodoro__content}>
        <Timer />
        <Controls />
      </div>
      {editPomodoroModalIsOpen && <EditPomodoroModal onClose={() => setEditPomodoroModalIsOpen(false)} />}
    </Widget>
  );
};

export default Pomodoro;

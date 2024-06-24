import { useState } from 'react';
import styles from './styles.module.css';
import Button from '@components/generic/Button';
import AddSlotModal from '@components/pages/Schedule/AddSlotModal';
import { optimizeTimetable } from '@services/timetable';

import { Plus, Shuffle } from '@phosphor-icons/react';

const Tools = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.scheduleTools}>
        <Button onClick={() => setAddModalIsOpen(true)} className={styles.scheduleTools__button}>
          <Plus className={styles.scheduleTools__icon} />
          Add slot
        </Button>
        <Button onClick={() => optimizeTimetable()} className={styles.scheduleTools__button}>
          <Shuffle className={styles.scheduleTools__icon} /> Optimize
        </Button>
      </div>
      {addModalIsOpen && <AddSlotModal onClose={() => setAddModalIsOpen(false)} />}
    </>
  );
};

export default Tools;

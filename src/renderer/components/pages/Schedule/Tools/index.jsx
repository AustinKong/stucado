import { useState } from 'react';
import styles from './styles.module.css';
import Button from '@components/generic/Button';
import AddSlotModal from '@components/pages/Schedule/AddSlotModal';
import { optimizeTimetable } from '@services/timetable';
import UploadModal from '@components/pages/Schedule/UploadModal';
import ResetModal from '@components/pages/Schedule/ResetModal';

import { Plus, Shuffle, ArrowClockwise, UploadSimple } from '@phosphor-icons/react';

const Tools = () => {
  const [addModalIsOpen, setAddModalIsOpen] = useState(false);
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [resetModalIsOpen, setResetModalIsOpen] = useState(false);

  return (
    <>
      <div className={styles.scheduleTools}>
        <Button onClick={() => setAddModalIsOpen(true)} className={styles.scheduleTools__button}>
          <Plus className={styles.scheduleTools__icon} />
          Add slot
        </Button>
        <Button onClick={() => setResetModalIsOpen(true)} className={styles.scheduleTools__button}>
          <ArrowClockwise className={styles.scheduleTools__icon} /> Reset
        </Button>
        <Button onClick={() => optimizeTimetable()} className={styles.scheduleTools__button}>
          <Shuffle className={styles.scheduleTools__icon} /> Optimize
        </Button>
        <Button onClick={() => setUploadModalIsOpen(true)} className={styles.scheduleTools__button}>
          <UploadSimple className={styles.scheduleTools__icon} /> Upload
        </Button>
      </div>
      {addModalIsOpen && <AddSlotModal onClose={() => setAddModalIsOpen(false)} />}
      {uploadModalIsOpen && <UploadModal onClose={() => setUploadModalIsOpen(false)} />}
      {resetModalIsOpen && <ResetModal onClose={() => setResetModalIsOpen(false)} />}
    </>
  );
};

export default Tools;

import { useState } from 'react';
import { incrementTaskStatus, decrementTaskStatus } from '@services/tasks';
import { DotsThreeVertical } from '@phosphor-icons/react';
import EditTaskModal from '@components/widgets/TaskList/EditTaskModal';

import styles from './styles.module.css';

const TaskItem = ({ task }) => {
  const [editTaskModalIsOpen, setEditTaskModalIsOpen] = useState(false);

  const taskStatusToColor = (status) =>
    status === 'Pending'
      ? 'var(--background-danger)'
      : status === 'InProgress'
        ? 'var(--background-warning)'
        : 'var(--background-success)';

  const handleToggleTaskStatus = (event) => {
    if (event.type === 'click') {
      void incrementTaskStatus(task.id);
    } else if (event.type === 'contextmenu') {
      void decrementTaskStatus(task.id);
    }
  };

  // Modal must be outside in order to stop on click events from firing together on click
  return (
    <>
      <li className={styles.taskItem} onClick={handleToggleTaskStatus} onContextMenu={handleToggleTaskStatus}>
        <div className={styles.taskItem__status} style={{ backgroundColor: taskStatusToColor(task.status) }} />
        <div className={styles.taskItem__content}>
          <h4 className={styles.taskItem__title}>{task.title}</h4>
          <p className={styles.taskItem__description}>{task.description}</p>
        </div>
        <DotsThreeVertical
          className={styles.taskItem__edit}
          size="24"
          onClick={(event) => {
            event.stopPropagation();
            setEditTaskModalIsOpen(true);
          }}
        />
      </li>
      {editTaskModalIsOpen && (
        <EditTaskModal task={task} isOpen={editTaskModalIsOpen} onClose={() => setEditTaskModalIsOpen(false)} />
      )}
    </>
  );
};

export default TaskItem;

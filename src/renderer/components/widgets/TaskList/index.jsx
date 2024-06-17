import { Plus } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import Completion from '@components/widgets/TaskList/Completion';
import styles from './styles.module.css';
import Widget, { InteractionButton } from '@components/widgets/Widget';

import TaskItem from '@components/widgets/TaskList/TaskItem';
import AddTaskModal from '@components/widgets/TaskList/AddTaskModal';

/*
  Tasks are in format of: {
    id: number,
    title: string,
    description: string,
    status: 'pending' | 'inProgress' | 'completed',
    estimatedTime: number (in minutes),
    beginTime: Date,
    endTime: Date,
}
*/

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [addTaskModalIsOpen, setAddTaskModalIsOpen] = useState(false);

  return (
    <>
      <Widget
        className={styles.taskList}
        title={`Tasks (${tasks.length})`}
        interaction={<InteractionButton icon={<Plus />} text="New Task" onClick={() => setAddTaskModalIsOpen(true)} />}
      >
        <div className={styles.taskList__container}>
          <ul className={styles.taskList__list}>
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
          <Completion tasks={tasks} />
        </div>
      </Widget>
      {addTaskModalIsOpen && <AddTaskModal onClose={() => setAddTaskModalIsOpen(false)} />}
    </>
  );
};

export default TaskList;

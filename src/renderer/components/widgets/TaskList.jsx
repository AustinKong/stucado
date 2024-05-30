import { PlusCircle, DotsThreeCircle } from '@phosphor-icons/react';

import '@styles/widgets/taskList.css';
import { Widget, InteractionButton } from '@components/widgets/Widget';

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

const DUMMY_TASKS = [
  {
    id: 1,
    title: 'Feed the dogs',
    description: 'Feed the dogs at 8:00 AM',
    status: 'pending',
    estimatedTime: 10,
    beginTime: new Date(),
    endTime: null,
  },
  {
    id: 2,
    title: 'Go to the gym',
    description: 'Go to the gym at 10:00 AM',
    status: 'inProgress',
    estimatedTime: 60,
    beginTime: new Date(),
    endTime: null,
  },
  {
    id: 3,
    title: 'Buy groceries',
    description: 'Buy groceries at 5:00 PM',
    status: 'completed',
    estimatedTime: 30,
    beginTime: new Date(),
    endTime: new Date(),
  },
];

const TaskList = () => {
  return (
    <Widget
      className="task-list"
      title={'Tasks (3)'}
      interaction={
        <InteractionButton icon={<PlusCircle />} text="Add a new task" onClick={() => console.log('click')} />
      }
    >
      <ul className="task-list__list">
        {DUMMY_TASKS.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </Widget>
  );
};

const TaskItem = ({ task }) => {
  const taskStatusToCSS = (status) =>
    status === 'pending' ? 'pending' : status === 'inProgress' ? 'in-progress' : 'completed';

  return (
    <li className="task-item">
      <div className={`task-item__status task-item__status--${taskStatusToCSS(task.status)}`} />
      <div className="task-item__content">
        <p className="task-item__title">{task.title}</p>
        <p className="task-item__description">{task.description}</p>
      </div>
      <DotsThreeCircle className="task-item__edit" size="24" color="var(--text-secondary)" />
    </li>
  );
};

export default TaskList;

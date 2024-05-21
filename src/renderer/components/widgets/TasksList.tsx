import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskStatus, deleteTask, addTask } from 'Data/slices/tasks';
import { RootState } from 'Data/store';
import { Task } from '@/shared/types/task.types';
import 'Styles/widgets/tasks-list.css';
import EditIcon from 'Assets/icons/edit.svg?react';

const TasksList: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [inputContent, setInputContent] = useState<string>('');

  const handleAddTask = () => {
    if (!inputContent) return;
    dispatch(addTask({ content: inputContent, status: 'Pending' }));
    setInputContent('');
  };

  return (
    <div className='widget tasks-list'>
      <span className='widget__header'>
        <h2 className='widget__title'>Tasks</h2>
        <h2 className='widget__subtitle'>({tasks.length})</h2>
      </span>

      <ul className='tasks-list__list'>
        {tasks.map((task) => (
          <TasksListItem key={task.id} task={task} />
        ))}

        <li className='tasks-list__task-item tasks-list__add-task'>
          <input
            type='text'
            placeholder='Add a new task...'
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          {inputContent && (
            <button onClick={() => handleAddTask()}>Add task</button>
          )}
        </li>
      </ul>
    </div>
  );
};

const TasksListItem: React.FC<{ task: Task }> = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <li className='tasks-list__task-item'>
      <button
        onClick={() => dispatch(toggleTaskStatus(task.id))}
        className={`tasks-list__task-status tasks-list__task-status--${
          task.status === 'Pending'
            ? 'pending'
            : task.status === 'InProgress'
              ? 'in-progress'
              : 'completed'
        }`}
      />

      <div className='tasks-list__task-content'>{task.content}</div>

      {/* TODO: Change Edit button to actually edit the thing instead of delete */}
      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className='tasks-list__delete-task'
      >
        <EditIcon />
      </button>
    </li>
  );
};

export default TasksList;

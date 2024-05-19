import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTaskStatus, deleteTask, addTask } from 'Data/slices/tasks';
import { RootState } from 'Data/store';
import { Task } from 'Data/types/task.types';
import 'Styles/widgets/tasks-list.css';

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
    <div className='tasks-list widget'>
      <h2>Tasks</h2>

      <ul>
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

      <button
        onClick={() => dispatch(deleteTask(task.id))}
        className='tasks-list__delete-task'
      >
        {/* TODO: Change to an edit button */}
        x️
      </button>
    </li>
  );
};

export default TasksList;

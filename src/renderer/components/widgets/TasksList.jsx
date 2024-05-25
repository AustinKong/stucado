import { useState } from 'react';
import { useSelector } from 'react-redux';

import { createTask, incrementTaskStatus, deleteTask } from '@services/tasks';

import '@styles/widgets/tasks-list.css';
import EditIcon from '@assets/icons/edit.svg?react';

const TasksList = () => {
  const tasks = useSelector((state) => state.tasks);
  const [inputContent, setInputContent] = useState('');
  const [inputEstimatedTime, setInputEstimatedTime] = useState(null);

  const handleAddTask = () => {
    if (!inputContent) return;
    void createTask(inputContent, inputEstimatedTime || 0);
    setInputContent('');
    setInputEstimatedTime(null);
  };

  return (
    <div className="tasks-list">
      <h2 className="tasks-list__title">
        Tasks &nbsp;
        <span className="tasks-list__subtitle">({tasks.length})</span>
      </h2>

      <ul className="tasks-list__list">
        {tasks.map((task) => (
          <TasksListItem key={task.id} task={task} />
        ))}

        <li className="tasks-list__task-item tasks-list__add-task">
          <input
            className="tasks-list__input-task"
            type="text"
            placeholder="Add a new task..."
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
          />
          <input
            className="tasks-list__input-task"
            type="text"
            placeholder="Estimated time (minutes)"
            value={inputEstimatedTime === null ? '' : inputEstimatedTime}
            onChange={(e) => setInputEstimatedTime(/^-?\d+$/.test(e.target.value) ? parseFloat(e.target.value) : 0)}
          />
          {inputContent && <button onClick={handleAddTask}>Add task</button>}
        </li>
      </ul>
    </div>
  );
};

const TasksListItem = ({ task }) => {
  return (
    <li className="tasks-list__task-item">
      <button
        onClick={() => void incrementTaskStatus(task.id)}
        className={`tasks-list__task-status tasks-list__task-status--${
          task.status === 'Pending' ? 'pending' : task.status === 'InProgress' ? 'in-progress' : 'completed'
        }`}
      />

      <div className="tasks-list__task-content">{task.content}</div>

      {/* TODO: Change Edit button to actually edit the thing instead of delete */}
      <button onClick={() => void deleteTask(task.id)} className="tasks-list__delete-task">
        <EditIcon />
      </button>
    </li>
  );
};

export default TasksList;

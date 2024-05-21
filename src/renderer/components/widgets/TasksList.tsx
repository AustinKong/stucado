import React, { useState } from 'react';
import { Task } from 'Types/tasksList.types';
import 'Styles/widgets/tasks-list.css';

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputContent, setInputContent] = useState<string>('');

  const handleToggleTaskStatus = (id: number) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          switch (task.status) {
            case 'Pending':
              return { ...task, status: 'InProgress' };
            case 'InProgress':
              return { ...task, status: 'Completed' };
          }
        }
        return task;
      })
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    if (!inputContent) return;
    setTasks([
      ...tasks,
      {
        id: (tasks.length > 0 ? tasks[tasks.length - 1].id : 0) + 1,
        content: inputContent,
        status: 'Pending',
      },
    ]);
    setInputContent('');
  };

  return (
    <div className='tasks-list'>
      <h1>Tasks</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className='tasks-list__task-item'>
            <button
              onClick={() => handleToggleTaskStatus(task.id)}
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
              onClick={() => handleDeleteTask(task.id)}
              className='tasks-list__delete-task'
            >
              {/* TODO: Change to an edit button */}
              x️
            </button>
          </li>
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

export default TasksList;

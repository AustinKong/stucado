import React, { useState } from 'react'
import 'Styles/widgets/tasks-list.css'

enum TaskStatus {
  Pending = 'Pending',
  InProgress = 'InProgress',
  Completed = 'Completed'
}

interface Task {
  id: number
  content: string
  status: TaskStatus
}

const TasksList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [inputContent, setInputContent] = useState<string>('')

  const handleToggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        switch (task.status) {
          case TaskStatus.Pending:
            return { ...task, status: TaskStatus.InProgress }
          case TaskStatus.InProgress:
            return { ...task, status: TaskStatus.Completed }
        }
      }
      return task
    }))
  }

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handleAddTask = () => {
    if (!inputContent) return
    setTasks([...tasks, { id: tasks.length + 1, content: inputContent, status: TaskStatus.Pending }])
    setInputContent('')
  }

  return (
    <div className='tasks-list'>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li 
            key={task.id} 
            className='task-item'
          >
            <button 
              onClick={() => handleToggleTaskStatus(task.id)}
              className={`task-status task-status__${task.status === TaskStatus.Pending ? 'pending' : task.status === TaskStatus.InProgress ? 'in-progress' : 'completed'}`}
            />

            <div
              className='task-content'
            >
              {task.content}
            </div>

            <button 
              onClick={() => handleDeleteTask(task.id)}
              className='delete-task'
            >
              {/* TODO: Change to an edit button */}
              x️
            </button>
          </li>
        ))}

        <li className='task-item add-task'>
          <input
            type="text"
            placeholder='Add a new task...'
            value={inputContent}
            onChange={e => setInputContent(e.target.value)}
          />
          {inputContent && 
            <button onClick={() => handleAddTask()}>
              Add task
            </button>
          }
        </li>
      </ul>

    </div>
  )
}

export default TasksList
import React, { useState } from 'react'

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
    <div>
      <h1>Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <button onClick={() => handleToggleTaskStatus(task.id)}>
              {task.status}
            </button>

            {task.content}

            <button onClick={() => handleDeleteTask(task.id)}>
              🗑️
            </button>
          </li>
        ))}

        <li>
          <input
            type="text"
            value={inputContent}
            onChange={e => setInputContent(e.target.value)}
          />
          <button onClick={() => handleAddTask()}>
            +
          </button>
        </li>
      </ul>

    </div>
  )
}

export default TasksList
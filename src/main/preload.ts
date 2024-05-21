import { ipcRenderer, contextBridge } from 'electron'
import { Task } from 'MainData/types/task.types'

// Declare here or the frontend wont be able to access it
declare global {
  interface Window {
    tasksAPI: {
      getTasks: () => Promise<Task[]>
      updateTasks: (tasks: Task[]) => void
    }
  }
}

contextBridge.exposeInMainWorld('tasksAPI', {
  getTasks: async () => ipcRenderer.invoke('get-tasks'),
  updateTasks: (tasks: Task[]) => ipcRenderer.send('update-tasks', tasks)
})

contextBridge.exposeInMainWorld('timetableAPI', {
})
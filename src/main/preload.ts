import { ipcRenderer, contextBridge } from 'electron'

import { TimetableSlot } from 'Types/timetable.types'
import { Task } from 'Types/task.types'

// Declare here or the frontend wont be able to access it
declare global {
  interface Window {
    tasksAPI: {
      getTasks: () => Promise<Task[]>
      createTask: (content: string, estimatedTime: number) => Promise<Task>
      updateTask: (task: Task) => Promise<Task>
      deleteTask: (id: number) => Promise<number>
    },
    timetableAPI: {
      getTimetable: () => Promise<TimetableSlot[]>
      uploadTimetable: (url: string) => Promise<TimetableSlot[]>
    }
  }
}

contextBridge.exposeInMainWorld('tasksAPI', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  createTask: (content: string, estimatedTime: number) => ipcRenderer.invoke('create-task', content, estimatedTime),
  updateTask: (task: Task) => ipcRenderer.invoke('update-task', task),
  deleteTask: (id: number) => ipcRenderer.invoke('delete-task', id),
})

contextBridge.exposeInMainWorld('timetableAPI', {
  getTimetable: () => ipcRenderer.invoke('get-timetable'),
  uploadTimetable: (url: string) => ipcRenderer.invoke('upload-timetable', url)
})
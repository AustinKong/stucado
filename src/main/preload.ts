import { ipcRenderer, contextBridge } from 'electron'

import { TimetableSlot } from 'Types/timetable.types'
import { Task } from 'Types/task.types'

// Declare here or the frontend wont be able to access it
declare global {
  interface Window {
    tasksAPI: {
      getTasks: () => Promise<Task[]>
      updateTasks: (tasks: Task[]) => void
    },
    timetableAPI: {
      getTimetable: () => Promise<TimetableSlot[]>
      uploadTimetable: (url: string) => Promise<TimetableSlot[]>
    }
  }
}

contextBridge.exposeInMainWorld('tasksAPI', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  updateTasks: (tasks: Task[]) => ipcRenderer.send('update-tasks', tasks)
})

contextBridge.exposeInMainWorld('timetableAPI', {
  getTimetable: () => ipcRenderer.invoke('get-timetable'),
  uploadTimetable: (url: string) => ipcRenderer.invoke('upload-timetable', url)
})
import { ipcRenderer, contextBridge } from 'electron';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
contextBridge.exposeInMainWorld('tasksAPI', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  createTask: (content, estimatedTime) => ipcRenderer.invoke('create-task', content, estimatedTime),
  updateTask: (task) => ipcRenderer.invoke('update-task', task),
  deleteTask: (id) => ipcRenderer.invoke('delete-task', id),
});

contextBridge.exposeInMainWorld('timetableAPI', {
  getTimetable: () => ipcRenderer.invoke('get-timetable'),
  uploadTimetable: (url) => ipcRenderer.invoke('upload-timetable', url),
});

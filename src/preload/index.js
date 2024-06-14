import { ipcRenderer, contextBridge } from 'electron';

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
contextBridge.exposeInMainWorld('tasksAPI', {
  getTasks: () => ipcRenderer.invoke('get-tasks'),
  createTask: (title, description, estimatedTime) => ipcRenderer.invoke('create-task', title, description, estimatedTime),
  updateTask: (task) => ipcRenderer.invoke('update-task', task),
  deleteTask: (id) => ipcRenderer.invoke('delete-task', id),
});

contextBridge.exposeInMainWorld('timetableAPI', {
  getTimetable: () => ipcRenderer.invoke('get-timetable'),
  uploadTimetable: (url) => ipcRenderer.invoke('upload-timetable', url),
});

contextBridge.exposeInMainWorld('insightsAPI', {
  runModel: () => ipcRenderer.invoke('run-model'),
  initializeModel: (habit) => ipcRenderer.send('initialize-model', habit),
});

contextBridge.exposeInMainWorld('pomodoroAPI', {
  // getPomodoroSettings: () => ipcRenderer.invoke('get-pomodoro-settings'),
  triggerNotification: (state) => ipcRenderer.send('trigger-notification', state),
});

contextBridge.exposeInMainWorld('settingsAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateTheme: (theme) => ipcRenderer.send('update-theme', theme),
  completeOnboarding: () => ipcRenderer.send('complete-onboarding'),
});

contextBridge.exposeInMainWorld('statisticsAPI', {
  getHoursFocused: (range) => ipcRenderer.invoke('get-hours-focused', range),
  getTasksCompleted: (range) => ipcRenderer.invoke('get-tasks-completed', range),
  getAverageProductivity: (range) => ipcRenderer.invoke('get-average-productivity', range),
});

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
  createTimetableSlot: (title, description, schedule) => ipcRenderer.invoke('create-timetable-slot', title, description, schedule),
  updateTimetableSlot: (timetableSlot) => ipcRenderer.invoke('update-timetable-slot', timetableSlot),
  deleteTimetableSlot: (id) => ipcRenderer.invoke('delete-timetable-slot', id),
  optimizeTimetable: () => ipcRenderer.invoke('optimize-timetable'),
});

contextBridge.exposeInMainWorld('insightsAPI', {
  runModel: () => ipcRenderer.send('run-model'),
  onResult: (callback) => ipcRenderer.on('model-result', callback),
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

contextBridge.exposeInMainWorld('experimentalAPI', {
  generateTestData: () => ipcRenderer.send('generate-test-data'),
});

contextBridge.exposeInMainWorld('generalAPI', {
  openExternal: (url) => ipcRenderer.send('open-external', url),
  logout: () => ipcRenderer.send('logout'),
});

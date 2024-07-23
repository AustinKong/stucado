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
  clearTimetable: () => ipcRenderer.send('clear-timetable'),
  uploadTimetable: (url) => ipcRenderer.invoke('upload-timetable', url),
  createTimetableSlot: (title, description, schedule) =>
    ipcRenderer.invoke('create-timetable-slot', title, description, schedule),
  updateTimetableSlot: (timetableSlot) => ipcRenderer.invoke('update-timetable-slot', timetableSlot),
  deleteTimetableSlot: (id) => ipcRenderer.invoke('delete-timetable-slot', id),
  optimizeTimetable: () => ipcRenderer.invoke('optimize-timetable'),
});

contextBridge.exposeInMainWorld('insightsAPI', {
  runModel: () => ipcRenderer.invoke('run-model'),
  initializeModel: (habit) => ipcRenderer.send('initialize-model', habit),
});

contextBridge.exposeInMainWorld('pomodoroAPI', {
  getPomodoroSettings: () => ipcRenderer.invoke('get-pomodoro-settings'),
  triggerNotification: (state) => ipcRenderer.send('trigger-notification', state),
  endSession: (session) => ipcRenderer.send('end-session', session),
});

contextBridge.exposeInMainWorld('settingsAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  updateTheme: (theme) => ipcRenderer.send('update-theme', theme),
  updateColorTheme: (colorTheme) => ipcRenderer.send('update-color-theme', colorTheme),
  completeOnboarding: () => ipcRenderer.send('complete-onboarding'),
  toggleNotifications: () => ipcRenderer.send('toggle-notifications'),
  changeExternalLink: (externalLink) => ipcRenderer.send('change-external-link', externalLink),
  changeUsername: (username) => ipcRenderer.send('change-username', username),
  changeStatus: (status) => ipcRenderer.send('change-status', status),
  changeProfilePicture: (profilePicture) => ipcRenderer.send('change-profile-picture', profilePicture),
});

contextBridge.exposeInMainWorld('statisticsAPI', {
  getHoursFocused: (range) => ipcRenderer.invoke('get-hours-focused', range),
  getTasksCompleted: (range) => ipcRenderer.invoke('get-tasks-completed', range),
  getAverageProductivity: (range) => ipcRenderer.invoke('get-average-productivity', range),
  getCurrentTasksCompleted: () => ipcRenderer.invoke('get-current-tasks-completed'),
  getCurrentAverageProductivity: () => ipcRenderer.invoke('get-current-average-productivity'),
  getCurrentHoursFocused: () => ipcRenderer.invoke('get-current-hours-focused'),
});

contextBridge.exposeInMainWorld('experimentalAPI', {
  generateTestData: () => ipcRenderer.send('generate-test-data'),
  resetOnboarding: () => ipcRenderer.send('reset-onboarding'),
  tearDown: () => ipcRenderer.send('tear-down'),
});

contextBridge.exposeInMainWorld('generalAPI', {
  openExternal: (url) => ipcRenderer.send('open-external', url),
  logout: () => ipcRenderer.send('logout'),
  clearData: () => ipcRenderer.send('clear-data'),
});

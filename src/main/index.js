import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import { getTasks, createTask, updateTask, deleteTask } from '@services/tasks';
import {
  uploadTimetable,
  getTimetable,
  createTimetableSlot,
  updateTimetableSlot,
  deleteTimetableSlot,
  optimizeTimetable,
  clearTimetable,
} from '@services/timetable';
import { runModel, initializeModel } from '@services/insights';
import { triggerNotification, endSession, getPomodoroSettings } from '@services/pomodoro';
import {
  getSettings,
  updateTheme,
  completeOnboarding,
  resetOnboarding,
  setThemeOnStart,
  toggleNotifications,
  changeExternalLink,
  changeUsername,
  changeStatus,
} from '@services/settings';
import {
  getHoursFocused,
  getTasksCompleted,
  getAverageProductivity,
  getCurrentHoursFocused,
  getCurrentTasksCompleted,
  getCurrentAverageProductivity,
} from '@services/statistics';
import { generateTestData, tearDown } from '@services/experimental';
import { logout, clearData } from '@services/general';

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    icon: icon,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
    },
  });

  mainWindow.maximize();

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('Stucado');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
app.whenReady().then(() => {
  ipcMain.handle('get-tasks', getTasks);
  ipcMain.handle('create-task', createTask);
  ipcMain.handle('update-task', updateTask);
  ipcMain.handle('delete-task', deleteTask);

  ipcMain.handle('upload-timetable', uploadTimetable);
  ipcMain.handle('get-timetable', getTimetable);
  ipcMain.handle('create-timetable-slot', createTimetableSlot);
  ipcMain.handle('update-timetable-slot', updateTimetableSlot);
  ipcMain.handle('delete-timetable-slot', deleteTimetableSlot);
  ipcMain.handle('optimize-timetable', optimizeTimetable);
  ipcMain.on('clear-timetable', clearTimetable);

  ipcMain.handle('run-model', runModel);
  ipcMain.on('initialize-model', initializeModel);

  ipcMain.on('trigger-notification', triggerNotification);
  ipcMain.on('end-session', endSession);
  ipcMain.handle('get-pomodoro-settings', getPomodoroSettings);

  ipcMain.on('update-theme', updateTheme);
  ipcMain.handle('get-settings', getSettings);
  ipcMain.on('complete-onboarding', completeOnboarding);
  ipcMain.on('toggle-notifications', toggleNotifications);
  ipcMain.on('change-external-link', changeExternalLink);
  ipcMain.on('change-username', changeUsername);
  ipcMain.on('change-status', changeStatus);

  ipcMain.handle('get-hours-focused', getHoursFocused);
  ipcMain.handle('get-tasks-completed', getTasksCompleted);
  ipcMain.handle('get-average-productivity', getAverageProductivity);
  ipcMain.handle('get-current-hours-focused', getCurrentHoursFocused);
  ipcMain.handle('get-current-tasks-completed', getCurrentTasksCompleted);
  ipcMain.handle('get-current-average-productivity', getCurrentAverageProductivity);

  ipcMain.on('generate-test-data', generateTestData);
  ipcMain.on('reset-onboarding', resetOnboarding);
  ipcMain.on('tear-down', tearDown);

  ipcMain.on('logout', logout);
  ipcMain.on('clear-data', clearData);
});

app.whenReady().then(setThemeOnStart);

export { mainWindow };

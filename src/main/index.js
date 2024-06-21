import { app, shell, BrowserWindow, ipcMain } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import icon from '../../resources/icon.png?asset';

import { getTasks, createTask, updateTask, deleteTask } from '@services/tasks';
import { uploadTimetable, getTimetable, createTimetableSlot, updateTimetableSlot, deleteTimetableSlot, optimizeTimetable } from '@services/timetable';
import { runModel, initializeModel } from '@services/insights';
import { triggerNotification } from '@services/pomodoro';
import { getSettings, updateTheme, completeOnboarding } from '@services/settings';
import { getHoursFocused, getTasksCompleted, getAverageProductivity } from '@services/statistics';
import { generateTestData } from '@services/experimental';
import { logout } from '@services/general';

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.mjs'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
    },
  });

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
  electronApp.setAppUserModelId('com.electron');

  updateTheme(null, 'light');

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

  ipcMain.on('run-model', runModel);
  ipcMain.on('initialize-model', initializeModel);

  ipcMain.on('trigger-notification', triggerNotification);

  ipcMain.on('update-theme', updateTheme);
  ipcMain.handle('get-settings', getSettings);
  ipcMain.on('complete-onboarding', completeOnboarding);

  ipcMain.handle('get-hours-focused', getHoursFocused);
  ipcMain.handle('get-tasks-completed', getTasksCompleted);
  ipcMain.handle('get-average-productivity', getAverageProductivity);

  ipcMain.on('generate-test-data', generateTestData);

  ipcMain.on('logout', logout);
});

export { mainWindow };
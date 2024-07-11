import { Notification } from 'electron';
import notificationIcon from '../../../resources/notificationIcon.png?asset';
import { updatePomodoro as updatePomodoroCache } from '../database/cache';
import { v4 as uuidv4 } from 'uuid';
import { getSettings } from './settings';
import { runModel } from './insights';

export async function getPomodoroSettings() {
  const DEFAULT_FOCUS_TIME = 1500;
  const DEFAULT_SHORT_BREAK = 300;
  const DEFAULT_LONG_BREAK = 1200;
  const PRODUCTIVITY_WEIGHT = 0.5;

  const productivity = await runModel();

return { shortBreakDuration: DEFAULT_SHORT_BREAK , longBreakDuration: 1200, workDuration: 1500 }
  // TODO: Calculate the optimal pomodoro settings based on productivity
}

export async function triggerNotification(_event, state) {
  const settings = await getSettings();
  if (!settings.notifications) return;

  let message;
  switch (state) {
    case 'work':
      message = 'Time get to work!';
      break;
    case 'shortBreak':
      message = 'Take a short break, be back soon!';
      break;
    case 'longBreak':
      message = 'You deserve a long break!';
      break;
  }

  new Notification({
    title: 'Stucado',
    body: message,
    icon: notificationIcon,
  }).show();
}

export async function endSession(_event, session) {
  if (session.state === 'work') {
    await updatePomodoroCache({
      id: uuidv4(),
      startTime: session.startTime,
      endTime: session.endTime,
    });
  }
}

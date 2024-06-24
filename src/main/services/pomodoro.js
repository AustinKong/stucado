import { Notification } from 'electron';
import notificationIcon from '../../../resources/notificationIcon.png?asset';
import { updatePomodoro as updatePomodoroCache } from '../database/cache';
import { v4 as uuidv4 } from 'uuid';

export async function getPomodoroSettings() {
  // TODO: Calculate the optimal pomodoro settings based on productivity
}

export async function triggerNotification(_event, state) {
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

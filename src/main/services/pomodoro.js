const { Notification } = require('electron');
import notificationIcon from '../../../resources/notificationIcon.png?asset';

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
      message = 'You deserve a long break!'
      break;
  }

  new Notification({
    title: 'Stucado',
    body: message,
    icon: notificationIcon,
  }).show();
}

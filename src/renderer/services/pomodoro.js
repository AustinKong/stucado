import { setPomodoroSettings, setPomodoroTimer, setPomodoroTracker } from '@data/slices/pomodoroSlice';
import { store } from '@data/store';

let interval;

export const retrievePomodoroSettings = async () => {
  // TODO: Have settings saved to cache
};

export const pausePomodoro = async () => {
  store.dispatch(setPomodoroTimer({ isRunning: false }));
  clearInterval(interval);
};

export const startPomodoro = async () => {
  store.dispatch(setPomodoroTimer({ isRunning: true }));
  // If timer is at 0, reset it
  if (store.getState().pomodoro.timer.timeLeft <= 0) {
    store.dispatch(
      setPomodoroTimer({ timeLeft: getStateDuration(store.getState().pomodoro.timer.state), percentageLeft: 100 })
    );
  }
  interval = setInterval(updateTimer, 1000);
};

export const stopPomodoro = async () => {
  store.dispatch(setPomodoroTimer({ isRunning: false, timeLeft: 0, percentageLeft: 100, state: 'work', sessions: 0 }));
  clearInterval(interval);
};

export const skipPomodoro = async () => {
  const timer = store.getState().pomodoro.timer;
  clearInterval(interval);
  store.dispatch(
    setPomodoroTimer({
      state: getNextState(timer.state, timer.sessions),
      sessions: timer.sessions + 1,
      timeLeft: 0,
      percentageLeft: 0,
    })
  );
  void startPomodoro();
};

// Updates store with the current time left and percentage left, which updates the UI
const updateTimer = () => {
  const timer = store.getState().pomodoro.timer;
  if (timer.timeLeft <= 0) {
    clearInterval(interval);
    store.dispatch(
      setPomodoroTimer({ sessions: timer.sessions + 1, state: getNextState(timer.state, timer.sessions) })
    );
    void startPomodoro();
    return;
  }

  if (timer.isRunning) {
    const timeLeft = timer.timeLeft - 1;
    const percentageLeft = (timeLeft / getStateDuration(timer.state)) * 100;
    store.dispatch(setPomodoroTimer({ timeLeft, percentageLeft }));
  }
};

// Utility function to get the duration of a state
const getStateDuration = (state) => {
  switch (state) {
    case 'work':
      return store.getState().pomodoro.settings.workDuration;
    case 'shortBreak':
      return store.getState().pomodoro.settings.shortBreakDuration;
    case 'longBreak':
      return store.getState().pomodoro.settings.longBreakDuration;
    default:
      return 0;
  }
};

const getNextState = (state, sessions) => {
  switch (state) {
    case 'work':
      // Add two to stop the first break from being a long break
      // Modulo 8 because a break is also coutned as a session
      if ((sessions + 2) % 8 === 0) {
        return 'longBreak';
      } else {
        return 'shortBreak';
      }
    case 'shortBreak':
      return 'work';
    case 'longBreak':
      return 'work';
    default:
      return 0;
  }
}

export const updatePomodoroDurations = async (workDuration, shortBreakDuration, longBreakDuration) => {
  store.dispatch(setPomodoroSettings({ workDuration, shortBreakDuration, longBreakDuration }));
};

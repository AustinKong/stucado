import { setPomodoroSettings, setPomodoroTimer, setPomodoroTracker } from '@data/slices/pomodoroSlice';
import { store } from '@data/store';

let interval;

export const retrievePomodoroSettings = async () => {
  // TODO: Have settings saved to cache
};

/**
 * Pauses the Pomodoro timer.
 * @async
 * @returns {Promise<void>}
 */
export const pausePomodoro = async () => {
  store.dispatch(setPomodoroTimer({ isRunning: false }));
  clearInterval(interval);
};

/**
 * Starts the Pomodoro timer.
 * @async
 * @returns {Promise<void>}
 */
export const startPomodoro = async () => {
  store.dispatch(setPomodoroTimer({ isRunning: true }));
  // If timer is at 0, reset it
  if (store.getState().pomodoro.timer.timeLeft <= 0) {
    await window.pomodoroAPI.triggerNotification(store.getState().pomodoro.timer.state);
    store.dispatch(
      setPomodoroTimer({ timeLeft: getStateDuration(store.getState().pomodoro.timer.state), percentageLeft: 100 })
    );
    store.dispatch(
      setPomodoroTracker({ startTime: new Date().getTime(), state: store.getState().pomodoro.timer.state })
    );
  }
  interval = setInterval(updateTimer, 1000);
};

/**
 * Stops the Pomodoro timer.
 * @async
 * @returns {Promise<void>}
 */
export const stopPomodoro = async () => {
  void window.pomodoroAPI.endSession({
    startTime: store.getState().pomodoro.tracker.startTime,
    endTime: new Date().getTime(),
    state: store.getState().pomodoro.tracker.state,
  });
  store.dispatch(setPomodoroTimer({ isRunning: false, timeLeft: 0, percentageLeft: 100, state: 'work', sessions: 0 }));
  clearInterval(interval);
};

/**
 * Skips the current pomodoro session to the end. And starts the next state.
 * @returns {Promise<void>} A promise that resolves when the new pomodoro session starts.
 */
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
  void window.pomodoroAPI.endSession({
    startTime: store.getState().pomodoro.tracker.startTime,
    endTime: new Date().getTime(),
    state: store.getState().pomodoro.tracker.state,
  });
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
    void window.pomodoroAPI.endSession({
      startTime: store.getState().pomodoro.tracker.startTime,
      endTime: new Date().getTime(),
      state: store.getState().pomodoro.tracker.state,
    });
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
  const pomodoroSettings = store.getState().pomodoro.settings;
  switch (state) {
    case 'work':
      return pomodoroSettings.workDuration;
    case 'shortBreak':
      return pomodoroSettings.shortBreakDuration;
    case 'longBreak':
      return pomodoroSettings.longBreakDuration;
    default:
      return 0;
  }
};

// Utility function to get the next state based on the current state and number of sessions
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
};

/**
 * Updates the durations for the Pomodoro timer.
 * @param {number} workDuration - The duration of the work period in minutes.
 * @param {number} shortBreakDuration - The duration of the short break period in minutes.
 * @param {number} longBreakDuration - The duration of the long break period in minutes.
 * @returns {Promise<void>} - A promise that resolves when the Pomodoro settings are updated.
 */
export const updatePomodoroDurations = async (workDuration, shortBreakDuration, longBreakDuration) => {
  store.dispatch(setPomodoroSettings({ workDuration, shortBreakDuration, longBreakDuration }));
};

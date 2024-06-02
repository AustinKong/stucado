import { createSlice } from '@reduxjs/toolkit';

// All units in seconds
const initialState = {
  settings: { shortBreakDuration: 300, longBreakDuration: 1200, workDuration: 1500 },
  tracker: {},
  timer: { isRunning: false, timeLeft: 0, state: 'work', percentageLeft: 100, sessions: 0 },
};

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    setPomodoroSettings: (state, action) => {
      return { ...state, settings: { ...state.settings, ...action.payload } };
    },
    setPomodoroTracker: (state, action) => {
      return { ...state, tracker: { ...state.tracker, ...action.payload } };
    },
    setPomodoroTimer: (state, action) => {
      return { ...state, timer: { ...state.timer, ...action.payload } };
    },
  },
});

export const { setPomodoroSettings, setPomodoroTracker, setPomodoroTimer } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;

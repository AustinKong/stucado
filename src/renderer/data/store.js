import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '@data/slices/tasksSlice';
import timetableReducer from '@data/slices/timetableSlice';
import pomodoroReducer from '@data/slices/pomodoroSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timetable: timetableReducer,
    pomodoro: pomodoroReducer,
  },
});

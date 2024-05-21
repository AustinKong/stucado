import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from 'Renderer/data/slices/tasksSlice';
import timetableReducer from 'Renderer/data/slices/timetableSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timetable: timetableReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
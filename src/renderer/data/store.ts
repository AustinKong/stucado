import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '@/renderer/data/slices/tasksSlice';
import timetableReducer from '@/renderer/data/slices/timetableSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    timetable: timetableReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
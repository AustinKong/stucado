import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from 'Types/task.types';

const initialState: Task[] = []

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      return action.payload
    },
  }
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
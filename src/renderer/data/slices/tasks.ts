import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus } from '@/renderer/data/types/task.types';

const initialState: Task[] = []

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ content: string, status: TaskStatus }>) => {
      state.push({ 
        id: state.length > 0 ? state[state.length - 1].id + 1 : 0,
        ...action.payload 
      })
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter(task => task.id !== action.payload)
    },
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      return state.map(task => {
        if (task.id === action.payload) {
          switch (task.status) {
            case 'Pending':
              return { ...task, status: 'InProgress' }
            case 'InProgress':
              return { ...task, status: 'Completed' }
          }
        }
        return task
      })
    },
  }
});

export const { addTask, deleteTask, toggleTaskStatus } = tasksSlice.actions;
export default tasksSlice.reducer;
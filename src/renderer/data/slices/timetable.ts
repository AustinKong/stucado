import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimetableSlot } from '../types/timetable.types';

const initialState: TimetableSlot[] = []

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    setTimetable: (state, action: PayloadAction<TimetableSlot[]>) => {
      return action.payload
    },
    addSlot: (state, action: PayloadAction<TimetableSlot>) => {
      state.push(action.payload)
    },
    deleteSlot: (state, action: PayloadAction<number>) => {
      return state.filter(slot => slot.id !== action.payload)
    },
    updateSlot: (state, action: PayloadAction<TimetableSlot>) => {
      return state.map(slot => {
        if (slot.id === action.payload.id) {
          return action.payload
        }
        return slot
      })
    },
  }
});

export const { setTimetable, addSlot, deleteSlot, updateSlot } = timetableSlice.actions;
export default timetableSlice.reducer;
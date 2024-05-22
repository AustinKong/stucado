import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimetableSlot } from 'Types/timetable.types';

const initialState: TimetableSlot[] = []

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    setTimetable: (state, action: PayloadAction<TimetableSlot[]>) => {
      return action.payload
    },
  }
});

export const { setTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;
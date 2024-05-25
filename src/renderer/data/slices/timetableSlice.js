import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const timetableSlice = createSlice({
  name: 'timetable',
  initialState,
  reducers: {
    setTimetable: (_state, action) => {
      return action.payload;
    },
  },
});

export const { setTimetable } = timetableSlice.actions;
export default timetableSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// All units in seconds
const initialState = {
  message: {},
};

const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { ...state, message: action.payload };
    },
  },
});

export const { setMessage } = insightsSlice.actions;
export default insightsSlice.reducer;
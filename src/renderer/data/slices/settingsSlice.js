import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'system',
  hasOnboarded: false,
  notifications: true,
  externalLink: 'https://canvas.nus.edu.sg/',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

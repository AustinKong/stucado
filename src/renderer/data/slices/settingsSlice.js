import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'system',
  colorTheme: 'blue',
  hasOnboarded: false,
  notifications: true,
  externalLink: 'https://canvas.nus.edu.sg/',
  username: 'user',
  status: 'studying',
  profilePicture: 'studious',
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

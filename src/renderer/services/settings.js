import { setSettings } from '@data/slices/settingsSlice';
import { store } from '@data/store';

export const setTheme = (theme) => {
  store.dispatch(setSettings({ theme }));
  window.settingsAPI.updateTheme(theme);
};

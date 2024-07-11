import { setSettings } from '@data/slices/settingsSlice';
import { store } from '@data/store';

export const setTheme = (theme) => {
  store.dispatch(setSettings({ theme }));
  window.settingsAPI.updateTheme(theme);
};

export const toggleNotifications = () => {
  store.dispatch(setSettings({ notifications: !store.getState().settings.notifications }));
  window.settingsAPI.toggleNotifications();
};

export const completeOnboarding = () => {
  window.settingsAPI.completeOnboarding();
  store.dispatch(setSettings({ hasOnboarded: true }));
};

export const retrieveSettings = async () => {
  const settings = await window.settingsAPI.getSettings();
  store.dispatch(setSettings(settings));
};

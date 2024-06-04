import { setSettings } from '@data/slices/settingsSlice';
import { store } from '@data/store';

export const setTheme = (theme) => {
  store.dispatch(setSettings({ theme }));
  window.settingsAPI.updateTheme(theme);
};

export const completeOnboarding = () => {
  console.log('user has completed onboarding')
  window.settingsAPI.completeOnboarding();
  store.dispatch(setSettings({ hasOnboarded: true }));
};

export const retrieveSettings = async () => {
  const settings = await window.settingsAPI.getSettings();
  store.dispatch(setSettings(settings));
};

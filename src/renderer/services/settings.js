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

export const changeExternalLink = (externalLink) => {
  store.dispatch(setSettings({ externalLink }));
  window.settingsAPI.changeExternalLink(externalLink);
};

export const changeUsername = (username) => {
  store.dispatch(setSettings({ username }));
  window.settingsAPI.changeUsername(username);
};

export const changeStatus = (status) => {
  store.dispatch(setSettings({ status }));
  window.settingsAPI.changeStatus(status);
};

export const changeProfilePicture = (profilePicture) => {
  store.dispatch(setSettings({ profilePicture }));
  window.settingsAPI.changeProfilePicture(profilePicture);
};

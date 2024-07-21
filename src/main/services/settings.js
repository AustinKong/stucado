import { nativeTheme } from 'electron';
import { readSettings, updateSettings } from '../database/settings';

export let settings;

export async function getSettings() {
  settings = await readSettings();
  return settings;
}

export async function updateTheme(event, theme) {
  // For gods sake dont remove this if statement
  // I spent 1 hour trying to find why the settings file keeps resetting
  if (settings) {
    nativeTheme.themeSource = theme;
    updateSettings({ ...settings, theme });
    settings = { ...settings, theme };
  }
}

export async function completeOnboarding() {
  updateSettings({ ...settings, hasOnboarded: true });
  settings = { ...settings, hasOnboarded: true };
}

export async function resetOnboarding() {
  updateSettings({ ...settings, hasOnboarded: false });
  settings = { ...settings, hasOnboarded: false };
}

export async function setThemeOnStart() {
  await getSettings();
  nativeTheme.themeSource = settings.theme;
}

export const toggleNotifications = async () => {
  updateSettings({ ...settings, notifications: !settings.notifications });
  settings = { ...settings, notifications: !settings.notifications };
};

export const changeExternalLink = async (event, externalLink) => {
  updateSettings({ ...settings, externalLink });
  settings = { ...settings, externalLink };
};

export const changeUsername = async (event, username) => {
  updateSettings({ ...settings, username });
  settings = { ...settings, username };
};

export const changeStatus = async (event, status) => {
  updateSettings({ ...settings, status });
  settings = { ...settings, status };
};

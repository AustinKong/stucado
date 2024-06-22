import { nativeTheme } from 'electron';
import { readSettings, updateSettings } from '../database/settings';

let settings;

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

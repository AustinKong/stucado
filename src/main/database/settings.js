import { app } from 'electron';
import fs from 'fs';
import path from 'path';

const SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json');
let settings;

export function readSettings() {
  try {
    settings = fs.readFileSync(SETTINGS_PATH, 'utf-8');
    settings = JSON.parse(settings);
  } catch (error) {
    settings = {
      hasOnboarded: false,
      theme: 'system',
    };
  }
  return settings;
}

export function updateSettings(newSettings) {
  settings = newSettings;
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(newSettings));
}

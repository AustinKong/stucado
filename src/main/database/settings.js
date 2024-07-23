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
      notifications: true,
      externalLink: 'https://canvas.nus.edu.sg/',
      username: 'user',
      status: 'studying',
      profilePicture: 'studious',
    };
    updateSettings(settings);
  }
  return settings;
}

export function updateSettings(newSettings) {
  settings = newSettings;
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(newSettings));
}

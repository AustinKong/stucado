import { generateStats } from './generateStats';
import { deleteStats } from '../database/stats';
import { updateSettings } from '../database/settings';
import { deleteCache } from '../database/cache';
import { deleteData } from '../database/database';
import { app } from 'electron';

export async function generateTestData() {
  await deleteStats();
  await generateStats();
}

export async function tearDown() {
  await deleteStats();
  await deleteCache();
  await deleteData();
  app.exit(0);
  /*
  updateSettings({
    hasOnboarded: false,
    theme: 'system',
    notifications: true,
  });
  */
}

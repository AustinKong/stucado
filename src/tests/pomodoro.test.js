import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test.describe('pomodoro', () => {
  let electronApp;
  let window;

  test.beforeAll(async () => {
    // Launch the Electron app
    electronApp = await electron.launch({ args: ['.'] });
    window = await electronApp.firstWindow();
    await expect(window.getByTestId('loading')).not.toBeVisible(); // Wait for the loading spinner to disappear
  });

  test.afterAll(async () => {
    // Close the app
    electronApp.close();
  });

  test('should be able to navigate to pomodoro page', async () => {
    await window.getByTestId('pomodoro-icon').click();
  });

  test('should be able to change pomodoro settings', async () => {
    await window.getByTestId('pomodoro-settings').click();
    await window.getByPlaceholder('HH:MM').nth(0).fill('120');
    await window.getByPlaceholder('HH:MM').nth(1).fill('30');
    await window.getByPlaceholder('HH:MM').nth(2).fill('100');
    await window.locator('text=Save').click();
    await expect(window.locator('text=Edit Pomodoro Settings')).not.toBeVisible();
    await window.locator('text=Start').click();
    await expect(window.locator('text=80:00')).toBeVisible();
    await window.locator('text=Stop').click();
  });

  test('should be able to start and pause timer', async () => {
    await window.locator('text=Start').click();
    // Getbytext functions same as locator but is exact match
    await expect(window.getByText('0:00', { exact: true })).not.toBeVisible();
    await expect(window.locator('text=Current: Focused')).toBeVisible();
    await window.locator('text=Pause').click();
    await expect(window.locator('text=Current: Paused')).toBeVisible();
  });

  test('should be able to skip and stop timer', async () => {
    await window.locator('text=Skip').click();
    await expect(window.locator('text=30:00')).toBeVisible();
    await expect(window.locator('text=Current: Short Break')).toBeVisible();
    await window.locator('text=Stop').click();
    await expect(window.locator('text=0:00')).toBeVisible();
    await expect(window.locator('text=Current: Paused')).toBeVisible();
  });

  test('should be able to toggle notifications', async () => {
    await window.locator('text=Turn off notifications').click();
    await expect(window.locator('text=Turn off notifications')).not.toBeVisible();
    await window.locator('text=Turn on notifications').click();
    await expect(window.locator('text=Turn on notifications')).not.toBeVisible();
  });
});

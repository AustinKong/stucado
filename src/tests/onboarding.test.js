import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test.describe('onboarding', () => {
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
    await electronApp.close();
  });

  test('should display welcome text', async () => {
    await expect(window.locator('text=Welcome to Stucado')).toBeVisible();
  });

  test('should allow users to choose theme and navigate to next step', async () => {
    await window.locator('text=Light Theme').click();
    await window.locator('text=Dark Theme').click();
    await window.locator('text=System Theme').click();

    await window.locator('text=Continue').click();
    await expect(window.locator('text=Upload your timetable').nth(0)).toBeVisible();
  });

  test('should show error message when user uploads incorrectly', async () => {
    await window.locator('text=Upload Timetable').click();
    await expect(
      window.locator('text=Error uploading your timetable, please check your input and try again or skip this step.')
    ).toBeVisible();
    await expect(window.locator('text=Retry')).toBeVisible();
  });

  test('should allow users to skip timetable upload and navigate to next step', async () => {
    await window.locator('text=Skip').nth(1).click();
    await expect(window.locator('text=Set up your habits').nth(0)).toBeVisible();
  });

  test('should allow users to choose their habits and navigate to next step', async () => {
    await window.locator('text=Early Bird').click();
    await window.locator('text=Afternoon').nth(0).click();
    await window.locator('text=Night Owl').click();

    await window.locator('text=Continue').click();
    await expect(window.locator('text=Dashboard')).toBeVisible();
  });
});

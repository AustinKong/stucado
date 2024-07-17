import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test.describe('schedule', () => {
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

  test('should show error message when uploading invalid timetable', async () => {
    await window.locator('text=Upload').click();
    await window.getByPlaceholder('Paste your NUS Mods timetable URL here').fill('invalid');
    await window.locator('text=Submit').click();
    await expect(window.locator('text=Error uploading, please retry')).toBeVisible();
    await window.locator('text=Cancel').click();
  });

  test('should be able to upload timetable and navigate to schedule page', async () => {
    await window.locator('text=Upload').click();
    await window
      .getByPlaceholder('Paste your NUS Mods timetable URL here')
      .fill('https://nusmods.com/timetable/sem-1/share?CS1010=SEC:1,LAB:D08,TUT:02');
    await window.locator('text=Submit').click();
    await expect(window.locator('text=Upload timetable')).not.toBeVisible();
    await window.getByTestId('schedule-icon').click();
  });

  test('should be able to create new slot', async () => {
    await window.locator('text=Add Slot').click();
    await window.getByPlaceholder('Add a title').fill('Test slot');
    await window.getByPlaceholder('Add a description').fill('Test description');
    await window.getByPlaceholder('HH:MM').nth(0).fill('1400');
    await window.getByPlaceholder('HH:MM').nth(1).fill('1600');
    await window.getByTestId('dropdown').click();
    await window.locator('text=Wednesday').nth(1).click();
    await window.locator('text=Submit').click();
    await expect(window.locator('text=Test slot')).toBeVisible();
  });

  test('should be able to edit slot', async () => {
    await window.locator('text=Test slot').click();
    await window.getByPlaceholder('Edit title').fill('Edited slot');
    await window.locator('text=Submit').click();
    await expect(window.locator('text=Edited slot')).toBeVisible();
    await expect(window.locator('text=Test slot')).not.toBeVisible();
  });

  test('should be able to delete slot', async () => {
    await window.locator('text=Edited slot').click();
    await window.locator('text=Delete').click();
    await expect(window.locator('text=Edited slot')).not.toBeVisible();
  });

  test('should be able to reset slots', async () => {
    await window.locator('text=Reset').click();
    await window.locator('text=Clear').nth(1).click();
    await expect(window.locator('text=CS1010')).not.toBeVisible();
  });

  test('should be able to upload slots via schedule page', async () => {
    await window.locator('text=Upload').click();
    await window
      .getByPlaceholder('Paste your NUS Mods timetable URL here')
      .fill('https://nusmods.com/timetable/sem-1/share?CS1010=SEC:1,LAB:D08,TUT:02');
    await window.locator('text=Submit').click();
    await expect(window.locator('text=Upload timetable')).not.toBeVisible();
    await expect(window.locator('text=CS1010').nth(0)).toBeVisible();
  });

  test('should be able to filter slots by type', async () => {
    await window.locator('text=Tasks').click();
    await expect(window.locator('text=CS1010')).not.toBeVisible();
    await window.locator('text=Classes').click();
    await expect(window.locator('text=CS1010').nth(0)).toBeVisible();
    await window.locator('text=All scheduled').click();
    await expect(window.locator('text=CS1010').nth(0)).toBeVisible();
  });

  test('should be able to view events today', async () => {
    await window.locator('text=Add Slot').click();
    await window.getByPlaceholder('Add a title').fill('Today slot');
    await window.getByPlaceholder('Add a description').fill('Test description');
    await window.getByPlaceholder('HH:MM').nth(0).fill('1400');
    await window.getByPlaceholder('HH:MM').nth(1).fill('1600');
    await window.locator('text=Submit').click();
    await expect(window.locator('text=Today slot').nth(0)).toBeVisible();
  });

  test('should be able to optimize slots', async () => {
    await window.getByTestId('dashboard-icon').click();
    await window.locator('text=New Task').nth(0).click();
    await window.getByPlaceholder('Enter Task Title').fill('My task');
    await window.getByPlaceholder('Enter Task Description').fill('My task description');
    await window.getByPlaceholder('HH:MM').fill('30');
    await window.locator('text=Submit').click();
    await window.getByTestId('schedule-icon').click();
    await expect(window.locator('text=My task').nth(0)).not.toBeVisible();
    await window.locator('text=Optimize').click();
    await expect(window.locator('text=My task').nth(0)).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';
import { _electron as electron } from 'playwright';

test.describe('tasks', () => {
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

  const tasks = [
    {
      title: 'Task 1',
      description: 'Description 1',
      time: '100',
    },
    {
      title: 'Task 2',
      description: 'Description 2',
      time: '56',
    },
    {
      title: 'Task 3',
      description: 'Description 3',
      time: '120',
    },
  ];

  test('should be able to create tasks', async () => {
    for (const task of tasks) {
      await window.locator('text=New Task').nth(0).click();
      await window.getByPlaceholder('Enter Task Title').fill(task.title);
      await window.getByPlaceholder('Enter Task Description').fill(task.description);
      await window.getByPlaceholder('HH:MM').fill(task.time);
      await window.locator('text=Submit').click();
      await expect(window.locator(`text=${task.title}`)).toBeVisible();
    }
  });

  test('should be able to toggle tasks', async () => {
    await expect(window.getByTestId('task-status').nth(0)).toHaveAttribute(
      'style',
      'background-color: var(--background-danger);'
    );
    await window.locator('text=Task 1').click();
    await expect(window.getByTestId('task-status').nth(0)).toHaveAttribute(
      'style',
      'background-color: var(--background-warning);'
    );
    await window.locator('text=Task 1').click();
    await expect(window.getByTestId('task-status').nth(0)).toHaveAttribute(
      'style',
      'background-color: var(--background-success);'
    );
  });

  test('should be able to delete tasks', async () => {
    await window.getByTestId('edit-icon').nth(0).click();
    await window.locator('text=Delete').click();
    await expect(window.locator(`text=${tasks[0].title}`)).not.toBeVisible();
  });

  test('should be able to edit tasks', async () => {
    const newTask = {
      title: 'Task 4',
      description: 'Description 4',
      time: '59',
    };
    await window.getByTestId('edit-icon').nth(0).click();
    await window.getByPlaceholder('Enter Task Title').fill(newTask.title);
    await window.getByPlaceholder('Enter Task Description').fill(newTask.description);
    await window.getByPlaceholder('HH:MM').fill(newTask.time);
    await window.locator('text=Edit').nth(1).click();
    await expect(window.locator(`text=${newTask.title}`)).toBeVisible();
  });
});

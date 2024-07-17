import { readAvgProductivity, readHoursFocused, readCompletedTasks } from '../database/stats.js';
import { readTasks, readPomodoro } from '../database/cache.js';
import { getProductivity as getProductivityUtil } from './general.js';
import { mergeInterval } from './stats.js';
import {
  getHoursFocused,
  getTasksCompleted,
  getAverageProductivity,
  getCurrentHoursFocused,
  getCurrentTasksCompleted,
  getCurrentAverageProductivity,
} from './statistics.js';

jest.mock('../database/stats');
jest.mock('../database/cache');
jest.mock('./general');
jest.mock('./stats');

describe('Statistics Functions', () => {
  const today = new Date().toDateString();
  const yesterday = new Date(new Date().setDate(new Date(today).getDate() - 1)).toDateString();

  describe('getHoursFocused', () => {
    const stats = [
      { date: yesterday, hours_focused: 2 },
      { date: today, hours_focused: 4 },
    ];

    beforeEach(() => {
      readHoursFocused.mockResolvedValue(stats);
    });

    test('should return hours focused after the given range date', async () => {
      const result = await getHoursFocused(null, 0); // today
      expect(result).toEqual([{ date: new Date(today), hoursFocused: 4 }]);
    });
  });

  describe('getTasksCompleted', () => {
    const stats = [
      { date: yesterday, tasks: 5 },
      { date: today, tasks: 3 },
    ];

    beforeEach(() => {
      readCompletedTasks.mockResolvedValue(stats);
    });

    test('should return tasks completed after the given range date', async () => {
      const result = await getTasksCompleted(null, 1); // One day ago
      expect(result).toEqual([
        { date: new Date(yesterday), completedTasks: 5 },
        { date: new Date(today), completedTasks: 3 },
      ]);
    });
  });

  describe('getAverageProductivity', () => {
    const stats = [
      { date: yesterday, avg_productivity: 80 },
      { date: today, avg_productivity: 93.2 },
    ];

    beforeEach(() => {
      readAvgProductivity.mockResolvedValue(stats);
    });

    test('should return average productivity after the given range date', async () => {
      const result = await getAverageProductivity(null, 1);
      expect(result).toEqual([
        { date: new Date(yesterday), averageProductivity: 80 },
        { date: new Date(today), averageProductivity: 93.2 },
      ]);
    });
  });

  describe('getCurrentHoursFocused', () => {
    const tasks = [
      {
        status: 'Completed',
        beginTime: new Date(today).setHours(10, 0, 0, 0),
        endTime: new Date(today).setHours(12, 0, 0, 0),
        estimatedTime: 100,
      },
      {
        status: 'Completed',
        beginTime: new Date(today).setHours(13, 0, 0, 0),
        endTime: new Date(today).setHours(13, 30, 0, 0),
        estimatedTime: 30,
      },
    ];

    const pomodoro = [
      { startTime: new Date(today).setHours(11, 0, 0, 0), endTime: new Date(today).setHours(12, 0, 0, 0) },
    ];

    const mergedIntervals = [
      { startTime: new Date(today).setHours(10, 0, 0, 0), endTime: new Date(today).setHours(12, 0, 0, 0) },
      { startTime: new Date(today).setHours(13, 0, 0, 0), endTime: new Date(today).setHours(13, 30, 0, 0) },
    ];

    beforeEach(() => {
      readTasks.mockResolvedValue(tasks);
      readPomodoro.mockResolvedValue(pomodoro);
      mergeInterval.mockReturnValue(mergedIntervals);
    });

    test('should return the total focused hours for completed tasks', async () => {
      const result = await getCurrentHoursFocused();
      expect(result).toBe(2.5);
    });
  });

  describe('getCurrentTasksCompleted', () => {
    const tasks = [
      {
        status: 'Completed',
        beginTime: new Date(today).setHours(10, 0, 0, 0),
        endTime: new Date(today).setHours(12, 0, 0, 0),
        estimatedTime: 100,
      },
      {
        status: 'Completed',
        beginTime: new Date(today).setHours(13, 0, 0, 0),
        endTime: new Date(today).setHours(13, 30, 0, 0),
        estimatedTime: 30,
      },
    ];

    beforeEach(() => {
      readTasks.mockResolvedValue(tasks);
    });

    test('should return the count of completed tasks', async () => {
      const result = await getCurrentTasksCompleted();
      expect(result).toBe(2);
    });
  });

  describe('getCurrentAverageProductivity', () => {
    const tasks = [
      {
        status: 'Completed',
        beginTime: new Date(today).setHours(10, 0, 0, 0),
        endTime: new Date(today).setHours(12, 0, 0, 0),
        estimatedTime: 100,
      },
      {
        status: 'Completed',
        beginTime: new Date(today).setHours(13, 0, 0, 0),
        endTime: new Date(today).setHours(13, 30, 0, 0),
        estimatedTime: 30,
      },
    ];

    beforeEach(() => {
      readTasks.mockResolvedValue(tasks);
      getProductivityUtil.mockImplementation((task) => {
        if (task.beginTime === tasks[0].beginTime) {
          return 83.33;
        }
        return 100;
      });
    });

    test('should return the average productivity for completed tasks', async () => {
      const result = await getCurrentAverageProductivity();
      expect(result).toBeCloseTo(86.67, 1);
    });
  });
});

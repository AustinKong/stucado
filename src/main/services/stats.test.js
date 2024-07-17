import {
  getDateHour,
  getTimeIntervals,
  mergeInterval,
  generateHourlyProductivity,
  generateAvgProductivity,
  generateHoursFocused,
  countCompletedTasks,
  deleteOldProdStats,
} from './stats.js';
import { readTasks, readPomodoro } from '../database/cache';
import {
  deleteProductivityStats,
  readProductivityStats,
  updateAvgProductivity,
  updateCompletedTasks,
  updateHoursFocused,
  updateProductivityStats,
} from '../database/stats.js';
import { getProductivity } from './general.js';

jest.mock('../database/cache');
jest.mock('../database/stats');
jest.mock('./general');

describe('Stats Functions', () => {
  describe('getDateHour', () => {
    test('should return the hour of the date', () => {
      const date = new Date('2024-07-06T10:00:00');
      expect(getDateHour(date)).toBe(10);
    });
  });

  // Helper function for getHourlyProductivity function
  describe('getTimeIntervals', () => {
    test('should return hourly intervals between beginTime and endTime', () => {
      const beginTime = new Date('2024-07-06T08:00:00').getTime();
      const endTime = new Date('2024-07-06T11:00:00').getTime();
      const intervals = getTimeIntervals(beginTime, endTime);
      expect(intervals.length).toBe(3);
      expect(intervals).toEqual([
        new Date('2024-07-06T08:00:00'),
        new Date('2024-07-06T09:00:00'),
        new Date('2024-07-06T10:00:00'),
      ]);
    });
  });

  // Helper function for generateHoursFocused function
  describe('mergeInterval', () => {
    test('should merge overlapping intervals', () => {
      const tasks = [
        { beginTime: new Date('2024-07-06T08:00:00').getTime(), endTime: new Date('2024-07-06T09:00:00').getTime() },
        { beginTime: new Date('2024-07-06T10:00:00').getTime(), endTime: new Date('2024-07-06T10:50:00').getTime() },
      ];
      const pomodoro = [
        { startTime: new Date('2024-07-06T08:30:00').getTime(), endTime: new Date('2024-07-06T09:30:00').getTime() },
      ];
      const result = mergeInterval(tasks, pomodoro);
      expect(result).toEqual([
        { startTime: new Date('2024-07-06T08:00:00').getTime(), endTime: new Date('2024-07-06T09:30:00').getTime() },
        { startTime: new Date('2024-07-06T10:00:00').getTime(), endTime: new Date('2024-07-06T10:50:00').getTime() },
      ]);
    });

    test('should merge overlapping intervals', () => {
      const tasks = [
        { beginTime: new Date('2024-07-06T12:00:00').getTime(), endTime: new Date('2024-07-06T14:00:00').getTime() },
        { beginTime: new Date('2024-07-06T22:00:00').getTime(), endTime: new Date('2024-07-07T01:00:00').getTime() },
        { beginTime: new Date('2024-07-07T01:20:00').getTime(), endTime: new Date('2024-07-07T02:00:00').getTime() },
      ];
      const pomodoro = [
        { startTime: new Date('2024-07-06T23:15:00').getTime(), endTime: new Date('2024-07-06T23:45:00').getTime() },
        { startTime: new Date('2024-07-07T00:15:00').getTime(), endTime: new Date('2024-07-07T01:10:00').getTime() },
      ];
      const result = mergeInterval(tasks, pomodoro);
      expect(result).toEqual([
        { startTime: new Date('2024-07-06T12:00:00').getTime(), endTime: new Date('2024-07-06T14:00:00').getTime() },
        { startTime: new Date('2024-07-06T22:00:00').getTime(), endTime: new Date('2024-07-07T01:10:00').getTime() },
        { startTime: new Date('2024-07-07T01:20:00').getTime(), endTime: new Date('2024-07-07T02:00:00').getTime() },
      ]);
    });
  });

  describe('generateHourlyProductivity', () => {
    const tasks = [
      {
        status: 'Completed',
        estimatedTime: 75,
        beginTime: new Date('2024-07-06T08:00:00').getTime(),
        endTime: new Date('2024-07-06T09:30:00').getTime(),
      },
      {
        status: 'Completed',
        estimatedTime: 60,
        beginTime: new Date('2024-07-06T09:30:00').getTime(),
        endTime: new Date('2024-07-06T10:30:00').getTime(),
      },
    ];

    beforeEach(() => {
      readTasks.mockResolvedValue(tasks);
      updateProductivityStats.mockClear();
      getProductivity.mockImplementation((task) => {
        if (task.beginTime === tasks[0].beginTime) {
          return 120;
        } else if (task.beginTime === tasks[1].beginTime) {
          return 100;
        }
        return 0;
      });
    });

    test('should generate hourly productivity statistics', async () => {
      await generateHourlyProductivity();
      expect(updateProductivityStats).toHaveBeenCalledTimes(3);
      expect(updateProductivityStats).toHaveBeenCalledWith({
        hour: '8',
        date: 'Sat Jul 06 2024',
        productivity: 120,
      });
      expect(updateProductivityStats).toHaveBeenCalledWith({
        hour: '9',
        date: 'Sat Jul 06 2024',
        productivity: 110,
      });
      expect(updateProductivityStats).toHaveBeenCalledWith({
        hour: '10',
        date: 'Sat Jul 06 2024',
        productivity: 100,
      });
    });
  });

  describe('generateAvgProductivity', () => {
    const tasks1 = [
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T08:00:00').getTime(),
        endTime: new Date('2024-07-06T09:00:00').getTime(),
        estimatedTime: 66,
      },
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T10:00:00').getTime(),
        endTime: new Date('2024-07-06T13:00:00').getTime(),
        estimatedTime: 120,
      },
    ];

    const tasks2 = [
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T15:00:00').getTime(),
        endTime: new Date('2024-07-06T16:30:00').getTime(),
        estimatedTime: 80,
      },
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T20:05:00').getTime(),
        endTime: new Date('2024-07-07T00:00:00').getTime(),
        estimatedTime: 230,
      },
    ];

    beforeEach(() => {
      updateAvgProductivity.mockClear();
    });

    test('should generate average productivity per day', async () => {
      readTasks.mockResolvedValue(tasks1);
      getProductivity.mockImplementation((task) => {
        if (task.beginTime === tasks1[0].beginTime) {
          return 110;
        }
        return 66.67;
      });

      await generateAvgProductivity();
      expect(updateAvgProductivity).toHaveBeenCalledWith({
        date: 'Sat Jul 06 2024',
        avgProductivity: 77.5, // (110*60 + 66.67*180)/240
      });
    });

    test('should generate average productivity per day', async () => {
      readTasks.mockResolvedValue(tasks2);
      getProductivity.mockImplementation((task) => {
        if (task.beginTime === tasks2[0].beginTime) {
          return 88.89;
        }
        return 97.87;
      });

      await generateAvgProductivity();
      expect(updateAvgProductivity).toHaveBeenCalledWith({
        date: 'Sat Jul 06 2024',
        avgProductivity: 95.38, // (8000 + 23000)/325
      });
    });
  });

  describe('generateHoursFocused', () => {
    const tasks1 = [
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T08:00:00').getTime(),
        endTime: new Date('2024-07-06T09:00:00').getTime(),
      },
    ];
    const pomodoro1 = [
      { startTime: new Date('2024-07-06T09:00:00').getTime(), endTime: new Date('2024-07-06T09:30:00').getTime() },
    ];

    const tasks2 = [
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T10:05:00').getTime(),
        endTime: new Date('2024-07-06T11:20:00').getTime(),
      },
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T11:20:00').getTime(),
        endTime: new Date('2024-07-06T13:20:00').getTime(),
      },
    ];
    const pomodoro2 = [];

    beforeEach(() => {
      updateHoursFocused.mockClear();
    });

    test('should generate hours focused per day', async () => {
      readTasks.mockResolvedValue(tasks1);
      readPomodoro.mockResolvedValue(pomodoro1);
      await generateHoursFocused();
      expect(updateHoursFocused).toHaveBeenCalledWith({
        date: 'Sat Jul 06 2024',
        hoursFocused: 1.5,
      });
    });

    test('should generate hours focused per day', async () => {
      readTasks.mockResolvedValue(tasks2);
      readPomodoro.mockResolvedValue(pomodoro2);
      await generateHoursFocused();
      expect(updateHoursFocused).toHaveBeenCalledWith({
        date: 'Sat Jul 06 2024',
        hoursFocused: 3.25,
      });
    });
  });

  describe('countCompletedTasks', () => {
    const tasks1 = [
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T08:00:00').getTime(),
        endTime: new Date('2024-07-06T09:00:00').getTime(),
      },
    ];
    const tasks2 = [
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T12:00:00').getTime(),
        endTime: new Date('2024-07-06T19:00:00').getTime(),
      },
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T20:00:00').getTime(),
        endTime: new Date('2024-07-06T21:00:00').getTime(),
      },
      {
        status: 'Completed',
        beginTime: new Date('2024-07-06T22:00:00').getTime(),
        endTime: new Date('2024-07-07T01:00:00').getTime(),
      },
    ];

    beforeEach(() => {
      updateCompletedTasks.mockClear();
    });

    test('should count completed tasks after last logout', async () => {
      readTasks.mockResolvedValue(tasks1);
      await countCompletedTasks();
      expect(updateCompletedTasks).toHaveBeenCalledWith({
        date: 'Sat Jul 06 2024',
        tasks: 1,
      });
    });

    test('should count completed tasks after last logout', async () => {
      readTasks.mockResolvedValue(tasks2);
      await countCompletedTasks();
      expect(updateCompletedTasks).toHaveBeenCalledWith({
        date: 'Sat Jul 06 2024',
        tasks: 3,
      });
    });
  });

  describe('deleteOldProdStats', () => {
    const productivityStats = [
      { id: 1, date: '2024-06-14' },
      { id: 2, date: '2024-06-20' },
      { id: 3, date: '2024-07-05' },
    ];

    beforeEach(() => {
      readProductivityStats.mockResolvedValue(productivityStats);
      deleteProductivityStats.mockClear();
    });

    test('should delete old productivity stats (hourly productivity) older than two weeks', async () => {
      await deleteOldProdStats();
      expect(deleteProductivityStats).toHaveBeenCalledWith(1);
      expect(deleteProductivityStats).toHaveBeenCalledWith(2);
    });
  });
});

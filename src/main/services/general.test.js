import { getTimeOfDay, getHoursInClasses, getHoursFocused, getProductivity, createDatapoints } from './general.js';
import { readTasks, readTimetable, readPomodoro } from '../database/cache';
import { updateDatapoint } from '../database/database';
import 'jest';

jest.mock('../database/cache');
jest.mock('../database/database');
jest.mock('../database/stats');
const mergeInterval = jest.fn();

describe('General Service Functions', () => {
  describe('getTimeOfDay', () => {
    test('should return the correct time of day', () => {
      expect(getTimeOfDay(5)).toBe('dawn');
      expect(getTimeOfDay(10)).toBe('lateMorning');
      expect(getTimeOfDay(15)).toBe('lateAfternoon');
      expect(getTimeOfDay(20)).toBe('evening');
      expect(getTimeOfDay(23)).toBe('night');
    });
  });

  describe('getHoursInClasses', () => {
    const timetable = [
      { schedule: { startTime: 480, endTime: 600, day: 'Monday' } }, // 8:00 - 10:00
      { schedule: { startTime: 660, endTime: 780, day: 'Monday' } }, // 11:00 - 13:00
    ];

    test('should calculate hours spent in classes within the last 16 hours', () => {
      const taskStartTime = new Date('2024-06-24T12:00:00').getTime(); // Monday 12:00
      const hours = getHoursInClasses(timetable, taskStartTime);
      expect(hours).toBe(3); // 8:00 - 10:00, 11:00 - 12:00
    });

    test('should calculate hours spent in classes within the last 16 hours', () => {
      const taskStartTime = new Date('2024-06-24T14:00:00').getTime(); // Monday 14:00
      const hours = getHoursInClasses(timetable, taskStartTime);
      expect(hours).toBe(4); // 8:00 - 10:00, 11:00 - 13:00
    });
  });

  describe('getHoursFocused', () => {
    test('should calculate the total focused hours from completed tasks and pomodoro sessions', () => {
      const tasks = [
        {
          status: 'Completed',
          beginTime: new Date('2024-06-24T14:00:00').getTime(),
          endTime: new Date('2024-06-24T16:00:00').getTime(),
        },
      ];
      const pomodoro = [
        { startTime: new Date('2024-06-24T10:00:00').getTime(), endTime: new Date('2024-06-24T11:00:00').getTime() },
      ];
      mergeInterval.mockReturnValue([
        { startTime: new Date('2024-06-24T10:00:00').getTime(), endTime: new Date('2024-06-24T11:00:00').getTime() },
      ]); //10:00 - 11:00
      const taskStartTime = new Date('2024-06-24T14:00:00').getTime();
      const focusedHours = getHoursFocused(tasks, pomodoro, taskStartTime);
      expect(focusedHours).toBe(1);
    });
  });

  describe('getProductivity', () => {
    test('should calculate productivity as a percentage', () => {
      const task = {
        estimatedTime: 100,
        beginTime: new Date('2024-06-24T14:00:00').getTime(),
        endTime: new Date('2024-06-24T16:00:00').getTime(),
      };
      const result = getProductivity(task);
      expect(result).toBeCloseTo(83.33, 2);
    });
  });

  describe('createDatapoints', () => {
    const tasks = [
      {
        status: 'Completed',
        estimatedTime: 100,
        beginTime: new Date('2024-06-24T14:00:00').getTime(),
        endTime: new Date('2024-06-24T16:00:00').getTime(),
      },
    ];
    const timetable = [
      { schedule: { startTime: 480, endTime: 600, day: 'Monday' } }, // 8:00 - 10:00
      { schedule: { startTime: 660, endTime: 780, day: 'Monday' } }, // 11:00 - 13:00
    ];
    const pomodoro = [
      { startTime: new Date('2024-06-24T10:00:00').getTime(), endTime: new Date('2024-06-24T11:00:00').getTime() },
    ];

    beforeEach(() => {
      readTasks.mockResolvedValue(tasks);
      readTimetable.mockResolvedValue(timetable);
      readPomodoro.mockResolvedValue(pomodoro);
      updateDatapoint.mockClear();
    });

    test('should create datapoints based on tasks, timetable, and pomodoro data', async () => {
      await createDatapoints();
      expect(updateDatapoint).toHaveBeenCalled();
      const firstCallArgs = updateDatapoint.mock.calls[0][0];
      expect(firstCallArgs).toEqual({
        timeOfDay: 'earlyAfternoon',
        dayOfWeek: 'Monday',
        hoursInClasses: 4,
        hoursFocused: 1,
        productivity: 83.33,
      });
    });
  });
});

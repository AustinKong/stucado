import { v4 as uuidv4 } from 'uuid';
import { DaysOfWeek } from '../../shared/constants';
import { readTimetable, updateTimetable, readTasks, updateTaskSlots, readTaskSlots } from '../database/cache';
import { allocateTasks } from '../models/timetableOptimization';
import { getTimetable, createTimetableSlot, updateTimetableSlot, optimizeTimetable } from './timetable';

jest.mock('uuid');
jest.mock('../database/cache');
jest.mock('../models/timetableOptimization');

describe('Timetable Functions', () => {
  describe('getTimetable', () => {
    const timetable = [
      { id: '1', title: 'MA1521', schedule: { startTime: 660, endTime: 720, day: 'Monday' } },
      { id: '2', title: 'CS2030', schedule: { startTime: 1020, endTime: 1080, day: 'Monday' } },
    ];

    const taskSlots = [{ id: '3', title: 'Task 1', schedule: { startTime: 720, endTime: 780, day: 'Monday' } }];

    beforeEach(() => {
      readTimetable.mockResolvedValue(timetable);
      readTaskSlots.mockResolvedValue(taskSlots);
    });

    test('should return combined timetable and task slots', async () => {
      const result = await getTimetable();
      expect(result).toEqual([
        { id: '1', title: 'MA1521', schedule: { startTime: 660, endTime: 720, day: 'Monday' }, type: 'timetable' },
        { id: '2', title: 'CS2030', schedule: { startTime: 1020, endTime: 1080, day: 'Monday' }, type: 'timetable' },
        { id: '3', title: 'Task 1', schedule: { startTime: 720, endTime: 780, day: 'Monday' }, type: 'task' },
      ]);
    });
  });

  describe('createTimetableSlot', () => {
    beforeEach(() => {
      uuidv4.mockReturnValue('unique-id');
      updateTimetable.mockClear();
    });

    test('should create and return a new timetable slot', async () => {
      const slot = await createTimetableSlot(null, 'New Slot', 'description', {
        startTime: 600,
        endTime: 660,
        day: 'Monday',
      });
      expect(slot).toEqual({
        title: 'New Slot',
        description: 'description',
        id: 'unique-id',
        schedule: { startTime: 600, endTime: 660, day: 'Monday' },
      });
      expect(updateTimetable).toHaveBeenCalledWith([slot]);
    });
  });

  describe('updateTimetableSlot', () => {
    beforeEach(() => {
      updateTimetable.mockClear();
      updateTaskSlots.mockClear();
    });

    test('should update a timetable slot', async () => {
      const slot = {
        id: '1',
        title: 'Timetable Slot',
        schedule: { startTime: 600, endTime: 660, day: 'Monday' },
        type: 'timetable',
      };
      const result = await updateTimetableSlot(null, slot);
      expect(result).toEqual(slot);
      expect(updateTimetable).toHaveBeenCalledWith([slot]);
    });

    test('should update a task slot', async () => {
      const slot = {
        id: '2',
        title: 'Task',
        schedule: { day: 'Monday', startTime: 700, endTime: 760 },
        type: 'task',
      };
      const result = await updateTimetableSlot(null, slot);
      expect(result).toEqual(slot);
      expect(updateTaskSlots).toHaveBeenCalledWith([slot]);
    });
  });

  describe('optimizeTimetable', () => {
    const today = DaysOfWeek[new Date().getDay()];
    const timetable = [
      { id: '1', title: 'MA1521', schedule: { startTime: 660, endTime: 720, day: today } },
      { id: '2', title: 'CS2030', schedule: { startTime: 1020, endTime: 1080, day: today } },
    ];

    const tasks = [{ id: '3', title: 'Task 1', status: 'Pending', estimatedTime: 60 }];

    const optimizedTasks = [{ id: '3', title: 'Task 1', schedule: { startTime: 720, endTime: 780, day: 'Monday' } }];

    beforeEach(() => {
      readTimetable.mockResolvedValue(timetable);
      readTasks.mockResolvedValue(tasks);
      allocateTasks.mockResolvedValue(optimizedTasks);
      updateTaskSlots.mockClear();
    });

    test('should optimize the timetable and return the combined timetable', async () => {
      const result = await optimizeTimetable();
      expect(result).toEqual([
        { id: '1', title: 'MA1521', schedule: { startTime: 660, endTime: 720, day: today }, type: 'timetable' },
        { id: '2', title: 'CS2030', schedule: { startTime: 1020, endTime: 1080, day: today }, type: 'timetable' },
        { id: '3', title: 'Task 1', schedule: { startTime: 720, endTime: 780, day: 'Monday' }, type: 'task' },
      ]);
      expect(updateTaskSlots).toHaveBeenCalledWith(optimizedTasks);
    });
  });
});

import { v4 as uuidv4 } from 'uuid';
import { getEmptySlots, allocateTasks, minutesToTime } from './timetableOptimization.js';
import { DaysOfWeek } from '../../shared/constants.js';

describe('Timetable Optimization Model Functions', () => {
  const today = DaysOfWeek[new Date().getDay()];
  const startWorkTime = 810; //1.30pm
  const endWorkTime = 1485; //12.45am

  const sampleTimetable = [
    {
      id: uuidv4(),
      title: 'Slot 1',
      description: '10am - 12pm',
      schedule: {
        startTime: 600,
        endTime: 720,
        day: today,
      },
    },
    {
      id: uuidv4(),
      title: 'Slot 2',
      description: '2pm - 3pm',
      schedule: {
        startTime: 840,
        endTime: 900,
        day: today,
      },
    },
    {
      id: uuidv4(),
      title: 'Slot 3',
      description: '4pm - 6pm',
      schedule: {
        startTime: 960,
        endTime: 1080,
        day: today,
      },
    },
  ];

  const tasks = [
    {
      id: uuidv4(),
      title: 'test1',
      description: '1hr task',
      estimatedTime: 60,
      status: 'Pending',
      beginTime: undefined,
      endTime: undefined,
    },
    {
      id: uuidv4(),
      title: 'test2',
      description: '4hrs task',
      estimatedTime: 240,
      status: 'Pending',
      beginTime: undefined,
      endTime: undefined,
    },
    {
      id: uuidv4(),
      title: 'test3',
      description: '25mins task',
      estimatedTime: 25,
      status: 'Pending',
      beginTime: undefined,
      endTime: undefined,
    },
  ];

  test('getEmptySlots should return correct emtpy slots', () => {
    const emptySlots = getEmptySlots(sampleTimetable, startWorkTime, endWorkTime, today);

    expect(emptySlots).toEqual([
      { startTime: 810, endTime: 840, day: today },
      { startTime: 900, endTime: 960, day: today },
      { startTime: 1080, endTime: 1485, day: today },
    ]);
  });

  test('bestFitDecreasing should allocate tasks correctly', async () => {
    const allocatedTasks = await allocateTasks(sampleTimetable, tasks, startWorkTime, endWorkTime);

    expect(allocatedTasks).toEqual([
      {
        id: expect.any(String),
        title: 'test2',
        description: `4hrs task @ ${today} 18:00 - 22:00`,
        schedule: { startTime: 1080, endTime: 1320, day: today },
      },
      {
        id: expect.any(String),
        title: 'test1',
        description: `1hr task @ ${today} 15:00 - 16:00`,
        schedule: { startTime: 900, endTime: 960, day: today },
      },
      {
        id: expect.any(String),
        title: 'test3',
        description: `25mins task @ ${today} 13:30 - 13:55`,
        schedule: { startTime: 810, endTime: 835, day: today },
      },
    ]);
  });

  test('minutesToTime should convert minutes to HH:MM format', () => {
    expect(minutesToTime(855)).toBe('14:15');
    expect(minutesToTime(60)).toBe('1:00');
    expect(minutesToTime(1440)).toBe('24:00');
  });
});

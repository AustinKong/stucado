import { TimesOfDay } from '../../shared/constants.js';
import { deleteData, readDatapoints, updateDatapoint } from '../database/database.js';
import { predictProductivity } from '../models/gradientDescent.js';
import { getHoursFocused, getHoursInClasses } from './general.js';
import { readTimetable, readTasks, readPomodoro } from '../database/cache.js';

const morningData = `
midnight Monday 2 10 52.976
midnight Thursday 2 7 29.737
midnight Friday 4 6 30.692
dawn Friday 0 8 51.77
dawn Monday 3 3 54.954
dawn Saturday 5 5 67.756
earlyMorning Friday 0 1 123.857
earlyMorning Monday 1 0 171.046
earlyMorning Sunday 0 2 134.919
lateMorning Saturday 1 1 141.962
lateMorning Sunday 3 5 132.271
lateMorning Tuesday 1 1 163.39
lateMorning Wednesday 2.5 4 121.458
earlyAfternoon Thursday 7 6 97.969
earlyAfternoon Friday 4 5 107.884
earlyAfternoon Saturday 0 2 96.669
lateAfternoon Thursday 6 4 83.965
lateAfternoon Sunday 0 6 77.912
lateAfternoon Tuesday 5 7 91.971
evening Saturday 0 6 79.97
evening Wednesday 5 5 85.074
evening Wednesday 7 3 73.211
night Saturday 0 8 66.084
night Wednesday 3 7 69.963
night Monday 3 5 73.251
`;

const afternoonData = `
midnight Friday 5 3 72.938
midnight Tuesday 7 10 58.445
midnight Wednesday 3 4 86.311
dawn Monday 3 3 30.811
dawn Saturday 0 5 22.562
dawn Thursday 7 9 33.312
earlyMorning Friday 1 1 60.717
earlyMorning Monday 1 1 73.144
earlyMorning Sunday 0 2 53.652
lateMorning Wednesday 1 1 100.893
lateMorning Saturday 0 5 81.678
lateMorning Thursday 3 3 94.297
earlyAfternoon Tuesday 2 5 139.839
earlyAfternoon Wednesday 5 4 123.55
earlyAfternoon Thursday 1 2 159.384
lateAfternoon Monday 3 6 157.87
lateAfternoon Friday 5 5 132.971
lateAfternoon Saturday 0 4 141.248
lateAfternoon Tuesday 2 1 146.334
evening Sunday 0 9 83.253
evening Tuesday 5 5 75.895
evening Friday 4 6 103.073
night Sunday 0 7 91.664
night Monday 6 10 76.958
night Thursday 0 6 88.357
`;

const nightData = `
midnight Monday 5 6 112.279
midnight Wednesday 0 2 99.342
midnight Friday 6 4 92.499
midnight Sunday 0 10 118.644
dawn Monday 3 2 51.321
dawn Sunday 0 6 64.386
dawn Thursday 5 10 30.824
earlyMorning Monday 1 2 40.055
earlyMorning Tuesday 1 1 58.91
earlyMorning Saturday 0 2 36.441
lateMorning Friday 1 2 71.793
lateMorning Wednesday 2 0 65.9
lateMorning Sunday 0 3 66.403
earlyAfternoon Monday 3 6 63.667
earlyAfternoon Tuesday 2 4 74.657
earlyAfternoon Friday 1 2 89.287
lateAfternoon Saturday 0 6 87.088
lateAfternoon Thursday 4 8 76.568
lateAfternoon Wednesday 5 5 97.03
evening Tuesday 2 7 115.93
evening Thursday 5 5 126.09
evening Wednesday 7 6 138.646
night Friday 5 8 145.372
night Tuesday 4 5 166.952
night Thursday 2 5 185.294
`;

export function processRawData(rawData) {
  const result = [];
  const lines = rawData.trim().split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const parts = line.split(' ');
    const [timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, productivity] = parts;
    result.push({
      timeOfDay,
      dayOfWeek,
      hoursInClasses,
      hoursFocused,
      productivity,
    });
  }
  return result;
}

export async function runModel() {
  const timetable = await readTimetable();
  const tasks = await readTasks();
  const pomodoro = await readPomodoro();
  const datapoints = await readDatapoints();

  const timeOfDay = TimesOfDay[Math.floor((new Date().getHours() * 8) / 24)];
  const hoursInClasses = getHoursInClasses(timetable, new Date().getTime());
  const hoursFocused = getHoursFocused(tasks, pomodoro, new Date().getTime());
  const dayOfWeek = new Date().getDay();

  const result = await predictProductivity(datapoints, timeOfDay, dayOfWeek, hoursInClasses, hoursFocused);
  return result;
}

export async function initializeModel(_event, habit) {
  await deleteData();
  let datapoints = [];
  switch (habit) {
    case 'earlyBird':
      datapoints = processRawData(morningData);
      for await (const data of datapoints) {
        updateDatapoint(data);
      }
      break;
    case 'afternoon':
      datapoints = processRawData(afternoonData);
      for await (const data of datapoints) {
        updateDatapoint(data);
      }
      break;
    case 'nightOwl':
      datapoints = processRawData(nightData);
      for await (const data of datapoints) {
        updateDatapoint(data);
      }
      break;
    default:
      break;
  }
}

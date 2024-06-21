import { predictProductivity } from '../models/gradientDescent.js';
import { TimesOfDay } from '../../shared/constants.js';
import { readDataPoints } from '../database/database.js';

// TODO: Convert this to have morning, afternoon, night raw data
/*
const rawData = `
midnight Sunday 0 5 80.2819977
dawn Sunday 2 5 45.69
lateMorning Sunday 0 2 87.0940917
lateAfternoon Sunday 5 4 57.3437
dawn Monday 3 7 17.8864896
lateMorning Monday 1 2 77.389
earlyAfternoon Monday 3 3 79.6783827
earlyMorning Tuesday 0 1 108.289457
earlyAfternoon Tuesday 2 1.5 81.1513711
evening Tuesday 3 5 49.9780856
dawn Tuesday 3 0 28.1594180
earlyMorning Wednesday 0 1 120.940
earlyAfternoon Wednesday 1 3 88.39
night Wednesday 1 8 93.8474123
dawn Thursday 2 3 65.9834
midnight Thursday 5 6 75.6206944
night Thursday 5 7 62.7616772
evening Thursday 5 5 62.7894415
earlyMorning Friday 0 2 93.85
night Friday 4 8 88.6510144
lateAfternoon Friday 4 7 67.2026135
evening Saturday 0 6 89.2
midnight Saturday 0 12 67.4273954
lateAfternoon Saturday 0 5 65.0768531
lateMorning Saturday 0 1 150.04
`;
*/

export async function runModel() {
  const datapoints = await readDataPoints();
  const timeOfDay = TimesOfDay[Math.floor((new Date().getHours() * 8) / 24)];
  const hoursInClasses = 0;
  const hoursFocused = 0;
  const dayOfWeek = new Date().getDay();
  return predictProductivity(datapoints, timeOfDay, dayOfWeek, +hoursInClasses, +hoursFocused);
}

export async function initializeModel(_event, habit) {
  console.log('called initialize model from insights service @ main: ' + habit);
  return habit;
}

import { predictProductivity } from '@models/gradientDescent';
import { TimesOfDay } from '@shared/constants';

export async function runModel() {
  const timeOfDay = TimesOfDay[Math.floor((new Date().getHours() * 8) / 24)];
  const hoursInClasses = 0;
  const hoursFocused = 0;
  const dayOfWeek = new Date().getDay();
  return predictProductivity(timeOfDay, dayOfWeek, +hoursInClasses, +hoursFocused);
}

/*
function timeOfDayToCategorical(timeOfDay) {
  const timeOfDayIndex = Math.floor((((timeOfDay % 1440) / 60) * 8) / 24);
  return TimesOfDay[timeOfDayIndex];
}
*/

export async function initializeModel(_event, habit) {
  console.log('called initialize model from insights service @ main: ' + habit);
  return habit;
}

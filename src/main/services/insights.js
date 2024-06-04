import { predictProductivity } from '@models/gradientDescent';
import { TimesOfDay } from '@shared/constants';

export async function runModel(_event, inputs) {
  const { timeOfDay, hoursInClasses, hoursFocused, dayOfWeek } = inputs;
  return predictProductivity(timeOfDayToCategorical(+timeOfDay), dayOfWeek, +hoursInClasses, +hoursFocused);
}

function timeOfDayToCategorical(timeOfDay) {
  const timeOfDayIndex = Math.floor((((timeOfDay % 1440) / 60) * 8) / 24);
  return TimesOfDay[timeOfDayIndex];
}

export async function initializeModel(_event, habit) {
  console.log('called initialize model from insights service @ main: ' + habit);
  return habit;
}

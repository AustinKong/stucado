import { predictProductivity } from '@models/gradientDescent';
import { TimesOfDay } from '@shared/constants';

export async function runModel(_event, inputs) {
  const { timeOfDay, hoursInClasses, hoursFocused, dayOfWeek } = inputs;
  console.log(timeOfDayToCategorical(timeOfDay));
  return predictProductivity(timeOfDay, dayOfWeek, hoursInClasses, hoursFocused);
}

function timeOfDayToCategorical(timeOfDay) {
  const timeOfDayIndex = Math.floor((((timeOfDay % 1440) / 60) * 8) / 24);
  return TimesOfDay[timeOfDayIndex];
}

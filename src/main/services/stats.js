import { DaysOfWeek } from '../../shared/constants.js';
import { readTasks } from '../database/cache.js';
import { updateProductivityStats } from '../database/stats.js';
import { getProductivity } from './general.js';

/* Helper functions for past productivity statistics */
export function getDateHour(date) {
  return new Date(date).getHours();
}

export function getTimeIntervals(beginTime, endTime) {
  const intervals = [];
  let current = new Date(beginTime).setHours(getDateHour(beginTime), 0);
  let end = new Date(endTime).setHours(getDateHour(endTime), 0);

  // If the task ends on x o' clock sharp, we don't create another time interval
  if (end == endTime) {
    end = new Date(endTime).setHours(getDateHour(endTime) - 1, 0);
  }

  while (current <= end) {
    intervals.push(new Date(current));
    current = new Date(current).setHours(new Date(current).getHours() + 1);
  }
  return intervals;
}

/* Get past productivity */
export async function generatePastProductivity() {
  const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');
  const productivityData = {};

  completedTasks.forEach((task) => {
    const productivity = getProductivity(task);
    const intervals = getTimeIntervals(task.beginTime, task.endTime);

    intervals.forEach((interval, index) => {
      const hour = new Date(interval).getHours();
      const dayOfWeek = DaysOfWeek[new Date(interval).getDay()];
      const date = new Date(interval).toDateString();
      const key = `${hour}-${dayOfWeek}-${date}`;

      if (!productivityData[key]) {
        productivityData[key] = [];
      }

      const intervalStart = new Date(interval);
      let intervalEnd = new Date(interval);
      intervalEnd.setHours(intervalEnd.getHours() + 1);

      const start = index === 0 ? new Date(task.beginTime) : intervalStart;
      const end = index === intervals.length - 1 ? new Date(task.endTime) : intervalEnd;
      const durationInMinutes = (end - start) / 1000 / 60;

      productivityData[key].push({ productivity, durationInMinutes });
    });
    //console.log(productivityData);
  });

  Object.keys(productivityData).forEach((key) => {
    const [hour, dayOfWeek, date] = key.split('-');
    const productivities = productivityData[key];

    const totalDuration = productivities.reduce((acc, entry) => acc + entry.durationInMinutes, 0);
    const weightedProductivity = productivities.reduce(
      (acc, entry) => acc + entry.productivity * entry.durationInMinutes,
      0
    );
    const avgProductivity = weightedProductivity / totalDuration;

    const prod = {
      time: hour,
      dayOfWeek,
      date,
      productivity: avgProductivity,
    };

    updateProductivityStats(prod);
  });
}

/* Today's productivity for home page */
export function generateProductivityToday(tasks) {
  //const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');
  let totalDuration = 0;
  let totalProductivity = 0;
  completedTasks.forEach((task) => {
    const duration = (task.endTime - task.beginTime) / 60 / 1000;
    console.log(duration);
    console.log(getProductivity(task));
    totalProductivity += getProductivity(task) * duration;
    totalDuration += duration;
  });
  return Math.round((totalProductivity / totalDuration) * 100) / 100;
}

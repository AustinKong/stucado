import { readTasks, readPomodoro } from '../database/cache.js';
import { updateAvgProductivity, updateHoursFocused, updateProductivityStats } from '../database/stats.js';
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

/* Get past productivity by hour*/
export async function generateHourlyProductivity() {
  const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');
  const productivityData = {};

  completedTasks.forEach((task) => {
    const productivity = getProductivity(task);
    const intervals = getTimeIntervals(task.beginTime, task.endTime);

    intervals.forEach((interval, index) => {
      const hour = new Date(interval).getHours();
      const date = new Date(interval).toDateString();
      const key = `${hour}-${date}`;

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
    const [hour, date] = key.split('-');
    const productivities = productivityData[key];

    const totalDuration = productivities.reduce((acc, entry) => acc + entry.durationInMinutes, 0);
    const weightedProductivity = productivities.reduce(
      (acc, entry) => acc + entry.productivity * entry.durationInMinutes,
      0
    );
    const avgProductivity = weightedProductivity / totalDuration;

    const prod = {
      time: hour,
      date,
      productivity: avgProductivity,
    };

    updateProductivityStats(prod);
  });
}

/* Average productivity per day */
export async function generateProductivityToday(tasks) {
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
  const prod = {
    date: new Date(task.beginTime).toDateString(),
    productivity: Math.round((totalProductivity / totalDuration) * 100) / 100,
  };
  await updateAvgProductivity(prod);
}

/* Helper function to merge all intervals for tasks and pomodoro sessions */
export function mergeInterval(tasks, pomodoro) {
  const intervals = [];

  tasks.forEach((task) => {
    intervals.push({
      startTime: task.beginTime,
      endTime: task.endTime,
    });
  });

  pomodoro.forEach((session) => {
    intervals.push({
      startTime: new Date(session.startTime).getTime(),
      endTime: new Date(session.endTime).getTime(),
    });
  });

  intervals.sort((a, b) => a.startTime - b.startTime);

  if (intervals.length == 0) return [];
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const lastInterval = result[result.length - 1];
    const currInterval = intervals[i];
    // To separate the intervals of today and tmr
    if (new Date(currInterval.startTime).getDay() != new Date(currInterval.endTime).getDay()) {
      result.push(
        {
          startTime: currInterval.startTime,
          endTime: new Date(currInterval.startTime).setHours(23, 59, 59, 999),
        },
        {
          startTime: new Date(currInterval.startTime).setHours(24, 0, 0, 0),
          endTime: currInterval.endTime,
        }
      );
      continue;
    }
    if (currInterval.startTime > lastInterval.endTime) {
      result.push(currInterval);
    } else {
      lastInterval.endTime = new Date(Math.max(currInterval.endTime, lastInterval.endTime));
    }
  }
  return result;
}

/* Hours focused per day */
export async function generateHoursFocused() {
  const tasks = await readTasks();
  const pomodoro = await readPomodoro();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');

  const mergedIntervals = mergeInterval(completedTasks, pomodoro);

  const hoursFocusedByDay = {};

  mergedIntervals.forEach((interval) => {
    const date = new Date(interval.startTime).toDateString();
    const duration = (interval.endTime - interval.startTime) / 1000 / 60 / 60;

    if (!hoursFocusedByDay[date]) {
      hoursFocusedByDay[date] = 0;
    }
    hoursFocusedByDay[date] += duration;
  });

  for (const date in hoursFocusedByDay) {
    await updateHoursFocused({
      date: date,
      hoursFocused: Math.round(hoursFocusedByDay[date] * 100) / 100,
    });
  }
}

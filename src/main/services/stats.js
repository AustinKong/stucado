import { readTasks, readPomodoro } from '../database/cache.js';
import {
  deleteProductivityStats,
  readProductivityStats,
  updateAvgProductivity,
  updateCompletedTasks,
  updateHoursFocused,
  updateProductivityStats,
} from '../database/stats.js';
import { getProductivity } from './general.js';

/* Helper functions for past productivity statistics */
export function getDateHour(date) {
  return new Date(date).getHours();
}

export function getTimeIntervals(beginTime, endTime) {
  const intervals = [];
  let current = new Date(beginTime).setHours(getDateHour(beginTime), 0, 0, 0);
  let end = new Date(endTime).setHours(getDateHour(endTime), 0, 0, 0);

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

/* Helper function to merge all intervals for tasks and pomodoro sessions */
export function mergeInterval(tasks, pomodoro) {
  const intervals = [];

  tasks.forEach((task) => {
    intervals.push({
      startTime: new Date(task.beginTime).getTime(),
      endTime: new Date(task.endTime).getTime(),
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

    if (currInterval.startTime > lastInterval.endTime) {
      result.push(currInterval);
    } else {
      lastInterval.endTime = new Date(Math.max(currInterval.endTime, lastInterval.endTime)).getTime();
    }
  }
  return result;
}

/* Get past productivity by hour*/
export async function generateHourlyProductivity() {
  const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status === 'Completed');
  const productivityData = {};

  for await (const task of completedTasks) {
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
  }

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
      hour: hour,
      date: date,
      productivity: avgProductivity,
    };

    updateProductivityStats(prod);
  });
}

/* Average productivity per day */
export async function generateAvgProductivity() {
  const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  let totalDuration = 0;
  let totalProductivity = 0;
  let date = new Date();

  for await (const task of completedTasks) {
    date = new Date(task.beginTime).toDateString();
    const duration = (task.endTime - task.beginTime) / 60 / 1000;
    totalProductivity += task.estimatedTime * 100;
    totalDuration += duration;
  }

  await updateAvgProductivity({
    date,
    avgProductivity: Math.round((totalProductivity / totalDuration) * 100) / 100,
  });
}

/* Hours focused per day */
export async function generateHoursFocused() {
  const tasks = await readTasks();
  const pomodoro = await readPomodoro();
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  const mergedIntervals = mergeInterval(completedTasks, pomodoro);
  let date = new Date();
  let totalFocusedHours = 0;

  if (mergedIntervals.length > 0) {
    date = new Date(mergedIntervals[0].startTime).toDateString();
    mergedIntervals.forEach((interval) => {
      totalFocusedHours += (interval.endTime - interval.startTime) / 1000 / 60 / 60;
    });
  }

  await updateHoursFocused({
    date,
    hoursFocused: Math.round(totalFocusedHours * 100) / 100,
  });
}

/* Find completed tasks per day */
export async function countCompletedTasks() {
  const tasks = await readTasks();
  // Find tasks that are completed
  const completedTasks = tasks.filter((task) => task.status === 'Completed');

  if (completedTasks.length > 0) {
    await updateCompletedTasks({
      date: new Date(completedTasks[0].beginTime).toDateString(),
      tasks: completedTasks.length,
    });
  }
}

// generateProductivityToday, generateHoursFocused, countCompletedTasks will need to be called when toggle task & during app restart
// generateHourlyProductivity would only be called during logout, assuming user logs out everyday

export async function deleteOldProdStats() {
  const productivityStats = await readProductivityStats();
  const today = new Date();
  const twoWeeksAgo = new Date(today);
  twoWeeksAgo.setDate(today.getDate() - 14);

  for await (const prod of productivityStats) {
    const date = new Date(prod.date);

    if (date < twoWeeksAgo) {
      await deleteProductivityStats(prod.id);
    }
  }
}

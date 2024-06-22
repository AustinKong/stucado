import { readAvgProductivity, readHoursFocused, readCompletedTasks } from '../database/stats.js';
import { readTasks, readPomodoro } from '../database/cache.js';
import { getProductivity as getProductivityUtil } from './general.js';
import { mergeInterval } from './stats.js';

export async function getHoursFocused(event, range) {
  let stats = await readHoursFocused();
  let cutoffDate = new Date().setDate(new Date().getDate() - range - 1);

  stats = stats
    .map((stat) => {
      return {
        date: new Date(stat.date),
        hoursFocused: stat.hours_focused,
      };
    })
    .filter((stat) => {
      return stat.date >= cutoffDate;
    });

  return stats;
}

export async function getTasksCompleted(event, range) {
  let stats = await readCompletedTasks();
  let cutoffDate = new Date().setDate(new Date().getDate() - range - 1);

  stats = stats
    .map((stat) => {
      return {
        date: new Date(stat.date),
        completedTasks: stat.tasks,
      };
    })
    .filter((stat) => {
      return stat.date >= cutoffDate;
    });

  return stats;
}

export async function getAverageProductivity(event, range) {
  let stats = await readAvgProductivity();
  let cutoffDate = new Date().setDate(new Date().getDate() - range - 1);

  stats = stats
    .map((stat) => {
      return {
        date: new Date(stat.date),
        averageProductivity: stat.avg_productivity,
      };
    })
    .filter((stat) => {
      return stat.date >= cutoffDate;
    });

  return stats;
}

export async function getCurrentHoursFocused() {
  const tasks = await readTasks();
  const pomodoro = await readPomodoro();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');

  const mergedIntervals = mergeInterval(completedTasks, pomodoro);
  let totalFocusedHours = 0;

  if (mergedIntervals.length > 0) {
    mergedIntervals.forEach((interval) => {
      totalFocusedHours += (interval.endTime - interval.startTime) / 1000 / 60 / 60;
    });
  }

  return Math.round(totalFocusedHours * 100) / 100;
}

export async function getCurrentTasksCompleted() {
  const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');
  return completedTasks.length;
}

export async function getCurrentAverageProductivity() {
  const tasks = await readTasks();
  const completedTasks = tasks.filter((task) => task.status == 'Completed');

  let totalDuration = 0;
  let totalProductivity = 0;

  for await (const task of completedTasks) {
    const duration = (task.endTime - task.beginTime) / 60 / 1000;
    totalProductivity += getProductivityUtil(task) * duration;
    totalDuration += duration;
  }

  return Math.round((totalProductivity / totalDuration) * 100) / 100;
}

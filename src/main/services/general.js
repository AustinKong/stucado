import { DaysOfWeek, TimesOfDay } from '../../shared/constants.js';
import {
  readTimetable,
  readTasks,
  deleteCompletedTasks,
  deletePomodoro,
  deleteCache,
  readPomodoro,
} from '../database/cache.js';
import { updateDatapoint } from '../database/database.js';
import {
  countCompletedTasks,
  generateAvgProductivity,
  generateHourlyProductivity,
  generateHoursFocused,
  mergeInterval
} from './stats.js';
import { app } from 'electron';
import { deleteStats } from '../database/stats.js';

export function getTimeOfDay(hour) {
  const index = Math.floor(hour / 3);
  return TimesOfDay[index];
}

export function getHoursInClasses(timetable, taskStartTime) {
  //const timetable = await readTimetable();
  let hours = 0;
  const sixteenHoursAgo = new Date(taskStartTime - 16 * 60 * 60 * 1000);
  const taskStartDay = new Date(taskStartTime).getDay();

  for (const slot of timetable) {
    const slotDay = DaysOfWeek.indexOf(slot.schedule.day);
    let slotTime = new Date(taskStartTime);
    if (slotDay == taskStartDay) {
      slotTime = new Date(taskStartTime).setHours(
        Math.floor(slot.schedule.startTime / 60),
        slot.schedule.startTime % 60,
        0,
        0
      );
    } else if (slotDay == sixteenHoursAgo.getDay()) {
      slotTime = new Date(sixteenHoursAgo).setHours(
        Math.floor(slot.schedule.startTime / 60),
        slot.schedule.startTime % 60,
        0,
        0
      );
    } else {
      slotTime = 0;
    }
    if (slotTime >= sixteenHoursAgo && slotTime <= new Date(taskStartTime)) {
      hours += (slot.schedule.endTime - slot.schedule.startTime) / 60;
    }
  }
  //console.log(hours);
  return hours;
}

export function getHoursFocused(tasks, pomodoro, taskStartTime) {
  const previousTasks = tasks.filter((task) => task.status === 'Completed' && task.endTime <= taskStartTime);
  const mergedIntervals = mergeInterval(previousTasks, pomodoro);
  let totalFocusedHours = 0;

  if (mergedIntervals.length > 0) {
    mergedIntervals.forEach((interval) => {
      totalFocusedHours += (interval.endTime - interval.startTime) / 1000 / 60 / 60;
    });
  }
  return Math.round(totalFocusedHours * 100) / 100;
}

export function getProductivity(task) {
  const timeTaken = (task.endTime - task.beginTime) / 60 / 1000; //in minutes
  return (task.estimatedTime / timeTaken) * 100;
}

export async function createDatapoints() {
  const tasks = await readTasks();
  const timetable = await readTimetable();
  const pomodoro = await readPomodoro();

  for (const task of tasks) {
    if (!task.beginTime || !task.endTime) continue; //filter completed tasks

    const hoursInClasses = getHoursInClasses(timetable, task.beginTime);
    const hoursFocused = getHoursFocused(tasks, pomodoro, task.beginTime);
    const productivity = getProductivity(task);

    let currTime = new Date(task.beginTime);
    const taskEndTime = new Date(task.endTime);

    while (currTime < taskEndTime) {
      let nextTimeOfDay = new Date(currTime);
      nextTimeOfDay.setHours(currTime.getHours() + 3);

      if (nextTimeOfDay > taskEndTime) {
        nextTimeOfDay.setTime(taskEndTime.getTime());
      }

      let currTimeOfDay = getTimeOfDay(currTime.getHours());
      let currDayOfWeek = DaysOfWeek[currTime.getDay()];

      const datapoint = {
        timeOfDay: currTimeOfDay,
        dayOfWeek: currDayOfWeek,
        hoursInClasses,
        hoursFocused,
        productivity,
      };

      updateDatapoint(datapoint);

      currTime.setTime(nextTimeOfDay.getTime());
    }
  }
}

export async function logout() {
  await createDatapoints();
  await generateHourlyProductivity();
  await generateHoursFocused();
  await generateAvgProductivity();
  await countCompletedTasks();
  await deleteCompletedTasks();
  await deletePomodoro();
  app.exit(0);
}

export async function clearData() {
  await deleteStats();
  await deleteCache();
  //await deleteData();
}

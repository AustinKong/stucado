import { DaysOfWeek, TimesOfDay } from '../../shared/constants.js';
import { readTimetable, readTasks } from '../database/cache.js';
import { updateDataPoint } from '../database/database.js';

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

export function getHoursFocused(tasks, taskStartTime) {
  //const tasks = await readTasks();
  let hours = 0;
  for (const task of tasks) {
    if (task.endTime <= taskStartTime) {
      hours += (task.endTime - task.beginTime) / 3600 / 1000; //return in hours
      hours = Math.round(hours * 1000) / 1000; //round to 3 decimal places
    }
  }
  //console.log(hours);
  return hours;
}

export function getProductivity(task) {
  const timeTaken = (task.endTime - task.beginTime) / 60 / 1000; //in minutes
  return (task.estimatedTime / timeTaken) * 100;
}

export async function createDataPoints() {
  const tasks = await readTasks();
  const timetable = await readTimetable();

  for (const task of tasks) {
    if (!task.beginTime || !task.endTime) continue;

    const hoursInClasses = getHoursInClasses(timetable, task.beginTime);
    const hoursFocused = getHoursFocused(tasks, task.beginTime);
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

      updateDataPoint(datapoint);

      currTime.setTime(nextTimeOfDay.getTime());
    }
  }
}

//to test run

//deleteData();
//createDataPoints();
//readDataPoints();

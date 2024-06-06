import { DaysOfWeek } from '../../shared/constants.js';
import { readTimetable, readTasks, updateTaskSlots, updateTask } from '../database/cache.js';

export function getEmptySlots(timetable, startWorkTime, endWorkTime) {
  const emptySlots = DaysOfWeek.map((day) => ({
    day,
    slots: [],
  }));

  //Organize timetable entries by day, { Sunday: [], Monday: [{slot1}], ... }
  const timetableByDay = DaysOfWeek.reduce((acc, day) => {
    acc[day] = timetable.filter((slot) => slot.schedule.day === day);
    return acc;
  }, {});

  DaysOfWeek.forEach((day) => {
    const slots = timetableByDay[day].sort((a, b) => a.schedule.startTime - b.schedule.startTime);

    //Handle case when there are no classes for the entire day
    if (slots.length === 0 || startWorkTime === 0) {
      emptySlots
        .find((e) => e.day === day)
        .slots.push({
          startTime: startWorkTime,
          endTime: endWorkTime,
          day,
        });
      return;
    }

    //Find the first empty slot with startWorkTime as the startTime
    //Use the schedule's startTime as the first slot's endTime
    if (slots[0].schedule.startTime > startWorkTime) {
      emptySlots
        .find((e) => e.day === day)
        .slots.push({
          startTime: startWorkTime,
          endTime: slots[0].schedule.startTime,
          day,
        });
    }

    //Find the empty slots in between classes
    let prevEndTime = slots.length > 0 ? slots[0].schedule.endTime : startWorkTime;
    slots.forEach((slot) => {
      if (slot.schedule.startTime > prevEndTime) {
        emptySlots
          .find((e) => e.day === day)
          .slots.push({
            startTime: prevEndTime,
            endTime: slot.schedule.startTime,
            day,
          });
      }
      prevEndTime = slot.schedule.endTime;
    });

    //Find the last slot with endWorkTime as the endTime
    if (prevEndTime < endWorkTime) {
      emptySlots
        .find((e) => e.day === day)
        .slots.push({
          startTime: prevEndTime,
          endTime: endWorkTime,
          day,
        });
    }
  });
  return emptySlots;
}

export function bestFitDecreasing(tasks, emptySlots, timetable) {
  let nextID = timetable.length;
  tasks.sort((a, b) => b.estimatedTime - a.estimatedTime);

  const allocatedTasks = [];
  const remainingTasks = [];

  tasks.forEach((task) => {
    let placed = false;

    for (let slot of emptySlots) {
      const slotDuration = slot.endTime - slot.startTime;
      if (task.estimatedTime <= slotDuration) {
        allocatedTasks.push({
          id: nextID,
          title: task.title,
          description: task.description, //needs to change to task's description once implemented
          schedule: {
            startTime: slot.startTime,
            endTime: slot.startTime + task.estimatedTime,
            day: slot.day,
          },
        });
        nextID += 1;
        slot.startTime += task.estimatedTime;
        placed = true;
        break;
      }
    }
    if (!placed) {
      remainingTasks.push(task);
    }
  });
  return allocatedTasks;
}

//startTime & endTime are in the form of minutes since midnight
export async function allocateTasks(startTime, endTime) {
  const timetable = await readTimetable();
  const tasks = await readTasks();

  const startWorkTime = new Date().setHours(startTime / 60, startTime % 60, 0, 0);
  let endWorkTime = new Date().setHours(endTime / 60, endTime % 60, 0, 0);
  const today = DaysOfWeek[new Date(startWorkTime).getDay()];
  let nextDay = DaysOfWeek[new Date(startWorkTime).getDay()];
  let emptySlots = getEmptySlots(timetable, startTime, endTime);
  let emptySlotsNextDay = [];

  //if user work past midnight
  if (startTime > endTime) {
    const duration = endTime + 24 * 60 - startTime; //in minutes
    const hours = startTime / 60 + duration / 60;
    const mins = (startTime % 60) + (duration % 60);
    endWorkTime = new Date(startWorkTime).setHours(hours, mins, 0, 0);
    nextDay = DaysOfWeek[new Date(endWorkTime).getDay()];
    emptySlots = getEmptySlots(timetable, startTime, 1440); //set to 12am
    emptySlotsNextDay = getEmptySlots(timetable, 0, endTime);
  }

  let emptySlotsToday = emptySlots.find((e) => e.day === today).slots;

  if (nextDay != today) {
    emptySlotsNextDay = emptySlotsNextDay.find((e) => e.day === nextDay).slots;
    emptySlotsNextDay.filter((slot) => slot.endTime <= endTime);
    emptySlotsToday = [...emptySlotsToday, ...emptySlotsNextDay];
  }

  const allocatedTasks = bestFitDecreasing(tasks, emptySlotsToday, timetable);
  console.log(allocatedTasks);
  await updateTaskSlots(allocatedTasks);
  return allocatedTasks;
}

/*
Sample implementation
allocateTasks(540, 1440) //start working from 9am to 12am
*/

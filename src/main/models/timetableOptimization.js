import { DaysOfWeek } from '@shared/constants.js';
import { v4 as uuidv4 } from 'uuid';

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

export function bestFitDecreasing(emptySlots, tasks) {
  tasks.sort((a, b) => b.estimatedTime - a.estimatedTime);

  const allocatedTasks = [];
  const remainingTasks = [];

  tasks.forEach((task) => {
    let placed = false;

    for (let slot of emptySlots) {
      let slotDuration = slot.endTime - slot.startTime;
      let taskSlotEndTime = slot.startTime + task.estimatedTime;
      if (task.estimatedTime <= slotDuration && taskSlotEndTime <= 1440) {
        allocatedTasks.push({
          id: uuidv4(),
          title: task.title,
          description: task.description,
          schedule: {
            startTime: slot.startTime,
            endTime: slot.startTime + task.estimatedTime,
            day: slot.day,
          },
        });
        slot.startTime += task.estimatedTime;
        placed = true;
        break;
      } else if (task.estimatedTime <= slotDuration && taskSlotEndTime > 1440) {
        allocatedTasks.push(
          {
            id: uuidv4(),
            title: task.title,
            description: task.description,
            schedule: {
              startTime: slot.startTime,
              endTime: 1440,
              day: slot.day,
            },
          },
          {
            id: uuidv4(),
            title: task.title,
            description: task.description,
            schedule: {
              startTime: 0,
              endTime: taskSlotEndTime - 1440,
              day: DaysOfWeek[new Date().getDay() + 1],
            },
          }
        );
        slot.startTime += task.estimatedTime - 1440;
        slot.endTime -= 1440;
        slot.day = DaysOfWeek[new Date().getDay() + 1];
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
export async function allocateTasks(timetable, tasks, startTime, endTime) {
  const pendingTasks = tasks.filter((task) => task.status == 'Pending');
  const today = DaysOfWeek[new Date().getDay()];
  let endWorkTime = endTime;

  //if user work past midnight
  if (startTime > endTime) {
    endWorkTime = endTime + 24 * 60; //in minutes
  }

  const emptySlots = getEmptySlots(timetable, startTime, endWorkTime);
  let emptySlotsToday = emptySlots.find((e) => e.day === today).slots;

  const allocatedTasks = bestFitDecreasing(emptySlotsToday, pendingTasks);
  return allocatedTasks;
}

/*
Sample implementation
allocateTasks(540, 60) //start working from 9am to 1am
*/

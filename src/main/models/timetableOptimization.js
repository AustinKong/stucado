import { DaysOfWeek } from '../../shared/constants.js';

export function getEmptySlots(timetable, startWork, endWork) {
  const startWorkTime = startWork * 60; // 9:00 AM in minutes since midnight
  const endWorkTime = endWork * 60; // 11:30 PM in minutes since midnight

  const emptySlots = DaysOfWeek.map((day) => ({
    day,
    slots: [],
  }));

  // Organize timetable entries by day Sunday: [], Monday: [{slot1}], ...
  const timetableByDay = DaysOfWeek.reduce((acc, day) => {
    acc[day] = timetable.filter((slot) => slot.schedule.day === day);
    return acc;
  }, {});
  //console.log(timetableByDay);

  DaysOfWeek.forEach((day) => {
    const slots = timetableByDay[day].sort((a, b) => a.schedule.startTime - b.schedule.startTime);
    //Find the first slot with startWorkTime as the startTime
    //If there are schedule afterwards, use the schedule's startTime as the first slot's endTime
    //Else use endWorkTime as the endTime of the empty slot
    if (slots.length === 0 || slots[0].schedule.startTime > startWorkTime) {
      emptySlots
        .find((e) => e.day === day)
        .slots.push({
          startTime: startWorkTime,
          endTime: slots.length > 0 ? slots[0].schedule.startTime : endWorkTime,
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
  console.log(emptySlots);
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
          title: task.content,
          description: task.content, //needs to change to task's description once implemented
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
  const updatedTimetable = [...timetable, ...allocatedTasks];
  return { updatedTimetable, remainingTasks };
}

/*
sample implementation
const emptySlotsByDay = getEmptySlots(timetable2, 9, 23.5); //start working from 9am to 11.30pm
const today = 'Tuesday'; // or the time received from frontend, and call getDay()
const emptySlotsToday = emptySlotsByDay.find((e) => e.day === today).slots;
const { updatedTimetable, remainingTasks } = bestFitDecreasing(tasks, emptySlotsToday, timetable);
*/
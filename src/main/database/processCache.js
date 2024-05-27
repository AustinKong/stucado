import { DaysOfWeek } from '../../shared/constants.js';

export function getTimeOfDay(hour) {
  if (hour >= 6 && hour < 9) return 'earlyMorning';
  if (hour >= 9 && hour < 12) return 'lateMorning';
  if (hour >= 12 && hour < 15) return 'early afternoon';
  if (hour >= 15 && hour < 18) return 'lateAfternoon';
  if (hour >= 18 && hour < 21) return 'evening';
  if (hour >= 21 && hour < 24) return 'night';
  if (hour >= 24 && hour < 3) return 'midnight';
  if (hour >= 3 && hour < 6) return 'dawn';
}

export function getHoursInClasses(timetable, taskStartTime) {
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

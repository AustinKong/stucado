import { v4 as uuidv4 } from 'uuid';
import { deleteCompletedTasks, deletePomodoro, updatePomodoro, updateTask } from '../database/cache.js';
import {
  countCompletedTasks,
  generateAvgProductivity,
  generateHourlyProductivity,
  generateHoursFocused,
} from './stats.js';
/* 
1. Generate tasks
2. Generate pomodoro timer
3. Generate hourly productivity //save in stats.db 
4. Generate average productivity //for each day, save in stats.db 
5. Generate hours focused //for each day, save in stats.db
6. Count completed tasks //for each day, save in stats.db
7. Delete completed tasks 
*/

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export async function generateStats() {
  const today = new Date();
  let taskDate = new Date(today);
  taskDate.setDate(today.getDate() - 14); // Set to two weeks ago

  // Loop through each day for the past 14 days
  while (taskDate < today) {
    let taskBeginTime = new Date(taskDate);
    taskBeginTime.setHours(getRandomInt(8, 12), 0, 0, 0); // 8am to 12pm

    let pomodoroBeginTime = new Date(taskDate);
    pomodoroBeginTime.setHours(getRandomInt(8, 12), 0, 0, 0); // 8am to 12pm

    const numOfTasks = getRandomInt(1, 3);
    const numOfSessions = getRandomInt(1, 5);

    // Update tasks
    for (let i = 0; i < numOfTasks; i++) {
      const id = uuidv4();
      const estimatedTime = getRandomInt(15, 180); // 15 minutes to 3hrs
      const actualTime = estimatedTime * Math.round(getRandomArbitrary(0.3, 2) * 60 * 1000); //0.3 - 3 times of estimated time
      const breakTime = getRandomInt(0, 60) * 60 * 1000;

      const task = {
        id,
        title: id,
        description: id,
        status: 'Completed',
        estimatedTime,
        beginTime: new Date(taskBeginTime).getTime(),
        endTime: new Date(taskBeginTime).getTime() + actualTime,
      };
      console.log(`task ${id} estimate= ${estimatedTime}`);
      console.log(`task ${id} start= ${new Date(task.beginTime).toLocaleTimeString()}`);
      console.log(`task ${id} end= ${new Date(task.endTime).toLocaleTimeString()}`);
      console.log(new Date(task.beginTime).toDateString());

      await updateTask(task);

      taskBeginTime = new Date(taskBeginTime).getTime() + actualTime + breakTime;
    }

    const workDuration = getRandomInt(20, 30) * 60 * 1000;
    const shortBreakTime = getRandomInt(5, 10) * 60 * 1000;
    let longBreakTime = 0;

    // Update pomodoro
    for (let i = 0; i < numOfSessions; i++) {
      const id = uuidv4();
      if (i > 3) {
        longBreakTime = 20 * 60 * 1000;
      }

      const session = {
        id,
        startTime: new Date(pomodoroBeginTime).getTime(),
        endTime: new Date(pomodoroBeginTime).getTime() + workDuration,
      };

      console.log(`pomodoro ${id} start= ${new Date(pomodoroBeginTime).toLocaleTimeString()}`);
      console.log(`pomodoro ${id} end= ${new Date(session.endTime).toLocaleTimeString()}`);

      await updatePomodoro(session);

      pomodoroBeginTime = new Date(pomodoroBeginTime).getTime() + workDuration + shortBreakTime + longBreakTime;
    }

    await generateHourlyProductivity();
    await generateAvgProductivity();
    await generateHoursFocused();
    await countCompletedTasks();
    await deleteCompletedTasks();
    await deletePomodoro();

    taskDate = new Date(taskDate).setDate(new Date(taskDate).getDate() + 1);
    console.log(new Date(taskDate).toDateString());
  }
}

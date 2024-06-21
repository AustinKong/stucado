import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
//import path from 'path';

let db = null;

/* Utility functions */
// Create cache database
export async function createCache() {
  if (db) {
    return db;
  }

  //const dbPath = path.join('', '..', '..', '..', 'cache.db');

  db = await open({
    filename: './cache.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
		CREATE TABLE IF NOT EXISTS timetable (
			id TEXT PRIMARY KEY,
      title TEXT,
			description TEXT,
			start_time INTEGER,
			end_time INTEGER,
			day TEXT
		);
	`);

  await db.exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id TEXT PRIMARY KEY,
			title TEXT,
      description TEXT,
			status TEXT,
			estimated_time INTEGER,
			begin_time INTEGER,
			end_time INTEGER
		);
	`);

  await db.exec(`
		CREATE TABLE IF NOT EXISTS task_slots (
			id TEXT PRIMARY KEY,
			title TEXT,
      description TEXT,
			start_time INTEGER,
			end_time INTEGER,
      day TEXT
		);
	`);

  await db.exec(`
		CREATE TABLE IF NOT EXISTS pomodoro (
			id TEXT PRIMARY KEY,
			start_time INTEGER,
			end_time INTEGER
		);
	`);

  return db;
}

export async function deleteCache() {
  const db = await createCache();
  await db.exec('DELETE FROM timetable');
  await db.exec('DELETE FROM tasks');
  await db.exec('DELETE FROM task_slots');
  await db.exec('DELETE FROM pomodoro');
}

/* Task manipulation */
// Create task
export async function createTask(task) {
  const db = await createCache();
  const { id, title, description, status, estimatedTime, beginTime, endTime } = task;

  await db.run(
    `
		INSERT INTO tasks (id, title, description, status, estimated_time, begin_time, end_time)
		VALUES (?, ?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET 
			title = EXCLUDED.title,
      description = EXCLUDED.description,
			status = EXCLUDED.status,
			estimated_time = EXCLUDED.estimated_time,
			begin_time = EXCLUDED.begin_time,
			end_time = EXCLUDED.end_time;
	`,
    [id, title, description, status, estimatedTime, beginTime, endTime]
  );
}

// Read tasks
export async function readTasks() {
  const db = await createCache();
  try {
    const tasks = await db.all(`
      SELECT 
        id,
        title,
        description,
        status, 
        estimated_time AS estimatedTime, 
        begin_time AS beginTime, 
        end_time AS endTime 
      FROM tasks
    `);
    return tasks;
  } catch (err) {
    console.error('Error retrieving tasks: ', err);
  }
}

// Read task with id
export async function readTask(id) {
  const db = await createCache();
  try {
    const rawTask = await db.get('SELECT * FROM tasks WHERE id = ?', id);
    const formattedTask = {
      id: rawTask.id,
      title: rawTask.title,
      description: rawTask.description,
      status: rawTask.status,
      estimatedTime: rawTask.estimated_time,
      beginTime: rawTask.begin_time,
      endTime: rawTask.end_time,
    };
    // console.log(formattedTask);
    return formattedTask;
  } catch (err) {
    console.error('Error retrieving task ' + id + ': ', err);
  }
}

//Update task
export async function updateTask(task) {
  const db = await createCache();
  const { id, title, description, status, estimatedTime, beginTime, endTime } = task;

  await db.run(
    `
		INSERT INTO tasks (id, title, description, status, estimated_time, begin_time, end_time)
		VALUES (?, ?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET 
      title = EXCLUDED.title,
      description = EXCLUDED.description,
			status = EXCLUDED.status,
			estimated_time = EXCLUDED.estimated_time,
			begin_time = EXCLUDED.begin_time,
			end_time = EXCLUDED.end_time;
	`,
    [id, title, description, status, estimatedTime, beginTime, endTime]
  );
}

export async function deleteTask(id) {
  const db = await createCache();
  try {
    await db.run('DELETE FROM tasks WHERE id = ?', id);
  } catch (err) {
    console.log('Error deleting task ' + id);
  }
}

export async function deleteCompletedTasks() {
  const db = await createCache();
  try {
    await db.exec(`DELETE FROM tasks WHERE status = 'Completed'`);
  } catch (err) {
    console.log('Error deleting completed tasks');
  }
}

/* Timetable manipulation */
// Read timetable
export async function readTimetable() {
  const db = await createCache();
  try {
    const slots = await db.all('SELECT * FROM timetable');
    const timetable = slots.map(({ id, title, description, start_time, end_time, day }) => {
      return {
        id,
        title,
        description,
        schedule: {
          startTime: start_time,
          endTime: end_time,
          day,
        },
      };
    });
    return timetable;
  } catch (err) {
    console.error('Error retrieving tasks: ', err);
  }
}

// Update timetable
export async function updateTimetable(allSlots) {
  const db = await createCache();

  for (const slot of allSlots) {
    const { title, description, id, schedule } = slot;
    const { startTime, endTime, day } = schedule;

    await db.run(
      `
			INSERT INTO timetable (id, title, description, start_time, end_time, day)
			VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET 
        title = EXCLUDED.title,
        description = EXCLUDED.description,
        start_time = EXCLUDED.start_time,
        end_time = EXCLUDED.end_time,
        day = EXCLUDED.day;
	`,
      [id, title, description, startTime, endTime, day]
    );
  }
}

export async function deleteTimetableSlot(id) {
  const db = await createCache();
  await db.run('DELETE FROM timetable WHERE id = ?', id);
}

// Delete timetable
export async function deleteTimetable() {
  const db = await createCache();
  await db.exec('DELETE FROM timetable');
}

/* Task slots manipulation */
// Read taskSlots
export async function readTaskSlots() {
  const db = await createCache();
  try {
    const allocatedTasks = await db.all('SELECT * FROM task_slots');
    const taskSlots = allocatedTasks.map(({ id, title, description, start_time, end_time, day }) => {
      return {
        id,
        title,
        description,
        schedule: {
          startTime: start_time,
          endTime: end_time,
          day,
        },
      };
    });
    return taskSlots;
  } catch (err) {
    console.error('Error retrieving taskSlots: ', err);
  }
}

export async function deleteTaskSlots() {
  const db = await createCache();
  await db.exec('DELETE FROM task_slots');
}

// Second timetable
export async function updateTaskSlots(allocatedTasks) {
  await deleteTaskSlots();
  const db = await createCache();
  for (const task of allocatedTasks) {
    const { title, description, id, schedule } = task;
    const { startTime, endTime, day } = schedule;

    await db.run(
      `
			INSERT INTO task_slots (id, title, description, start_time, end_time, day)
			VALUES (?, ?, ?, ?, ?, ?)
	`,
      [id, title, description, startTime, endTime, day]
    );
  }
}

export async function readPomodoro() {
  const db = await createCache();
  try {
    const sessions = await db.all(`
      SELECT 
        id,
        start_time AS startTime, 
        end_time AS endTime 
      FROM pomodoro
    `);
    return sessions;
  } catch (err) {
    console.error('Error retrieving tasks: ', err);
  }
}

export async function deletePomodoro() {
  const db = await createCache();
  await db.exec('DELETE FROM pomodoro');
}

export async function deletePastPomodoro() {
  const db = await createCache();
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    await db.run(
      `
      DELETE FROM pomodoro
      WHERE DATE(start_time / 1000, 'unixepoch') != ?
         OR DATE(end_time / 1000, 'unixepoch') != ?
    `,
      [currentDate, currentDate]
    );
  } catch (err) {
    console.error('Error deleting past pomodoro sessions: ', err);
  }
}

export async function updatePomodoro(session) {
  const db = await createCache();
  const { id, startTime, endTime } = session;

  await db.run(
    `
    INSERT INTO pomodoro (id, start_time, end_time)
    VALUES (?, ?, ?)
  `,
    [id, startTime, endTime]
  );
}

import { Database, open } from 'sqlite';
import * as sqlite3 from 'sqlite3';
// TODO: Change to use aliases
import { TimetableSlot } from '../../shared/types/timetable.types';
import { Task } from '../../shared/types/task.types';

let db: Database | null = null;

//Create cache database
export async function createCache(): Promise<Database> {
  if (db) {
    return db;
  }
	
  db = await open({
    filename: './cache.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
		CREATE TABLE IF NOT EXISTS timetable (
			title TEXT PRIMARY KEY,
			description TEXT,
			start_time INTEGER,
			end_time INTEGER,
			day TEXT
		);
	`);

  await db.exec(`
		CREATE TABLE IF NOT EXISTS tasks (
			id INTEGER PRIMARY KEY,
			content TEXT,
			status TEXT,
			estimated_time INTEGER,
			begin_time INTEGER,
			end_time INTEGER
		);
	`);
  return db;
}

//Create task
export async function createTask(task: Task): Promise<void> {
  const db = await createCache();
  const { id, content, status, estimatedTime, beginTime, endTime } = task
  
  await db.run(`
		INSERT INTO tasks (id, content, status, estimated_time, begin_time, end_time)
		VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET 
			content = EXCLUDED.content,
			status = EXCLUDED.status,
			estimated_time = EXCLUDED.estimated_time,
			begin_time = EXCLUDED.begin_time,
			end_time = EXCLUDED.end_time;
	`, [id, content, status, estimatedTime, beginTime, endTime]);
}

export async function readTable(tableName: string): Promise<void> {
  const db = await createCache();
  try {
    const rows = await db.all(`SELECT * FROM ${tableName}`);
    console.log(`Data from ${tableName}:`, rows);
  } catch (err) {
    console.error(`Error retrieving data from table ${tableName}:`, err);
  }
}

//Read tasks
export async function readTasks(): Promise<void> {
  await readTable('tasks');
}

//Read task with id
export async function readTask(id: number): Promise<void> {
  const db = await createCache();
  try {
    const row: Task | undefined = await db.get('SELECT * FROM tasks WHERE id = ?', id);
    console.log('Data from task ' + id + ': ', row);
  } catch (err) {
    console.error('Error retrieving task ' + id + ': ', err);
  }
}

export async function readTimetable(): Promise<void> {
  await readTable('timetable');
}

//Update task
export async function updateTask(task: Task): Promise<void> {
  const db = await createCache();
  const { id, content, status, estimatedTime, beginTime, endTime } = task
  
  await db.run(`
		INSERT INTO tasks (id, content, status, estimated_time, begin_time, end_time)
		VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET 
			content = EXCLUDED.content,
			status = EXCLUDED.status,
			estimated_time = EXCLUDED.estimated_time,
			begin_time = EXCLUDED.begin_time,
			end_time = EXCLUDED.end_time;
	`, [id, content, status, estimatedTime, beginTime, endTime]);
}

//Update timetable
export async function updateTimetable(allSlots: TimetableSlot[]): Promise<void> {
  const db = await createCache();

  for (const slot of allSlots) {
    const { id, title, description, schedule } = slot;
    const { startTime, endTime, day } = schedule;

    await db.run(`
			INSERT INTO timetable (title, description, start_time, end_time, day)
			VALUES (?, ?, ?, ?, ?)
			ON CONFLICT(title) DO UPDATE SET
				description = EXCLUDED.description,
				start_time = EXCLUDED.start_time,
				end_time = EXCLUDED.end_time,
				day = EXCLUDED.day;
	`, [title, description, schedule, startTime, endTime, day]);
  }
}

export async function deleteTask(id: number): Promise<void> {
  const db = await createCache();
  try {
    await db.run('DELETE FROM tasks WHERE id = ?', id);
    console.log('Deleted task ' + id);
  } catch (err) {
    console.log('Error deleting task ' + id);
  }
}

export async function deleteCache(): Promise<void> {
  const db = await createCache();
  await db.exec('DELETE FROM timetable');
  await db.exec('DELETE FROM tasks');
  console.log('Deleted all data');
}
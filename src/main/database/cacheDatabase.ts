import { Database, open } from 'sqlite';
import * as sqlite3 from 'sqlite3';
// TODO: Change to use aliases
import { TimetableSlot } from '../../shared/types/timetable.types';
import { Task } from '../../shared/types/task.types';

//open cache database
export async function setupCacheDatabase(): Promise<Database> {
  const db = await open({
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

export async function addOrUpdateTimetable(db: Database, allSlots: TimetableSlot[]): Promise<void> {
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

export async function addOrUpdateTasks(db: Database, task: Task): Promise<void> {
  const { id, content, status, estimatedTime, beginTime, endTime } = task
  
  await db.run(`
		INSERT INTO tasks (content, status, estimated_time, begin_time, end_time)
		VALUES (?, ?, ?, ?, ?, ?)
		ON CONFLICT(id) DO UPDATE SET 
			content = EXCLUDED.content,
			status = EXCLUDED.status,
			estimated_time = EXCLUDED.estimated_time,
			begin_time = EXCLUDED.begin_time,
			end_time = EXCLUDED.end_time;
	`, [id, content, status, estimatedTime, beginTime, endTime]);
}

export async function clearCache(db: Database): Promise<void> {
  await db.exec(`
	DELETE FROM timetable
	`);
  await db.exec(`
	DELETE FROM tasks
	`);
}

export async function showAllDataFromTable(db: Database, tableName: string): Promise<void> {
  try {
    const rows = await db.all(`SELECT * FROM ${tableName}`);
    console.log(`Data from ${tableName}:`, rows);
  } catch (err) {
    console.error(`Error retrieving data from table ${tableName}:`, err);
  }
}
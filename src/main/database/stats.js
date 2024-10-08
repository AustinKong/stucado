import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let db = null;

export async function createStatsDatabase() {
  if (db) {
    return db;
  }

  db = await open({
    filename: './stats.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS productivity_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hour TEXT,
      date TEXT,
      productivity REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS avg_productivity (
      date TEXT PRIMARY KEY,
      avg_productivity REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS hours_focused (
      date TEXT PRIMARY KEY,
      hours_focused REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS completed_tasks (
      date TEXT PRIMARY KEY,
      tasks REAL
    );
  `);
  return db;
}

export async function deleteStats() {
  const db = await createStatsDatabase();
  await db.run('DELETE FROM productivity_stats');
  await db.run('DELETE FROM avg_productivity');
  await db.run('DELETE FROM hours_focused');
  await db.run('DELETE FROM completed_tasks');
}

export async function readProductivityStats() {
  const db = await createStatsDatabase();
  try {
    const stats = await db.all(`
      SELECT
        id,
        hour,
        date,
        productivity
      FROM productivity_stats
    `);
    return stats;
  } catch (err) {
    console.error('Error retrieving productivityStats: ', err);
  }
}

export async function deleteAllProdStats() {
  const db = await createStatsDatabase();
  await db.run('DELETE FROM productivity_stats');
}

export async function deleteProductivityStats(id) {
  const db = await createStatsDatabase();
  try {
    await db.run('DELETE FROM productivity_stats WHERE id = ?', id);
  } catch (err) {
    console.log('Error deleting task ' + id);
  }
}

export async function updateProductivityStats(prod) {
  const db = await createStatsDatabase();
  const { hour, date, productivity } = prod;

  await db.run(
    `
    INSERT INTO productivity_stats (hour, date, productivity)
    VALUES (?, ?, ?)
  `,
    [hour, date, productivity]
  );
}

export async function readAvgProductivity() {
  const db = await createStatsDatabase();
  try {
    const result = await db.all(`
        SELECT 
          date,
          avg_productivity
        FROM avg_productivity
    `);
    return result;
  } catch (err) {
    console.error('Error retrieving average productivity: ', err);
  }
}

export async function updateAvgProductivity(prod) {
  const db = await createStatsDatabase();
  const { date, avgProductivity } = prod;

  await db.run(
    `
    INSERT INTO avg_productivity (date, avg_productivity)
    VALUES (?, ?)
    ON CONFLICT(date) DO UPDATE SET
      avg_productivity = EXCLUDED.avg_productivity
  `,
    [date, avgProductivity]
  );
}

export async function readHoursFocused() {
  const db = await createStatsDatabase();
  try {
    const result = await db.all(`
      SELECT
        date,
        hours_focused
      FROM hours_focused
    `);
    return result;
  } catch (err) {
    console.error('Error retrieving hours focused stats: ', err);
  }
}

export async function updateHoursFocused(hours) {
  const db = await createStatsDatabase();
  const { date, hoursFocused } = hours;

  await db.run(
    `
    INSERT INTO hours_focused (date, hours_focused)
    VALUES (?, ?)
    ON CONFLICT(date) DO UPDATE SET
      hours_focused = EXCLUDED.hours_focused
  `,
    [date, hoursFocused]
  );
}

export async function readCompletedTasks() {
  const db = await createStatsDatabase();
  try {
    const result = await db.all(`
      SELECT
        date,
        tasks
      FROM completed_tasks
    `);
    return result;
  } catch (err) {
    console.error('Error retrieving number of tasks completed stats: ', err);
  }
}

export async function updateCompletedTasks(data) {
  const db = await createStatsDatabase();
  const { date, tasks } = data;

  await db.run(
    `
    INSERT INTO completed_tasks (date, tasks)
    VALUES (?, ?)
    ON CONFLICT(date) DO UPDATE SET
      tasks = EXCLUDED.tasks
  `,
    [date, tasks]
  );
}

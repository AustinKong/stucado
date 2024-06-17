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
      productivity REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS hours_focused (
      date TEXT PRIMARY KEY,
      hours_focused REAL
    );
  `);
  return db;
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
  console.log('trying to delete');
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
    await db.all(`
        SELECT 
          date,
          productivity
        FROM avg_productivity
    `);
  } catch (err) {
    console.error('Error retrieving average productivity: ', err);
  }
}

export async function updateAvgProductivity(prod) {
  const db = await createStatsDatabase();
  const { date, productivity } = prod;

  await db.run(
    `
    INSERT INTO hours_focused (date, productivity)
    VALUES (?, ?)
    ON CONFLICT(date) DO UPDATE SET
      productivity = productivity + EXCLUDED.productivity
  `,
    [date, productivity]
  );
}

export async function readHoursFocused() {
  const db = await createStatsDatabase();
  try {
    await db.all(`
      SELECT
        date,
        hours_focused
      FROM productivity_stats
    `);
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
      hours_focused = hours_focused + EXCLUDED.hours_focused
  `,
    [date, hoursFocused]
  );
}

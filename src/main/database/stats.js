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
      day TEXT,
      date TEXT
      productivity REAL
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS hours_focused (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hour TEXT,
      day TEXT,
      date TEXT
      hours_focused REAL
    );
  `);
  return db;
}

export async function readProductivityStats() {
  const db = await createStatsDatabase();
  try {
    await db.all(`
      SELECT
        id,
        hour,
        day,
        date,
        productivity,
      FROM productivity_stats
    `);
  } catch (err){
    console.error('Error retrieving productivityStats: ', err);
  }
}

export async function updateProductivityStats(prod) {
  const db = await createStatsDatabase();
  const { hour, day, date, productivity } = prod;

  await db.run(
    `
    INSERT INTO productivity_stats (hour, day, date, productivity)
    VALUES (?, ?, ?, ?)
  `,
    [hour, day, date, productivity]
  );
}

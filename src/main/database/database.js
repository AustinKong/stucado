import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// const sqlite3 = require('sqlite3').verbose();

let db = null;
//open database connection
export async function createDatabase() {
  if (db) {
    return db;
  }

  db = await open({
    filename: './data.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS data_points (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      time_of_day TEXT,
      day_of_week TEXT,
      hours_in_classes INTEGER,
      hours_focused INTEGER,
      productivity REAL
    );
  `);
  return db;
}

//adding data point into database
export async function updateDataPoint(dataPoint) {
  const { timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, productivity } = dataPoint;
  const db = await createDatabase();

  await db.run(
    `
    INSERT INTO data_points (time_of_day, day_of_week, hours_in_classes, hours_focused, productivity)
    VALUES (?, ?, ?, ?, ?)
  `,
    [timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, productivity]
  );
}

//retrieving data point from database
export async function readDataPoints() {
  const db = await createDatabase();
  const rows = await db.all(`
    SELECT time_of_day AS timeOfDay, day_of_week AS dayOfWeek, hours_in_classes AS hoursInClasses, hours_focused AS hoursFocused, productivity
    FROM data_points
  `);
  console.log(rows);
  return rows;
}

export async function deleteData() {
  const db = await createDatabase();
  await db.exec('DELETE from data_points');
}

import { Database, open } from "sqlite";
const sqlite3 = require('sqlite3').verbose(); //import sqlite3 from "sqlite3" cannot compile

//declare type & datapoint interface
export type TimeOfDay = 'dawn' | 'earlyAfternoon' | 'earlyMorning' | 'evening' | 'lateAfternoon' | 'lateMorning' | 'midnight' | 'night';
export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type Weather = 'sunny' | 'rainy' | 'stormy' | 'cloudy';

export interface DataPoint {
    timeOfDay: TimeOfDay;
    dayOfWeek: DayOfWeek;
    hoursInClasses: number;
    hoursFocused: number;
    weather: Weather;
    productivity: number;
}

//open database connection
export async function setupDatabase() {
    let db: Database = await open({
        filename: './data.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS data_points (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time_of_day TEXT,
            day_of_week TEXT,
            hours_in_classes INTEGER,
            hours_focused INTEGER,
            weather TEXT,
            productivity REAL
        );
    `);
    return db;
}

//adding data point into database
export async function addDataPoint(db: Database, dataPoint: DataPoint) {
    const { timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, weather, productivity } = dataPoint;
    await db.run(`
        INSERT INTO data_points (time_of_day, day_of_week, hours_in_classes, hours_focused, weather, productivity)
        VALUES (?, ?, ?, ?, ?, ?)
    `, [timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, weather, productivity]);
}

//retrieving data point from database
export async function getDataPoints(db: Database): Promise<DataPoint[]> {
    const rows = await db.all(`
        SELECT time_of_day AS timeOfDay, day_of_week AS dayOfWeek, hours_in_classes AS hoursInClasses, hours_focused AS hoursFocused, weather, productivity
        FROM data_points
    `);
    return rows as DataPoint[];
}
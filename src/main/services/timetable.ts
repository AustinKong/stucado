import axios, { AxiosResponse } from 'axios';
import { IpcMainInvokeEvent } from 'electron';
import { readTimetable, updateTimetable } from '../database/cache';

import { Module, RawLesson } from 'Types/nusMods.types';
import { TimetableSlot } from 'Types/timetable.types';

export async function getTimetable(): Promise<TimetableSlot[]> {
  const timetable: TimetableSlot[] = await readTimetable() as TimetableSlot[];
  return timetable;
}

export async function uploadTimetable(event: IpcMainInvokeEvent, url: string): Promise<TimetableSlot[]> {
  const { enrolledLessons, academicYear, semester } = extractURL(url);
  const timetable: TimetableSlot[] = await getLessonsToTimetable(enrolledLessons, academicYear, semester);
  void updateTimetable(timetable);
  return timetable;
}

/* Getting timetable from NUS Mods API */
const NUS_MODS_API_URL: string = 'https://api.nusmods.com/v2/';

// Extracts relevant information used to make API request
function extractURL(url: string): { enrolledLessons: string[], academicYear: string, semester: number } {
  // e.g. [ 'CS1010=TUT:06,SEC:1', 'CS1010E=SEC:2,TUT:18' ]
  const enrolledLessons: string[] = url
    .substring(url.indexOf('?') + 1)
    .split('&');
  
  // e.g. 2021-2022
  const date: Date = new Date();
  const academicYear: string =
    date.getMonth() <= 4
      ? `${date.getFullYear() - 1}-${date.getFullYear()}`
      : `${date.getFullYear()}-${date.getFullYear() + 1}`;

  // Semester 1 | 2 
  const semester: number = +url.split('/')[4][4];

  return { enrolledLessons, academicYear, semester };
}

async function getLessonsToTimetable(enrolledLessons: string[], academicYear: string, semester: number): Promise<TimetableSlot[]> {
  const timetable: TimetableSlot[] = [];
  let index: number = 0;

  for (const enrolledLesson of enrolledLessons) {
    const moduleCode: string = enrolledLesson.substring(0, enrolledLesson.indexOf('='));

    const enrolledLessonTypes: string[] = enrolledLesson
      .substring(enrolledLesson.indexOf('=') + 1)
      .split(',')
      .filter((classInfo) => classInfo !== '');   

    const moduleInfo: Module = (await fetchModuleInfo(`${NUS_MODS_API_URL}${academicYear}/modules/${moduleCode}.json`)) as Module;
  
    for (const enrolledLessonType of enrolledLessonTypes) {
      const classNo: string = enrolledLessonType.substring(enrolledLessonType.indexOf(':') + 1);
      const lessonType: string = enrolledLessonType.substring(
        enrolledLessonType.indexOf('=') + 1, 
        enrolledLessonType.indexOf(':'));

      const lessonData: RawLesson = moduleInfo.semesterData
        .filter(semesterData => semesterData.semester === semester)[0]
        .timetable.filter(lessonData => lessonData.classNo === classNo 
          && lessonData.lessonType.substring(0, 3).toUpperCase() === lessonType)[0];
      
      timetable.push({
        title: `${moduleCode} ${lessonData.lessonType} ${classNo}`,
        description: `${lessonData.startTime} - ${lessonData.endTime} @ ${lessonData.venue}`,
        id: index,
        schedule: {
          startTime: militaryTimeToMinutes(lessonData.startTime),
          endTime: militaryTimeToMinutes(lessonData.endTime),
          day: lessonData.day
        }
      } as TimetableSlot);
      index++;
    }
  }

  return timetable;
}

// GET request to NUSMods API to get single module information
async function fetchModuleInfo(url: string) {
  try {
    const response: AxiosResponse<Module> = await axios.get<Module>(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Utility function to convert military time to minutes since midnight
function militaryTimeToMinutes(time: string): number {
  const hours: number = +time.substring(0, 2);
  const minutes: number = +time.substring(2);
  return hours * 60 + minutes;
}


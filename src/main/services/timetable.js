import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { readTimetable, updateTimetable } from '@database/cache';

/**
 * Retrieves the timetable from cache.
 * @returns {Promise<any>} A promise that resolves to the timetable.
 */
export async function getTimetable() {
  const timetable = await readTimetable();
  return timetable;
}

/**
 * Retrieves timetable from URL according to NUS Mods API, then uploads it to cache.
 *
 * @param {Event} _event - The IPC event object.
 * @param {string} url - The URL to extract timetable information from.
 * @returns {Promise<Object>} - The uploaded timetable.
 */
export async function uploadTimetable(_event, url) {
  const { enrolledLessons, academicYear, semester } = extractURL(url);
  const timetable = await getLessonsToTimetable(enrolledLessons, academicYear, semester);
  void updateTimetable(timetable);
  return timetable;
}

/* Getting timetable from NUS Mods API */
const NUS_MODS_API_URL = 'https://api.nusmods.com/v2/';

// Extracts relevant information used to make API request
function extractURL(url) {
  // e.g. [ 'CS1010=TUT:06,SEC:1', 'CS1010E=SEC:2,TUT:18' ]
  const enrolledLessons = url.substring(url.indexOf('?') + 1).split('&');

  // e.g. 2021-2022
  const date = new Date();
  const academicYear =
    date.getMonth() <= 8
      ? `${date.getFullYear() - 1}-${date.getFullYear()}`
      : `${date.getFullYear()}-${date.getFullYear() + 1}`;

  // Semester 1 | 2
  const semester = +url.split('/')[4][4];

  return { enrolledLessons, academicYear, semester };
}

async function getLessonsToTimetable(enrolledLessons, academicYear, semester) {
  const timetable = [];

  for (const enrolledLesson of enrolledLessons) {
    const moduleCode = enrolledLesson.substring(0, enrolledLesson.indexOf('='));

    const enrolledLessonTypes = enrolledLesson
      .substring(enrolledLesson.indexOf('=') + 1)
      .split(',')
      .filter((classInfo) => classInfo !== '');

    const moduleInfo = await fetchModuleInfo(`${NUS_MODS_API_URL}${academicYear}/modules/${moduleCode}.json`);

    for (const enrolledLessonType of enrolledLessonTypes) {
      const classNo = enrolledLessonType.substring(enrolledLessonType.indexOf(':') + 1);
      const lessonType = enrolledLessonType.substring(
        enrolledLessonType.indexOf('=') + 1,
        enrolledLessonType.indexOf(':')
      );

      const lessonDatas = moduleInfo.semesterData
        .filter((semesterData) => semesterData.semester === semester)[0]
        .timetable.filter(
          (lessonData) =>
            lessonData.classNo === classNo && lessonData.lessonType.substring(0, 3).toUpperCase() === lessonType
        );

      for (const lessonData of lessonDatas) {
        timetable.push({
          title: `${moduleCode} ${lessonData.lessonType} ${classNo}`,
          description: `${lessonData.startTime} - ${lessonData.endTime} @ ${lessonData.venue}`,
          id: uuidv4(),
          schedule: {
            startTime: militaryTimeToMinutes(lessonData.startTime),
            endTime: militaryTimeToMinutes(lessonData.endTime),
            day: lessonData.day,
          },
        });
      }
    }
  }

  return timetable;
}

// GET request to NUSMods API to get single module information
async function fetchModuleInfo(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

// Utility function to convert military time to minutes since midnight
function militaryTimeToMinutes(time) {
  const hours = +time.substring(0, 2);
  const minutes = +time.substring(2);
  return hours * 60 + minutes;
}

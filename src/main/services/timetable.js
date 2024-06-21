import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import { readTimetable, updateTimetable, deleteTimetable, deleteTimetableSlot as cacheDeleteTimetableSlot, readTasks, updateTaskSlots, readTaskSlots } from '@database/cache';
import { allocateTasks } from '@models/timetableOptimization';

/**
 * Retrieves the timetable from cache.
 * @returns {Promise<any>} A promise that resolves to the timetable.
 */
export async function getTimetable() {
  const timetable = await readTimetable();
  const optimizedTasks = await readTaskSlots();
  // Inject tags to differentiate between timetable and tasks
  const combined = timetable
    .map((lesson) => ({ ...lesson, type: 'timetable' }))
    .concat(optimizedTasks.map((task) => ({ ...task, type: 'task' })));
  return combined;
}

export async function createTimetableSlot(_event, title, description, schedule) {
  const timetableSlot = {
    title,
    description,
    id: uuidv4(),
    schedule,
  };
  void updateTimetable([timetableSlot]);
  return timetableSlot;
}

export async function updateTimetableSlot(_event, timetableSlot) {
  void updateTimetable([timetableSlot]);
  return timetableSlot;
};

export async function deleteTimetableSlot(_event, id) {
  void cacheDeleteTimetableSlot(id);
  return id;
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
  await deleteTimetable();
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
            lessonData.classNo === classNo && lessonTypeToAbbreviation(lessonData.lessonType) === lessonType
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

export async function optimizeTimetable() {
  const timetable = await readTimetable();
  const tasks = await readTasks();

  const startTime = new Date().getHours() * 60 + new Date().getMinutes();
  const endTime = (startTime + 23 * 60 + 59) % 1440;
  const optimizedTasks = await allocateTasks(timetable, tasks, startTime, endTime);
  await updateTaskSlots(optimizedTasks);

  return getTimetable();
}

// Utility function to convert lesson type to abbreviation
function lessonTypeToAbbreviation(lessonType) {
  switch (lessonType) {
    case 'Tutorial':
      return 'TUT';
    case 'Sectional Teaching':
      return 'SEC';
    case 'Laboratory':
      return 'LAB';
    case 'Recitation':
      return 'REC';
    case 'Lecture':
      return 'LEC';
    case 'Workshop':
      return 'WS';
    case 'Seminar-Style Module Class':
      return 'SEM';
    default:
      // Failsafe is to use first three letters of lesson type
      console.error('Unknown lesson type encountered, contact developer!');
      return lessonType.slice(0, 3).toUpperCase();
  }
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

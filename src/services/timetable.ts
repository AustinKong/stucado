import axios, { AxiosResponse } from 'axios';
import { APIModule, RawLesson, Time } from 'Data/types/nusMods.types';
import { Class, TimetableSlot } from 'Data/types/timetable.types';

// Given a NUSMods URL, generate a timetable in the form of Timetable
export const getTimetable = async (url: string): Promise<TimetableSlot[]> => {
  const classes: Class[] = await getClassInfo(url);
  let timetableSlots: TimetableSlot[] = classes.map((classData) => ({
    title: `${classData.moduleCode} ${classData.classNo}`,
    description: `${classData.schedule.startTime} - ${classData.schedule.endTime} @ ${classData.venue}`,
    schedule: {
      startTime: militaryTimeToMinutes(classData.schedule.startTime),
      endTime: militaryTimeToMinutes(classData.schedule.endTime),
      day: classData.schedule.day
    },
  } as TimetableSlot));

  timetableSlots = timetableSlots.sort((a, b) => +a.schedule.startTime - +b.schedule.startTime);

  return timetableSlots;
};

// Given a NUSMods URL, extract the class information in the form of Class[]
const getClassInfo = async (url: string): Promise<Class[]> => {
  // Extract class information from URL
  // e.g. [ 'CS1010=TUT:06,SEC:1', 'CS1010E=SEC:2,TUT:18' ]
  const urlClassesInfo: string[] = url
    .substring(url.indexOf('?') + 1)
    .split('&');

  // Extract academic year from URL, assuming semester ends on May
  // e.g. 2021-2022
  const date: Date = new Date();
  const academicYear: string =
    date.getMonth() <= 4
      ? `${date.getFullYear() - 1}-${date.getFullYear()}`
      : `${date.getFullYear()}-${date.getFullYear() + 1}`;

  // Extract semester from URL
  // Semester 1 | 2 -> 0 | 1
  const semester: number = +url.split('/')[4][4] - 1;

  const classes: Class[] = [];

  for (const urlClassInfo of urlClassesInfo) {
    const moduleCode: string = urlClassInfo.substring(
      0,
      urlClassInfo.indexOf('=')
    );
    const enrolledClasses: string[] = urlClassInfo
      .substring(urlClassInfo.indexOf('=') + 1)
      .split(',')
      .filter((classInfo) => classInfo !== '');
    const moduleInfo: APIModule = (await fetchModuleInfo(
      composeUrl(academicYear, moduleCode)
    )) as APIModule;

    for (const enrolledClass of enrolledClasses) {
      const classNo: string = enrolledClass.substring(
        enrolledClass.indexOf(':') + 1
      );
      const classData: RawLesson = moduleInfo.semesterData[
        semester
      ].timetable.filter((classData) => classData.classNo === classNo)[0];

      classes.push({
        moduleCode: moduleInfo.moduleCode,
        classNo: `${classData.lessonType} ${classNo}`,
        venue: classData.venue,
        schedule: {
          startTime: classData.startTime,
          endTime: classData.endTime,
          day: classData.day,
        },
      });
    }
  }

  return classes;
};

// Utility function to convert military time to minutes since midnight
const militaryTimeToMinutes = (time: string): number => {
  const hours: number = +time.substring(0, 2);
  const minutes: number = +time.substring(2);
  return hours * 60 + minutes;
};

// GET request to NUSMods API to get single module information
const fetchModuleInfo = async (url: string) => {
  try {
    const response: AxiosResponse<APIModule> = await axios.get<APIModule>(url);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

// Composes the URL for the GET request to NUSMods API
const composeUrl = (academicYear: string, moduleCode: string): string => {
  const URL: string = 'https://api.nusmods.com/v2/';
  return URL + `${academicYear}/modules/${moduleCode}.json`;
};

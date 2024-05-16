import axios from 'axios'
import { APIModule, RawLesson } from 'Types/modules'

export interface Class {
  moduleCode: string;
  classNo: string;
  venue: string;
  schedule: {
    startTime: string;
    endTime: string;
    day: string;
  }
}

// Given a NUSMods url, extract the relevant class details and
// send a GET reqeust to NUSMods API to get the class timings
export const generateTimetable = async (url: string): Promise<Class[]> => {
  // Extract modules from URL
  const modules: string[] = url.substring(url.indexOf('?') + 1).split('&')
  
  // Extract date, assuming the academic year always ends on May
  const date: Date = new Date()
  const academicYear: string = date.getMonth() <= 5 ?
    `${date.getFullYear() - 1}-${date.getFullYear()}` : 
    `${date.getFullYear()}-${date.getFullYear() + 1}`

  // Extract semester: 1 | 2
  const semester: string = url.split('/')[4][4]

  const timetable: Class[] = []

  for (const module of modules) {
    const moduleCode: string = module.substring(0, module.indexOf('='))
    const classesInfo: string[] = module.substring(module.indexOf('=') + 1).split(',').filter((classInfo) => classInfo !== '')
    const moduleInfo: APIModule = await(getModuleInfo(composeUrl(academicYear, moduleCode))) as APIModule

    for (const classInfo of classesInfo) {
      const classNo: string = classInfo.substring(classInfo.indexOf(':') + 1)
      const classData: RawLesson = moduleInfo.semesterData[+semester - 1].timetable.filter((classData) => classData.classNo === classNo)[0]

      const selectedClass: Class = {
        moduleCode: moduleInfo.moduleCode,
        classNo: `${classData.lessonType} ${classNo}`,
        venue: classData.venue,
        schedule: {
          startTime: classData.startTime,
          endTime: classData.endTime,
          day: classData.day
        }
      }

      timetable.push(selectedClass)
    }

    timetable.sort((a, b) => {
      return +a.schedule.startTime - +b.schedule.startTime
    })
  }

  return timetable
}

const composeUrl = (academicYear: string, moduleCode: string): string => {
  const URL: string = 'https://api.nusmods.com/v2/'
  return URL + `${academicYear}/modules/${moduleCode}.json`
}

const getModuleInfo = (url: string) => {
  try {
    return axios.get<APIModule>(url)
      .then((response) => response.data)
  } catch (err) {
    console.error(err);
  }
}

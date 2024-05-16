import axios from 'axios'
import { APIModule, RawLesson } from 'Types/modules'

interface Class {
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

// Example URL: https://nusmods.com/timetable/sem-2/share?CS1010=TUT:02,SEC:1&CS1010E=SEC:2,TUT:18&CS1010R=&CS1010S=TUT:12,REC:03,LEC:1&CS2030=LAB:10A,REC:02,LEC:1&CS2030S=LAB:16E,REC:03,LEC:2
export const generateTimetable = async (url: string) => {
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
    const classesInfo: string[] = module.substring(module.indexOf('=') + 1).split(',')
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

    console.log(timetable)
  }
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

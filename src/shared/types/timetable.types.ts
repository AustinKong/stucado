import { Day } from 'Types/main.types';

export type Class = {
  moduleCode: string;
  classNo: string;
  venue: string;
  schedule: {
    startTime: string;
    endTime: string;
    day: string;
  }
};

// A timetable is an array of TimetableSlot
export type TimetableSlot = {
  id: number;
  title: string;
  description?: string;
  schedule: {
    startTime: number;
    endTime: number;
    day: Day;
  }
};

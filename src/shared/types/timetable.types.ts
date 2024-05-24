import { Day } from '../../shared/types/main.types';

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

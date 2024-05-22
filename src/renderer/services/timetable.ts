import { setTimetable } from 'Renderer/data/slices/timetableSlice';

import { store } from 'Renderer/data/store';
import { TimetableSlot } from 'Types/timetable.types';
// In charge of managing the timetable store and its actions

// Retrieve timetable from backend
export const retrieveTimetable = async (): Promise<void> => {
  const timetable: TimetableSlot[] = await (window.timetableAPI.getTimetable());
  store.dispatch(setTimetable(timetable));
}

// Passes NUS Mods url to backend to be retrieved from NUS Mods API
// Then updates the store
// TODO: URL validation
export const uploadTimetable = async (url: string): Promise<void> => {
  const timetable = await window.timetableAPI.uploadTimetable(url);
  console.log(timetable)
  store.dispatch(setTimetable(timetable));
}
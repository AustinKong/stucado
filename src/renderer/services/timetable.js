import { setTimetable } from '@data/slices/timetableSlice';

import { store } from '@data/store';
// In charge of managing the timetable store and its actions

// Retrieve timetable from backend
export const retrieveTimetable = async () => {
  const timetable = await window.timetableAPI.getTimetable();
  store.dispatch(setTimetable(timetable));
};

// Passes NUS Mods url to backend to be retrieved from NUS Mods API
// Then updates the store
// TODO: URL validation
export const uploadTimetable = async (url) => {
  const timetable = await window.timetableAPI.uploadTimetable(url);
  store.dispatch(setTimetable(timetable));
};

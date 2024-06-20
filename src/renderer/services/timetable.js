import { setTimetable } from '@data/slices/timetableSlice';
import { store } from '@data/store';

/**
 * Retrieves the timetable from the window.timetableAPI and dispatches it to the store. Called once when the app starts.
 * @returns {Promise<void>} A promise that resolves when the timetable is retrieved and dispatched.
 */
export const retrieveTimetable = async () => {
  const timetable = await window.timetableAPI.getTimetable();
  store.dispatch(setTimetable(timetable));
};

/**
 * Uploads a timetable from the given URL. Then dispatches the timetable to the store.
 * @param {string} url - The Nus Mods URL of the timetable to upload.
 * @returns {Promise<boolean>} - A promise that resolves to true if the timetable is uploaded successfully.
 */
export const uploadTimetable = async (url) => {
  const isValid = urlValidation(url);
  if (!isValid) {
    return false;
  }
  const timetable = await window.timetableAPI.uploadTimetable(url);
  store.dispatch(setTimetable(timetable));
  return true;
};

export const optimizeTimetable = async () => {
  const timetable = await window.timetableAPI.optimizeTimetable();
  store.dispatch(setTimetable(timetable));
};

const urlValidation = (url) => {
  const regex = /^https:\/\/nusmods\.com\/timetable\/sem-([1-4])\/share\?[^ ]+$/;
  return regex.test(url);
};

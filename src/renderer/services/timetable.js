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

// TODO: URL validation
/**
 * Uploads a timetable from the given URL. Then dispatches the timetable to the store.
 * @param {string} url - The Nus Mods URL of the timetable to upload.
 * @returns {Promise<void>} - A promise that resolves when the timetable is uploaded.
 */
export const uploadTimetable = async (url) => {
  const timetable = await window.timetableAPI.uploadTimetable(url);
  store.dispatch(setTimetable(timetable));
};

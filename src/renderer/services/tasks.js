import { setTasks } from '@data/slices/tasksSlice';
import { store } from '@data/store';

/**
 * Retrieves tasks from the tasksAPI and dispatches them to the store. Called once when the app starts.
 * @returns {Promise<void>} A promise that resolves when the tasks are retrieved and dispatched.
 */
export const retrieveTasks = async () => {
  const tasks = await window.tasksAPI.getTasks();
  store.dispatch(setTasks(tasks));
};

/**
 * Creates a new task with the given title, description, and estimated time.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {number} estimatedTime - The user estimated time for completing the task.
 * @returns {Promise<void>} - A promise that resolves when the task is created.
 */
export const createTask = async (title, description, estimatedTime) => {
  const task = await window.tasksAPI.createTask(title, description, estimatedTime);
  store.dispatch(setTasks([...store.getState().tasks, task]));
};

/**
 * Edits a task.
 * @param {Object} task - The new task object.
 * @returns {Promise<void>} - A promise that resolves when the task is edited.
 */
export const editTask = async (task) => {
  const updatedTask = await window.tasksAPI.updateTask(task);
  store.dispatch(setTasks(store.getState().tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))));
};

/**
 * Increments the status of a task.
 * @param {string} id - The ID of the task to be updated.
 * @returns {Promise<void>} - A promise that resolves when the task is updated.
 */
export const incrementTaskStatus = async (id) => {
  let task = store.getState().tasks.find((t) => t.id === id);
  task = await window.tasksAPI.updateTask({
    ...task,
    status: task.status === 'Pending' ? 'InProgress' : 'Completed',
    beginTime: task.status === 'Pending' ? new Date().getTime() : task.beginTime,
    endTime: task.status === 'InProgress' ? new Date().getTime() : task.endTime,
  });
  store.dispatch(setTasks(store.getState().tasks.map((t) => (t.id === id ? task : t))));
};

/**
 * Decrements the status of a task.
 * @param {string} id - The ID of the task.
 * @returns {Promise<void>} - A promise that resolves when the task status is updated.
 */
export const decrementTaskStatus = async (id) => {
  let task = store.getState().tasks.find((t) => t.id === id);
  task = await window.tasksAPI.updateTask({
    ...task,
    status: task.status === 'Completed' ? 'InProgress' : 'Pending',
  });
  store.dispatch(setTasks(store.getState().tasks.map((t) => (t.id === id ? task : t))));
};

/**
 * Deletes a task by its ID.
 * @param {number} id - The ID of the task to delete.
 * @returns {Promise<void>} - A promise that resolves when the task is deleted.
 */
export const deleteTask = async (id) => {
  const deletedTaskId = await window.tasksAPI.deleteTask(id);
  store.dispatch(setTasks(store.getState().tasks.filter((t) => t.id !== deletedTaskId)));
};

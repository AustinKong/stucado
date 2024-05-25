import {
  readTasks as readTasksCache,
  createTask as createTaskCache,
  updateTask as updateTaskCache,
  deleteTask as deleteTaskCache,
} from '@database/cache.js';

let taskUID = 0;

/**
 * Retrieves the list of tasks.
 * @param event - The IPC event object.
 * @returns A promise that resolves to an array of tasks.
 */
export async function getTasks() {
  const tasks = await readTasksCache();
  taskUID = tasks.length;
  return tasks;
}

/**
 * Creates a new task and saves to cache, then returns the created task.
 * @param event - The IPC event object.
 * @param content - The content of the task.
 * @param estimatedTime - The user estimated time for completing the task.
 * @returns A promise that resolves to the created task.
 */
export function createTask(_event, content, estimatedTime) {
  const task = {
    content,
    status: 'Pending',
    id: taskUID++,
    estimatedTime,
  };
  void createTaskCache(task);
  return Promise.resolve(task);
}

/**
 * Updates a task in the cache and returns the updated task.
 * @param event - The IPC event object.
 * @param task - The new task data.
 * @returns A Promise that resolves to the updated task.
 */
export function updateTask(_event, task) {
  void updateTaskCache(task);
  return Promise.resolve(task);
}

/**
 * Deletes a task.
 * @param event - The IPC event object.
 * @param id - The id of the task to be deleted.
 * @returns A promise that resolves to the id of the deleted task.
 */
export function deleteTask(_event, id) {
  void deleteTaskCache(id);
  return Promise.resolve(id);
}

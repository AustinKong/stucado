import { IpcMainInvokeEvent } from 'electron'
import { Task } from 'Types/task.types'
import { 
  readTasks as readTasksCache, 
  createTask as createTaskCache,
  updateTask as updateTaskCache,
  deleteTask as deleteTaskCache } from 'Main/database/cache'

let taskUID = 0;

/**
 * Retrieves the list of tasks.
 * @param event - The IPC event object.
 * @returns A promise that resolves to an array of tasks.
 */
export async function getTasks(event: IpcMainInvokeEvent): Promise<Task[]> {
  const tasks: Task[] = await readTasksCache()
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
export function createTask(event: IpcMainInvokeEvent, content: string, estimatedTime: number): Promise<Task> {
  const task: Task = {
    content,
    status: 'Pending',
    id: taskUID++,
    estimatedTime
  }
  void createTaskCache(task);
  return Promise.resolve(task); 
}


/**
 * Updates a task in the cache and returns the updated task.
 * @param event - The IPC event object.
 * @param task - The new task data.
 * @returns A Promise that resolves to the updated task.
 */
export function updateTask(event: IpcMainInvokeEvent, task: Task): Promise<Task> {
  void updateTaskCache(task);
  return Promise.resolve(task);
}

/**
 * Deletes a task.
 * @param event - The IPC event object.
 * @param id - The id of the task to be deleted.
 * @returns A promise that resolves to the id of the deleted task.
 */
export function deleteTask(event: IpcMainInvokeEvent, id: number): Promise<number> {
  void deleteTaskCache(id);
  return Promise.resolve(id);
}
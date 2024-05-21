import { IpcMainInvokeEvent } from 'electron'
import { Task } from 'Types/task.types'

export const getTasks = async (event: IpcMainInvokeEvent): Promise<Task[]> => {
  // Get from database
  return Promise.resolve([]);
}

export const updateTasks = (event: IpcMainInvokeEvent, tasks: Task[]): void => {
  // Write to database
  console.log(tasks)
}
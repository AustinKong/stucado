import { Task } from 'MainData/types/task.types'
import { IpcMainInvokeEvent } from 'electron'

export const getTasks = async (event: IpcMainInvokeEvent): Promise<Task[]> => {
  return Promise.resolve([{ id: 0, content: 'test', status: 'Completed' } as Task] as Task[])
}

export const updateTasks = (event: IpcMainInvokeEvent, tasks: Task[]): void => {
  console.log(tasks)
}
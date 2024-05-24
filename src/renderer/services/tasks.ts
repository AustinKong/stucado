import { setTasks } from 'Renderer/data/slices/tasksSlice';

import { Task } from 'Types/task.types';
import { store } from 'Renderer/data/store';

// Retrieve tasks from backend, called once on app start
export const retrieveTasks = async (): Promise<void> => {
  const tasks: Task[] = await (window.tasksAPI.getTasks());
  store.dispatch(setTasks(tasks));
}

export const createTask = async (content: string, estimatedTime: number): Promise<void> => {
  const task: Task = await window.tasksAPI.createTask(content, estimatedTime);
  store.dispatch(setTasks([...store.getState().tasks, task]));
}

export const editTask = async (task: Task): Promise<void> => {
  const t: Task = await window.tasksAPI.updateTask(task);
  store.dispatch(setTasks(store.getState().tasks.map(task => task.id === t.id ? t : task)));
}

export const incrementTaskStatus = async (id: number): Promise<void> => {
  let task: Task = store.getState().tasks.find(task => task.id === id) as Task;
  task = await window.tasksAPI.updateTask({ 
    ...task,
    status: task.status === 'Pending' ? 'InProgress' : 'Completed',
    beginTime: task.status === 'Pending' ? new Date() : task.beginTime, 
    endTime: task.status === 'InProgress' ? new Date() : task.endTime
  });
  store.dispatch(setTasks(store.getState().tasks.map(t => t.id === id ? task : t)));
}

export const decrementTaskStatus = async (id: number): Promise<void> => {
  let task: Task = store.getState().tasks.find(task => task.id === id) as Task;
  task = await window.tasksAPI.updateTask({ 
    ...task,
    status: task.status === 'Completed' ? 'InProgress' : 'Pending',
  });
  store.dispatch(setTasks(store.getState().tasks.map(t => t.id === id ? task : t)));
}

export const deleteTask = async (id: number): Promise<void> => {
  const i: number = await window.tasksAPI.deleteTask(id);
  store.dispatch(setTasks(store.getState().tasks.filter(task => task.id !== i)));
}
import { store } from 'Renderer/data/store';
import { setTasks } from 'Renderer/data/slices/tasksSlice';
import { Task } from 'Renderer/data/types/task.types';

// Retrieve tasks from backend
export const retrieveTasks = async (): Promise<void> => {
  const tasks: Task[] = await (window.tasksAPI.getTasks() as Promise<Task[]>);
  store.dispatch(setTasks(tasks));
}

// Add a new task to the store and backend
export const addTask = (content: string): void => {
  const updatedTasks: Task[] = [...store.getState().tasks, 
    { content, 
      status: 'Pending',
      id: store.getState().tasks.length > 0 ? store.getState().tasks[store.getState().tasks.length - 1].id + 1 : 0 
    }];
  updateTasks(updatedTasks);
}

export const toggleTaskStatus = (id: number): void => {
  const updatedTasks: Task[] = store.getState().tasks
    .map(task => task.id === id ? { ...task, status: task.status === 'Pending' ? 'InProgress' : 'Completed' } : task);
  updateTasks(updatedTasks);
}

export const deleteTask = (id: number): void => {
  const updatedTasks: Task[] = store.getState().tasks.filter(task => task.id !== id);
  updateTasks(updatedTasks);
}

// Update the store and backend
export const updateTasks = (tasks: Task[]): void => {
  store.dispatch(setTasks(tasks));
  window.tasksAPI.updateTasks(tasks);
}
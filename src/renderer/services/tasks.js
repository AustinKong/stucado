import { setTasks } from '@data/slices/tasksSlice';

import { store } from '@data/store';

// Retrieve tasks from backend, called once on app start
export const retrieveTasks = async () => {
  const tasks = await window.tasksAPI.getTasks();
  store.dispatch(setTasks(tasks));
};

export const createTask = async (content, estimatedTime) => {
  const task = await window.tasksAPI.createTask(content, estimatedTime);
  store.dispatch(setTasks([...store.getState().tasks, task]));
};

export const editTask = async (task) => {
  const t = await window.tasksAPI.updateTask(task);
  store.dispatch(setTasks(store.getState().tasks.map((task) => (task.id === t.id ? t : task))));
};

export const incrementTaskStatus = async (id) => {
  let task = store.getState().tasks.find((task) => task.id === id);
  task = await window.tasksAPI.updateTask({
    ...task,
    status: task.status === 'Pending' ? 'InProgress' : 'Completed',
    beginTime: task.status === 'Pending' ? new Date() : task.beginTime,
    endTime: task.status === 'InProgress' ? new Date() : task.endTime,
  });
  store.dispatch(setTasks(store.getState().tasks.map((t) => (t.id === id ? task : t))));
};

export const decrementTaskStatus = async (id) => {
  let task = store.getState().tasks.find((task) => task.id === id);
  task = await window.tasksAPI.updateTask({
    ...task,
    status: task.status === 'Completed' ? 'InProgress' : 'Pending',
  });
  store.dispatch(setTasks(store.getState().tasks.map((t) => (t.id === id ? task : t))));
};

export const deleteTask = async (id) => {
  const i = await window.tasksAPI.deleteTask(id);
  store.dispatch(setTasks(store.getState().tasks.filter((task) => task.id !== i)));
};

import { createTask, updateTask, deleteCache, readTasks, readTask, deleteTask } from './cacheDatabase';
import { Task } from '../../shared/types/task.types';

//This file is to verify that cacheDatabase.ts is storing the data
const task1: Task = {
  id: 1,
  content: 'First task',
  status: 'Pending',
  estimatedTime: 60,
  beginTime: new Date(),
  endTime: undefined
};

const task2: Task = {
  id: 1,
  content: 'First task',
  status: 'Completed',
  estimatedTime: 60,
  beginTime: new Date(),
  endTime: new Date()
};

const task3: Task = {
  id: 2,
  content: 'Second task',
  status: 'Pending',
  estimatedTime: 90,
  beginTime: new Date(),
  endTime: new Date()
};

async function main() {

  await createTask(task1);

  await updateTask(task2);

  await createTask(task3);

  await readTasks();

  await readTask(2);

  await deleteTask(1);

  await readTasks();

  await deleteCache();

  await readTasks();
}

main().catch(err => {
  console.error('Error:', err);
});
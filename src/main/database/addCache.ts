import { setupCacheDatabase, addOrUpdateTasks, clearCache, showAllDataFromTable } from './cacheDatabase';
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

async function main() {
  const cacheDb = await setupCacheDatabase();
  
  await addOrUpdateTasks(cacheDb, task1);

  await addOrUpdateTasks(cacheDb, task2);

  await showAllDataFromTable(cacheDb, 'tasks');

  await clearCache(cacheDb);

  await showAllDataFromTable(cacheDb, 'tasks');
}

main().catch(err => {
  console.error('Error:', err);
});
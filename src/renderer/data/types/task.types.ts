export type TaskStatus = 'Pending' | 'InProgress' | 'Completed';

export type Task = {
  id: number;
  content: string;
  status: TaskStatus;
};
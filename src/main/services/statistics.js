import { readAvgProductivity, readHoursFocused, readCompletedTasks } from '../database/stats.js';

export async function getHoursFocused(event, range) {
  let stats = await readHoursFocused();
  let cutoffDate = new Date().setDate(new Date().getDate() - range - 1);

  stats = stats
    .map((stat) => {
      return {
        date: new Date(stat.date),
        hoursFocused: stat.hours_focused,
      };
    })
    .filter((stat) => {
      return stat.date >= cutoffDate;
    });

  return stats;
}

export async function getTasksCompleted(event, range) {
  let stats = await readCompletedTasks();
  let cutoffDate = new Date().setDate(new Date().getDate() - range - 1);

  stats = stats
    .map((stat) => {
      return {
        date: new Date(stat.date),
        completedTasks: stat.tasks,
      };
    })
    .filter((stat) => {
      return stat.date >= cutoffDate;
    });

  return stats;
}

export async function getAverageProductivity(event, range) {
  let stats = await readAvgProductivity();
  let cutoffDate = new Date().setDate(new Date().getDate() - range - 1);

  stats = stats
    .map((stat) => {
      return {
        date: new Date(stat.date),
        averageProductivity: stat.avg_productivity,
      };
    })
    .filter((stat) => {
      return stat.date >= cutoffDate;
    });

  return stats;
}

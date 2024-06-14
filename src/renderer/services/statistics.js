// range is a number of days to look back
export const getHoursFocused = async (range) => {
  return window.tasksAPI.getHoursFocused(range);
};

export const getTasksCompleted = async (range) => {
  return window.tasksAPI.getTasksCompleted(range);
};

export const getAverageProductivity = async (range) => {
  return window.tasksAPI.getAverageProductivity(range);
};

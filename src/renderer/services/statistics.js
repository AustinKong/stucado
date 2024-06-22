// range is a number of days to look back
export const getHoursFocused = async (range) => {
  return window.statisticsAPI.getHoursFocused(range);
};

export const getTasksCompleted = async (range) => {
  return window.statisticsAPI.getTasksCompleted(range);
};

export const getAverageProductivity = async (range) => {
  return window.statisticsAPI.getAverageProductivity(range);
};

export const getCurrentTasksCompleted = async () => {
  return window.statisticsAPI.getCurrentTasksCompleted();
};

export const getCurrentAverageProductivity = async () => {
  return window.statisticsAPI.getCurrentAverageProductivity();
};

export const getCurrentHoursFocused = async () => {
  return window.statisticsAPI.getCurrentHoursFocused();
};

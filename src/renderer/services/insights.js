export const runModel = async (inputs) => {
  return await window.insightsAPI.runModel(inputs);
};

// Initialize the model on onboarding process, where habits: 'earlyBird', 'afternoon', 'nightOwl'
export const initializeModel = async (habit) => {
  return await window.insightsAPI.initializeModel(habit);
};

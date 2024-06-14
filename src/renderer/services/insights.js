export const generateMessage = async () => {
  const productivity = await runModel();
  const delta = Math.round(productivity - 100);
  const timeOfDay = new Date().getHours();

  // TODO: Add more variations based on factors such as tasks completed, etc.
  let mainText = "Welcome back, it's time to get to work!";
  let subText = `Your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day!`;

  if (6 < timeOfDay && timeOfDay < 12) {
    mainText = 'Good morning! A productive day starts with a productive morning!';
    subText = `Grab a cup of coffee and get started! Your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day!`;
  }
  if (18 < timeOfDay && timeOfDay < 24) {
    mainText = 'Evenings can be tough. How about wrapping up with some light work or planning for tomorrow?';
    subText = `It's late now, and your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day!`;
  }

  return { mainText, subText };
};

const runModel = async () => {
  return await window.insightsAPI.runModel();
};

// Initialize the model on onboarding process, where habits: 'earlyBird', 'afternoon', 'nightOwl'
export const initializeModel = async (habit) => {
  return await window.insightsAPI.initializeModel(habit);
};

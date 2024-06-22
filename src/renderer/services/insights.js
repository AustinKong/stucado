import { store } from '@data/store';
import { setMessage } from '@data/slices/insightsSlice';

export const generateMessage = (productivity) => {
  const delta = Math.round(productivity - 100);
  const timeOfDay = new Date().getHours();

  // TODO: Add more variations based on factors such as tasks completed, etc.
  let mainText = "Welcome back, it's time to get to work!";
  let subText = `Your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day.`;

  if (6 < timeOfDay && timeOfDay < 12) {
    mainText = 'Good morning! A productive day starts with a productive morning!';
    subText = `Grab a cup of coffee and get started! Your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day.`;
  }
  if (18 < timeOfDay && timeOfDay < 24) {
    mainText = 'Evenings can be tough. Wrap up with light work or plan for tomorrow.';
    subText = `It's late now, and your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day.`;
  }

  store.dispatch(setMessage({ mainText, subText }));
};

// Only calls the model, reply will be received via onResult event
export const runModel = async () => {
  store.dispatch(setMessage(null));
  await window.insightsAPI.runModel();
};

window.insightsAPI.onResult((event, result) => {
  generateMessage(result);
})

// Initialize the model on onboarding process, where habits: 'earlyBird', 'afternoon', 'nightOwl'
export const initializeModel = async (habit) => {
  return await window.insightsAPI.initializeModel(habit);
};

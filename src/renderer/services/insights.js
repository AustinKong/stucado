import { store } from '@data/store';
import { setMessage } from '@data/slices/insightsSlice';

export const generateMessage = (productivity) => {
  const delta = Math.max(Math.min(999, Math.round(productivity - 100)), -999);
  const timeOfDay = new Date().getHours();

  // TODO: Add more variations based on factors such as tasks completed, etc.
  let mainText = "Welcome back, it's time to get to work!";
  let subText = `Your productivity is ${delta > 0 ? 'up' : 'down'} by ${Math.abs(delta)}% at this time of the day.`;

  if (0 <= timeOfDay && timeOfDay < 6) {
    if (delta > 0) {
      mainText = 'Working late or starting early? You’re doing great!';
      subText = `Your productivity is up by ${Math.abs(delta)}% during these hours. Keep it up!`;
    } else {
      mainText = 'Burning the midnight oil? Hang in there!';
      subText = `Your productivity is down by ${Math.abs(delta)}% during these hours. Take a break if needed.`;
    }
  } else if (6 <= timeOfDay && timeOfDay < 12) {
    if (delta > 0) {
      mainText = 'Good morning! Your hard work is paying off!';
      subText = `Your productivity is up by ${Math.abs(delta)}% this morning. Keep the momentum going!`;
    } else {
      mainText = 'Good morning! A new day brings new opportunities!';
      subText = `Your productivity is down by ${Math.abs(delta)}% this morning. Let's turn it around!`;
    }
  } else if (12 <= timeOfDay && timeOfDay < 18) {
    if (delta > 0) {
      mainText = `Good afternoon! You're on a roll!`;
      subText = `Your productivity is up by ${Math.abs(delta)}% this afternoon. Keep it up!`;
    } else {
      mainText = `Good afternoon! Let's push through!`;
      subText = `Your productivity is down by ${Math.abs(delta)}% this afternoon. You can do it!`;
    }
  } else if (18 <= timeOfDay && timeOfDay < 24) {
    if (delta > 0) {
      mainText = 'Good evening! Great job today!';
      subText = `Your productivity is up by ${Math.abs(delta)}% this evening. Time to wind down and celebrate your success.`;
    } else {
      mainText = 'Good evening! Almost done!';
      subText = `Your productivity is down by ${Math.abs(delta)}% this evening. Finish strong and prepare for tomorrow.`;
    }
  }

  store.dispatch(setMessage({ mainText, subText }));
};

// Only calls the model, reply will be received via onResult event
export const runModel = async () => {
  store.dispatch(setMessage(null));
  const result = await window.insightsAPI.runModel();
  generateMessage(result);
};

// Initialize the model on onboarding process, where habits: 'earlyBird', 'afternoon', 'nightOwl'
export const initializeModel = async (habit) => {
  return await window.insightsAPI.initializeModel(habit);
};

//import { DaysOfWeek, TimesOfDay, Weathers } from '@shared/constants';
import { DaysOfWeek, TimesOfDay } from '../../shared/constants.js';
import { readDataPoints, updateDataPoint } from '../database/database.js';

// Learning rate and iterations
const learningRate = 0.005;
const iterations = 100000;

//convert categorical data into dummy variables
function categoricalToDummy(data) {
  const result = [];
  result.push(...TimesOfDay.map((time) => (data.timeOfDay === time ? 1 : 0)));
  result.push(...DaysOfWeek.map((day) => (data.dayOfWeek === day ? 1 : 0)));
  result.push(data.hoursInClasses);
  result.push(data.hoursFocused);
  //console.log('variables: ' + result);
  return result;
}

async function runGradientDescent(datapoint) {
  const dataPoints = await readDataPoints();
  //convert dataset into X and Y(target) variable
  const preparedDataset = dataPoints.map((data) => ({
    variables: categoricalToDummy(data),
    target: data.productivity,
  }));

  const numOfVariables = preparedDataset[0].variables.length;
  // Initialize weights(m) and intercept(c)
  let weights = Array(numOfVariables).fill(0);
  let intercept = 0;

  // Predict function
  function predict(variables) {
    return variables.reduce((sum, variable, index) => sum + variable * weights[index], intercept);
  }

  for (let i = 0; i < iterations; i++) {
    let weightGradients = Array(numOfVariables).fill(0);
    let interceptGradient = 0;

    preparedDataset.forEach(({ variables, target }) => {
      const predictedVal = predict(variables);
      const error = predictedVal - target;

      interceptGradient += error;
      variables.forEach((variable, index) => {
        weightGradients[index] += error * variable; //x_i(y - predicted y)
      });
    });

    intercept -= (learningRate * 2 * interceptGradient) / preparedDataset.length;
    weights = weights.map(
      (weight, index) => weight - (learningRate * 2 * weightGradients[index]) / preparedDataset.length
    );
  }

  const dummyDatapoint = categoricalToDummy(datapoint);
  const result = Math.round(predict(dummyDatapoint) * 1000) / 1000;

  let newDataPoint = {
    timeOfDay: datapoint.timeOfDay,
    dayOfWeek: datapoint.dayOfWeek,
    hoursInClasses: datapoint.hoursInClasses,
    hoursFocused: datapoint.hoursFocused,
    productivity: result,
  };

  await updateDataPoint(newDataPoint);
  return result;
}

export async function predictProductivity(time, day, hoursInClasses, hoursFocused) {
  let datapoint = {
    timeOfDay: time,
    dayOfWeek: day,
    hoursInClasses,
    hoursFocused,
    productivity: 0,
  };
  return runGradientDescent(datapoint);
}

//testing
//predictProductivity('evening', 'Friday', 3, 7);

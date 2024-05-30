//import { DaysOfWeek, TimesOfDay, Weathers } from '@shared/constants';
import { DaysOfWeek, TimesOfDay } from '../../shared/constants.js';
import { readDataPoints, updateDataPoint, deleteData } from '../database/database.js';

//raw data for testing
const rawData = `
midnight Sunday 0 5 80.2819977
night Friday 4 8 88.6510144
evening Tuesday 3 5 49.9780856
midnight Thursday 5 6 55.6206944
earlyAfternoon Tuesday 2 1.5 81.1513711
dawn Tuesday 3 0 28.1594180
evening Saturday 0 6 89.2
evening Thursday 5 5 62.7894415
midnight Saturday 0 12 67.4273954
lateMorning Sunday 0 2 47.0940917
earlyAfternoon Monday 3 3 79.6783827
lateAfternoon Saturday 0 5 65.0768531
earlyAfternoon Wednesday 1 3 88.39
night Thursday 5 7 62.7616772
dawn Monday 3 7 17.8864896
night Wednesday 1 8 93.8474123
lateAfternoon Friday 4 7 67.2026135
lateMorning Saturday 0 1 150.04
`;

function processRawData(rawData) {
  rawData
    .trim()
    .split('\n')
    .map((line) => {
      const parts = line.trim().split(' ');
      const [timeOfDay, dayOfWeek, hoursInClasses, hoursFocused, productivity] = parts;
      updateDataPoint({
        timeOfDay,
        dayOfWeek,
        hoursInClasses: parseFloat(hoursInClasses),
        hoursFocused: parseFloat(hoursFocused),
        productivity: parseFloat(productivity),
      });
    });
}

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
  const result = predict(dummyDatapoint);

  let newDataPoint = {
    timeOfDay: datapoint.timeOfDay,
    dayOfWeek: datapoint.dayOfWeek,
    hoursInClasses: datapoint.hoursInClasses,
    hoursFocused: datapoint.hoursFocused,
    productivity: result,
  };

  updateDataPoint(newDataPoint);
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
  await deleteData();
  processRawData(rawData);
  return runGradientDescent(datapoint);
}

//testing
//predictProductivity('evening', 'Friday', 3, 7);

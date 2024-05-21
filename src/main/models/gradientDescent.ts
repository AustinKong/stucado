import { setupDatabase, getDataPoints, DataPoint } from '../database/database';

//convert categorical data into dummy variables, with no reference level
const allTimesOfDay = [
  'dawn',
  'earlyAfternoon',
  'earlyMorning',
  'evening',
  'lateAfternoon',
  'lateMorning',
  'midnight',
  'night',
];
const allDaysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
const allWeathers = ['sunny', 'rainy', 'stormy', 'cloudy'];

function categoricalToDummy(data: DataPoint): number[] {
  const result: number[] = [];
  result.push(
    ...allTimesOfDay.map((time) => (data.timeOfDay === time ? 1 : 0))
  );
  result.push(...allDaysOfWeek.map((day) => (data.dayOfWeek === day ? 1 : 0)));
  result.push(data.hoursInClasses);
  result.push(data.hoursFocused);
  result.push(
    ...allWeathers.map((weather) => (data.weather === weather ? 1 : 0))
  );
  return result;
}

// Learning rate and iterations
const learningRate = 0.005;
const iterations = 100000;

async function runGradientDescent() {
  const db = await setupDatabase();

  const dataPoints = await getDataPoints(db);

  //convert dataset into X and Y(target) variable
  const preparedDataset = dataPoints.map((data) => ({
    variables: categoricalToDummy(data),
    target: data.productivity,
  }));

  const numOfVariables = preparedDataset[0].variables.length;
  // Initialize weights(m) and intercept(c)
  let weights: number[] = Array(numOfVariables).fill(0);
  let intercept = 0;

  function predict(variables: number[]): number {
    return variables.reduce(
      (sum, variable, index) => sum + variable * weights[index],
      intercept
    );
  }

  for (let i = 0; i < iterations; i++) {
    let weightGradients: number[] = Array(numOfVariables).fill(0);
    let interceptGradient = 0;
    let totalError = 0;

    preparedDataset.forEach(({ variables, target }) => {
      const predictedVal = predict(variables);
      const error = predictedVal - target;
      totalError += error ** 2;

      interceptGradient += error;
      variables.forEach((variable, index) => {
        weightGradients[index] += error * variable; //(predicted y - y)x_i
      });
    });

    intercept -=
      (learningRate * 2 * interceptGradient) / preparedDataset.length;
    weights = weights.map(
      (weight, index) =>
        weight -
        (learningRate * 2 * weightGradients[index]) / preparedDataset.length
    );
  }

  // Final weights and intercept
  console.log('Weights:', weights);
  console.log('Intercept:', intercept);

  const newExample: DataPoint = {
    timeOfDay: 'evening',
    dayOfWeek: 'Friday',
    hoursInClasses: 3,
    hoursFocused: 7,
    weather: 'sunny',
    productivity: 0, //dummy value
  };

  const newExample2: DataPoint = {
    timeOfDay: 'dawn',
    dayOfWeek: 'Monday',
    hoursInClasses: 9,
    hoursFocused: 2,
    weather: 'cloudy',
    productivity: 0, //dummy value
  };

  const newExample3: DataPoint = {
    timeOfDay: 'lateAfternoon',
    dayOfWeek: 'Wednesday',
    hoursInClasses: 12,
    hoursFocused: 0,
    weather: 'stormy',
    productivity: 0, //dummy value
  };

  const newFeatures = categoricalToDummy(newExample);
  const prediction = predict(newFeatures);
  console.log('Prediction for new example:', prediction);

  const newFeatures2 = categoricalToDummy(newExample2);
  const prediction2 = predict(newFeatures2);
  console.log('Prediction for new example2:', prediction2);

  const newFeatures3 = categoricalToDummy(newExample3);
  const prediction3 = predict(newFeatures3);
  console.log('Prediction for new example3:', prediction3);
}

runGradientDescent().catch((err) => {
  console.error('Error during gradient descent', err);
});

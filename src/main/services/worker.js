import { workerData, parentPort } from 'worker_threads';
import { predictProductivity } from '@models/gradientDescent';

const result = predictProductivity(
  workerData.datapoints,
  workerData.timeOfDay,
  workerData.dayOfWeek,
  workerData.hoursInClasses,
  workerData.hoursFocused
);

parentPort.postMessage(result);

import { testModel } from './insights.js';

const rawData = `
lateAfternoon Tuesday 4 10 23.50342
evening Thursday 2 2 88.57618
earlyAfternoon Tuesday 2 2 88.23966
earlyMorning Monday 2 6 63.97788
lateMorning Friday 6 1 120.33688
evening Tuesday 2 2 107.59645
midnight Tuesday 5 8 6.29595
lateMorning Friday 4 9 30.22396
lateMorning Saturday 0 7 107.52642
dawn Tuesday 1 0 82.29428
lateAfternoon Wednesday 5 4 137.92543
earlyAfternoon Friday 1 7 54.43010
lateAfternoon Wednesday 6 7 9.99732
night Saturday 2 4 95.73374
lateMorning Thursday 1 6 49.01667
earlyAfternoon Wednesday 5 7 96.12144
evening Thursday 3 0 53.87691
earlyAfternoon Friday 4 5 9.83387
earlyMorning Wednesday 7 2 9.45675
midnight Monday 3 7 122.50775
earlyAfternoon Thursday 4 4 8.61500
dawn Tuesday 6 0 84.91175
lateAfternoon Tuesday 4 4 9.41026
night Friday 7 6 41.15782
evening Thursday 7 3 16.49393
`;

const rawData2 = `
evening Friday 3 5 97.10233
dawn Sunday 3 3 106.78320
lateMorning Friday 5 4 87.24177
earlyAfternoon Sunday 0 5 60.43696
lateMorning Tuesday 4 5 93.58198
dawn Sunday 3 9 99.87518
earlyMorning Sunday 2 1 144.26267
midnight Friday 1 6 140.35165
night Friday 3 10 102.84637
dawn Thursday 1 8 103.95801
midnight Wednesday 2 1 75.57757
lateAfternoon Wednesday 6 8 122.44314
earlyMorning Monday 0 2 136.24675
lateMorning Wednesday 6 6 33.33876
lateAfternoon Tuesday 1 5 39.49909
earlyAfternoon Thursday 2 2 31.56404
night Saturday 2 9 21.43904
midnight Monday 0 0 29.44515
dawn Tuesday 2 10 5.22136
lateAfternoon Sunday 7 5 35.47142
night Monday 0 0 123.13315
lateMorning Friday 5 5 138.21019
midnight Tuesday 1 9 9.01784
evening Monday 3 9 123.59166
earlyAfternoon Sunday 7 7 75.49853
`;

const rawData3 = `
night Thursday 1 1 123.66285
earlyAfternoon Monday 0 1 110.65299
evening Friday 4 5 61.28178
dawn Thursday 2 9 28.57332
lateMorning Friday 0 8 133.29385
dawn Friday 1 2 66.93979
midnight Saturday 3 8 30.73956
evening Tuesday 5 9 42.11043
night Sunday 7 0 92.56910
earlyMorning Thursday 7 2 124.93857
night Sunday 0 1 7.60532
earlyAfternoon Wednesday 2 1 113.98175
earlyMorning Monday 0 2 139.35559
night Saturday 2 3 147.88802
midnight Friday 4 10 52.36831
evening Saturday 1 8 31.67382
evening Monday 3 2 116.30608
lateAfternoon Friday 4 3 27.57683
evening Thursday 2 4 120.83648
lateMorning Wednesday 3 8 118.18200
lateMorning Tuesday 5 2 10.01486
night Sunday 5 7 0.99035
lateAfternoon Tuesday 2 1 84.33099
dawn Monday 2 7 23.70229
lateMorning Thursday 2 7 63.07841
`;

describe('Gradient Descent Prediction', () => {
  test('predictProductivity should return a valid result', async () => {
    const result = await testModel(rawData, 'evening', 'Friday', 3, 7);
    expect(result).toBeCloseTo(48.97736, 3);
  });
});

describe('Gradient Descent Prediction', () => {
  test('predictProductivity should return a valid result', async () => {
    const result = await testModel(rawData2, 'earlyMorning', 'Wednesday', 0, 4);
    expect(result).toBeCloseTo(144.418, 3);
  });
});

describe('Gradient Descent Prediction', () => {
  test('predictProductivity should return a valid result', async () => {
    const result = await testModel(rawData3,'midnight', 'Monday', 5, 7);
    expect(result).toBeCloseTo(65.15323, 3);
  });
});
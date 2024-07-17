import { deleteData, updateDatapoint } from '../database/database.js';
import { processRawData, initializeModel, morningData, afternoonData, nightData } from './insights.js';

jest.mock('../database/database');
jest.mock('../models/gradientDescent');
jest.mock('./general');

describe('Insights Functions', () => {
  describe('processRawData Function', () => {
    test('should process raw data correctly', () => {
      const rawData = `
      midnight Monday 2 10 52.976
      night Thursday 2 7 29.737
      earlyAfternoon Wednesday 4 2 90.234
      `;
      const expected = [
        { timeOfDay: 'midnight', dayOfWeek: 'Monday', hoursInClasses: 2, hoursFocused: 10, productivity: 52.976 },
        { timeOfDay: 'night', dayOfWeek: 'Thursday', hoursInClasses: 2, hoursFocused: 7, productivity: 29.737 },
        {
          timeOfDay: 'earlyAfternoon',
          dayOfWeek: 'Wednesday',
          hoursInClasses: 4,
          hoursFocused: 2,
          productivity: 90.234,
        },
      ];
      const result = processRawData(rawData);
      expect(result).toEqual(expected);
    });
  });

  describe('initializeModel', () => {
    beforeEach(() => {
      deleteData.mockClear();
      updateDatapoint.mockClear();
    });

    test('should initialize model with morningData for earlyBird habit', async () => {
      await initializeModel(null, 'earlyBird');
      expect(deleteData).toHaveBeenCalled();
      const morningDatapoints = processRawData(morningData);
      expect(updateDatapoint).toHaveBeenCalledTimes(morningDatapoints.length);
      morningDatapoints.forEach((data) => {
        expect(updateDatapoint).toHaveBeenCalledWith(data);
      });
    });

    test('should initialize model with afternoonData for afternoon habit', async () => {
      await initializeModel(null, 'afternoon');
      expect(deleteData).toHaveBeenCalled();
      const afternoonDatapoints = processRawData(afternoonData);
      expect(updateDatapoint).toHaveBeenCalledTimes(afternoonDatapoints.length);
      afternoonDatapoints.forEach(data => {
        expect(updateDatapoint).toHaveBeenCalledWith(data);
      });
    });

    test('should initialize model with nightData for nightOwl habit', async () => {
      await initializeModel(null, 'nightOwl');
      expect(deleteData).toHaveBeenCalled();
      const nightDatapoints = processRawData(nightData);
      expect(updateDatapoint).toHaveBeenCalledTimes(nightDatapoints.length);
      nightDatapoints.forEach(data => {
        expect(updateDatapoint).toHaveBeenCalledWith(data);
      });
    });

    test('should not initialize model for unknown habit', async () => {
      await initializeModel(null, 'unknown');
      expect(deleteData).toHaveBeenCalled();
      expect(updateDatapoint).not.toHaveBeenCalled();
    });
  });
});

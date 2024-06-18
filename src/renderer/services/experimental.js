import { store } from '@data/store';

export const generateTestData = async () => {
  await window.experimentalAPI.generateTestData();
};

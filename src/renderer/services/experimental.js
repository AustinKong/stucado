export const generateTestData = async () => {
  await window.experimentalAPI.generateTestData();
};

export const resetOnboarding = async () => {
  await window.experimentalAPI.resetOnboarding();
};

export const tearDown = async () => {
  await window.experimentalAPI.tearDown();
};

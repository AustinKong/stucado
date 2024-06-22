export const generateTestData = async () => {
  await window.experimentalAPI.generateTestData();
};

export const resetOnboarding = async () => {
  await window.experimentalAPI.resetOnboarding();
};

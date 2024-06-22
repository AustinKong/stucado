export const logout = async () => {
  await window.generalAPI.logout();
};

export const clearData = async () => {
  window.generalAPI.clearData();
};

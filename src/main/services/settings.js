import { nativeTheme } from 'electron';

export async function getSettings() {
  return {
    theme: nativeTheme.themeSource,
    hasOnboarded: true,
  };
}

export async function updateTheme(event, theme) {
  nativeTheme.themeSource = theme;
}

export async function completeOnboarding() {
  console.log('user has completed onboarding');
}

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit',
    '@electron-toolkit/eslint-config-prettier',
    'react-app',
    'react-app/jest',
  ],
  rules: {
    'react/prop-types': 'off',
  },
  env: {
    jest: true,
  },
};

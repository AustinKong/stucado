import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@database': resolve('src/main/database'),
        '@services': resolve('src/main/services'),
        '@models': resolve('src/main/models'),
        '@shared': resolve('src/shared'),
      },
    },
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@assets': resolve('src/renderer/assets'),
        '@components': resolve('src/renderer/components'),
        '@data': resolve('src/renderer/data'),
        '@services': resolve('src/renderer/services'),
        '@styles': resolve('src/renderer/styles'),
        '@shared': resolve('src/shared'),
      },
    },
    plugins: [react(), svgr()],
  },
});

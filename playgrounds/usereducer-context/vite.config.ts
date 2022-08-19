import { defineConfig } from 'vite';
import mix from 'vite-plugin-mix';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 5000,
  },
  plugins: [
    react(),
    mix({
      handler: './api/index.js',
    }),
  ],
});

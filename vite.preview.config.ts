import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'bundled.html',
    },
  },
  server: {
    open: '/bundled.html',
  },
});

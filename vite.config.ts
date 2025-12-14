import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  base: '/web-component/',
  resolve: {
    alias: {
      '@': '/src',
      $lib: '/src/lib',
    },
  },
  build: {
    outDir: './build',
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
});

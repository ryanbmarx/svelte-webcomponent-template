import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  plugins: [
    tailwindcss(),
    svelte({
      include: /\.wc\.svelte$/ as any,
      emitCss: false,
      compilerOptions: {
        customElement: true,
        css: 'injected',
      },
    }),
    svelte({
      exclude: /\.wc\.svelte$/ as any,
      compilerOptions: {
        customElement: false,
        css: 'injected',
      },
    }),
  ],
});

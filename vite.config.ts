import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// https://vite.dev/config/
// export default defineConfig({
//   build: {
//     emptyOutDir: true,
//     lib: {
//       entry: 'src/main.ts',
//       name: 'SvelteViteApp',
//       fileName: (format) => `svelte-vite-app.${format}.js`,
//       formats: ['es', 'umd'],
//     },
//     rollupOptions: {
//       output: {
//         inlineDynamicImports: true,
//       },
//     },
//   },
//   resolve: {
//     alias: {
//       '@': '/src',
//       $lib: '/src/lib',
//     },
//   },
//   plugins: [
//     tailwindcss(),
//     svelte(),
//     // svelte({
//     //   include: /\.wc\.svelte$/ as any,
//     //   compilerOptions: {
//     //     customElement: true,
//     //     css: 'injected',
//     //   },
//     // }),
//     // svelte({
//     //   exclude: /\.wc\.svelte$/ as any,
//     //   compilerOptions: {
//     //     customElement: false,
//     //     css: 'injected',
//     //   },
//     // }),
//   ],
// });

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), svelte()],
  base: '/future-ed-mobility/',
  resolve: {
    alias: {
      $lib: path.resolve('./src/lib'),
      $: path.resolve('./src'),
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

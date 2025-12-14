/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/layerchart/**/*.{svelte,ts,js}'],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [], // Add classnames here that should ALWAYS be generated.
};

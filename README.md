# Svelte Web Component + TS + Vite

A modern web component built with Svelte, TypeScript, and Vite. This template creates a reusable custom element that can be used in any web application.

## Features

- 🧩 **Web Component**: Built as a native custom element (`<svelte-vite-app>`)
- 📦 **Multiple Distribution Formats**: 
  - ES Module (ESM)
  - Universal Module Definition (UMD)
- 🎨 **Styling**: 
  - TailwindCSS support
  - CSS-in-JS with proper scoping
  - Style isolation through Shadow DOM
- 🛠️ **Development Tools**:
  - TypeScript support
  - Prettier code formatting
  - Hot Module Replacement (HMR)
- 📝 **Type Definitions**: Included for TypeScript projects

## Quick Start

- rename web component
- rename main file
- rename url
- update dev.html at least with component name

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview the built version:
   ```bash
   npm run preview:bundled
   ```

## Usage Examples

### In HTML (ESM)
```html
<script type="module" src="/dist/svelte-vite-app.es.js"></script>
<svelte-vite-app></svelte-vite-app>
```

### In HTML (UMD)
```html
<script src="/dist/svelte-vite-app.umd.js"></script>
<svelte-vite-app></svelte-vite-app>
```

### In JavaScript/TypeScript (ESM)
```typescript
import 'webcomponent-svelte'
// The custom element is now registered and ready to use
document.body.innerHTML = '<svelte-vite-app></svelte-vite-app>'
```

### In a Node.js environment
```javascript
require('webcomponent-svelte')
```

## Development

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run preview:bundled` - Preview the built web component demo
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run check` - Type-check TypeScript files

## Project Structure

- `src/FutureEdMobilityExplorer.wc.svelte` - Main web component implementation
- `src/main.ts` - Web component registration and exports
- `bundled.html` - Demo page for the built web component
- `vite.config.ts` - Build and development configuration
- `vite.preview.config.ts` - Preview server configuration

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Need an official Svelte framework?

Check out [SvelteKit](https://github.com/sveltejs/kit#readme), which is also powered by Vite. Deploy anywhere with its serverless-first approach and adapt to various platforms, with out of the box support for TypeScript, SCSS, and Less, and easily-added support for mdsvex, GraphQL, PostCSS, Tailwind CSS, and more.

## Technical considerations

**Why use this over SvelteKit?**

- This template is specifically designed for creating standalone web components
- No routing or server-side features needed - just pure client-side components
- Smaller bundle size and focused functionality
- Perfect for creating reusable UI elements that can be shared across different frameworks or vanilla JS projects

This template is optimized for building web components with Svelte. It includes all the necessary configuration for:
- Building both ESM and UMD formats
- Proper TypeScript definitions
- Shadow DOM encapsulation
- CSS isolation
- Development tools like Prettier and TypeScript checking

**Why `global.d.ts` instead of `compilerOptions.types` inside `jsconfig.json` or `tsconfig.json`?**

Setting `compilerOptions.types` shuts out all other types not explicitly listed in the configuration. Using triple-slash references keeps the default TypeScript setting of accepting type information from the entire workspace, while also adding `svelte` and `vite/client` type information.

**Why include `.vscode/extensions.json`?**

Other templates indirectly recommend extensions via the README, but this file allows VS Code to prompt the user to install the recommended extension upon opening the project.

**Special Configuration Details**

1. **Vite Configuration**
   - Uses two Svelte plugins: one for web components (`.wc.svelte`) and one for regular Svelte components
   - Configured for library mode with both ESM and UMD outputs
   - TailwindCSS integration
   - Path aliases (`@` points to `src`)

2. **Package.json Configuration**
   - Proper exports field for different module systems
   - TypeScript type definitions
   - Development and build scripts
   - Prettier configuration for code formatting

**Why is HMR not preserving my local component state?**

HMR state preservation comes with a number of gotchas! It has been disabled by default in both `svelte-hmr` and `@sveltejs/vite-plugin-svelte` due to its often surprising behavior. You can read the details [here](https://github.com/rixo/svelte-hmr#svelte-hmr).

If you have state that's important to retain within a component, consider creating an external store which would not be replaced by HMR.

```ts
// store.ts
// An extremely simple external store
import { writable } from 'svelte/store'
export default writable(0)
```

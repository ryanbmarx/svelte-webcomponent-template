/**
 * Svelte Web Component Usage Examples:
 *
 * 1. In HTML (ESM):
 *    ```html
 *    <script type="module" src="/dist/svelte-vite-app.es.js"></script>
 *    <svelte-vite-app></svelte-vite-app>
 *    ```
 *
 * 2. In HTML (UMD):
 *    ```html
 *    <script src="/dist/svelte-vite-app.umd.js"></script>
 *    <svelte-vite-app></svelte-vite-app>
 *    ```
 *
 * 3. In JavaScript/TypeScript (ESM):
 *    ```typescript
 *    import 'webcomponent-svelte'
 *    // The custom element is now registered and ready to use
 *    document.body.innerHTML = '<svelte-vite-app></svelte-vite-app>'
 *    ```
 *
 * 4. In a Node.js environment:
 *    ```javascript
 *    require('webcomponent-svelte')
 *    ```
 */

import './app.css';
import App from './App.wc.svelte';

// The custom element is automatically defined when the component is imported
export default App;

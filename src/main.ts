import { mount } from 'svelte';
import './app.css';
import App from './FutureEdMobilityExplorer.wc.svelte';

console.log(document.getElementById('app'));
const app = mount(App, {
  target: document.getElementById('app')!,
});

export default app;

import { mount } from 'svelte';
import './app.css';
import App from './CNTI_AI_Legislation.svelte';

// Only mount to #app if it exists (regular mode)
// Otherwise, the web component will auto-register
const appElement = document.getElementById('app');
const app = appElement ? mount(App, { target: appElement }) : null;

export default app;

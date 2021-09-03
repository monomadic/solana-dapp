import App from './App.svelte';

declare let window: any;

const app = new App({
	target: document.body,
});

export default app;
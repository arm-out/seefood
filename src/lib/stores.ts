import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const apiKey = writable(
	browser && localStorage.getItem('apiKey') ? localStorage.getItem('apiKey')! : ''
);
apiKey.subscribe((value) => browser && localStorage.setItem('apiKey', String(value)));

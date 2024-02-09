import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	server: {
		port: 3000
	},
	preview: {
		host: '141.95.164.130',
		port: 3000,
		cors: {
			origin: '*'
		}
	}
});

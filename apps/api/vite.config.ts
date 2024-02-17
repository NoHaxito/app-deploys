import { resolve } from 'path';
import honox from 'honox/vite';
import pages from '@hono/vite-cloudflare-pages';
// import client from 'honox/vite/client'
import { defineConfig } from 'vite';

export default defineConfig(() => {
	// if (mode === 'client') {
	//   return {
	//     plugins: [client()]
	//   }
	// } else {
	return {
		plugins: [honox(), pages()],
		resolve: {
			alias: [
				{
					find: '@',
					replacement: resolve(__dirname, './')
				},
				{
					find: '@lib',
					replacement: resolve(__dirname, './lib')
				}
			]
		}
	};
	// }
});

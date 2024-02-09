import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});

const port = 3001;
console.log(`[API] Server running on port ${port}`);

serve({
	fetch: app.fetch,
	port
});

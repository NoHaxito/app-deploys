import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import apiApps from './routes/api/apps';
const app = new Hono();

app.get('/', (c) => {
	return c.text('Hello Hono!');
});
app.route('/api/apps', apiApps);

const port = 3001;
console.log(`[API] Server running on port ${port}`);

serve({
	fetch: app.fetch,
	port
});

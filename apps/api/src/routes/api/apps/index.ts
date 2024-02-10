import { execa } from 'execa';
import { Hono } from 'hono';
import { db } from '../../../lib/db';

const app = new Hono();
// apiApps

app.get('/', async (c) => {
	const apps = await db.selectFrom('apps').selectAll().execute();
	return c.json(apps);
});

export default app;

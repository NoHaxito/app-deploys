import { authMiddleware, getSessionToken } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';

const app = new Hono();
app.use(cors({ origin: '*' }));
app.use(authMiddleware);

app.get('/', async (c) => {
	const instance_types = await db.selectFrom('instance_types').selectAll().execute();
	return c.json(instance_types);
});

export default app;

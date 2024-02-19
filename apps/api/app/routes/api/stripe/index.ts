import { authMiddleware, getSessionToken } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';

const app = new Hono();
app.use(cors({ origin: '*' }));
// app.use(authMiddleware);

app.get('/', async (c) => {
	const plans = await db.selectFrom('plans').selectAll().execute();
	return c.json(plans);
});

export default app;

import { auth, getSessionToken } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';

const app = new Hono();
app.use(cors({ origin: '*' }));
app.use(auth);

app.get('/', async (c) => {
	const session = c.get('session');
	const services = await db
		.selectFrom('services')
		.selectAll()
		.where('user_id', '=', session?.userId!)
		.execute();
	return c.json(services);
});
app.post('/', async (c) => {
	const sessionToken = getSessionToken(c.req.header().authorization ?? '');
	const s = await db
		.selectFrom('user_sessions')
		.selectAll()
		.where('id', '=', sessionToken)
		.executeTakeFirst();
	const data = await c.req.json();
	console.log(data);
	return c.json(data);
});

export default app;

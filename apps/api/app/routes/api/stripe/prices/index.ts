import { authMiddleware, getSessionToken } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';
import { stripe } from '@/lib/stripe';

const app = new Hono();
app.use(cors({ origin: '*' }));
// app.use(authMiddleware);

app.get('/', async (c) => {
	const prices = await stripe.prices.list();
	return c.json(prices);
});

export default app;

import { auth } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';
import { stripe } from '@/lib/stripe';

const app = new Hono();
app.use(cors({ origin: '*' }));

// app.use(auth);

app.get('/', async (c) => {
	const price = c.req.query('price');
	if (!price) {
		return c.json({ error: 'Price not found' }, { status: 400 });
	}
	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		cancel_url: 'http://141.95.164.130:5173/?cancel',
		line_items: [
			{
				price,
				quantity: 1
			}
		],
		payment_method_types: ['card', 'paypal'],
		success_url: 'http://141.95.164.130:5173/?success'
	});
	return c.json(session);
});

export default app;

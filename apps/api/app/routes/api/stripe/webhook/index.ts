import { authMiddleware, getSessionToken } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';

const app = new Hono();
app.use(cors({ origin: '*' }));
// app.use(authMiddleware);

app.post('/', async (c) => {
	const signature = c.req.raw.headers.get('stripe-signature');
	const rawBody = await c.req.text();

	let event: Stripe.Event;
	if (!signature) {
		return c.text('', 400);
	}
	try {
		event = stripe.webhooks.constructEvent(
			rawBody,
			signature,
			'whsec_g5LvW8SGo61liZQp4YKzmZPUKEdltlin'
		);
	} catch (err: any) {
		// On error, log and return the error message
		console.log(`❌ Error message: ${err.message}`);
		c.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
		return;
	}
	if (event.type === 'payment_intent.succeeded') {
		console.log('☝ Event Object:', event.data.object);
		console.log('✅ Success Event ID:', event.id);
	} else {
		// Unexpected event type
		console.log(`🤷‍♀️ Unexpected event type: ${event.type}`);
	}
	return c.text('', 200);
});

export default app;

import { authMiddleware } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';

const app = new Hono();
app.use(cors({ origin: '*' }));
app.use(authMiddleware);

app.get('/', async (c) => {
	const service_type = c.req.query('service_id');
	if (service_type) {
		const service_image = await db
			.selectFrom('service_images')
			.selectAll()
			.where('service_type_id', '=', service_type)
			.execute();
		return c.json(service_image);
	} else {
		const service_images = await db.selectFrom('service_images').selectAll().execute();
		return c.json(service_images);
	}
});

export default app;

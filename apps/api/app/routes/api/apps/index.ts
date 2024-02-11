import { db } from '@lib/db';
import { createRoute } from 'honox/factory';
export const GET = createRoute(async (c) => {
	const apps = await db.selectFrom('apps').selectAll().execute();
	return c.json(apps);
});

import { authMiddleware } from '@/lib/utils';
import { db } from '@lib/db';
import { createRoute } from 'honox/factory';
export const GET = createRoute(authMiddleware, async (c) => {
	console.log(c.req.header());
	const apps = await db.selectFrom('apps').selectAll().execute();
	return c.json(apps);
});

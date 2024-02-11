import { generateId } from '@/lib/generate-id';
import { createRoute } from 'honox/factory';
export const GET = createRoute(async (c) => {
	const id = generateId(8);
	return c.json(id);
});

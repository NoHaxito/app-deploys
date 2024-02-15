import { Context, Env } from 'hono';

export const authMiddleware = async (c: Context<Env, any, {}>, next: any) => {
	const authorizationHeader = c.req.header().authorization;
	if (!authorizationHeader) {
		return c.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const sessionToken = authorizationHeader.split('Bearer ')[1];
	if (sessionToken.length === 0) {
		return c.json({ message: 'Unauthorized' }, { status: 401 });
	}
	await next();
};

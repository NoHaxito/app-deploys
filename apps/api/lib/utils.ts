import { Context, Env } from 'hono';
import { db } from './db';

export const authMiddleware = async (c: Context<Env, any, {}>, next: any) => {
	const authorizationHeader = c.req.header().authorization;
	if (!authorizationHeader) {
		return c.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const sessionToken = getSessionToken(authorizationHeader);
	if (sessionToken.length === 0) {
		return c.json({ message: 'Unauthorized' }, { status: 401 });
	}
	const session = await db
		.selectFrom('user_sessions')
		.selectAll()
		.where('id', '=', sessionToken)
		.executeTakeFirst();
	if (!session) {
		return c.json({ message: 'Unauthorized' }, { status: 401 });
	}
	await next();
};
export const getSessionToken = (authorizationHeader: string) => {
	const sessionToken = authorizationHeader.split('Bearer ')[1];
	return sessionToken;
};

import { Context, Env } from 'hono';
import { db } from './db';
import { lucia } from './lucia';

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
export const auth = async (c: Context<Env, any, {}>, next: any) => {
	const authorizationHeader = c.req.header('Authorization');
	const sessionId = lucia.readBearerToken(authorizationHeader ?? '');
	if (!sessionId) {
		return c.json(
			{ message: 'Unauthorized' },
			{
				status: 401
			}
		);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	c.set('user', user);
	c.set('session', session);
	await next();
};

export const getSessionToken = (authorizationHeader: string) => {
	const sessionToken = authorizationHeader.split('Bearer ')[1];
	return sessionToken;
};

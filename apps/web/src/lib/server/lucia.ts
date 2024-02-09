import { Lucia } from 'lucia';
import { dev } from '$app/environment';
import { pool } from './db';
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';

const adapter = new NodePostgresAdapter(pool, {
	user: 'auth_user',
	session: 'user_session'
});
export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: false
		}
	},
	getSessionAttributes: (attributes) => {
		return {
			username: attributes.username,
			email: attributes.email,
			avatar_url: attributes.avatar_url,
			role: attributes.role
		};
	}
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseSessionAttributes: DatabaseSessionAttributes;
	}
}
interface DatabaseSessionAttributes {
	username: string;
	email: string;
	avatar_url: string;
	role: string;
}

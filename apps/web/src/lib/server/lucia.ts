import { Lucia } from 'lucia';
// import { dev } from '$app/environment';
import { pool } from './db';
import { NodePostgresAdapter } from '@lucia-auth/adapter-postgresql';

const adapter = new NodePostgresAdapter(pool, {
	user: 'users',
	session: 'user_sessions'
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
			role: attributes.role,
			current_plan: attributes.current_plan
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
	current_plan: string;
}

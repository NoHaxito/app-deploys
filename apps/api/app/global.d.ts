import {} from 'hono';
import { Session, User } from 'lucia';

type Head = {
	title?: string;
};

declare module 'hono' {
	interface Env {
		Variables: {
			user: User | null;
			session: Session | null;
		};
		Bindings: {};
	}
	interface ContextRenderer {
		(content: string | Promise<string>, head?: Head): Response | Promise<Response>;
	}
}

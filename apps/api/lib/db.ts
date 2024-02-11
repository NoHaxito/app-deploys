// @ts-ignore

import { Kysely } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';
import { env } from './env';

const config = {
	user: env.VITE_POSTGRESQL_USER,
	password: env.VITE_POSTGRESQL_PASSWORD,
	host: env.VITE_POSTGRESQL_HOST,
	port: 19091,
	database: 'defaultdb',
	ssl: {
		rejectUnauthorized: true,
		ca: env.VITE_POSTGRESQL_SSL_CERTIFICATE
	}
};

export const db = new Kysely<Database>({
	dialect: new PostgresJSDialect({
		postgres: postgres(config)
	})
});

interface Database {
	apps: AppsTable;
	auth_user: UserTable;
	oauth_account: OauthAccountTable;
	user_session: SessionTable;
}

interface AppsTable {
	id: string;
	name: string;
	description: string;
	domain: string;
	user_id: string;
}

interface UserTable {
	id: string;
	username: string;
	email: string;
	avatar_url: string;
	hashed_password: string;
	role?: 'user' | 'admin';
}
interface SessionTable {
	id: string;
	user_id: string;
	expires_at: Date;
}
interface OauthAccountTable {
	provider_id: string;
	provider_user_id: string;
	user_id: string;
}

// @ts-ignore

import { Kysely } from 'kysely';
import { PostgresJSDialect } from 'kysely-postgres-js';
import postgres from 'postgres';
import { env } from './env';
import { Database } from './types';

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

import pkg from 'pg';
const { Pool } = pkg;
import { Kysely, PostgresDialect } from 'kysely';
import { env } from '../env';
import type { Database } from '../types';

const config = {
	user: env.POSTGRESQL_USER,
	password: env.POSTGRESQL_PASSWORD,
	host: env.POSTGRESQL_HOST,
	port: 19091,
	database: 'defaultdb',
	ssl: {
		rejectUnauthorized: true,
		ca: env.POSTGRESQL_SSL_CERTIFICATE
	}
};

export const pool = new Pool(config);

export const db = new Kysely<Database>({
	dialect: new PostgresDialect({
		pool
	})
});

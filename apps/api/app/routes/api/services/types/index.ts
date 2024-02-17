import { authMiddleware, getSessionToken } from '@/lib/utils';
import { cors } from 'hono/cors';
import { db } from '@lib/db';
import { Hono } from 'hono';
import { ServiceTypes, ServiceTypesSettings } from '@/lib/types';

const app = new Hono();
app.use(cors({ origin: '*' }));
app.use(authMiddleware);

interface ServiceTypesWithSettings extends ServiceTypes {
	settings: Omit<ServiceTypesSettings, 'service_type_id'>;
}

app.get('/', async (c) => {
	const service_types = await db.selectFrom('service_types').selectAll().execute();
	let serviceTypes: ServiceTypesWithSettings[] = [];
	await Promise.all(
		serviceTypes.map(async (serviceType) => {
			const settings = await db
				.selectFrom('service_types_settings')
				.select([
					'isdatabase',
					'needsbuildsettings',
					'needsinstallcommand',
					'needsbuildcommand',
					'needsstartcommand',
					'needsrepositorysource',
					'needsenvironmentvariables'
				])
				.where('service_type_id', '=', serviceType.id)
				.executeTakeFirst();
			serviceTypes.push({
				...serviceType,
				settings: settings!
			});
		})
	);
	return c.json(service_types);
});

app.get('/:id', async (c) => {
	const service_type = await db
		.selectFrom('service_types')
		.selectAll()
		.where('id', '=', c.req.param('id'))
		.executeTakeFirst();
	const service_type_settings = await db
		.selectFrom('service_types_settings')
		.select([
			'isdatabase',
			'needsbuildsettings',
			'needsinstallcommand',
			'needsbuildcommand',
			'needsstartcommand',
			'needsrepositorysource',
			'needsenvironmentvariables'
		])
		.where('service_type_id', '=', c.req.param('id'))
		.executeTakeFirst();
	return c.json({ ...service_type, settings: service_type_settings });
});
export default app;

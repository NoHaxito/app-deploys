import { auth } from '@/lib/utils';
import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';

const app = createApp();

showRoutes(app, { colorize: true });
app.use('/*', auth);

export default app;

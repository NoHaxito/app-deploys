import { showRoutes } from 'hono/dev';
import { createApp } from 'honox/server';

const app = createApp();

showRoutes(app, { colorize: true });

export default app;

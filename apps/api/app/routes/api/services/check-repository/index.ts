import { authMiddleware } from '@/lib/utils';
import { cors } from 'hono/cors';

import { Hono } from 'hono';
const app = new Hono();
app.use(cors({ origin: '*' }));
app.use(authMiddleware);

app.get('/', async (c) => {
	const repoOwner = c.req.query('owner');
	const repoName = c.req.query('name');
	if (!repoOwner || !repoName) {
		return c.json({ error: 'Missing repository owner or name' }, { status: 500 });
	}
	const repoWorkDir = c.req.query('workdir');
	const branches = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/branches`)
		.then((res) => res.json() as any)
		.then((data: any | any[]) => {
			if (data.message) {
				return { error: data.message };
			} else return (data as any[]).map((branch: { name: string }) => branch.name);
		});
	const files = await fetch(
		`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${repoWorkDir ?? '.'}`
	)
		.then((res) => res.json() as any)
		.then((data: any | any[]) => {
			if (data.message) {
				return { error: data.message };
			} else return data as any[];
		});
	if ((branches as { error: any }).error || (files as { error: any }).error) {
		return c.json(
			{ error: (branches as { error: any }).error || (files as { error: any }).error },
			{ status: 500 }
		);
	}

	return c.json({
		branches,
		isNpm: (files as { name: string }[]).some((file) => file.name === 'package-lock.json'),
		isPnpm: (files as { name: string }[]).some((file) => file.name === 'pnpm-lock.yaml'),
		isYarn: (files as { name: string }[]).some((file) => file.name === 'yarn.lock')
	});
});

export default app;

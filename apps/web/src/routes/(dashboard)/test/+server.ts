import { json } from '@sveltejs/kit';

export const GET = async ({ locals }) => {
	const res = await fetch('http://localhost:5173/api/apps', {
		headers: {
			Authorization: `Bearer ${locals.session?.id}`
		}
	});
	const data = await res.json();
	return json({ data });
};

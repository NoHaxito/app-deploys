import { lucia } from '$/lib/server/lucia.js';
import { json, redirect } from '@sveltejs/kit';

export const GET = async ({ locals, cookies }) => {
	if (!locals.session) {
		return json(
			{
				success: false,
				message: 'Unauthorized'
			},
			{ status: 401 }
		);
	}
	await lucia.invalidateSession(locals.session.id);
	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(sessionCookie.name, sessionCookie.value, {
		path: '.',
		...sessionCookie.attributes
	});
	return redirect(302, '/auth/login');
};

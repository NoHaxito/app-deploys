import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { Argon2id } from 'oslo/password';
import { db } from '$/lib/server/db';
import { loginFormSchema } from './auth-login-form.svelte';
import { lucia } from '$/lib/server/lucia';
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(loginFormSchema)
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, loginFormSchema);
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const data = form.data;
		// check if email exists
		const emailExists = await db
			.selectFrom('auth_user')
			.selectAll()
			.where('email', '=', data.email)
			.executeTakeFirst();
		if (!emailExists) {
			return fail(400, {
				message: 'Email or Password are invalid, please try again.',
				form
			});
		}
		const validPassword = await new Argon2id().verify(emailExists.hashed_password, data.password);
		if (!validPassword) {
			return fail(400, {
				message: 'Incorrect username or password, please try again.',
				form
			});
		}
		const session = await lucia.createSession(emailExists.id, {
			avatar_url: emailExists.avatar_url,
			email: emailExists.email,
			username: emailExists.username,
			role: emailExists.role ?? 'user'
		});
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		throw redirect(302, '/');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	}
};

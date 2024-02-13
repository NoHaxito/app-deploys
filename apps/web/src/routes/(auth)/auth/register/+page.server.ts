import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { registerFormSchema } from './auth-register-form.svelte';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';
import { db } from '$/lib/server/db';
import { sql } from 'kysely';
export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(registerFormSchema))
	};
};
export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(registerFormSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		// try {
		const data = form.data;
		if (data.password !== data.confirmPassword) {
			return fail(400, {
				message: 'Passwords do not match',
				form
			});
		}
		// check if email exists
		const emailExists = await db
			.selectFrom('auth_user')
			.selectAll()
			.where('email', '=', data.email)
			.executeTakeFirst();
		if (emailExists) {
			console.log('already registered');
			return fail(400, {
				message: 'Email already registered, please try logging in.',
				form
			});
		}
		const userId = generateId(15);
		const hashedPassword = await new Argon2id().hash(data.password);
		// check if is first register
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const result = await sql<any>`select count(*) from auth_user`.execute(db);
		const isFirstRegister = Number(result.rows[0].count) === 0;

		await db
			.insertInto('auth_user')
			.values({
				id: userId,
				email: data.email,
				username: data.username,
				hashed_password: hashedPassword,
				avatar_url: `https://avatar.vercel.sh/${data.email}`,
				role: isFirstRegister ? 'admin' : 'user'
			})
			.execute();
		throw redirect(302, '/auth/login');
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// } catch (error: any) {
		// 	console.log(error);
		// 	return fail(500, {
		// 		message: error.message,
		// 		form
		// 	});
		// }
	}
};

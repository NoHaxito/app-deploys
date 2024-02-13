import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { applicationSchema } from './schema';
import { fail, type Actions } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate({ type: 'database' }, zod(applicationSchema))
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(applicationSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		return { form };
	}
};

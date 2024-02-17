import { env } from '$/lib/env';
import type { InstanceTypes, ServiceImages, ServiceTypes, ServiceTypesSettings } from '$/lib/types';
import { superValidate } from 'sveltekit-superforms';
import { loadSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error, fail, type Actions } from '@sveltejs/kit';

interface ServiceTypesWithSettings extends ServiceTypes {
	settings: Omit<ServiceTypesSettings, 'service_type_id'>;
}

export const load = async ({ params, locals }) => {
	const serviceType: ServiceTypesWithSettings = await fetch(
		`${env.BACKEND_API_URL}/api/services/types/${params.serviceType}`,
		{
			headers: {
				Authorization: `Bearer ${locals.session?.id}`
			}
		}
	).then((res) => res.json());

	const schemaLoaded = loadSchema(serviceType.settings);
	if (!schemaLoaded) {
		error(500, {
			title: 'Something went wrong!',
			message: 'At the moment you cant create this service, please try again later or contact us.'
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} as any);
	}
	const serviceImages: ServiceImages[] = await fetch(
		`${env.BACKEND_API_URL}/api/services/images?service_id=${serviceType.id}`,
		{
			headers: {
				Authorization: `Bearer ${locals.session?.id}`
			}
		}
	).then((res) => res.json());

	const instanceTypes: InstanceTypes[] = await fetch(`${env.BACKEND_API_URL}/api/instances`, {
		headers: {
			Authorization: `Bearer ${locals.session?.id}`
		}
	}).then((res) => res.json());
	const form = await superValidate(zod(schemaLoaded));
	return {
		serviceType,
		instanceTypes,
		serviceImages,
		user: locals.session,
		form
	};
};

export const actions: Actions = {
	default: async (event) => {
		const serviceType: ServiceTypesWithSettings = await fetch(
			`${env.BACKEND_API_URL}/api/services/types/${event.params.serviceType}`,
			{
				headers: {
					Authorization: `Bearer ${event.locals.session?.id}`
				}
			}
		).then((res) => res.json());
		const form = await superValidate(event, zod(loadSchema(serviceType.settings)!));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const data = form.data;
		const response = await fetch(`${env.BACKEND_API_URL}/api/services`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${event.locals.session?.id}`
			},
			body: JSON.stringify({
				...data,
				service_type_id: serviceType.id
			})
		}).then((res) => res.json());
		console.log(response);
		return { form };
	}
};

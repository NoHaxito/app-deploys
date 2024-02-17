export async function getApplicationTypes() {
	return ['nodejs', 'database', 'dockerfile', 'wordpress', 'nginx'];
}

import * as v from 'valibot';

export const appSchema = v.objectAsync({
	name: v.string([v.minLength(6), v.maxLength(56)]),
	description: v.optional(v.string([v.minLength(12), v.maxLength(1000)])),
	type: v.picklistAsync([...(await getApplicationTypes()).map((type) => type)])
});

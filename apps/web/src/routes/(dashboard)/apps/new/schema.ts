import { z } from 'zod';
export const applicationSchema = z.object({
	name: z
		.string()
		.min(6, { message: 'Name must be at least 6 characters' })
		.max(56, { message: 'Name must be at most 56 characters' }),
	description: z
		.string()
		.min(6, { message: 'Description must be at least 6 characters' })
		.max(256, { message: 'Description must be at most 256 characters' }),

	type: z
		.enum(['nodejs', 'database', 'dockerfile', 'wordpress', 'nginx'], {
			required_error: 'You need to choose a application type'
		})
		.default('nodejs'),
	repository_url: z
		.string()
		.url({ message: 'Invalid repository url' })
		.superRefine((val, ctx) => {
			if (!val.includes('github.com')) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Repository url must be from github.com`
				});
			}
		}),
	branch: z.string(),
	install_command: z.string().optional(),
	build_command: z.string().optional(),
	start_command: z.string().optional(),
	environment_variables: z.string().optional()
});
// export const
export type TypeSchemaForm = typeof applicationSchema;

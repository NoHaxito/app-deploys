import type { ServiceTypesSettings } from '$/lib/types';
import { z } from 'zod';

const baseSchema = z.object({
	name: z
		.string()
		.min(6, { message: 'Name must be at least 6 characters' })
		.max(56, { message: 'Name must be at most 56 characters' }),
	description: z
		.string()
		.min(12, { message: 'Description must be at least 12 characters' })
		.max(1000, { message: 'Description must be at most 1000 characters' })
		.optional(),
	instance_type: z
		.string({ required_error: 'Instance type is required' })
		.min(1, { message: 'Instance type is required' })
});

const databaseSchema = z.object({
	database_name: z.string({ required_error: 'Database name is required' }).optional(),
	database_user: z.string({ required_error: 'Database user is required' }).optional(),
	database_password: z.string({ required_error: 'Database password is required' }).optional()
});

const repositorySourceSchema = z.object({
	repository_url: z
		.string({ required_error: 'Repository url is required' })
		.url({ message: 'Invalid repository url' })
		.superRefine((val, ctx) => {
			if (!val.includes('github.com')) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Repository url must be from github.com`
				});
			}
		}),
	branch: z.string().min(1, { message: 'Branch is required' }),
	workdir: z.string().min(1, { message: 'Workdir is required' }).optional().default('.')
});

const startCommandSchema = z.object({
	start_command: z.string().optional()
});

const installCommandSchema = z.object({
	install_command: z.string().optional()
});

const buildCommandSchema = z.object({
	build_command: z.string().optional()
});

const environmentVariablesSchema = z.object({
	environment_variables: z.string().optional()
});

export const nodejsSchema = z.object({
	name: z
		.string()
		.min(6, { message: 'Name must be at least 6 characters' })
		.max(56, { message: 'Name must be at most 56 characters' }),
	description: z
		.string()
		.min(12, { message: 'Description must be at least 12 characters' })
		.max(1000, { message: 'Description must be at most 1000 characters' })
		.optional(),
	repository_url: z
		.string({ required_error: 'Repository url is required' })
		.url({ message: 'Invalid repository url' })
		.superRefine((val, ctx) => {
			if (!val.includes('github.com')) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Repository url must be from github.com`
				});
			}
		}),
	branch: z.string().min(1, { message: 'Branch is required' }),
	install_command: z.string().optional(),
	build_command: z.string().optional(),
	start_command: z.string().optional(),
	environment_variables: z.string().optional(),
	instance_type: z.string({ required_error: 'Instance type is required' })
});

export const schemas = {
	nodejs: nodejsSchema
};

export function loadSchema(settings: Omit<ServiceTypesSettings, 'service_type_id'>) {
	if (!settings) {
		return null;
	}
	const options = {
		isdatabase: settings.isdatabase || false,
		needsbuildsettings: settings.needsbuildsettings || false,
		needsinstallcommand: settings.needsinstallcommand || false,
		needsbuildcommand: settings.needsbuildcommand || false,
		needsstartcommand: settings.needsstartcommand || false,
		needsrepositorysource: settings.needsrepositorysource || false,
		needsenvironmentvariables: settings.needsenvironmentvariables || false
	};

	return buildZodSchema(options);
}

function buildZodSchema(options: Omit<ServiceTypesSettings, 'service_type_id'>) {
	let schema = baseSchema;

	if (options.isdatabase) {
		schema = schema.merge(databaseSchema);
	}

	if (options.needsenvironmentvariables) {
		schema = schema.merge(environmentVariablesSchema);
	}

	if (options.needsbuildsettings) {
		if (options.needsinstallcommand) {
			schema = schema.merge(installCommandSchema);
		}
		if (options.needsbuildcommand) {
			schema = schema.merge(buildCommandSchema);
		}
		if (options.needsstartcommand) {
			schema = schema.merge(startCommandSchema);
		}
	}

	if (options.needsrepositorysource) {
		schema = schema.merge(repositorySourceSchema);
	}

	return schema;
}

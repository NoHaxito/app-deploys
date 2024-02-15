export interface Database {
	users: UserTable;
	user_oauth_account: OauthAccountTable;
	user_sessions: SessionTable;
	plans: Plans;
	application_types: ApplicationTypes;
	instance_types: InstanceTypes;
	apps: Apps;
	app_settings: AppSettings;
	app_envs: AppEnvs;
	app_status: AppStatus;
}

export interface UserTable {
	id: string;
	username: string;
	email: string;
	avatar_url: string;
	hashed_password: string;
	role?: 'user' | 'admin';
	current_plan?: string;
}

export interface SessionTable {
	id: string;
	user_id: string;
	expires_at: Date;
}

export interface OauthAccountTable {
	provider_id: string;
	provider_user_id: string;
	user_id: string;
}

export interface Plans {
	id: string;
	name: string;
	price: number;
}

export interface ApplicationTypes {
	id: string;
	name: string;
	icon_name: string;
	description: string;
}

export interface InstanceTypes {
	id: string;
	name: string;
	ram: string;
	cpus: string;
	available_plans: string[];
	available_application_types: string[];
}

export interface Apps {
	id: string;
	name: string;
	description: string;
	domain: string;
	user_id: string;
}

export interface AppSettings {
	app_id: string;
	repository_url: string;
	branch: string;
	install_command: string;
	build_command: string;
	start_command: string;
	instance_type: string;
	application_type: string;
}

export interface AppEnvs {
	app_id: string;
	key: string;
	value: string;
}

export interface AppStatus {
	app_id: string;
	status: string;
	isStarting: boolean;
	isStopping: boolean;
	isRunning: boolean;
}

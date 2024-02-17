export type SidebarItem = {
	active?: boolean;
	href: string;
};

export interface Database {
	users: UserTable;
	user_oauth_account: OauthAccountTable;
	user_sessions: SessionTable;
	plans: Plans;
	service_types: ServiceTypes;
	instance_types: InstanceTypes;
	services: Services;
	service_settings: ServiceSettings;
	service_envs: ServiceEnvs;
	service_status: ServiceStatus;
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

export interface ServiceTypes {
	id: string;
	name: string;
	icon_name: string;
	description: string;
}
export interface ServiceTypesSettings {
	service_type_id: string;
	isdatabase: boolean;
	needsbuildsettings: boolean;
	needsinstallcommand: boolean;
	needsbuildcommand: boolean;
	needsstartcommand: boolean;
	needsrepositorysource: boolean;
	needsenvironmentvariables: boolean;
}
export interface ServiceImages {
	service_type_id: string;
	image: string;
}
export interface InstanceTypes {
	id: string;
	name: string;
	ram: string;
	cpu: string;
	available_plans: string[];
	available_application_types: string[];
}

export interface Services {
	id: string;
	name: string;
	description?: string;
	user_id: string;
	instance_type: string;
	service_type: string;
}

export interface ServiceSettings {
	service_id: string;
	repository_url?: string;
	branch?: string;
	install_command?: string;
	domain?: string;
	build_command?: string;
	start_command?: string;
}

export interface ServiceEnvs {
	service_id: string;
	key: string;
	value: string;
}

export interface ServiceStatus {
	service_id: string;
	status: string;
	isStarting: boolean;
	isStopping: boolean;
	isRunning: boolean;
}

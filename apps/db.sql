CREATE TABLE IF NOT EXISTS plans(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL
);

INSERT INTO
    plans (id, name, price)
VALUES
    ('free', 'Free', 0);

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    hashed_password TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    current_plan TEXT DEFAULT 'free',
    FOREIGN KEY(current_plan) REFERENCES plans(id)
);

CREATE TABLE user_settings(
    user_id TEXT PRIMARY KEY,
    language TEXT DEFAULT 'en',
    two_factor BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_sessions(
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id TEXT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    role TEXT DEFAULT 'user',
    current_plan TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY(current_plan) REFERENCES plans(id)
);

CREATE TABLE user_oauth_accounts(
    provider_id TEXT NOT NULL,
    provider_user_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    PRIMARY KEY (provider_id, provider_user_id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE instance_types(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    ram NUMERIC NOT NULL,
    cpu NUMERIC NOT NULL,
    available_plans JSON DEFAULT '["free"]',
    available_service_types JSON DEFAULT '[]'
);

INSERT INTO
    instance_types (
        id,
        name,
        ram,
        cpu
    )
VALUES
    ('free', 'Free', 512, 0.4);

CREATE TABLE service_types(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT DEFAULT ''
);

CREATE TABLE service_images (
    service_type_id TEXT PRIMARY KEY,
    name TEXT NOT NULL image TEXT NOT NULL,
    FOREIGN KEY(service_type_id) REFERENCES service_types(id) ON DELETE CASCADE
);

CREATE TABLE service_types_settings (
    service_type_id TEXT PRIMARY KEY,
    isDatabase BOOLEAN NOT NULL,
    needsBuildSettings BOOLEAN NOT NULL,
    needsInstallCommand BOOLEAN NOT NULL,
    needsBuildCommand BOOLEAN NOT NULL,
    needsStartCommand BOOLEAN NOT NULL,
    needsRepositorySource BOOLEAN NOT NULL,
    needsEnvironmentVariables BOOLEAN NOT NULL,
    FOREIGN KEY(service_type_id) REFERENCES service_types(id) ON DELETE CASCADE
);

INSERT INTO
    service_types (id, name, icon_name)
VALUES
    ('nodejs', 'Node.js', 'nodejs');

INSERT INTO
    service_types (id, name, icon_name, description)
VALUES
    (
        'postgresql',
        'PostgreSQL',
        'postgresql',
        'Deploy PostgreSQL databases with ease.'
    );

INSERT INTO
    service_types_settings (
        service_type_id,
        isDatabase,
        needsBuildSettings,
        needsInstallCommand,
        needsBuildCommand,
        needsStartCommand,
        needsRepositorySource,
        needsEnvironmentVariables
    )
VALUES
    (
        'postgresql',
        true,
        false,
        false,
        false,
        false,
        false,
        true
    );

CREATE TABLE services(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    user_id TEXT NOT NULL,
    instance_type TEXT NOT NULL,
    service_type TEXT NOT NULL,
    FOREIGN KEY(service_type) REFERENCES service_types(id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE service_settings(
    service_id TEXT PRIMARY KEY,
    image TEXT DEFAULT NULL,
    domain TEXT,
    repository_url TEXT,
    branch TEXT,
    install_command TEXT,
    build_command TEXT,
    start_command TEXT,
    FOREIGN KEY(service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE service_envs(
    service_id TEXT PRIMARY KEY,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    FOREIGN KEY(service_id) REFERENCES services(id) ON DELETE CASCADE
);

CREATE TABLE service_status(
    service_id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    isStarting BOOLEAN NOT NULL,
    isStopping BOOLEAN NOT NULL,
    isRunning BOOLEAN NOT NULL,
    FOREIGN KEY(service_id) REFERENCES services(id) ON DELETE CASCADE
);
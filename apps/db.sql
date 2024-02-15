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
    available_plans JSON NOT NULL DEFAULT '["free"]',
    available_application_types JSON NOT NULL DEFAULT '[]'
);

CREATE TABLE application_types(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    icon_name TEXT NOT NULL,
    description TEXT DEFAULT ''
);

CREATE TABLE apps(
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    domain TEXT NOT NULL,
    user_id TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE app_settings(
    app_id TEXT PRIMARY KEY,
    repository_url TEXT NOT NULL,
    branch TEXT NOT NULL,
    install_command TEXT NOT NULL,
    build_command TEXT NOT NULL,
    start_command TEXT NOT NULL,
    instance_type TEXT NOT NULL,
    application_type TEXT NOT NULL,
    FOREIGN KEY(app_id) REFERENCES apps(id) ON DELETE CASCADE,
    FOREIGN KEY(application_type) REFERENCES application_types(id) ON DELETE CASCADE
);

CREATE TABLE app_envs(
    app_id TEXT PRIMARY KEY,
    key TEXT NOT NULL,
    value TEXT NOT NULL,
    FOREIGN KEY(app_id) REFERENCES apps(id) ON DELETE CASCADE
);

CREATE TABLE app_status(
    app_id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    isStarting BOOLEAN NOT NULL,
    isStopping BOOLEAN NOT NULL,
    isRunning BOOLEAN NOT NULL,
    FOREIGN KEY(app_id) REFERENCES apps(id) ON DELETE CASCADE
);
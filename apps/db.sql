CREATE TABLE apps (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    domain TEXT NOT NULL,
    user_id TEXT NOT NULL,
    repository_url TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);

CREATE TABLE apps_settings (
    app_id TEXT PRIMARY KEY,
    branch TEXT NOT NULL,
    FOREIGN KEY(app_id) REFERENCES apps(id) ON DELETE CASCADE
);

CREATE TABLE apps_status (
    app_id TEXT PRIMARY KEY,
    status TEXT NOT NULL,
    isStarting BOOLEAN NOT NULL,
    isStopping BOOLEAN NOT NULL,
    isRunning BOOLEAN NOT NULL,
    FOREIGN KEY(app_id) REFERENCES apps(id) ON DELETE CASCADE
);
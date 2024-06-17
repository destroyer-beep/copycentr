CREATE TABLE IF NOT EXISTS "tokens" (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL REFERENCES users(id),
            refresh_token TEXT NOT NULL,
            created TIMESTAMP NOT NULL DEFAULT now(),
            deleted TIMESTAMP DEFAULT NULL
        );
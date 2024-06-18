CREATE TABLE IF NOT EXISTS "products" (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            price INTEGER NOT NULL,
            created TIMESTAMP NOT NULL DEFAULT now(),
            updated TIMESTAMP NOT NULL DEFAULT now(),
            deleted TIMESTAMP DEFAULT NULL,
            CONSTRAINT unique_title UNIQUE (title)
        );
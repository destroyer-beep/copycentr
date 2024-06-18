CREATE TABLE IF NOT EXISTS "users" (
    id serial primary key,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    update TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT unique_name UNIQUE (username)
);
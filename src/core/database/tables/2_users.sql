CREATE TABLE IF NOT EXISTS "users" (
    id serial primary key,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL REFERENCES roles(role),
    update TIMESTAMP NOT NULL DEFAULT now(),
    CONSTRAINT unique_name UNIQUE (username)
);
CREATE TABLE IF NOT EXISTS "roles" (
    id serial primary key,
    role VARCHAR NOT NULL,
    CONSTRAINT unique_role UNIQUE (role)
);
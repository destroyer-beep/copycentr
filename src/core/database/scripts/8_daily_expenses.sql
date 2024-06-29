CREATE TABLE IF NOT EXISTS "daily_expenses" (
    id SERIAL PRIMARY KEY,
    expenses_id INT NOT NULL REFERENCES expenses(id),
    count INT DEFAULT NULL,
    price INT NOT NULL,
    sum INT NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT now(),
    updated TIMESTAMP NOT NULL DEFAULT now()
);
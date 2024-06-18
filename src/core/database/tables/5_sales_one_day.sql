CREATE TABLE IF NOT EXISTS "sales_one_day" (
            id SERIAL PRIMARY KEY,
            product_id INTEGER NOT NULL REFERENCES products(id),
            title TEXT NOT NULL,
            price INTEGER NOT NULL,
            sum INTEGER NOT NULL,
            count INTEGER NOT NULL,
            created TIMESTAMP NOT NULL DEFAULT now(),
            updated TIMESTAMP NOT NULL DEFAULT now()
        );
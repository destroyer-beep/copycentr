import {database} from "../database/database.client.js";

export class ProductRepository {
    #db;
    constructor(db = database) {
        this.#db = db;
    }

    #checkQueryExecutionResult(result) {
        if(typeof result === 'string') throw new Error('Ошибка записи в бд!')
        if (!result?.rows?.length) return undefined;
        else if (result.rows.length === 1) return result.rows[0];
        else return result.rows;
    }

    async getProductList() {
        const result = await this.#db.executeQuery(
            'SELECT * FROM products'
        );

        return this.#checkQueryExecutionResult(result);
    }

    async deleteProduct(id) {
        const result = await this.#db.executeQuery(
            'DELETE FROM products WHERE id = $1;'
                , [id]);

        if(typeof result === 'string') throw new Error('Ошибка записи в бд!')
        else return result.rowCount;
    }

    async updateProduct(id, title, price) {
        const result = await this.#db.executeQuery(
            'UPDATE products SET title = $1, price = $2 WHERE id = $3;'
            , [title, price, id]);

        if(typeof result === 'string') throw new Error('Ошибка записи в бд!')
        else return result.rowCount;
    }

    async createProduct(title, price) {
        const result = await this.#db.executeQuery(
            'INSERT INTO products (title, price) VALUES ($1, $2);'
            , [title, price]);
        return this.#checkQueryExecutionResult(result);
    }
}
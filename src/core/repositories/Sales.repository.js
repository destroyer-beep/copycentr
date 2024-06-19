import {database} from "../database/database.client.js";

export class SalesRepository {
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

    async getSalesList() {
        const result = await this.#db.executeQuery(
            'SELECT * FROM sales'
        );

        return this.#checkQueryExecutionResult(result);
    }

    async deleteSales(id) {
        const result = await this.#db.executeQuery(
            'DELETE FROM sales WHERE id = $1;'
            , [id]);

        if(typeof result === 'string') throw new Error('Ошибка удаления в бд!')
        else return result.rowCount;
    }

    async updateSales(id, title, count, sum, price) {
        const result = await this.#db.executeQuery(
            'UPDATE sales SET title = $1, price = $2, count = $3, sum = $4 WHERE id = $5;'
            , [title, price, count, sum, id]);

        if(typeof result === 'string') throw new Error('Ошибка изменения в бд!')
        else return result.rowCount;
    }

    async createSales(title, count, sum, price) {
        const result = await this.#db.executeQuery(
            'INSERT INTO sales (title, price, count, sum) VALUES ($1, $2, $3, $4);'
            , [title, price, count, sum]);
        return this.#checkQueryExecutionResult(result);
    }
}
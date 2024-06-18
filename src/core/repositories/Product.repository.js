import {database} from "../database/database.client.js";

export class ProductRepository {
    #db;
    constructor(db = database) {
        this.#db = db;
    }

    #checkQueryExecutionResult(result) {
        if (!result?.rows?.length) return undefined;
        else return result.rows[0];
    }

    async getUserById(id) {
        const result = await this.#db.executeQuery(
            'SELECT * FROM products'
        );

        return this.#checkQueryExecutionResult(result);
    }
}
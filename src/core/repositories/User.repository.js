import { database } from '../database/database.client.js';

export class UserRepository {
    #db;
    constructor(db = database) {
        this.#db = db;
    }

    #checkQueryExecutionResult(result) {
        if (!result?.rows?.length) return undefined;
        else return result.rows[0];
    }

    async getUserByUsername(username) {
        const result = await this.#db.executeQuery(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );
        return this.#checkQueryExecutionResult(result);
    }

    async getUserById(id) {
        const result = await this.#db.executeQuery(
            'SELECT * FROM users WHERE id = $1',
            [id]
        );

        return this.#checkQueryExecutionResult(result);
    }

    async insertToken(token, user_id) {
        return this.#db.executeQuery(
            'INSERT INTO tokens (token, user_id) VALUES ($1, $2)',
            [token, user_id]
        );
    }

    async getOneToken(token) {
        const result = await this.#db.executeQuery(
            'SELECT * FROM tokens WHERE token = $1 LIMIT 1',
            [token]
        );
        return this.#checkQueryExecutionResult(result);
    }
}
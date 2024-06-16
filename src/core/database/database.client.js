import pg from 'pg';
import ConfigService from "../config/config.service.js";
import {getHashPassword} from "../helpers/hashPassword.js";
import {getTables} from "./helpers/getTables.js";

const configService = new ConfigService();
const {Client} = pg;

const config = {
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB'),
    user: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD')
};

class ConnectionDatabase {
    constructor(config) {
        this.connected = false;
        this.client = new Client(config);
        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            this.connected = true;
            console.log('Success connect database!');
            await this._init_table();
        } catch (e) {
            this.connected = false;
            console.warn('Error connect database - ', e.message);
            console.warn(e);
        }
    }

    checkConnected() {
        return this.connected;
    }

    async executeQuery(text, values) {
        try {
            return await this.client.query(text, values);
        } catch (e) {
            return e.message;
        }
    }

    async _init_table() {
        try {

            const {tables, fileNames} = getTables();

            if (!tables.length) return;
            await this.client.query('BEGIN');
            const promises = tables.map(q => this.client.query(q));
            await Promise.all(promises);
            await this.client.query('COMMIT');


            if (!(await this.defaultUserExist())) {
                const hashPassword = await getHashPassword(configService.get('DEFAULT_USER_PASSWORD'))
                await this.client.query(
                    `INSERT INTO users (username, password) VALUES ('${
                configService.get('DEFAULT_USER_NAME')
            }', '${await getHashPassword(hashPassword)}');`
                );
            }
            console.log('Success create tables in ' + fileNames + ' files!');
        } catch (e) {
            console.error('Error create table - ', e.message);
            await this.client.query('ROLLBACK');

            throw e;
        }
    }

    async defaultUserExist() {
        const result = await this.executeQuery(
            'SELECT * FROM users WHERE username = $1',
            [configService.get('DEFAULT_USER_NAME')]
        );
        return result?.rows?.length > 0;
    }
}

export const database = new ConnectionDatabase(config);
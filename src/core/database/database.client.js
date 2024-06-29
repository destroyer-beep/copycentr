import pg from 'pg';
import ConfigService from '../config/config.service.js';
import { getHashPassword } from '../helpers/authHelpers.js';
import { getTables } from './helpers/getTables.js';
import { getProductsList } from './helpers/getProductList.js';
import { getRolesList } from './helpers/getRolesList.js';

const configService = new ConfigService();
const { Client } = pg;

class ConnectionDatabase {
    constructor(
        config = {
            host: configService.get('DB_HOST'),
            port: configService.get('DB_PORT'),
            database: configService.get('DB'),
            user: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'),
        },
    ) {
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
            console.error('Error connect database - ', e.message);
            console.error(e);
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
            const { tables, fileNames } = getTables();

            if (!tables.length) return;
            await this.client.query('BEGIN');
            const promises = tables.map(q => this.client.query(q));

            const rolesList = getRolesList();
            const parseRolesList = Object.values(rolesList);
            const rolesPromises = parseRolesList.map(role =>
                this.client.query(`INSERT INTO roles (role) VALUES ($1) ON CONFLICT DO NOTHING;`, [role]),
            );
            promises.push(...rolesPromises);

            const productsList = getProductsList();
            const productTitleList = Object.keys(productsList);
            const productPromises = productTitleList.map(key =>
                this.client.query(`INSERT INTO products (title, price) VALUES ($1, $2) ON CONFLICT DO NOTHING;`, [
                    key,
                    productsList[key],
                ]),
            );
            promises.push(...productPromises);

            await Promise.all(promises);

            const userName = configService.get('DEFAULT_USER_NAME');
            const hashPassword = await getHashPassword(configService.get('DEFAULT_USER_PASSWORD'));
            const role = await getHashPassword(configService.get('DEFAULT_USER_ROLE'));
            await this.client.query(
                `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING;`,
                [userName, hashPassword, 'admin'],
            );
            await this.client.query('COMMIT');
            console.log('Success create db scripts in ' + fileNames + ' files!');
        } catch (e) {
            console.error('Error create table - ', e);
            await this.client.query('ROLLBACK');

            throw e;
        }
    }

    async defaultProductsExist() {
        const result = await this.executeQuery('SELECT * FROM products', []);
        return result?.rows?.length > 0;
    }
}

export const database = new ConnectionDatabase();

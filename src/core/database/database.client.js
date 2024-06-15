import pg from 'pg';
import ConfigService from "../config/config.service.js";

const configService = new ConfigService();
const { Client } = pg;

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
            await this.client.query(`
            CREATE TABLE IF NOT EXISTS "users" (
            id serial primary key,   
            username VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            update TIMESTAMP NOT NULL DEFAULT now()
        );
     `);

            console.log('Success crate tables!');
        } catch (e) {
            console.warn('Error create table - ', e.message);
        }
    }
}

export const database = new ConnectionDatabase(config);
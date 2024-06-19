import {config} from "dotenv";
config();

export default class ConfigService {
    constructor() {
        this.PORT = process.env.PORT;
        this.HOST = process.env.HOST;
        this.DB_PORT = +process.env.DB_PORT;
        this.DB_HOST = process.env.DB_HOST;
        this.DB_PASSWORD = process.env.DB_PASSWORD;
        this.DB_USER = process.env.DB_USER;
        this.DB = process.env.DB;
        this.DEFAULT_USER_NAME = process.env.DEFAULT_USER_NAME;
        this.DEFAULT_USER_PASSWORD = process.env.DEFAULT_USER_PASSWORD;
        this.DEFAULT_USER_ROLE = process.env.DEFAULT_USER_ROLE;
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
    get(envName) {
        const env = this[envName];
        if(env) return env;

        console.error(`The requested variable ${envName} is not defined in the .env file`);
        process.exit(1);
    }
}
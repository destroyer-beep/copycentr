import express from 'express';
import cors from 'cors';
import authRouter from "../core/routers/auth.router.js";

export default class ServerApp {
    constructor(config) {
       this.config = config;
       this.expressApplication = express();
    }

    async _initRoutes() {
        this.expressApplication.use('/auth', authRouter);
    }
    async _initMiddlewares() {
        this.expressApplication.use(cors());
        this.expressApplication.use(express.json());
    }

    async _initServer() {
        const port = this.config.get('PORT');
        const host = this.config.get('HOST');
        this.expressApplication.listen(port, host, () => {
            console.log(`Server lister ${port} - PORT, ${host} - HOST`);
        });

    }

    async initApp() {
        await this._initMiddlewares();
        await this._initRoutes();
        await this._initServer();
    }

}
import express from 'express';
import cors from 'cors';
import authRouter from "../core/routers/auth.router.js";
import productsRouter from "../core/routers/products.router.js";
import salesRouter from "../core/routers/sales.router.js";
import salesOneDayRouter from "../core/routers/salesOneDay.router.js";

export default class ServerApp {
    constructor(config) {
       this.config = config;
       this.expressApplication = express();
    }

    async _initRoutes() {
        this.expressApplication.use('/auth', authRouter);
        this.expressApplication.use('/product', productsRouter);
        this.expressApplication.use('/sales', salesRouter);
        this.expressApplication.use('/sales_one_day', salesOneDayRouter);
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
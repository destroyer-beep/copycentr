import {Router} from "express";

import authInRoleCheckMiddleware from "../middlewares/authInRoleCheck.moddleware.js";
import salesController from "../controllers/sales.controller.js";

const salesRouter = Router();

salesRouter.get('/list', authInRoleCheckMiddleware, salesController.getSalesList);
salesRouter.post('/create', authInRoleCheckMiddleware, salesController.createSale);
salesRouter.post('/update', authInRoleCheckMiddleware, salesController.updateSale);
salesRouter.get('/delete', authInRoleCheckMiddleware, salesController.deleteSale);

export default salesRouter;
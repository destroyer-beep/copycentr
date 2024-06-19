import {Router} from "express";

import authCheckMiddleware from "../middlewares/authCheck.moddleware.js";
import salesOneDayController from "../controllers/salesOneDay.controller.js";

const salesOneDayRouter = Router();

salesOneDayRouter.get('/list', authCheckMiddleware, salesOneDayController.getSalesOneDayList);
salesOneDayRouter.post('/create', authCheckMiddleware, salesOneDayController.createSaleOneDay);
salesOneDayRouter.post('/update', authCheckMiddleware, salesOneDayController.updateSaleOneDay);
salesOneDayRouter.get('/delete', authCheckMiddleware, salesOneDayController.deleteSaleOneDay);

export default salesOneDayRouter;
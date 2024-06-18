import {Router} from "express";

import authCheckMiddleware from "../middlewares/authCheck.moddleware.js";
import productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get('/list', authCheckMiddleware, productController.getProductList);

export default productRouter;
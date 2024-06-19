import {Router} from "express";

import authCheckMiddleware from "../middlewares/authCheck.moddleware.js";
import productController from "../controllers/products.controller.js";

const productsRouter = Router();

productsRouter.get('/list', authCheckMiddleware, productController.getProductList);
productsRouter.post('/create', authCheckMiddleware, productController.createProduct);
productsRouter.post('/update', authCheckMiddleware, productController.updateProduct);
productsRouter.get('/delete', authCheckMiddleware, productController.deleteProduct);

export default productsRouter;
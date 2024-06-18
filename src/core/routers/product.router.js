import {Router} from "express";

import authCheckMiddleware from "../middlewares/authCheck.moddleware.js";
import productController from "../controllers/product.controller.js";

const productRouter = Router();

productRouter.get('/list', authCheckMiddleware, productController.getProductList);
productRouter.post('/create', authCheckMiddleware, productController.createProduct);
productRouter.post('/update', authCheckMiddleware, productController.updateProduct);
productRouter.get('/delete', authCheckMiddleware, productController.deleteProduct);

export default productRouter;
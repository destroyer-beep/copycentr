import {Router} from "express";
import authController from "../controllers/auth.controller.js";
import authCheckMiddleware from "../middlewares/authCheck.moddleware.js";

const authRouter = Router();

authRouter.get('/check', authCheckMiddleware, authController.check);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);
authRouter.post('/restore', authController.restorePassword);
authRouter.post('/refresh', authController.refreshToken);

export default authRouter;
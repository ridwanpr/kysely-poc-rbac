import { Router } from "express";
import { authController } from "../config/container.js";
import { authenticate } from "../http/middlewares/auth-middleware.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/logout", authenticate, authController.logout);

export { authRouter };

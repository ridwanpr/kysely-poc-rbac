import { Router } from "express";
import { authController } from "../config/container.js";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

export { authRouter };

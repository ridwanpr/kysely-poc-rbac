import { Router } from "express";
import { userController } from "../config/container.js";
import { authenticate } from "../http/middlewares/auth-middleware.js";

const userRouter = Router();

userRouter.get("/:email", authenticate, userController.getUser);

export { userRouter };

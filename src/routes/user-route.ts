import { Router } from "express";
import { userController } from "../config/container.js";

const userRouter = Router();

userRouter.get("/:email", userController.getUser);

export { userRouter };

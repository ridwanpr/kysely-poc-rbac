import { Router } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createUserController } from "../http/controllers/user-controller.js";

export const createUserRouter = (
  userController: ReturnType<typeof createUserController>,
) => {
  const router = Router();

  router.get("/:email", authenticate, userController.getUser);

  return router;
};

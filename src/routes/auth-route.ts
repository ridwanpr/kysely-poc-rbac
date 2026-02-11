import { Router } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createAuthController } from "../http/controllers/auth-controller.js";

export const createAuthRouter = (
  authController: ReturnType<typeof createAuthController>,
) => {
  const router = Router();

  router.post("/register", authController.register);
  router.post("/login", authController.login);
  router.post("/logout", authenticate, authController.logout);

  return router;
};

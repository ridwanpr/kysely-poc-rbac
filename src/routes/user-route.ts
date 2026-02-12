import { Router, type RequestHandler } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createUserController } from "../http/controllers/user-controller.js";

type RequirePermission = (permissionSlug: string) => RequestHandler;

export const createUserRouter = (
  userController: ReturnType<typeof createUserController>,
  requirePermission: RequirePermission,
) => {
  const router = Router();

  router.get(
    "/:email",
    authenticate,
    requirePermission("users.get"),
    userController.getUser,
  );

  return router;
};

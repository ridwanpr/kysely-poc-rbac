import { Router, type RequestHandler } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createRoleController } from "../http/controllers/role-controller.js";

type RequirePermission = (permissionSlug: string) => RequestHandler;

export const createRoleRouter = (
  roleController: ReturnType<typeof createRoleController>,
  requirePermission: RequirePermission,
) => {
  const router = Router();

  router.get(
    "/roles",
    authenticate,
    requirePermission("roles.index"),
    roleController.index,
  );
  router.post(
    "/roles",
    authenticate,
    requirePermission("roles.store"),
    roleController.store,
  );
  router.patch(
    "/roles/:id",
    authenticate,
    requirePermission("roles.update"),
    roleController.update,
  );
  router.delete(
    "/roles/:id",
    authenticate,
    requirePermission("roles.destroy"),
    roleController.destroy,
  );

  return router;
};

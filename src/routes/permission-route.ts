import { Router, type RequestHandler } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createPermissionController } from "../http/controllers/permission-controller.js";

type RequirePermission = (permissionSlug: string) => RequestHandler;

export const createPermissionRouter = (
  permissionController: ReturnType<typeof createPermissionController>,
  requirePermission: RequirePermission,
) => {
  const router = Router();

  router.get(
    "/permissions",
    authenticate,
    requirePermission("permissions.index"),
    permissionController.index,
  );
  router.post(
    "/permissions",
    authenticate,
    requirePermission("permissions.store"),
    permissionController.store,
  );
  router.patch(
    "/permissions/:id",
    authenticate,
    requirePermission("permissions.update"),
    permissionController.update,
  );
  router.delete(
    "/permissions/:id",
    authenticate,
    requirePermission("permission.destroy"),
    permissionController.destroy,
  );

  return router;
};

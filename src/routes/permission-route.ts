import { Router } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createPermissionController } from "../http/controllers/permission-controller.js";

export const createPermissionRouter = (
  permissionController: ReturnType<typeof createPermissionController>,
) => {
  const router = Router();

  router.get("/permissions", authenticate, permissionController.index);
  router.post("/permissions", authenticate, permissionController.store);
  router.patch("/permissions/:id", authenticate, permissionController.update);
  router.delete("/permissions/:id", authenticate, permissionController.destroy);

  return router;
};

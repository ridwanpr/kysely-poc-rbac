import { Router } from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import type { createRoleController } from "../http/controllers/role-controller.js";

export const createRoleRouter = (
  roleController: ReturnType<typeof createRoleController>,
) => {
  const router = Router();

  router.get("/roles", authenticate, roleController.index);
  router.post("/roles", authenticate, roleController.store);
  router.patch("/roles/:id", authenticate, roleController.update);
  router.delete("/roles/:id", authenticate, roleController.destroy);

  return router;
};

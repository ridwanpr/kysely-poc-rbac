import express from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import { permissionController } from "../config/container.js";

export const permissionRouter = express.Router();

permissionRouter.get("/permissions", authenticate, permissionController.index);
permissionRouter.post("/permissions", authenticate, permissionController.store);
permissionRouter.patch(
  "/permissions/:id",
  authenticate,
  permissionController.update,
);
permissionRouter.delete(
  "/permissions/:id",
  authenticate,
  permissionController.destroy,
);

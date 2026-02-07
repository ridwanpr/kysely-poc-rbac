import express from "express";
import { authenticate } from "../http/middlewares/auth-middleware.js";
import { roleController } from "../config/container.js";

export const roleRouter = express.Router();

roleRouter.get("/roles", authenticate, roleController.index);
roleRouter.post("/roles", authenticate, roleController.store);
roleRouter.patch("/roles/:id", authenticate, roleController.update);

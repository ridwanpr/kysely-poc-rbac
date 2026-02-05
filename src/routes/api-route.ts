import express from "express";
import { checkHealth } from "../http/controllers/auth-controller.js";

const apiRouter = express.Router();

apiRouter.get("/check-health", checkHealth);

export { apiRouter };

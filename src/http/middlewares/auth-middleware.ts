import type { NextFunction, Request, Response } from "express";
import { redisClient } from "../../config/redis.js";
import { ResponseError } from "../errors/handle-error.js";

export const authenticate = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (!req.session.user) {
    throw new ResponseError(401, "Unauthorized: No session");
  }

  const sessionData = await redisClient.get(`session:${req.sessionID}`);
  if (!sessionData) {
    throw new ResponseError(401, "Session Expired");
  }

  next();
};

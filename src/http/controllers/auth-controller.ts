import type { Request, Response } from "express";
import type { UserService } from "../services/user-service.js";
import { redisClient } from "../../config/redis.js";
import { ResponseError } from "../errors/handle-error.js";
import { sendSuccess } from "../../utils/response-util.js";

export const createAuthController = (service: UserService) => {
  const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body || {};

    if (!email || !name || !password) {
      throw new ResponseError(400, "Email, name and password is required");
    }

    const user = await service.createUser(email, name, password);

    return sendSuccess(res, user, "Register Success", 201);
  };

  const login = async (req: Request, res: Response) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      throw new ResponseError(400, "Email and password is required");
    }

    const user = await service.authenticateUser(email, password);

    req.session.user = { id: user.id, email: user.email };

    await redisClient.set(
      `session:${req.sessionID}`,
      JSON.stringify(req.session.user),
      {
        expiration: {
          type: "EX",
          value: 3600,
        },
      },
    );

    return sendSuccess(res, undefined, "Login Success");
  };

  const logout = async (req: Request, res: Response) => {
    await redisClient.del(`session:${req.sessionID}`);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      return sendSuccess(res, undefined, "Logged out successfully");
    });
  };

  return { register, login, logout };
};

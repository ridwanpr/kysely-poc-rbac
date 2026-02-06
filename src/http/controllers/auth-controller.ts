import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import type { UserService } from "../services/user-service.js";
import { redisClient } from "../../config/redis.js";

export const createAuthController = (service: UserService) => {
  const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body || {};

    if (!email || !name || !password) {
      return res
        .status(400)
        .json({ message: "Email, name and password is required" });
    }

    const createUser = await service.createUser(email, name, password);
    return res.status(201).json({
      message: "Register Success",
      data: createUser,
    });
  };

  const login = async (req: Request, res: Response) => {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password is required" });
    }

    const user = await service.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

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

    return res.status(200).json({
      message: "Login Success",
    });
  };

  return { register, login };
};

import type { Request, Response } from "express";
import type { UserService } from "../services/user-service.js";

export const createAuthController = (service: UserService) => {
  const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body || {};

    if (!email || !name || !password) {
      return res.json({ message: "Email, name and password is required" });
    }

    const createUser = await service.createUser(email, name, password);
    return res.status(201).json({
      message: "Register Success",
      data: createUser,
    });
  };

  return { register };
};

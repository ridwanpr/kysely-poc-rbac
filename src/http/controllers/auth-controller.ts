import type { Request, Response } from "express";
import type { UserService } from "../services/user-service.js";

export const createAuthController = (service: UserService) => {
  const register = async (req: Request, res: Response) => {
    const { email, name, password } = req.body || {};

    if (!email || !name || !password) {
      return res.status(400).json({ message: "Email, name and password is required" });
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
      return res.status(400).json({ message: "Email and password is required" });
    }

    return res.status(200).json({
      message: "Login Success",
    });
  };

  return { register, login };
};

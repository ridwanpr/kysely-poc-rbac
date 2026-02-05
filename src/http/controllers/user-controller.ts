import type { Request, Response } from "express";
import type { UserService } from "../services/user-service.js";

export const createUserController = (service: UserService) => {
  const getUser = async (req: Request, res: Response) => {
    const { email } = req.params;

    if (typeof email !== "string") {
      return res.status(400).json({ error: "Invalid email parameter" });
    }

    const user = await service.getUserByEmail(email);
    return res.json(user);
  };

  return { getUser };
};

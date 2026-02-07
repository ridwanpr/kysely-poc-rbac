import type { Request, Response } from "express";
import type { RoleService } from "../services/role-service.js";

export const createRoleController = (roleService: RoleService) => {
  const index = async (_req: Request, res: Response) => {
    const roles = await roleService.getRoles();
    return res.json({
      message: "Fetch roles success",
      data: roles,
    });
  };

  const store = async (req: Request, res: Response) => {
    const { name, description } = req.body || {};
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and Description is required" });
    }

    const role = await roleService.createRole(name, description);

    return res.json({
      message: "Create new role success",
      data: role,
    });
  };

  const update = () => {
    throw new Error("Not yet implemented");
  };

  const destroy = () => {
    throw new Error("Not yet implemented");
  };

  return { index, store, update, destroy };
};

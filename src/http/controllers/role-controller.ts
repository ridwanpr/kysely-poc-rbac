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

  const store = () => {
    throw new Error("Not yet implemented");
  };

  const update = () => {
    throw new Error("Not yet implemented");
  };

  const destroy = () => {
    throw new Error("Not yet implemented");
  };

  return { index, store, update, destroy };
};

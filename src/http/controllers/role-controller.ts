import type { Request, Response } from "express";
import type { RoleService } from "../services/role-service.js";
import { ResponseError } from "../errors/handle-error.js";

export const createRoleController = (roleService: RoleService) => {
  const index = async (_req: Request, res: Response) => {
    const roles = await roleService.getRoles();
    return res.json({
      success: true,
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
      success: true,
      message: "Create new role success",
      data: role,
    });
  };

  const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) throw new ResponseError(400, "Invalid ID Provided");

    const { name, description } = req.body || {};
    if (!name || !description) {
      return res
        .status(400)
        .json({ message: "Name and Description is required" });
    }

    const role = await roleService.updateRole(id, {
      name,
      description,
    });

    return res.json({
      success: true,
      message: "Update role success",
      data: role,
    });
  };

  const destroy = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) throw new ResponseError(400, "Invalid ID Provided");

    await roleService.deleteRole(id);

    return res.json({
      success: true,
      message: "Delete role success",
    });
  };

  return { index, store, update, destroy };
};

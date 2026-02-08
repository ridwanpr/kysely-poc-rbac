import type { Request, Response } from "express";
import type { RoleService } from "../services/role-service.js";
import { ResponseError } from "../errors/handle-error.js";
import { sendSuccess } from "../../utils/response-util.js";

export const createRoleController = (roleService: RoleService) => {
  const index = async (_req: Request, res: Response) => {
    const roles = await roleService.getRoles();
    
    return sendSuccess(res, roles, "Fetch roles success");
  };

  const store = async (req: Request, res: Response) => {
    const { name, description } = req.body || {};
    if (!name || !description) {
      throw new ResponseError(400, "Name and Description is required");
    }

    const role = await roleService.createRole(name, description);

    return sendSuccess(res, role, "Create new role success", 201);
  };

  const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) throw new ResponseError(400, "Invalid ID Provided");

    const { name, description } = req.body || {};
    if (!name || !description) {
      throw new ResponseError(400, "Name and Description is required");
    }

    const role = await roleService.updateRole(id, {
      name,
      description,
    });

    return sendSuccess(res, role, "Update role success");
  };

  const destroy = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) throw new ResponseError(400, "Invalid ID Provided");

    await roleService.deleteRole(id);

    return sendSuccess(res, undefined, "Delete role success");
  };

  return { index, store, update, destroy };
};

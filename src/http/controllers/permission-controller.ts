import type { Request, Response } from "express";
import type { PermissionService } from "../services/permission-service.js";
import { sendSuccess } from "../../utils/response-util.js";
import { ResponseError } from "../errors/handle-error.js";

const createPermissionController = (permissionService: PermissionService) => {
  const index = async (_req: Request, res: Response) => {
    const permissions = await permissionService.getAllPermission();

    return sendSuccess(res, permissions, "Fetch all permissions success");
  };

  const store = async (req: Request, res: Response) => {
    const { permission_slug, description } = req.body || {};
    if (!permission_slug || !description) {
      throw new ResponseError(
        400,
        "Permission slug and description are required",
      );
    }

    const permission = await permissionService.createPermission({
      permission_slug,
      description,
    });

    return sendSuccess(res, permission, "Create permission success", 201);
  };

  const update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      throw new ResponseError(400, "permission id is invalid");
    }

    const { permission_slug, description } = req.body || {};
    if (!permission_slug || !description) {
      throw new ResponseError(
        400,
        "Permission slug and description are required",
      );
    }

    const result = await permissionService.updatePermission(id, {
      permission_slug,
      description,
    });

    return sendSuccess(res, result, "Update permission success");
  };

  const destroy = async () => {
    throw new Error(`Not yet implemented`);
  };

  return { index, store, update, destroy };
};

export { createPermissionController };

import type { Request, Response } from "express";
import type { PermissionService } from "../services/permission-service.js";

const createPermissionController = (permissionService: PermissionService) => {
  const index = async (_req: Request, res: Response) => {
    const permissions = await permissionService.getAllPermission();

    return res.json({
      success: true,
      message: "Fetch all permissions success",
      data: permissions,
    });
  };

  const store = async () => {
    throw new Error(`Not yet implemented`);
  };

  const update = async () => {
    throw new Error(`Not yet implemented`);
  };

  const destroy = async () => {
    throw new Error(`Not yet implemented`);
  };

  return { index, store, update, destroy };
};

export { createPermissionController };

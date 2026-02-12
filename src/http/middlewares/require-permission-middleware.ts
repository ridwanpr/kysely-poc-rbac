import type { NextFunction, Request, Response } from "express";
import { ResponseError } from "../errors/handle-error.js";
import type { PermissionService } from "../services/permission-service.js";

export const createRequirePermissionMiddleware = (
  permissionService: PermissionService,
) => {
  const requirePermission = (permissionSlug: string) => {
    return async (
      req: Request,
      _res: Response,
      next: NextFunction,
    ) => {
      const userId = req.session.user?.id;
      if (!userId) {
        throw new ResponseError(401, "Unauthorized: No session");
      }

      const hasPermission = await permissionService.checkUserPermission(
        userId,
        permissionSlug,
      );

      if (!hasPermission) {
        throw new ResponseError(
          401,
          "Unauthorized, you don't have the permission to do this action",
        );
      }

      next();
    };
  };

  return { requirePermission };
};
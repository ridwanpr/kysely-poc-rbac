import type { PermissionService } from "../services/permission-service.js";

const createPermissionController = (permissionService: PermissionService) => {
  const index = async () => {
    throw new Error(`Not yet implemented`);
  };

  return { index };
};

export { createPermissionController };

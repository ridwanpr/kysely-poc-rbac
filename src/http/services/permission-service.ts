import type { PermissionRepository } from "../repositories/permission-repository.js";

export type PermissionService = {
  getAllPermission: () => void;
};

const createPermissionService = (
  permissionRepository: PermissionRepository,
): PermissionService => {
  const getAllPermission = () => {
    throw new Error("Not yet implemented");
  };

  return { getAllPermission };
};

export { createPermissionService };

import type { PermissionRepository } from "../repositories/permission-repository.js";

export type PermissionService = {
  getAllPermission: () => void;
};

const createPermissionService = (
  permissionRepository: PermissionRepository,
): PermissionService => {
  const getAllPermission = async () => {
    return await permissionRepository.getAllPermission();
  };

  return { getAllPermission };
};

export { createPermissionService };

import type { PermissionInput } from "../../types/shared-type.js";
import type {
  Permission,
  PermissionRepository,
} from "../repositories/permission-repository.js";

export type PermissionService = {
  getAllPermission: () => Promise<Permission[]>;
  createPermission: (data: PermissionInput) => Promise<Permission>;
};

const createPermissionService = (
  permissionRepository: PermissionRepository,
): PermissionService => {
  const getAllPermission = async () => {
    return await permissionRepository.getAllPermission();
  };

  const createPermission = async (data: PermissionInput) => {
    const result = await permissionRepository.createPermission(data);
    if (!result) {
      throw new Error("Permission creation failed unexpectedly");
    }

    return result;
  };

  return { getAllPermission, createPermission };
};

export { createPermissionService };

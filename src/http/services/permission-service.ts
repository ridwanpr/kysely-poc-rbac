import type { PermissionInput } from "../../types/shared-type.js";
import type {
  Permission,
  PermissionRepository,
} from "../repositories/permission-repository.js";

export type PermissionService = {
  getAllPermission: () => Promise<Permission[]>;
  createPermission: (data: PermissionInput) => Promise<Permission>;
  updatePermission: (id: number, data: PermissionInput) => Promise<Permission>;
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

  const updatePermission = async (id: number, data: PermissionInput) => {
    const result = await permissionRepository.updatePermission(id, data);
    if (!result) {
      throw new Error("Update permission failed unexpectedly");
    }

    return result;
  };

  return { getAllPermission, createPermission, updatePermission };
};

export { createPermissionService };

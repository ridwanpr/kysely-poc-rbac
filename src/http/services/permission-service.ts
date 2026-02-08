import type { PermissionInput } from "../../types/shared-type.js";
import { ResponseError } from "../errors/handle-error.js";
import type {
  Permission,
  PermissionRepository,
} from "../repositories/permission-repository.js";

export type PermissionService = {
  getAllPermission: () => Promise<Permission[]>;
  createPermission: (data: PermissionInput) => Promise<Permission>;
  updatePermission: (id: number, data: PermissionInput) => Promise<Permission>;
  deletePermission: (id: number) => Promise<boolean>;
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

  const deletePermission = async (id: number) => {
    const result = await permissionRepository.deletePermission(id);

    if (result.numDeletedRows === BigInt(0)) {
      throw new ResponseError(404, "Role not found");
    }

    return true;
  };

  return {
    getAllPermission,
    createPermission,
    updatePermission,
    deletePermission,
  };
};

export { createPermissionService };

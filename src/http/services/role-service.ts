import type { RoleInput } from "../../types/shared-type.js";
import { ResponseError } from "../errors/handle-error.js";
import type { Role, RoleRepository } from "../repositories/role-repository.js";

export interface RoleService {
  getRoles: () => Promise<Role[]>;
  createRole: (name: string, description: string) => Promise<Role>;
  updateRole: (id: number, data: RoleInput) => Promise<Role>;
  deleteRole: (id: number) => Promise<boolean>;
}

export const createRoleService = (
  roleRepository: RoleRepository,
): RoleService => {
  const getRoles = async () => {
    return await roleRepository.getAllRoles();
  };

  const createRole = async (name: string, description: string) => {
    const result = await roleRepository.createRole(name, description);

    if (!result) {
      throw new Error("Role creation failed unexpectedly.");
    }

    return result;
  };

  const updateRole = async (id: number, data: RoleInput) => {
    const result = await roleRepository.updateRole(id, data);

    if (!result) {
      throw new ResponseError(404, "Role not found");
    }

    return result;
  };

  const deleteRole = async (id: number) => {
    const result = await roleRepository.deleteRole(id);

    if (result.numDeletedRows === BigInt(0)) {
      throw new ResponseError(404, "Role not found");
    }

    return true;
  };

  return {
    getRoles,
    createRole,
    updateRole,
    deleteRole,
  };
};

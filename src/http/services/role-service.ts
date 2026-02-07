import type { RoleInput } from "../../types/role-permission.js";
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
    const roles = await roleRepository.getAllRoles();
    return roles;
  };

  const createRole = async (name: string, description: string) => {
    const result = await roleRepository.createRole(name, description);
    if (!result) {
      throw new Error("Something went wrong. Create role failed.");
    }
    return result;
  };

  const updateRole = async (id: number, data: RoleInput) => {
    const result = await roleRepository.updateRole(id, data);
    if (!result) {
      throw new Error("Something went wrong. Update role failed");
    }
    return result;
  };

  const deleteRole = async (id: number) => {
    const role = await roleRepository.findRoleById(id);
    if (!role) {
      throw new ResponseError(404, "Role not found");
    }

    const result = await roleRepository.deleteRole(id);
    if (result.numDeletedRows === BigInt(0)) {
      throw new Error("Something went wrong. Delete role failed");
    }

    return true;
  };

  return { getRoles, createRole, updateRole, deleteRole };
};

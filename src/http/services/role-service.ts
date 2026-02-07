import type { RoleInput } from "../../types/role-permission.js";
import type { Role, RoleRepository } from "../repositories/role-repository.js";

export interface RoleService {
  getRoles: () => Promise<Role[]>;
  createRole: (name: string, description: string) => Promise<Role>;
  updateRole: (id: number, data: RoleInput) => Promise<Role>;
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

  return { getRoles, createRole, updateRole };
};

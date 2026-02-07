import type { Role, RoleRepository } from "../repositories/role-repository.js";

export interface RoleService {
  getRoles(): Promise<Role[]>;
  createRole(name: string, description: string): Promise<Role>;
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
    return result;
  };

  return { getRoles, createRole };
};

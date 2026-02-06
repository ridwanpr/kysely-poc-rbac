import type { Role, RoleRepository } from "../repositories/role-repository.js";

export interface RoleService {
  getRoles: () => Promise<Role[] | undefined>;
}

export const createRoleService = (
  roleRepository: RoleRepository,
): RoleService => {
  const getRoles = async () => {
    const roles = await roleRepository.getAllRoles();
    return roles;
  };

  return {
    getRoles,
  };
};

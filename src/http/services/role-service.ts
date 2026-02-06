import type { RoleRepository } from "../repositories/role-repository.js";

export interface RoleService {
  getRoles: () => void;
}

export const createRoleService = (
  roleRepository: RoleRepository,
): RoleService => {
  const getRoles = () => {
    throw new Error("Not yet implemented");
  };

  return {
    getRoles,
  };
};

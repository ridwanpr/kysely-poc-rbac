import { ResponseError } from "../errors/handle-error.js";
import type { RoleRepository } from "../repositories/role-repository.js";
import type {
  UserRole,
  UserRoleRepository,
} from "../repositories/user-role-repository.js";

export type UserRoleService = {
  assignDefaultRole: (userId: number) => Promise<UserRole>;
  createUserRole: (userId: number, roleId: number) => Promise<UserRole>;
};

export const createUserRoleService = (
  userRoleRepository: UserRoleRepository,
  roleRepository: RoleRepository,
): UserRoleService => {
  const assignDefaultRole = async (userId: number) => {
    const defaultRole = await roleRepository.findRoleByName("User");

    if (!defaultRole) {
      throw new ResponseError(500, "Default role 'User' not found");
    }

    return await createUserRole(userId, defaultRole.id);
  };

  const createUserRole = async (userId: number, roleId: number) => {
    const result = await userRoleRepository.createUserRole(userId, roleId);

    if (!result) {
      throw new Error("User role creation failed unexpectedly");
    }

    return result;
  };

  return {
    assignDefaultRole,
    createUserRole,
  };
};

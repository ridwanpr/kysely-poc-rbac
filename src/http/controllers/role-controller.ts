import type { RoleService } from "../services/role-service.js";

export const createRoleController = (roleService: RoleService) => {
  const index = () => {
    throw new Error("Not yet implemented");
  };

  const store = () => {
    throw new Error("Not yet implemented");
  };

  const update = () => {
    throw new Error("Not yet implemented");
  };

  const destroy = () => {
    throw new Error("Not yet implemented");
  };

  return { index, store, update, destroy };
};

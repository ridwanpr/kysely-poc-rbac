import { db } from "../database/index.js";
import { createUserRepository } from "../http/repositories/user-repository.js";
import { createUserService } from "../http/services/user-service.js";
import { createUserController } from "../http/controllers/user-controller.js";
import { createAuthController } from "../http/controllers/auth-controller.js";
import { createRoleService } from "../http/services/role-service.js";
import { createRoleController } from "../http/controllers/role-controller.js";
import { createRoleRepository } from "../http/repositories/role-repository.js";
import { createPermissionRepository } from "../http/repositories/permission-repository.js";
import { createPermissionService } from "../http/services/permission-service.js";
import { createPermissionController } from "../http/controllers/permission-controller.js";

const userRepository = createUserRepository(db);
const roleRepository = createRoleRepository(db);
const permissionRepository = createPermissionRepository(db);

const userService = createUserService(userRepository);
const roleService = createRoleService(roleRepository);
const permissionService = createPermissionService(permissionRepository);

export const userController = createUserController(userService);
export const authController = createAuthController(userService);
export const roleController = createRoleController(roleService);
export const permissionController =
  createPermissionController(permissionService);

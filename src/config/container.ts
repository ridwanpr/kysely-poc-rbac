import { db } from "../database/index.js";

import { createUserRepository } from "../http/repositories/user-repository.js";
import { createRoleRepository } from "../http/repositories/role-repository.js";
import { createPermissionRepository } from "../http/repositories/permission-repository.js";

import { createUserService } from "../http/services/user-service.js";
import { createRoleService } from "../http/services/role-service.js";
import { createPermissionService } from "../http/services/permission-service.js";

import { createUserController } from "../http/controllers/user-controller.js";
import { createAuthController } from "../http/controllers/auth-controller.js";
import { createRoleController } from "../http/controllers/role-controller.js";
import { createPermissionController } from "../http/controllers/permission-controller.js";

import { createAuthRouter } from "../routes/auth-route.js";
import { createPermissionRouter } from "../routes/permission-route.js";
import { createRoleRouter } from "../routes/role-route.js";
import { createUserRouter } from "../routes/user-route.js";

// repositories
const userRepository = createUserRepository(db);
const roleRepository = createRoleRepository(db);
const permissionRepository = createPermissionRepository(db);

// service
const userService = createUserService(userRepository);
const roleService = createRoleService(roleRepository);
const permissionService = createPermissionService(permissionRepository);

// controller
const userController = createUserController(userService);
const authController = createAuthController(userService);
const roleController = createRoleController(roleService);
const permissionController = createPermissionController(permissionService);

// routes
export const authRouter = createAuthRouter(authController);
export const permissionRouter = createPermissionRouter(permissionController);
export const roleRouter = createRoleRouter(roleController);
export const userRouter = createUserRouter(userController);

export { userController, authController, roleController, permissionController };

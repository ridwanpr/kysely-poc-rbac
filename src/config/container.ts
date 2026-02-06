import { db } from "../database/index.js";
import { createUserRepository } from "../http/repositories/user-repository.js";
import { createUserService } from "../http/services/user-service.js";
import { createUserController } from "../http/controllers/user-controller.js";
import { createAuthController } from "../http/controllers/auth-controller.js";
import { createRoleService } from "../http/services/role-service.js";
import { createRoleController } from "../http/controllers/role-controller.js";
import { createRoleRepository } from "../http/repositories/role-repository.js";

const userRepository = createUserRepository(db);
const roleRepository = createRoleRepository(db);

const userService = createUserService(userRepository);
const roleService = createRoleService(roleRepository);

export const userController = createUserController(userService);
export const authController = createAuthController(userService);
export const roleController = createRoleController(roleService);

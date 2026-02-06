import { db } from "../database/index.js";
import { createUserRepository } from "../http/repositories/user-repository.js";
import { createUserService } from "../http/services/user-service.js";
import { createUserController } from "../http/controllers/user-controller.js";
import { createAuthController } from "../http/controllers/auth-controller.js";

const userRepository = createUserRepository(db);
const userService = createUserService(userRepository);

export const userController = createUserController(userService);
export const authController = createAuthController(userService);

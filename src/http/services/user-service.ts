import bcrypt from "bcrypt";
import type { User, UserRepository } from "../repositories/user-repository.js";
import { ResponseError } from "../errors/handle-error.js";
import type { UserRoleService } from "./user-role-service.js";

export interface UserService {
  getUserByEmail: (email: string) => Promise<User>;
  createUser: (email: string, name: string, password: string) => Promise<User>;
  authenticateUser: (email: string, password: string) => Promise<User>;
}

export const createUserService = (
  repo: UserRepository,
  userRoleService: UserRoleService,
): UserService => {
  const getUserByEmail = async (email: string) => {
    const user = await repo.findByEmail(email);

    if (!user) {
      throw new ResponseError(404, "User not found");
    }

    return user;
  };

  const createUser = async (email: string, name: string, password: string) => {
    const existingUser = await repo.findByEmail(email);

    if (existingUser) {
      throw new ResponseError(409, "A user with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await repo.create(email, name, hashedPassword);

    if (!newUser) {
      throw new Error("User creation failed unexpectedly");
    }

    await userRoleService.assignDefaultRole(newUser.id);

    return newUser;
  };

  const authenticateUser = async (email: string, password: string) => {
    const user = await repo.findByEmail(email);

    if (!user) {
      throw new ResponseError(401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ResponseError(401, "Invalid credentials");
    }

    return user;
  };

  return { getUserByEmail, createUser, authenticateUser };
};

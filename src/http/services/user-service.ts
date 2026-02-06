import bcrypt from "bcrypt";
import type { UserRepository } from "../repositories/user-repository.js";
import { ResponseError } from "../errors/handle-error.js";

export interface UserService {
  getUserByEmail(email: string): Promise<unknown>;
  createUser(email: string, name: string, password: string): Promise<unknown>;
}

export const createUserService = (repo: UserRepository): UserService => {
  const getUserByEmail = async (email: string) => {
    const user = await repo.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  };

  const createUser = async (email: string, name: string, password: string) => {
    const user = await repo.findByEmail(email);
    if (user) {
      throw new ResponseError(409, "A user with this email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 11);
    const newUser = await repo.create(email, name, hashedPassword);
    return newUser;
  };

  return { getUserByEmail, createUser };
};

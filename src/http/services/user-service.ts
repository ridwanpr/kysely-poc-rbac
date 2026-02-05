import type { UserRepository } from "../repositories/user-repository.js";

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
    const user = await repo.create({ email, name, password });
    if (!user) {
      throw new Error("Create user failed");
    }
    return user;
  };

  return { getUserByEmail, createUser };
};

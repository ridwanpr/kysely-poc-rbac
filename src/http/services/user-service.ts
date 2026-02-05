import type { UserRepository } from "../repositories/user-repository.js"

export interface UserService {
  getUserByEmail(email: string): Promise<unknown>
}

export const createUserService = (
  repo: UserRepository
): UserService => {
  const getUserByEmail = async (email: string) => {
    const user = await repo.findUserByEmail(email)
    if (!user) {
      throw new Error("User not found")
    }
    return user
  }

  return { getUserByEmail }
}

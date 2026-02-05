import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../db/types.js";

export type UserRow = Selectable<DB["users"]>;

export interface UserRepository {
  findUserByEmail(email: string): Promise<UserRow | undefined>;
}

export const createUserRepository = (db: Kysely<DB>): UserRepository => {
  const findUserByEmail = async (email: string) => {
    return db
      .selectFrom("users")
      .selectAll()
      .where("email", "=", email)
      .executeTakeFirst();
  };

  return { findUserByEmail };
};

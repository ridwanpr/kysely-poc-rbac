import type { Kysely, Selectable, Insertable } from "kysely";
import type { DB } from "../../database/types.js";

export type User = Selectable<DB["users"]>;
export type NewUser = Insertable<DB["users"]>;

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
}

export const createUserRepository = (db: Kysely<DB>): UserRepository => {
  return {
    async findByEmail(email: string) {
      const user = await db
        .selectFrom("users")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();

      return user ?? null;
    },
  };
};

import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";

export type User = Selectable<DB["users"]>;

export interface UserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: number): Promise<User | undefined>;
  create(email: string, name: string, password: string): Promise<User>;
}

export const createUserRepository = (db: Kysely<DB>): UserRepository => {
  return {
    async findByEmail(email: string) {
      return await db
        .selectFrom("users")
        .selectAll()
        .where("email", "=", email)
        .executeTakeFirst();
    },

    async findById(id: number) {
      return await db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();
    },

    async create(email: string, name: string, password: string) {
      return await db.transaction().execute(async (trx) => {
        const result = await trx
          .insertInto("users")
          .values({ email, name, password, created_at: new Date() })
          .executeTakeFirst();

        const user = await trx
          .selectFrom("users")
          .selectAll()
          .where("id", "=", Number(result.insertId))
          .executeTakeFirst();

        if (!user) {
          throw new Error("Failed to retrieve created user");
        }

        return user;
      });
    },
  };
};

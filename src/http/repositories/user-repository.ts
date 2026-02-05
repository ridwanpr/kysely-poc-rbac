import type { Kysely, Selectable, Insertable } from "kysely";
import type { DB } from "../../db/types.js";

export type User = Selectable<DB["users"]>;
export type NewUser = Insertable<DB["users"]>;

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  create(data: NewUser): Promise<User>;
  update(id: number, data: Partial<NewUser>): Promise<User>;
  delete(id: number): Promise<void>;
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

    async findById(id: number) {
      const user = await db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirst();

      return user ?? null;
    },

    async create(data: NewUser) {
      const result = await db
        .insertInto("users")
        .values(data)
        .executeTakeFirstOrThrow();

      return db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", Number(result.insertId))
        .executeTakeFirstOrThrow();
    },

    async update(id: number, data: Partial<NewUser>) {
      await db
        .updateTable("users")
        .set(data)
        .where("id", "=", id)
        .executeTakeFirstOrThrow();

      return db
        .selectFrom("users")
        .selectAll()
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
    },

    async delete(id: number) {
      await db
        .deleteFrom("users")
        .where("id", "=", id)
        .executeTakeFirstOrThrow();
    },
  };
};

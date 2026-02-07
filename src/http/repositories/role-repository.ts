import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";

export type Role = Selectable<DB["roles"]>;

export interface RoleRepository {
  getAllRoles: () => Promise<Role[]>;
  createRole: (name: string, description: string) => Promise<Role>;
}

export const createRoleRepository = (db: Kysely<DB>): RoleRepository => {
  const getAllRoles = async () => {
    return await db.selectFrom("roles").selectAll().execute();
  };

  const createRole = async (name: string, description: string) => {
    const result = await db
      .insertInto("roles")
      .values({ name, description })
      .executeTakeFirst();

    return await db
      .selectFrom("roles")
      .selectAll()
      .where("id", "=", Number(result.insertId))
      .executeTakeFirstOrThrow();
  };

  return {
    getAllRoles,
    createRole,
  };
};

import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";

export type Role = Selectable<DB["roles"]>;

export interface RoleRepository {
  getAllRoles: () => Promise<Role[] | undefined>;
}

export const createRoleRepository = (db: Kysely<DB>): RoleRepository => {
  const getAllRoles = async () => {
    return await db.selectFrom("roles").selectAll().limit(10).execute();
  };

  return {
    getAllRoles,
  };
};

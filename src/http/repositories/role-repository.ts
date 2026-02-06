import type { Kysely } from "kysely";
import type { DB } from "../../database/types.js";

export interface RoleRepository {
  getAllRoles: () => void;
}

export const createRoleRepository = (db: Kysely<DB>): RoleRepository => {
  const getAllRoles = () => {
    console.log(db);
    throw new Error("Not yet implemented");
  };

  return {
    getAllRoles,
  };
};

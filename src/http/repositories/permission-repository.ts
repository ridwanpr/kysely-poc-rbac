import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";

export type Permission = Selectable<DB["permissions"]>;

export type PermissionRepository = {
  getAllPermission: () => Promise<Permission[]>;
};

const createPermissionRepository = (db: Kysely<DB>): PermissionRepository => {
  const getAllPermission = async () => {
    const permissions = db.selectFrom("permissions").selectAll().execute();
    return permissions;
  };

  return { getAllPermission };
};

export { createPermissionRepository };

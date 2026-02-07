import type { Kysely } from "kysely";
import type { DB } from "../../database/types.js";

export type PermissionRepository = {
  getAllPermission: () => void;
};

const createPermissionRepository = (db: Kysely<DB>): PermissionRepository => {
  const getAllPermission = () => {
    throw new Error("Not yetimplemented");
  };

  return { getAllPermission };
};

export { createPermissionRepository };

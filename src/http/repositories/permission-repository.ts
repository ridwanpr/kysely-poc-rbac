import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";
import type { PermissionInput } from "../../types/shared-type.js";

export type Permission = Selectable<DB["permissions"]>;

export type PermissionRepository = {
  getAllPermission: () => Promise<Permission[]>;
  findPermissionById: (id: number) => Promise<Permission | undefined>;
  createPermission: (data: PermissionInput) => Promise<Permission | undefined>;
};

const createPermissionRepository = (db: Kysely<DB>): PermissionRepository => {
  const getAllPermission = async () => {
    const permissions = await db
      .selectFrom("permissions")
      .selectAll()
      .execute();
    return permissions;
  };

  const findPermissionById = async (id: number) => {
    const permission = await db
      .selectFrom("permissions")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();

    return permission;
  };

  const createPermission = async (data: PermissionInput) => {
    const result = await db
      .insertInto("permissions")
      .values({
        permission_slug: data.permission_slug,
        description: data.description,
      })
      .executeTakeFirst();

    if (!result.insertId) {
      return undefined;
    }

    return await findPermissionById(Number(result.insertId));
  };

  return { getAllPermission, createPermission, findPermissionById };
};

export { createPermissionRepository };

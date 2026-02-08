import type { DeleteResult, Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";
import type { PermissionInput } from "../../types/shared-type.js";

export type Permission = Selectable<DB["permissions"]>;

export type PermissionRepository = {
  getAllPermission: () => Promise<Permission[]>;
  findPermissionById: (id: number) => Promise<Permission | undefined>;
  createPermission: (data: PermissionInput) => Promise<Permission | undefined>;
  updatePermission: (
    id: number,
    data: PermissionInput,
  ) => Promise<Permission | undefined>;
  deletePermission: (id: number) => Promise<DeleteResult>;
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

  const updatePermission = async (id: number, data: PermissionInput) => {
    const updated_at = new Date();
    const result = await db
      .updateTable("permissions")
      .where("id", "=", id)
      .set({
        permission_slug: data.permission_slug,
        description: data.description,
        updated_at,
      })
      .executeTakeFirst();

    if (Number(result.numUpdatedRows) === 0) {
      return undefined;
    }

    return await findPermissionById(id);
  };

  const deletePermission = async (id: number) => {
    return await db
      .deleteFrom("permissions")
      .where("id", "=", id)
      .executeTakeFirst();
  };

  return {
    getAllPermission,
    createPermission,
    findPermissionById,
    updatePermission,
    deletePermission,
  };
};

export { createPermissionRepository };

import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";

export type UserRole = Selectable<DB["user_roles"]>;

export type UserRoleRepository = {
  findUserRole: (
    userId: number,
    roleId: number,
  ) => Promise<UserRole | undefined>;
  createUserRole: (
    userId: number,
    roleId: number,
  ) => Promise<UserRole | undefined>;
};

export const createUserRoleRepository = (
  db: Kysely<DB>,
): UserRoleRepository => {
  const findUserRole = async (userId: number, roleId: number) => {
    return await db
      .selectFrom("user_roles")
      .selectAll()
      .where("user_id", "=", userId)
      .where("role_id", "=", roleId)
      .executeTakeFirst();
  };

  const createUserRole = async (userId: number, roleId: number) => {
    await db
      .insertInto("user_roles")
      .values({
        user_id: userId,
        role_id: roleId,
        assigned_at: new Date(),
      })
      .execute();

    return await findUserRole(userId, roleId);
  };

  return {
    findUserRole,
    createUserRole,
  };
};

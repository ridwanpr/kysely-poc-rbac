import type { Kysely, Selectable } from "kysely";
import type { DB } from "../../database/types.js";
import type { RoleInput } from "../../types/role-permission.js";

export type Role = Selectable<DB["roles"]>;

export type RoleRepository = {
  getAllRoles: () => Promise<Role[]>;
  findRoleById: (id: number) => Promise<Role | undefined>;
  createRole: (name: string, description: string) => Promise<Role | undefined>;
  updateRole: (id: number, data: RoleInput) => Promise<Role | undefined>;
};

export const createRoleRepository = (db: Kysely<DB>): RoleRepository => {
  const getAllRoles = async () => {
    return await db.selectFrom("roles").selectAll().execute();
  };

  const findRoleById = async (id: number) => {
    return await db
      .selectFrom("roles")
      .selectAll()
      .where("id", "=", id)
      .executeTakeFirst();
  };

  const createRole = async (name: string, description: string) => {
    const result = await db
      .insertInto("roles")
      .values({ name, description })
      .executeTakeFirst();

    if (!result.insertId) {
      throw new Error("Something went wrong");
    }

    return await findRoleById(Number(result.insertId));
  };

  const updateRole = async (id: number, data: RoleInput) => {
    const { name, description } = data;
    const updatedAt = new Date();

    await db
      .updateTable("roles")
      .set({
        name: name,
        description: description,
        updated_at: updatedAt,
      })
      .where("id", "=", id)
      .executeTakeFirst();

    return await findRoleById(id);
  };

  return {
    getAllRoles,
    findRoleById,
    createRole,
    updateRole,
  };
};

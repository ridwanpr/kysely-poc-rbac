/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Kysely, sql } from "kysely";
import type { DB } from "../types.js";

export async function seed(db: Kysely<DB>): Promise<void> {
  await insertPermissions(db);

  await insertRoles(db);

  await assignPermissionsToRoles(db);
}

async function insertPermissions(db: Kysely<DB>): Promise<void> {
  const permissions = [
    {
      permission_slug: "permissions.index",
      description: "View all permissions",
    },
    {
      permission_slug: "permissions.store",
      description: "Create new permissions",
    },
    {
      permission_slug: "permissions.update",
      description: "Edit permissions",
    },
    {
      permission_slug: "permissions.destroy",
      description: "Delete permissions",
    },
    {
      permission_slug: "roles.index",
      description: "View all roles",
    },
    {
      permission_slug: "roles.store",
      description: "Create new roles",
    },
    {
      permission_slug: "roles.update",
      description: "Edit roles",
    },
    {
      permission_slug: "roles.destroy",
      description: "Delete roles",
    },
    {
      permission_slug: "users.index",
      description: "List all users",
    },
    {
      permission_slug: "users.get",
      description: "View specific user details",
    },
    {
      permission_slug: "users.update",
      description: "Update user details",
    },
    {
      permission_slug: "users.destroy",
      description: "Delete users",
    },
  ];

  await db
    .insertInto("permissions")
    .values(permissions)
    .onDuplicateKeyUpdate({
      description: sql`VALUES(description)`,
      updated_at: sql`NOW()`,
    })
    .execute();
}

async function insertRoles(db: Kysely<DB>): Promise<void> {
  const defaultRoles = [
    {
      name: "Super Admin",
      description: "Full system access",
    },
    {
      name: "User",
      description: "Standard user access",
    },
  ];

  await db.insertInto("roles").values(defaultRoles).execute();
}

async function assignPermissionsToRoles(db: Kysely<DB>): Promise<void> {
  const allPermissions = await db
    .selectFrom("permissions")
    .select(["id", "permission_slug"])
    .execute();

  const superAdminRole = await db
    .selectFrom("roles")
    .where("name", "=", "Super Admin")
    .select(["id", "name"])
    .executeTakeFirst();

  const userRole = await db
    .selectFrom("roles")
    .where("name", "=", "User")
    .select(["id", "name"])
    .executeTakeFirst();

  if (!superAdminRole || !userRole) {
    throw new Error("Required roles not found");
  }

  // Assign all permissions to Super Admin
  const superAdminRolePermissions = [];
  for (const permission of allPermissions) {
    superAdminRolePermissions.push({
      role_id: superAdminRole.id,
      permission_id: permission.id,
    });
  }

  await db
    .insertInto("role_permissions")
    .values(superAdminRolePermissions)
    .execute();

  // Assign limited permissions to User role
  const allowedUserPermissions = ["users.get", "users.post"];
  const userRolePermissions = [];

  for (const permission of allPermissions) {
    const isAllowed = allowedUserPermissions.includes(
      permission.permission_slug,
    );
    if (isAllowed) {
      userRolePermissions.push({
        role_id: userRole.id,
        permission_id: permission.id,
      });
    }
  }

  await db.insertInto("role_permissions").values(userRolePermissions).execute();
}

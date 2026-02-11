/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Kysely, sql } from "kysely";
import type { DB } from "../types.js";

export async function seed(db: Kysely<DB>): Promise<void> {
  // Define Permissions
  const permissions = [
    {
      permission_slug: "permissions.index",
      description: "View all permissions",
    },
    {
      permission_slug: "permissions.store",
      description: "Create new permissions",
    },
    { permission_slug: "permissions.update", description: "Edit permissions" },
    {
      permission_slug: "permissions.destroy",
      description: "Delete permissions",
    },
    { permission_slug: "roles.index", description: "View all roles" },
    { permission_slug: "roles.store", description: "Create new roles" },
    { permission_slug: "roles.update", description: "Edit roles" },
    { permission_slug: "roles.destroy", description: "Delete roles" },
    { permission_slug: "users.index", description: "List all users" },
    { permission_slug: "users.get", description: "View specific user details" },
    { permission_slug: "users.update", description: "Update user details" },
    { permission_slug: "users.destroy", description: "Delete users" },
  ];

  await db
    .insertInto("permissions")
    .values(permissions as any)
    .onDuplicateKeyUpdate({
      description: sql`VALUES(description)`,
      updated_at: sql`NOW()`,
    })
    .execute();

  // Define and Insert Roles
  const roles = [
    { name: "Super Admin", description: "Full system access" },
    { name: "User", description: "Standard consumer access" },
  ];

  await db
    .insertInto("roles")
    .values(roles as any)
    .onDuplicateKeyUpdate({
      description: sql`VALUES(description)`,
      updated_at: sql`NOW()`,
    })
    .execute();

  // Fetch IDs for mapping
  const allPermissions = await db
    .selectFrom("permissions")
    .select(["id", "permission_slug"])
    .execute();

  const allRoles = await db
    .selectFrom("roles")
    .select(["id", "name"])
    .execute();

  const superAdminRole = allRoles.find((r) => r.name === "Super Admin");
  const userRole = allRoles.find((r) => r.name === "User");

  // Map Permissions to Roles in the join table
  if (superAdminRole) {
    const superAdminMappings = allPermissions.map((p) => ({
      role_id: superAdminRole.id,
      permission_id: p.id,
    }));

    await db
      .deleteFrom("role_permissions")
      .where("role_id", "=", superAdminRole.id)
      .execute();

    await db
      .insertInto("role_permissions")
      .values(superAdminMappings)
      .execute();
  }

  if (userRole) {
    const userAllowedSlugs = ["users.get"];
    const userPermissions = allPermissions
      .filter((p) => userAllowedSlugs.includes(p.permission_slug))
      .map((p) => ({
        role_id: userRole.id,
        permission_id: p.id,
      }));

    if (userPermissions.length > 0) {
      await db
        .deleteFrom("role_permissions")
        .where("role_id", "=", userRole.id)
        .execute();

      await db.insertInto("role_permissions").values(userPermissions).execute();
    }
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Kysely, sql } from "kysely";

export async function seed(db: Kysely<any>): Promise<void> {
  const permissions = [
    // Permissions
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

    // Roles
    { permission_slug: "roles.index", description: "View all roles" },
    { permission_slug: "roles.store", description: "Create new roles" },
    { permission_slug: "roles.update", description: "Edit roles" },
    { permission_slug: "roles.destroy", description: "Delete roles" },

    // Users
    { permission_slug: "users.get", description: "View specific user details" },
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

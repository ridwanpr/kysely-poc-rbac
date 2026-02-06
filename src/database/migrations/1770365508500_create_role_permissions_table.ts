/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("role_permissions")
    .addColumn("role_id", "bigint", (col) =>
      col.unsigned().notNull().references("roles.id"),
    )
    .addColumn("permission_id", "bigint", (col) =>
      col.unsigned().notNull().references("permissions.id"),
    )
    .addPrimaryKeyConstraint("pk_role_permissions", [
      "role_id",
      "permission_id",
    ])
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("role_permissions").execute();
}

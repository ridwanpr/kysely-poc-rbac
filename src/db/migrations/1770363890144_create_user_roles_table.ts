/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user_roles")
    .addColumn("user_id", "bigint", (col) =>
      col.unsigned().notNull().references("users.id").onDelete("cascade"),
    )
    .addColumn("role_id", "bigint", (col) =>
      col.unsigned().notNull().references("roles.id").onDelete("cascade"),
    )
    .addColumn("assigned_at", "datetime", (col) => col.defaultTo(sql`now()`))
    .addPrimaryKeyConstraint("pk_user_roles", ["user_id", "role_id"])
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("user_roles").execute();
}

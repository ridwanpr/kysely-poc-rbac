/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("permissions")
    .addColumn("id", "bigint", (col) =>
      col.unsigned().primaryKey().autoIncrement(),
    )
    .addColumn("permission_slug", "varchar(250)", (col) =>
      col.unique().notNull(),
    )
    .addColumn("description", "varchar(250)")
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "datetime")
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("permissions").execute();
}

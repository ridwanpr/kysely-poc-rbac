/* eslint-disable @typescript-eslint/no-explicit-any */
import { sql, type Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("roles")
    .addColumn("id", "bigint", (col) =>
      col.autoIncrement().primaryKey().unsigned(),
    )
    .addColumn("name", "varchar(100)", (col) => col.notNull().unique())
    .addColumn("description", "varchar(250)")
    .addColumn("created_at", "datetime", (col) => col.defaultTo(sql`now()`))
    .addColumn("updated_at", "datetime")
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("roles").execute();
}

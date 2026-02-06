/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Kysely } from "kysely";

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("users")
    .addColumn("id", "bigint", (col) => col.primaryKey().autoIncrement().unsigned())
    .addColumn("name", "varchar(200)", (col) => col.notNull())
    .addColumn("email", "varchar(255)", (col) => col.unique().notNull())
    .addColumn("password", "varchar(255)", (col) => col.notNull())
    .addColumn("created_at", "datetime")
    .addColumn("updated_at", "datetime")
    .execute();
}

// `any` is required here since migrations should be frozen in time. alternatively, keep a "snapshot" db interface.
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("users").execute();
}

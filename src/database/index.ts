import { Kysely, MysqlDialect } from "kysely";
import { createPool } from "mysql2";
import type { DB } from "./types.js";

export const db = new Kysely<DB>({
  dialect: new MysqlDialect({
    pool: createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "test",
      port: Number(process.env.DB_PORT) || 3306,
      connectionLimit: 10,
    }),
  }),
});

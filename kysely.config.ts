import { defineConfig } from "kysely-ctl";
import { MysqlDialect } from "kysely";
import { createPool } from "mysql2";

export default defineConfig({
  migrations: {
    migrationFolder: "src/db/migrations",
  },
  dialect: new MysqlDialect({
    pool: createPool({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "password",
      database: process.env.DB_NAME || "my_database",
    }),
  }),
});

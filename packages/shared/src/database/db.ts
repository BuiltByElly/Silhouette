import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { DB_PATH, MIGRATIONS_DIR } from "../path";
import { logger } from "../log";

export function setupDatabase() {
  const sqliteClient = new Database(DB_PATH);
  sqliteClient.run("PRAGMA journal_mode = WAL;");
  const db = drizzle({ client: sqliteClient });

  //Automatically run schema migrations on application boot
  try {
    migrate(db, { migrationsFolder: MIGRATIONS_DIR });
    logger(
      "SUCCESS",
      "Lib",
      `Successfully migrated and connected at: ${DB_PATH}`,
    );
  } catch (error) {
    logger("ERROR", "Lib", `Auto-migration failed at startup ${error}`);
  }

  return db;
}

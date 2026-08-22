import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";
import { DB_PATH, MIGRATIONS_DIR } from "../path";
import { logger } from "../log";
import type { SQLiteTable } from "drizzle-orm/sqlite-core";

export function setupDatabase() {
  const sqliteClient = new Database(DB_PATH);
  sqliteClient.run("PRAGMA journal_mode = WAL;");
  const db = drizzle({ client: sqliteClient });

  //Automatically run schema migrations on application boot
  try {
    migrate(db, { migrationsFolder: MIGRATIONS_DIR });
    logger(
      "SUCCESS",
      "Shared",
      `Successfully migrated and connected database at: ${DB_PATH}`,
    );
  } catch (error) {
    logger("ERROR", "Shared", `Auto-migration failed at startup ${error}`);
  }
  return db;
}

export async function writeHeartbeatsToDb(
  db: ReturnType<typeof setupDatabase>,
  table: SQLiteTable,
  data: Record<string, unknown>[],
) {
  try {
    await db.insert(table).values(data).onConflictDoNothing();
    logger(
      "SUCCESS",
      "Shared",
      `Successfully wrote ${data.length} heartbeats to table`,
    );
  } catch (error) {
    logger("ERROR", "Shared", `Failed to write to ${table} ${error}`);
  }
}

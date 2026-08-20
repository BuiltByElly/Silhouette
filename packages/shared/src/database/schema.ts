// shared/src/db/schema.tse
import {
  sqliteTable,
  text,
  integer,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";

export const heartbeats = sqliteTable(
  "heartbeats",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    entity: text("entity").notNull(),
    entityType: text("entity_type").notNull(),
    timestamp: integer("timestamp", { mode: "timestamp" }).notNull(),
    isWrite: integer("is_write", { mode: "boolean" }),
    project: text("project"),
    branch: text("branch"),
    language: text("language"),
    category: text("category"),
    lines: integer("lines"),
    lineno: integer("lineno"),
    cursorpos: integer("cursorpos"),
  },
  (table) => [
    uniqueIndex("entity_timestamp_unique").on(table.entity, table.timestamp),
    index("timestamp_idx").on(table.timestamp),
  ],
);

// export const goals = sqliteTable("goals", {
//   id: integer("id").primaryKey({ autoIncrement: true }),
//   period: text("period").notNull(), // "daily" | "weekly"
//   targetSeconds: integer("target_seconds").notNull(),
//   project: text("project"),
//   active: integer("active", { mode: "boolean" }).notNull().default(true),
//   periodStart: integer("period_start").notNull(),
//   createdAt: integer("created_at").notNull(),
// });

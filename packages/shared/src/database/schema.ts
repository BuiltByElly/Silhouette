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
    type: text("type").notNull(),
    time: integer("time", { mode: "timestamp" }).notNull(),
    category: text("category"),
    project: text("project"),
    project_root_count: integer("project_root_count"),
    branch: text("branch"),
    language: text("language"),
    is_write: integer("is_write", { mode: "boolean" }),
    lines: integer("lines"),
    lineno: integer("lineno"),
    cursorpos: integer("cursorpos"),
    ai_line_changes: integer("ai_line_changes"),
    human_line_changes: integer("human_line_changes"),
    user_agent: text("user_agent"),
  },
  (table) => [
    uniqueIndex("entity_timestamp_unique").on(table.entity, table.time),
    index("time_idx").on(table.time),
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

CREATE TABLE `heartbeats` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`entity` text NOT NULL,
	`type` text NOT NULL,
	`time` integer NOT NULL,
	`category` text,
	`project` text,
	`project_root_count` integer,
	`branch` text,
	`language` text,
	`is_write` integer,
	`lines` integer,
	`lineno` integer,
	`cursorpos` integer,
	`ai_line_changes` integer,
	`human_line_changes` integer,
	`user_agent` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entity_timestamp_unique` ON `heartbeats` (`entity`,`time`);--> statement-breakpoint
CREATE INDEX `time_idx` ON `heartbeats` (`time`);
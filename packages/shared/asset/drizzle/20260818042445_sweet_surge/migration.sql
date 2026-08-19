CREATE TABLE `heartbeats` (
	`id` integer PRIMARY KEY AUTOINCREMENT,
	`entity` text NOT NULL,
	`entity_type` text NOT NULL,
	`timestamp` integer NOT NULL,
	`is_write` integer,
	`project` text,
	`branch` text,
	`language` text,
	`category` text,
	`lines` integer,
	`lineno` integer,
	`cursorpos` integer
);
--> statement-breakpoint
CREATE UNIQUE INDEX `entity_timestamp_unique` ON `heartbeats` (`entity`,`timestamp`);--> statement-breakpoint
CREATE INDEX `timestamp_idx` ON `heartbeats` (`timestamp`);
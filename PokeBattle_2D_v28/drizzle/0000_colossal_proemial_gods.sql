CREATE TABLE `club_limits` (
	`id` text PRIMARY KEY NOT NULL,
	`count` integer DEFAULT 0 NOT NULL,
	`until` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `club_rooms` (
	`id` text PRIMARY KEY NOT NULL,
	`host` text NOT NULL,
	`guest` text,
	`state` text NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `club_sessions` (
	`token` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `club_trades` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`partner` text,
	`offered` text NOT NULL,
	`requested` text,
	`status` text DEFAULT 'open' NOT NULL,
	`updated` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `club_users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`hash` text NOT NULL,
	`salt` text NOT NULL,
	`state` text NOT NULL,
	`version` integer DEFAULT 0 NOT NULL,
	`created` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `club_users_email_unique` ON `club_users` (`email`);
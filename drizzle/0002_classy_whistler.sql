CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`activationCode` integer,
	`email` text,
	`isAdmin` integer DEFAULT false,
	`name` text NOT NULL,
	`passwordHash` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`activationCode` integer,
	`email` text,
	`isAdmin` integer DEFAULT false NOT NULL,
	`name` text NOT NULL,
	`passwordHash` text,
	`verificationStatus` text DEFAULT 'pending-email-verification' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "activationCode", "email", "isAdmin", "name", "passwordHash", "verificationStatus") SELECT "id", "activationCode", "email", "isAdmin", "name", "passwordHash", "verificationStatus" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
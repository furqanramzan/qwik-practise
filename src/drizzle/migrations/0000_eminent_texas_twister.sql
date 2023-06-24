CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT PRIMARY KEY NOT NULL,
	`name` varchar(256),
	`email` varchar(256),
	`created_at` timestamp,
	`updated_at` timestamp);

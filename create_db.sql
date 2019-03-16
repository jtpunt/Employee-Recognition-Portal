-- Vega Group
-- CS467
-- Employee Recognition Portal
-- create_db.sql

-- USE nelsorya-db;

-- Drop all tables
DROP TABLE IF EXISTS `Granted`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `Employee`;
DROP TABLE IF EXISTS `Department`;
DROP TABLE IF EXISTS `Location`;
DROP TABLE IF EXISTS `Award`;


-- Create or recreate all tables
CREATE TABLE `Location` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`city` varchar(20) NOT NULL,
`state` varchar(2) NOT NULL,
`zip` varchar(10) NOT NULL,
PRIMARY KEY (`id`),
UNIQUE KEY `state` (`state`)
) ENGINE=InnoDB;


CREATE TABLE `Department` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(30) NOT NULL,
`description` varchar(255),
`location_id` int NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB;


CREATE TABLE `Employee` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`email` varchar(30) NOT NULL,
`fname` varchar(20) NOT NULL,
`lname` varchar(20) NOT NULL,
`department_id` int NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB;


CREATE TABLE `Award` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`title` varchar(30) NOT NULL,
`description` varchar(255),
PRIMARY KEY (`id`),
UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB;


CREATE TABLE `User` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`username` varchar(30) NOT NULL,
`password` varchar(30) NOT NULL,
`secret` varchar(30) NOT NULL DEFAULT 'secret',
`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`signature` longblob,
`permission` int(1) NOT NULL,
`employee_id` int NOT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
UNIQUE KEY `username` (`username`),
UNIQUE(`permission`, `employee_id`)
) ENGINE=InnoDB;

-- Create relationship tables for many to many relationships
CREATE TABLE `Granted` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`user_id` int(11) NOT NULL,
`award_id` int(11) NOT NULL,
`employee_id` int(11) NOT NULL,
`grant_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`id`, `user_id`,`award_id`, `employee_id`, `grant_date`),
FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`award_id`) REFERENCES `Award` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


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
`Description` varchar(255),
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
`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`signature` longblob,
`permission` int(1) NOT NULL,
`employee_id` int NOT NULL,
PRIMARY KEY (`id`, 'permission', 'employee_id'),
FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB;

-- Create relationship tables for many to many relationships
CREATE TABLE `Granted` (
`user_id` int(11) NOT NULL,
`award_id` int(11) NOT NULL,
`employee_id` int(11) NOT NULL,
`grant_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (`user_id`,`award_id`, `employee_id`, `grant_date`),
FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`award_id`) REFERENCES `Award` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Populate tables with data
INSERT INTO `Location` (city, state, zip) values ("Denver", "CO","80202-2805");

INSERT INTO `Department` (name, description, location_id) values ("Sales", "Conducts sales activity for company",(SELECT id FROM Location WHERE zip = "80202-2805")); 

INSERT INTO `Employee` (email, fname, lname, department_id) values ("nelsorya@oregonstate.edu", "Ryan", "Nelson", (SELECT id FROM Department WHERE name = "Sales")); 

INSERT INTO `Award` (title, description) values ("Employee Of The Month", "Recognizes outstanding employees who's contributions to the company were significant.");

INSERT INTO `User` (username, password, date_created, signature, permission, employee_id) values ((SELECT email FROM Employee WHERE email = "nelsorya@oregonstate.edu"), "pwd", now(), NULL, 1, (SELECT id FROM Employee WHERE email = "nelsorya@oregonstate.edu"));

INSERT INTO `Granted` (user_id, award_id, employee_id, grant_date) values ((SELECT id FROM User WHERE username = "nelsorya@oregonstate.edu"),(SELECT id FROM Award WHERE title = "Employee Of The Month"), (SELECT id FROM Employee WHERE email = "nelsorya@oregonstate.edu"), now());

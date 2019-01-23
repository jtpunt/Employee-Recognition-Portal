#
# TABLE STRUCTURE FOR: Award
#

DROP TABLE IF EXISTS `Award`;

CREATE TABLE `Award` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `Award` (`id`, `title`, `description`) VALUES (1, ' Employee of the Week', 'Quis consequuntur repudiandae aut laboriosam aspernatur. Cum et ea consequatur odio iure.');
INSERT INTO `Award` (`id`, `title`, `description`) VALUES (2, 'Employee of the Month', 'Occaecati dolorem magni et est. Ipsa aliquid maxime nihil id eos reiciendis et. Alias sunt voluptas rerum minus suscipit nulla sit.');


#
# TABLE STRUCTURE FOR: Department
#

DROP TABLE IF EXISTS `Department`;

CREATE TABLE `Department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `location_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `Department_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `Location` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=201 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (101, ' Human Resource Management', 'Dolor dolor reiciendis et soluta. Et ut ea molestiae quia quis. Ducimus placeat unde aliquid tenetur. Quia deleniti deserunt et quo libero nulla.', 1);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (102, ' IT', 'Fugit voluptas cumque in consequatur quo. Earum officia quia voluptatem optio esse temporibus qui nulla. Natus harum repellat explicabo id quod. Iure est quae autem.', 2);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (103, ' Marketing', 'Nam error dolore porro asperiores incidunt voluptas. Cupiditate fugiat mollitia illum deserunt ex et quo. Dolor dicta mollitia est pariatur est delectus omnis. Dolorum ipsa quos dicta aperiam quibusdam voluptas fugiat. Adipisci et quod sunt fugiat.', 1);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (106, ' Purchasing', 'Explicabo quo repellat aliquid ut. Repellendus quisquam sit amet in reiciendis voluptatem natus. Voluptatem molestiae cum dicta qui laboriosam et deleniti asperiores.', 2);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (111, ' Research and Development', 'Assumenda aut velit dolorum cum sit iusto. Quia non sunt dolorem. Ipsa ducimus sit occaecati ut.', 1);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (115, ' Finance', 'Aut nam id veritatis libero rem veritatis aliquam neque. Repudiandae saepe illum sit nam sed. Iste porro alias excepturi officiis totam beatae soluta qui. Laboriosam quia amet ipsum doloremque est.', 1);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (123, 'Production', 'Suscipit dolor animi enim sed. Cupiditate impedit fuga consequatur provident non facere voluptatem necessitatibus. Quasi nihil fugiat explicabo laudantium. Qui ipsam odit voluptatem magnam laudantium ut animi recusandae.', 1);
INSERT INTO `Department` (`id`, `name`, `Description`, `location_id`) VALUES (134, ' Accounting', 'Inventore qui dolores dolores officiis ut laudantium omnis. Et doloremque nesciunt et unde. Et non consequatur rerum voluptatem error.', 2);


#
# TABLE STRUCTURE FOR: Employee
#

DROP TABLE IF EXISTS `Employee`;

CREATE TABLE `Employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `fname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `department_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `Employee_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `Department` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (1, 'macejkovic.krystina@example.ne', 'Kay', 'Herman', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (2, 'guiseppe.zieme@example.org', 'Frederik', 'Spencer', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (3, 'kpfeffer@example.net', 'Janick', 'Hammes', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (4, 'asha.padberg@example.com', 'Gordon', 'Wolff', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (5, 'wunsch.dedrick@example.org', 'Horacio', 'Mueller', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (6, 'eichmann.maryse@example.com', 'Gregoria', 'Emard', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (7, 'schuster.ismael@example.net', 'Geovanny', 'Watsica', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (8, 'ruecker.alice@example.org', 'Izabella', 'Dickens', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (9, 'awitting@example.net', 'Roman', 'Jakubowski', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (10, 'blanda.colten@example.org', 'Amya', 'Heller', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (11, 'nicolas.edwardo@example.net', 'Tomas', 'Batz', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (12, 'ashly.schumm@example.com', 'Gregg', 'Lowe', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (13, 'uruecker@example.com', 'Heather', 'Towne', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (14, 'annie62@example.net', 'Clemmie', 'Rempel', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (15, 'volkman.cleve@example.org', 'Robbie', 'Stark', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (16, 'cmcclure@example.org', 'Marjory', 'Wintheiser', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (17, 'jacobson.aurelia@example.com', 'Queenie', 'Doyle', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (18, 'micheal.franecki@example.com', 'Friedrich', 'Bode', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (19, 'rolando.russel@example.com', 'Sandrine', 'O\'Conner', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (20, 'urban43@example.org', 'Alden', 'Stoltenberg', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (21, 'guillermo.volkman@example.net', 'Bell', 'Paucek', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (22, 'octavia.osinski@example.com', 'Orin', 'Langosh', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (23, 'lwyman@example.net', 'Dorcas', 'Price', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (24, 'bdeckow@example.net', 'Elian', 'Bosco', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (25, 'jschoen@example.com', 'Astrid', 'Waelchi', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (26, 'torp.milan@example.net', 'Noemi', 'Terry', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (27, 'hackett.jazmin@example.net', 'Elyse', 'Denesik', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (28, 'myrtis.lind@example.org', 'Violet', 'Pacocha', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (29, 'gabe33@example.com', 'Vidal', 'Volkman', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (30, 'theron64@example.net', 'Jade', 'Hartmann', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (31, 'tstracke@example.com', 'Diamond', 'Hintz', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (32, 'carli76@example.net', 'Marshall', 'Schmidt', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (33, 'cgreenholt@example.org', 'Casandra', 'O\'Connell', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (34, 'brady87@example.net', 'Luella', 'Schumm', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (35, 'electa.collier@example.com', 'Colt', 'DuBuque', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (36, 'christophe.stracke@example.com', 'Vivian', 'Gutmann', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (37, 'ohauck@example.org', 'Aaron', 'Reichert', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (38, 'deven.smitham@example.org', 'Marques', 'Roberts', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (39, 'lew.fisher@example.org', 'Felix', 'Stoltenberg', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (40, 'dcruickshank@example.net', 'Jan', 'West', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (41, 'archibald.casper@example.net', 'Scotty', 'Corkery', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (42, 'dax.bogisich@example.net', 'Sonya', 'Wisoky', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (43, 'kertzmann.roderick@example.org', 'Seamus', 'Kihn', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (44, 'lesch.ezekiel@example.com', 'Brayan', 'Roob', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (45, 'charlotte35@example.org', 'Jayde', 'Gleason', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (46, 'yo\'connell@example.net', 'Dannie', 'Nicolas', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (47, 'laurence.robel@example.com', 'Lynn', 'Mante', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (48, 'mohamed84@example.net', 'Rachel', 'Hudson', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (49, 'elsa.beahan@example.com', 'Jasen', 'Lynch', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (50, 'weber.keyon@example.net', 'Savanna', 'Rodriguez', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (51, 'jankunding@example.net', 'Tatyana', 'Kerluke', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (52, 'metz.claud@example.net', 'Axel', 'Rodriguez', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (53, 'stacey46@example.com', 'Delpha', 'Weissnat', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (54, 'casper.zetta@example.net', 'Jordyn', 'Beier', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (55, 'iorn@example.com', 'Jaden', 'Jaskolski', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (56, 'tyra32@example.org', 'Maeve', 'Hermiston', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (57, 'michaela.douglas@example.net', 'Eda', 'Parker', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (58, 'filiberto.brakus@example.com', 'Enoch', 'Wisoky', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (59, 'katelin.torp@example.net', 'Kareem', 'Aufderhar', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (60, 'nlowe@example.net', 'Lucienne', 'Ullrich', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (61, 'noe.medhurst@example.net', 'Ludwig', 'Morar', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (62, 'ismael53@example.com', 'Ilene', 'Toy', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (63, 'marks.nya@example.org', 'Unique', 'Koss', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (64, 'djohnston@example.com', 'Eleonore', 'Steuber', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (65, 'oma.satterfield@example.net', 'Ally', 'Cruickshank', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (66, 'white.esperanza@example.net', 'Dario', 'Sporer', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (67, 'veum.veronica@example.org', 'Monte', 'Buckridge', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (68, 'brielle.shanahan@example.net', 'Richmond', 'Leuschke', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (69, 'hernser@example.org', 'Demetris', 'Rolfson', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (70, 'urowe@example.com', 'Leilani', 'Tromp', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (71, 'garret.funk@example.com', 'Nova', 'Prosacco', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (72, 'vrunolfsson@example.com', 'Eusebio', 'Olson', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (73, 'hester84@example.com', 'Zackary', 'Pouros', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (74, 'davion20@example.com', 'Douglas', 'Dickinson', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (75, 'chelsey69@example.com', 'Evie', 'Luettgen', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (76, 'rahsaan88@example.org', 'Alexandrea', 'Skiles', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (77, 'hodkiewicz.mckenna@example.com', 'Laury', 'Keeling', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (78, 'kuhn.anya@example.com', 'Axel', 'Wolf', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (79, 'johns.sterling@example.net', 'Lenore', 'Krajcik', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (80, 'rowland.beer@example.net', 'Vidal', 'Friesen', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (81, 'kristina32@example.net', 'Sam', 'Hammes', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (82, 'margarete.rohan@example.com', 'Yvonne', 'Collier', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (83, 'kgraham@example.org', 'Rosie', 'Cartwright', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (84, 'clyde31@example.net', 'Anita', 'Barton', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (85, 'hyatt.amaya@example.org', 'Vergie', 'Farrell', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (86, 'reinger.tod@example.org', 'Marta', 'Quigley', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (87, 'obeer@example.org', 'Clara', 'Bernhard', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (88, 'hdurgan@example.com', 'Mae', 'Greenfelder', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (89, 'tony.heller@example.org', 'Addie', 'Hamill', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (90, 'gwiza@example.net', 'Dayton', 'Toy', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (91, 'elroy.botsford@example.org', 'Ada', 'Zemlak', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (92, 'wcole@example.net', 'Missouri', 'Hills', 106);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (93, 'abigail71@example.org', 'Sofia', 'Simonis', 107);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (94, 'jada.schumm@example.org', 'Malcolm', 'Leuschke', 108);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (95, 'eden54@example.org', 'Wilhelm', 'Veum', 110);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (96, 'gudrun.o\'reilly@example.com', 'Anjali', 'Rutherford', 112);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (97, 'rohan.alivia@example.org', 'Willa', 'Cummerata', 101);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (98, 'jovan27@example.org', 'Madonna', 'Farrell', 102);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (99, 'stamm.orlo@example.com', 'Okey', 'Boyer', 103);
INSERT INTO `Employee` (`id`, `email`, `fname`, `lname`, `department_id`) VALUES (100, 'lbogisich@example.com', 'Nolan', 'D\'Amore', 106);


#
# TABLE STRUCTURE FOR: Granted
#

DROP TABLE IF EXISTS `Granted`;

CREATE TABLE `Granted` (
  `user_id` int(11) NOT NULL,
  `award_id` int(11) NOT NULL,
  `employee_id` int(11) NOT NULL,
  `grant_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`user_id`,`award_id`,`employee_id`,`grant_date`),
  KEY `award_id` (`award_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `Granted_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Granted_ibfk_2` FOREIGN KEY (`award_id`) REFERENCES `Award` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Granted_ibfk_3` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (1, 1, 1, '2013-04-10 11:42:39');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (2, 2, 2, '2018-05-18 00:32:57');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (3, 1, 3, '1987-11-24 01:50:36');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (4, 2, 4, '2008-04-04 13:55:06');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (5, 1, 5, '2018-03-14 03:56:23');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (6, 2, 6, '2005-06-10 16:59:27');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (7, 1, 7, '2004-12-08 06:46:48');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (8, 2, 8, '2015-02-13 16:10:34');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (9, 1, 9, '2003-05-02 23:21:34');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (10, 2, 10, '1972-01-13 03:55:59');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (11, 1, 11, '2010-11-26 08:44:07');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (12, 2, 12, '1986-09-18 08:44:31');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (13, 1, 13, '1972-05-24 08:23:00');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (14, 2, 14, '1984-02-05 10:02:16');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (15, 1, 15, '1981-03-23 10:17:28');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (16, 2, 16, '2008-08-30 12:26:36');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (17, 1, 17, '1979-03-04 06:02:52');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (18, 2, 18, '2016-07-31 10:56:33');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (19, 1, 19, '1988-04-22 11:34:25');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (20, 2, 20, '1999-09-29 03:23:49');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (21, 1, 21, '2018-04-11 08:02:41');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (22, 2, 22, '1978-02-03 04:40:27');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (23, 1, 23, '2000-11-09 20:09:40');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (24, 2, 24, '2010-05-11 00:25:45');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (25, 1, 25, '1980-11-17 19:47:57');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (26, 2, 26, '1980-07-28 19:14:24');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (27, 1, 27, '1999-08-31 13:04:14');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (28, 2, 28, '1977-01-06 17:39:16');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (29, 1, 29, '1999-11-14 06:42:29');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (30, 2, 30, '1997-04-30 11:14:37');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (31, 1, 31, '1977-09-26 16:18:51');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (32, 2, 32, '1975-10-10 08:30:13');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (33, 1, 33, '2001-12-28 12:59:03');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (34, 2, 34, '2008-02-27 17:52:28');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (35, 1, 35, '2003-02-27 16:13:49');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (36, 2, 36, '1994-03-03 22:16:31');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (37, 1, 37, '1976-08-05 19:41:50');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (38, 2, 38, '1983-11-20 15:41:00');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (39, 1, 39, '1999-07-04 07:03:50');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (40, 2, 40, '1987-04-01 10:52:52');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (41, 1, 41, '1984-07-16 09:28:34');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (42, 2, 42, '1978-06-28 06:46:15');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (43, 1, 43, '1982-08-05 12:40:03');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (44, 2, 44, '2015-10-23 10:53:22');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (45, 1, 45, '2013-06-13 08:41:49');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (46, 2, 46, '1975-01-19 10:12:43');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (47, 1, 47, '1996-01-06 04:30:50');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (48, 2, 48, '2002-08-26 07:09:58');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (49, 1, 49, '2001-08-14 10:10:03');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (50, 2, 50, '2014-07-26 21:43:47');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (51, 1, 51, '1986-08-05 02:21:03');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (52, 2, 52, '1998-04-24 14:13:45');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (53, 1, 53, '1997-12-07 12:23:02');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (54, 2, 54, '2016-12-27 12:57:53');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (55, 1, 55, '1989-09-07 14:46:18');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (56, 2, 56, '1991-05-28 08:20:40');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (57, 1, 57, '2018-08-24 01:47:37');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (58, 2, 58, '2003-03-28 19:49:27');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (59, 1, 59, '1999-12-11 20:26:28');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (60, 2, 60, '2006-10-28 15:57:15');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (61, 1, 61, '1995-07-01 23:54:17');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (62, 2, 62, '1992-12-29 03:22:35');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (63, 1, 63, '1994-11-19 01:10:16');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (64, 2, 64, '2019-01-04 16:21:42');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (65, 1, 65, '2003-05-09 04:21:40');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (66, 2, 66, '1970-09-11 01:36:26');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (67, 1, 67, '2010-07-06 07:14:53');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (68, 2, 68, '1981-12-11 03:23:53');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (69, 1, 69, '1994-09-26 20:22:56');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (70, 2, 70, '1986-08-17 00:56:51');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (71, 1, 71, '1984-10-02 10:06:34');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (72, 2, 72, '2001-01-23 03:48:59');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (73, 1, 73, '1983-10-25 19:31:49');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (74, 2, 74, '2014-12-10 17:31:21');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (75, 1, 75, '1992-09-24 03:27:42');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (76, 2, 76, '1970-10-31 14:22:40');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (77, 1, 77, '2016-11-08 07:36:47');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (78, 2, 78, '1990-11-24 08:48:15');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (79, 1, 79, '1976-11-17 20:04:10');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (80, 2, 80, '1993-10-18 22:11:48');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (81, 1, 81, '1970-11-22 05:00:53');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (82, 2, 82, '2011-08-01 18:44:34');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (83, 1, 83, '2004-10-07 22:03:48');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (84, 2, 84, '2004-03-03 16:05:12');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (85, 1, 85, '1972-03-29 03:24:39');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (86, 2, 86, '2018-09-28 09:01:34');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (87, 1, 87, '1988-08-05 18:32:46');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (88, 2, 88, '1991-08-03 21:09:40');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (89, 1, 89, '1970-12-08 21:49:42');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (90, 2, 90, '1973-10-07 16:32:35');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (91, 1, 91, '2007-05-22 18:34:57');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (92, 2, 92, '1989-12-14 09:33:35');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (93, 1, 93, '2003-05-31 01:35:46');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (94, 2, 94, '1975-10-31 03:01:27');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (95, 1, 95, '2002-10-24 07:38:09');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (96, 2, 96, '1986-02-02 02:49:42');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (97, 1, 97, '2016-05-26 22:20:52');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (98, 2, 98, '1998-07-26 06:25:26');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (99, 1, 99, '1998-02-26 11:31:43');
INSERT INTO `Granted` (`user_id`, `award_id`, `employee_id`, `grant_date`) VALUES (100, 2, 100, '1981-09-21 10:38:49');


#
# TABLE STRUCTURE FOR: Location
#

DROP TABLE IF EXISTS `Location`;

CREATE TABLE `Location` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(2) COLLATE utf8_unicode_ci NOT NULL,
  `zip` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `state` (`state`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `Location` (`id`, `city`, `state`, `zip`) VALUES (1, 'Olsonland', 'Ne', '36146-2953');
INSERT INTO `Location` (`id`, `city`, `state`, `zip`) VALUES (2, 'East Carolineshire', 'Id', '36310');


#
# TABLE STRUCTURE FOR: User
#

DROP TABLE IF EXISTS `User`;

CREATE TABLE `User` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `signature` longblob DEFAULT NULL,
  `permission` int(1) NOT NULL,
  `employee_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `User_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `Employee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (1, 'ursula25', '3e7b9317881863d7103def8bb083de', '2018-05-12 07:38:03', NULL, 0, 1);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (2, 'dane.mosciski', '3359c119a181932c9c3e46e12aee85', '1978-07-25 01:01:55', NULL, 1, 2);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (3, 'domenick.kohler', '77fdab7a72ffffe817327e8816a045', '2015-05-31 10:06:26', NULL, 0, 3);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (4, 'garrison01', 'dd1896704aa0b643300982fc1cc1ea', '2019-01-22 15:56:45', NULL, 1, 4);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (5, 'lexus.o\'conner', '0ba7ac73fb871f94d655d12bfecccf', '2002-08-22 09:17:31', NULL, 0, 5);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (6, 'destini.mitchell', '9dc308f4a6c5bdf96752c50d99e02a', '1978-02-18 20:12:24', NULL, 1, 6);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (7, 'akeem.ratke', '5906c438c21068ef7b27601f1fccf3', '2000-06-08 22:43:58', NULL, 0, 7);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (8, 'joannie.wiegand', 'e967c2d66fe23b74211984cd8ede56', '1980-11-27 14:27:43', NULL, 0, 8);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (9, 'torphy.neal', 'fe99b3fa0fa14958da738e9bf784f0', '1987-07-01 18:27:30', NULL, 0, 9);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (10, 'ebba.nolan', 'acf7538ce10d0bf5a9a2759d2f17c7', '1971-06-22 21:58:24', NULL, 0, 10);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (11, 'tremaine14', 'ad9f839f9ca128abcb7421e3cc8d9f', '2009-04-22 17:44:08', NULL, 0, 11);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (12, 'armstrong.dana', 'b829bc38420bf2cb1166d310bcf4a2', '2016-05-04 03:01:16', NULL, 1, 12);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (13, 'szboncak', '09392bd21e5407b339af3db0ac77d7', '1993-09-18 13:07:36', NULL, 0, 13);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (14, 'freddy12', '95c62a2a1fac97a68d9dbf80f5da35', '2017-08-06 14:41:00', NULL, 1, 14);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (15, 'lshanahan', '92e86bb6e8d59152737b35537b46ed', '1986-10-24 15:19:00', NULL, 1, 15);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (16, 'walker.hudson', '75df169b437b7b719a66057685cd7d', '1987-03-19 06:14:31', NULL, 1, 16);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (17, 'augusta71', 'e332a2f724557c7f86828c3699fd49', '1998-02-28 12:09:19', NULL, 0, 17);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (18, 'arch.rosenbaum', '60c86c302fbd44dac5043f6eeea767', '2007-06-15 05:45:45', NULL, 1, 18);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (19, 'pete.corwin', 'daec5106ced6c4ef5efa8f2a9af44c', '1994-06-14 12:29:58', NULL, 0, 19);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (20, 'davin.fahey', 'ad9103f91f11c3855a43cc559e0011', '1974-02-19 04:00:57', NULL, 0, 20);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (21, 'roel.thompson', 'bbfe558951df0a6266ca08e12a52f0', '1999-10-05 13:53:32', NULL, 1, 21);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (22, 'borer.dominic', '8d191f43616869e4c873a26b812550', '1994-06-15 15:29:21', NULL, 0, 22);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (23, 'ottilie.wiegand', '8c4d2456c1ae7886de22a4154fa79d', '1970-06-03 14:34:27', NULL, 1, 23);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (24, 'crawford.morissette', '32367bf7e234627122cb97c5d276e7', '1990-03-18 15:43:56', NULL, 0, 24);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (25, 'misael.boyer', '4f1eb605d473cd206b993a1ae9f8e4', '2001-10-07 09:57:28', NULL, 1, 25);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (26, 'lskiles', '98e4a1ff28eac0ed8c7475d4e7458f', '2006-09-06 03:39:18', NULL, 1, 26);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (27, 'johns.rashad', '138608e2d0ab6dfd0b96429378873e', '1979-08-30 14:13:57', NULL, 1, 27);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (28, 'wsmith', '8d5a0929c4de0a25312038cf5381b4', '1977-12-17 03:59:06', NULL, 1, 28);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (29, 'lukas.ernser', '74cf4cb4fd1b76b823f648593b9681', '1975-11-26 23:22:12', NULL, 0, 29);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (30, 'nkohler', '6fb159b27f7e8a6d6c558758d9c045', '1991-04-05 09:58:57', NULL, 0, 30);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (31, 'catalina.ebert', '604c29f00e6dff70c56ddf345168eb', '1980-01-11 19:10:54', NULL, 1, 31);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (32, 'zlabadie', 'e1f3c3689f601fafc81c910827fdc3', '2010-02-25 20:29:59', NULL, 1, 32);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (33, 'dusty.gulgowski', 'c696abcd4d4c6f91c816799fb18739', '2010-03-01 22:40:11', NULL, 1, 33);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (34, 'hagenes.tate', 'e19556c2f248e1d75b142799cc1f60', '1990-10-21 10:39:59', NULL, 1, 34);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (35, 'qwehner', 'a4a84ddfb9f7801e2e7969fcea9e1c', '1987-03-20 13:17:32', NULL, 1, 35);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (36, 'sylvan59', '7c664d40e9faf40523e2c9bcf4bc6d', '1990-02-12 05:59:59', NULL, 1, 36);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (37, 'uhansen', '3f93b219c27c4b36187428168d0046', '2006-04-13 20:40:18', NULL, 1, 37);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (38, 'cschimmel', '579e4322fc7792e0b043e2640404be', '1992-07-02 15:25:06', NULL, 1, 38);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (39, 'archibald.gerlach', 'ebb9df8a30cafd6f7779351622f643', '2002-04-22 15:25:46', NULL, 0, 39);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (40, 'ramiro88', '8607a15b267bdb087d3215d49b01c6', '1971-05-03 09:15:52', NULL, 1, 40);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (41, 'lwindler', '73c969d7f8af34772088b1f037fcbe', '1992-03-09 02:12:05', NULL, 0, 41);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (42, 'itzel84', '9546e4988c003114d58f0d1bcfb5ea', '2013-08-23 13:48:17', NULL, 1, 42);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (43, 'hermann.otis', '83b933f61f8e39f2cbc961040ba515', '2001-03-15 02:26:52', NULL, 0, 43);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (44, 'janis.hilpert', '7b5bfc8e3c489946c3220b3ca2eee1', '2015-11-19 04:11:18', NULL, 0, 44);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (45, 'lkoelpin', 'd154cc257c3065cf9a4bb011909ede', '1979-01-07 16:07:09', NULL, 0, 45);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (46, 'jovani.purdy', '396c591eb09d29410b58f69c72b7eb', '1992-07-03 16:15:32', NULL, 0, 46);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (47, 'crist.meaghan', 'a980864b8c46d797c27ae90ba5fd1e', '1975-06-17 01:29:27', NULL, 1, 47);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (48, 'xconnelly', '0f10889dc7245660d6e8f8458b0222', '2003-09-12 16:05:10', NULL, 1, 48);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (49, 'yesenia93', '2f8bab0daa63e563f013f581ca5754', '1979-05-20 01:39:11', NULL, 0, 49);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (50, 'eoberbrunner', '360844b8b2dc0dd08c5a08bba9dedb', '1971-05-13 22:38:41', NULL, 0, 50);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (51, 'lurline19', '5dd838d493a75f3f7edd06fefe6b79', '1979-02-04 06:55:51', NULL, 0, 51);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (52, 'eldred11', 'd9a85ccd48a3682ddb4ea5a56c6976', '2000-09-18 23:50:58', NULL, 0, 52);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (53, 'rolfson.cassidy', '569ff3b9f85213a0097fb23ec161ce', '1971-11-04 13:44:27', NULL, 0, 53);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (54, 'nikolaus.isabella', 'f2bf9b031c449e3e4d621711cb40c1', '1972-08-23 23:21:12', NULL, 1, 54);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (55, 'shanna.ledner', '67f1228a41f168ca9eededfbd06eac', '1989-06-01 13:09:07', NULL, 1, 55);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (56, 'gleichner.golda', '375755702cc2c21f0485655e729047', '1984-02-01 03:58:08', NULL, 0, 56);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (57, 'ward.wilber', 'bd8f8ccf8ced59f581f5a1190551c6', '2004-01-11 10:06:53', NULL, 0, 57);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (58, 'ondricka.tavares', '632b2df8d65e8cc96cc5b5365b5b5d', '1986-03-09 00:13:11', NULL, 1, 58);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (59, 'shaun.kling', 'b617e1b443122fcb44d2dafc4d4014', '1970-05-31 07:02:37', NULL, 0, 59);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (60, 'darmstrong', 'be5ae52283d9e179638d4bafb9b2ad', '2011-11-10 02:20:55', NULL, 0, 60);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (61, 'rutherford.lester', 'a6c0b7f9234fadb78bbfeef9497d10', '2015-02-17 16:12:31', NULL, 0, 61);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (62, 'floy31', '8767d7f8213bbe9bc82ca606ba641c', '2008-06-28 09:53:17', NULL, 0, 62);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (63, 'jana86', '4bb023cd665ee573d3df0efb978ec6', '1998-01-23 05:12:42', NULL, 0, 63);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (64, 'fay.kobe', '06aed67f1afc3f3046cd2d6e808e39', '2014-05-23 18:09:12', NULL, 0, 64);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (65, 'kiley.schamberger', '052c26e36163a00c25517950c5648b', '2013-10-04 02:00:51', NULL, 0, 65);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (66, 'llittle', '11f1bfc324f18117c70a934f5b96af', '2000-12-01 09:49:21', NULL, 1, 66);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (67, 'kayley.ruecker', 'e534a6fcc0bfd365253fdec41e0e90', '1978-04-14 11:00:49', NULL, 1, 67);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (68, 'urunte', '4bc2cbe7e7fde20cd7147c33627088', '2014-11-19 01:01:34', NULL, 1, 68);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (69, 'bode.lewis', 'db0a47c8117f668f469a5305c0428c', '1994-10-24 00:18:27', NULL, 0, 69);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (70, 'ian.boyle', '1b309d17b5f98831a0d2401a2eac27', '1996-07-15 21:10:26', NULL, 0, 70);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (71, 'verdman', '04faf6ff2fc715a0a7bd43b2740862', '1989-08-20 09:11:48', NULL, 1, 71);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (72, 'cortez85', '0a3bb2aabdcdb99e3aba3a0ad13f2b', '1977-01-30 06:23:10', NULL, 1, 72);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (73, 'trycia76', 'eaf5fec9d66cda23edeb6979cc9047', '1977-08-07 23:09:44', NULL, 0, 73);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (74, 'haley.stephanie', '117063bc02c133468397593bf78735', '2014-08-04 00:37:34', NULL, 1, 74);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (75, 'swift.clementina', '509ac4c9cbb631e0c3f412dfb10a22', '1975-08-30 04:54:22', NULL, 0, 75);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (76, 'leffler.jeremy', 'bc5c1f283cfdbbecae41d79da66ade', '2007-09-06 12:40:05', NULL, 0, 76);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (77, 'collier.alanna', '919e3bea0542dc895565475e5ec801', '1972-07-15 12:59:22', NULL, 1, 77);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (78, 'tobin79', '46a986cb59b7072a3b8e47d32b5a8f', '2011-11-16 09:34:02', NULL, 1, 78);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (79, 'kattie.kuvalis', '0963524aea7bb4954d571d3548c301', '1996-01-20 11:25:43', NULL, 0, 79);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (80, 'cortney16', '528930168f61f2b823154946491e9d', '2014-11-09 09:19:18', NULL, 0, 80);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (81, 'kenna20', 'ae63a2bbe70ae07d0fe1f4629bb635', '1996-02-15 17:44:30', NULL, 0, 81);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (82, 'keeling.piper', '15759a0611cdc6de49221fedbf2b1e', '2007-11-28 20:15:41', NULL, 0, 82);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (83, 'schroeder.cielo', '7b9a86848434893be14cf8343a20aa', '1995-10-17 03:58:19', NULL, 0, 83);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (84, 'danyka98', 'c157cf36228d8ebd651e3f27af3d59', '1990-11-05 05:54:06', NULL, 0, 84);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (85, 'parker.colt', '344a895dd20bb184abdcb80ac95edf', '1984-05-09 21:57:31', NULL, 1, 85);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (86, 'msporer', 'c228b841629f1e828d0c8dd23c518a', '2012-12-07 05:27:23', NULL, 1, 86);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (87, 'gerda.pacocha', '9e2c9ce2d8739ba2673637e27cc618', '1995-08-04 20:36:07', NULL, 0, 87);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (88, 'lucie.grady', 'a1f59eb6a09ec186c792757ae91ca4', '1989-09-14 03:37:02', NULL, 0, 88);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (89, 'kessler.gia', '3ae7a85b0372ed37c83c24de20b901', '1992-04-04 09:24:55', NULL, 1, 89);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (90, 'zswift', 'fdb90d549b38c271f7da04fafba922', '2013-11-25 08:52:06', NULL, 0, 90);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (91, 'holden.turcotte', '1a6c2354c5c06e70913ee0b0fe9d09', '2018-12-30 03:22:59', NULL, 0, 91);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (92, 'kautzer.grayson', '1e2f886e594755e0317cd6337e9574', '2001-10-04 14:07:16', NULL, 0, 92);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (93, 'brycen65', 'bba66361a7f1249615509d8d1ab0a1', '1977-05-26 06:04:35', NULL, 0, 93);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (94, 'grace.wilderman', 'd08049d43b14daa2785ee1e47235d5', '2018-11-09 03:01:41', NULL, 0, 94);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (95, 'caroline56', '5dda0cbd7c7782ad9e1de9995e86e3', '2002-09-13 07:06:09', NULL, 1, 95);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (96, 'drake.abshire', 'c89812a54860550c16546c48f49df8', '1984-09-28 04:26:34', NULL, 0, 96);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (97, 'josefa08', '4640027f5cbeb7ac9eb940630c6f31', '2000-02-06 13:19:45', NULL, 0, 97);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (98, 'ulind', '3c9149c58eb730cc2056a6817ae2de', '1991-07-12 14:56:14', NULL, 1, 98);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (99, 'laurel36', '265a69f6d61e3cced11c428c8013ea', '2018-06-24 12:54:29', NULL, 1, 99);
INSERT INTO `User` (`id`, `username`, `password`, `date_created`, `signature`, `permission`, `employee_id`) VALUES (100, 'pgoodwin', '98d572d78be0dc20633935fbbd1eae', '1997-06-23 11:53:34', NULL, 1, 100);



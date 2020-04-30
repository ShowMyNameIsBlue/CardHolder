CREATE TABLE IF NOT EXISTS  `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `area` TEXT NOT NULL,
  `type` varchar(100),
  `desc`  TEXT NOT NULL,
   `userId` int(11) NOT NULL,
   `imgPath` varchar(200),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
CREATE TABLE IF NOT EXISTS  `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `gender` longtext NOT NULL,
  `birthday` int(10) DEFAULT 0,
  `area`  varchar(100) NOT NULL,
  `cardInfo` TEXT NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
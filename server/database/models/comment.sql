CREATE TABLE IF NOT EXISTS  `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `commentInfo` TEXT NOT NULL,
  `shopId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
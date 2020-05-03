CREATE TABLE IF NOT EXISTS  `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `couponId` int(11) NOT NULL,
  `shopId` int(11) NOT NUll,
  `start` datetime NOT NULL,
  `end` datetime NOT NUll,
  `desc` TEXT,
  `usecount` varchar(100) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
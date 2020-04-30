CREATE TABLE IF NOT EXISTS  `coupon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `number` varchar(100),
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `count` int(22) NOT NULL,
  `imgPath` varchar(100),
  `type` int(10) NOT NULL DEFAULT 0,
  `shopId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
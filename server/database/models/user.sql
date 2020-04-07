CREATE TABLE IF NOT EXISTS  `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `role` int(10) DEFAULT 0,
  `code` varchar(50) NOT NULL,
  `uid` varchar(50), /* 识别码 */
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  INDEX `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.42-0ubuntu0.24.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.11.0.7065
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for hidden_gems
CREATE DATABASE IF NOT EXISTS `hidden_gems` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hidden_gems`;

-- Dumping structure for table hidden_gems.categories
CREATE TABLE IF NOT EXISTS `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table hidden_gems.categories: ~9 rows (approximately)
INSERT INTO `categories` (`category_id`, `name`) VALUES
	(1, 'Nature'),
	(2, 'Food'),
	(3, 'Adventure'),
	(4, 'Culture'),
	(5, 'Beach'),
	(6, 'Hiking'),
	(7, 'Historical'),
	(8, 'Shopping'),
	(9, 'Wildlife');

-- Dumping structure for table hidden_gems.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table hidden_gems.comments: ~0 rows (approximately)
INSERT INTO `comments` (`comment_id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
	(1, 12, NULL, 'hello', '2025-08-03 15:03:05'),
	(2, 12, NULL, 'hello', '2025-08-03 15:03:11'),
	(3, 12, NULL, 'hello', '2025-08-03 15:03:47');

-- Dumping structure for table hidden_gems.likes
CREATE TABLE IF NOT EXISTS `likes` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `user_id` (`user_id`,`post_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table hidden_gems.likes: ~1 rows (approximately)
INSERT INTO `likes` (`like_id`, `user_id`, `post_id`, `created_at`) VALUES
	(6, 2, 12, '2025-08-03 15:09:03');

-- Dumping structure for table hidden_gems.posts
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `location` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `category` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `budget` decimal(10,2) DEFAULT NULL,
  `itinerary` text COLLATE utf8mb4_general_ci,
  `image` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table hidden_gems.posts: ~6 rows (approximately)
INSERT INTO `posts` (`id`, `user_id`, `title`, `location`, `category`, `budget`, `itinerary`, `image`, `created_at`) VALUES
	(6, 1, 'Sunrise Kayaking at Vembanad Lake', 'Kumarakom, Kerala, India', 'Nature', 45.00, 'Start early at 5:30 AM with a local guide. Paddle through peaceful backwaters, spot exotic birds and fishermen casting nets. Wrap up with chai and homemade breakfast at a lakeside hut.', 'kayak.jpg', '2025-07-26 13:33:00'),
	(7, 1, 'Hidden Sushi Alley in Osaka', 'Osaka, Japan', 'Food', 30.00, 'Found in an alley behind Dotonbori. No menu. Sit at the counter and trust the chef. 6 courses including uni, toro, and matcha ice cream. Locals only and cash-only.', 'sushi.jpg', '2025-07-26 13:33:00'),
	(8, 1, 'The Forgotten Fortress of Kalavantin', 'Panvel, Maharashtra, India', 'Adventure', 10.00, 'Hike 3 hours from Thakurwadi village. Steep rock-cut steps lead to a 500m peak with breathtaking views. Zero crowd if started early. Bring your own water and snacks.', 'kalavantin.jpg', '2025-07-26 13:33:00'),
	(9, 1, 'Abandoned Soviet Bunker Tour', 'Tallinn, Estonia', 'Culture', 60.00, 'A local guide takes you underground into a Cold War-era bunker outside Tallinn. Hear stories of surveillance and Soviet history. Bring a flashlight and wear boots.', 'bunker.jpg', '2025-07-26 13:33:00'),
	(12, 2, 'hi', 'location', 'Adventure', 10.00, 'hello', '1754233030459-60111.jpg', '2025-08-03 14:57:10');

-- Dumping structure for table hidden_gems.post_categories
CREATE TABLE IF NOT EXISTS `post_categories` (
  `post_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`post_id`,`category_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `post_categories_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `post_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table hidden_gems.post_categories: ~0 rows (approximately)

-- Dumping structure for table hidden_gems.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table hidden_gems.users: ~0 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
	(1, 'rahul', 'rahul@gmail.com', '$2b$10$ZSVs7UQGznE7EzzK4PTTueoQoE.1yTSL4zlsfZw9FdxgWAKxMdB8O', '2025-07-26 13:30:24'),
	(2, 'rahul1', 'rahul1@gmail.com', '$2b$10$7z0tuIDDohkjyiCi/5PgeOHz1KuMG2uuGzBzICsB24klmafnQuAW2', '2025-08-03 14:42:50');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

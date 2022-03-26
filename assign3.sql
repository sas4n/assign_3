-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: movies_database
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `available_format`
--

DROP TABLE IF EXISTS `available_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `available_format` (
  `movie_id` int NOT NULL,
  `format_name` varchar(20) NOT NULL,
  PRIMARY KEY (`movie_id`,`format_name`),
  KEY `format_name` (`format_name`),
  CONSTRAINT `available_format_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`),
  CONSTRAINT `available_format_ibfk_2` FOREIGN KEY (`format_name`) REFERENCES `movie_format` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `available_format`
--

LOCK TABLES `available_format` WRITE;
/*!40000 ALTER TABLE `available_format` DISABLE KEYS */;
INSERT INTO `available_format` VALUES (1,'AVI'),(3,'AVI'),(4,'AVI'),(6,'AVI'),(8,'AVI'),(12,'AVI'),(15,'AVI'),(17,'AVI'),(18,'AVI'),(22,'AVI'),(24,'AVI'),(1,'FLV'),(3,'FLV'),(5,'FLV'),(7,'FLV'),(9,'FLV'),(14,'FLV'),(15,'FLV'),(18,'FLV'),(19,'FLV'),(23,'FLV'),(25,'FLV'),(2,'MPEG_4'),(3,'MPEG_4'),(4,'MPEG_4'),(6,'MPEG_4'),(8,'MPEG_4'),(11,'MPEG_4'),(12,'MPEG_4'),(15,'MPEG_4'),(17,'MPEG_4'),(21,'MPEG_4'),(22,'MPEG_4'),(24,'MPEG_4'),(2,'RMVB'),(6,'RMVB'),(7,'RMVB'),(10,'RMVB'),(17,'RMVB'),(18,'RMVB'),(20,'RMVB'),(2,'WMP'),(3,'WMP'),(5,'WMP'),(7,'WMP'),(10,'WMP'),(13,'WMP'),(16,'WMP'),(18,'WMP'),(19,'WMP'),(22,'WMP');
/*!40000 ALTER TABLE `available_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `borrowing_schedule`
--

DROP TABLE IF EXISTS `borrowing_schedule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowing_schedule` (
  `borrower_person_nr` int NOT NULL,
  `movie_id` int NOT NULL,
  `date_borrowed` date DEFAULT NULL,
  `date_returned` date DEFAULT NULL,
  PRIMARY KEY (`borrower_person_nr`,`movie_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `borrowing_schedule_ibfk_1` FOREIGN KEY (`borrower_person_nr`) REFERENCES `user` (`person_nr`),
  CONSTRAINT `borrowing_schedule_ibfk_2` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowing_schedule`
--

LOCK TABLES `borrowing_schedule` WRITE;
/*!40000 ALTER TABLE `borrowing_schedule` DISABLE KEYS */;
INSERT INTO `borrowing_schedule` VALUES (12345,1,'2021-01-12','2021-01-20'),(12345,4,'2021-10-02','2021-11-22'),(12345,5,'2021-06-26','2021-07-14'),(12345,7,'2021-03-14','2021-04-22'),(12345,10,'2021-10-22','2021-10-30'),(12345,11,'2021-08-12','2021-08-18'),(12345,13,'2021-07-28','2021-07-29'),(12345,14,'2022-02-16','2022-02-26'),(12345,17,'2021-12-06','2021-12-14'),(12345,18,'2021-04-02','2021-04-20'),(12356,1,'2022-02-22','2022-02-28'),(12356,3,'2022-01-12','2022-01-20'),(12356,4,'2021-11-06','2021-11-10'),(12356,5,'2021-12-16','2021-12-22'),(12356,6,'2021-02-24','0000-00-00'),(12356,9,'2021-10-16','2021-10-26'),(12356,11,'2021-06-30','2021-07-20'),(12356,12,'2021-03-23','2021-03-31'),(12356,13,'2021-11-18','2021-11-24'),(12356,15,'2021-04-22','2021-04-28'),(12356,17,'2021-07-22','2021-07-28'),(12356,18,'2021-06-10','2021-06-18'),(12356,19,'2021-07-30','2021-08-10'),(12356,22,'2021-09-22','2021-12-20'),(23456,3,'2021-08-22','2021-10-20'),(23456,8,'2021-06-22','2021-06-28'),(23456,14,'2021-07-18','2021-07-24'),(23456,19,'2021-05-18','2021-05-22'),(56789,1,'2021-05-22','2021-05-23'),(56789,2,'2021-12-12','2021-12-20'),(56789,4,'2021-08-18','2021-08-22'),(56789,6,'2021-07-02',NULL),(56789,8,'2021-03-12','2021-03-20'),(56789,12,'2021-11-19','2021-11-23'),(56789,14,'2022-01-18','2022-01-26'),(56789,16,'2021-10-28','2021-11-10'),(56789,21,'2021-09-28','2021-10-24'),(56789,23,'2021-06-12','2021-06-20'),(56789,24,'2021-04-15','2021-04-22'),(67890,2,'2021-08-28','2021-08-30'),(67890,7,'2021-10-12',NULL),(67890,9,'2021-03-18','2021-03-28'),(67890,10,'2021-07-12','2021-07-20'),(67890,12,'2021-05-26','2021-05-27'),(67890,19,'2022-02-02','2022-02-10'),(67890,20,'2021-06-18','2021-06-23'),(67890,22,'2021-05-20','2021-06-20'),(67890,25,'2021-02-12','2021-02-18'),(78956,2,'2021-02-18','2021-02-20'),(78956,5,'2021-09-02','2021-09-20'),(78956,6,'2021-11-12','2021-11-20'),(78956,12,'2021-12-26','2022-02-20'),(78956,13,'2021-09-18','2021-09-24'),(78956,16,'2021-05-12','2021-05-20'),(78956,17,'2021-06-02','2021-06-10');
/*!40000 ALTER TABLE `borrowing_schedule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `director` varchar(40) DEFAULT NULL,
  `owner_person_nr` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`owner_person_nr`),
  KEY `owner_person_nr` (`owner_person_nr`),
  CONSTRAINT `movie_ibfk_1` FOREIGN KEY (`owner_person_nr`) REFERENCES `user` (`person_nr`)
) ENGINE=InnoDB AUTO_INCREMENT=1026 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'Life Is Beautiful','Roberto Benigni',12345),(2,'City Of God','Fernando Meirelles',67890),(3,'Saving Private Ryan','Steven Spielberg',12356),(4,'The Silence Of The Lambs',' Jonathan Demme',56789),(5,'It\'s A Wonderful Life','Frank Capra',12356),(6,'Se7en','David Fincher',12345),(7,'Seven Samurai','Akira Kurosawa',56789),(8,'One Flew Over The Cuckoos Nest','Miloš Forman',67890),(9,'Goodfellas','Martin Scorsese',78956),(10,'The Matrix','Wachowskis',12356),(11,'Star Wars: Episode V','Irvin Kershne',67890),(12,'The Lord Of The Rings: The Two Towers','Peter Jackson',78956),(13,'Inception','Christopher Nolan',23456),(14,'Forrest Gump',' Robert Zemeckis',12356),(15,'Fight Club','David Fincher',56789),(16,'The Lord Of The Rings: The Fellowship Of The Rings','Peter Jackson',67890),(17,'The Good, The Bad And The Ugly','Sergio Leone',12345),(18,'Pulp Fiction','Quentin Tarantino',23456),(19,'The Lord Of The Rings: The Return Of The King','Peter Jackson',67890),(20,'Schindler\'s List','Steven Spielberg',12356),(21,'12 Angry Men','Sidney Lumet',67890),(22,'The Dark Knight','Christopher Nolan',12345),(23,'The Godfather: Part II','Francis Ford Coppola',56789),(24,'The Godfather','Francis Ford Coppola',12345),(25,'The Shawshank Redemption','Frank Darabont',12356);
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_format`
--

DROP TABLE IF EXISTS `movie_format`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movie_format` (
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_format`
--

LOCK TABLES `movie_format` WRITE;
/*!40000 ALTER TABLE `movie_format` DISABLE KEYS */;
INSERT INTO `movie_format` VALUES ('AVI'),('FLV'),('MPEG_4'),('RMVB'),('WMP');
/*!40000 ALTER TABLE `movie_format` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `number_each_movie_borrowed`
--

DROP TABLE IF EXISTS `number_each_movie_borrowed`;
/*!50001 DROP VIEW IF EXISTS `number_each_movie_borrowed`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `number_each_movie_borrowed` AS SELECT 
 1 AS `name`,
 1 AS `number_borrowed`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `person_nr` int NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  PRIMARY KEY (`person_nr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (12345,'Sasan','Pormah'),(12356,'Sogol','Pormah'),(23456,'Martin','larsson'),(56789,'Maxim','Markov'),(67890,'Elinor','Johansson'),(78956,'Sanel','Topic');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `number_each_movie_borrowed`
--

/*!50001 DROP VIEW IF EXISTS `number_each_movie_borrowed`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `number_each_movie_borrowed` AS select `movie`.`name` AS `name`,count(`movie`.`name`) AS `number_borrowed` from (`movie` join `borrowing_schedule` on((`movie`.`id` = `borrowing_schedule`.`movie_id`))) group by `movie`.`name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-26 19:59:15

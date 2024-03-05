-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema electrogroup
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema electrogroup
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `electrogroup` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `electrogroup` ;

-- -----------------------------------------------------
-- Table `electrogroup`.`rols`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`rols` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `genre` VARCHAR(255) NULL DEFAULT NULL,
  `rol_id` INT NULL DEFAULT NULL,
  `avatar` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `rol_id` (`rol_id` ASC) VISIBLE,
  CONSTRAINT `users_ibfk_1`
    FOREIGN KEY (`rol_id`)
    REFERENCES `electrogroup`.`rols` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`adresses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`adresses` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `number` INT NULL DEFAULT NULL,
  `city` VARCHAR(255) NULL DEFAULT NULL,
  `country` VARCHAR(255) NULL DEFAULT NULL,
  `zip_code` INT NULL DEFAULT NULL,
  `apart_number` INT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `adresses_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `electrogroup`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`brands`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`brands` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`descriptions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`descriptions` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(255) NOT NULL,
  `precio` INT NULL DEFAULT NULL,
  `brand_id` INT NULL DEFAULT NULL,
  `description_id` INT NULL DEFAULT NULL,
  `images` VARCHAR(255) NOT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `brand_id` (`brand_id` ASC) VISIBLE,
  INDEX `description_id` (`description_id` ASC) VISIBLE,
  CONSTRAINT `products_ibfk_1`
    FOREIGN KEY (`brand_id`)
    REFERENCES `electrogroup`.`brands` (`id`),
  CONSTRAINT `products_ibfk_2`
    FOREIGN KEY (`description_id`)
    REFERENCES `electrogroup`.`descriptions` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`carts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `shipping` VARCHAR(255) NULL DEFAULT NULL,
  `payment_method` VARCHAR(255) NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `carts_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `electrogroup`.`users` (`id`),
  CONSTRAINT `carts_ibfk_2`
    FOREIGN KEY (`product_id`)
    REFERENCES `electrogroup`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`contacts`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`contacts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `phone` INT NULL DEFAULT NULL,
  `user_id` INT NULL DEFAULT NULL,
  `opcional_number` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  CONSTRAINT `contacts_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `electrogroup`.`users` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL DEFAULT NULL,
  `path` VARCHAR(255) NULL DEFAULT NULL,
  `product_id` INT NULL DEFAULT NULL,
  `createdAt` DATETIME NOT NULL,
  `updatedAt` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `images_ibfk_1`
    FOREIGN KEY (`product_id`)
    REFERENCES `electrogroup`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `electrogroup`.`sequelizemeta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `electrogroup`.`sequelizemeta` (
  `name` VARCHAR(255) COLLATE 'utf8mb3_unicode_ci' NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE INDEX `name` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

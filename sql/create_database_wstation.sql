DROP DATABASE IF EXISTS w_station;

CREATE DATABASE w_station;

USE w_station;

CREATE TABLE temperature (id INT PRIMARY KEY AUTO_INCREMENT, temperature FLOAT NOT NULL, date TIMESTAMP NOT NULL) ENGINE=InnoDB;

CREATE TABLE preasure (id INT PRIMARY KEY AUTO_INCREMENT, preasure FLOAT NOT NULL, date TIMESTAMP NOT NULL) ENGINE=InnoDB;

CREATE TABLE humidity (id INT PRIMARY KEY AUTO_INCREMENT, humidity FLOAT NOT NULL, date TIMESTAMP NOT NULL) ENGINE=InnoDB;

--Es necesario cambiar la password del usuario. Este esta predefinido para pruebas.
CREATE USER 'arduino' IDENTIFIED BY '1234';

GRANT SELECT, INSERT, UPDATE ON `w_station`.* TO 'arduino'@'%';

FLUSH PRIVILEGES;
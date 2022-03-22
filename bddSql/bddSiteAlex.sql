CREATE SCHEMA portfolio;
USE portfolio;

/*countryId INTEGER NOT NULL,
KEY foreignKeyCountryId_user(countryId),
CONSTRAINT `foreignKeyCountry_user`
FOREIGN KEY (countryId) REFERENCES countries(countryId)
ON DELETE RESTRICT ON UPDATE CASCADE,*/

CREATE TABLE my_info(
    info_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR (4) UNIQUE,
    first_name VARCHAR(9) UNIQUE,
    description VARCHAR(250) UNIQUE,
    email VARCHAR(50) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE header_info(
    header_info_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    front_back VARCHAR(60) UNIQUE,
    work VARCHAR(100) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE about(
    about_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    about_first_paragraph VARCHAR(500) UNIQUE,
    about_second_paragraph VARCHAR(500) UNIQUE,
    about_third_paragraph VARCHAR(500) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE langages_frameworks(
    langages_frameworks_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    langages_frameworks_name VARCHAR(25) UNIQUE,
    langages_frameworks_image_path VARCHAR(30) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE carousel_component_images(
    image_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    image_pathe VARCHAR(30) UNIQUE
)ENGINE=InnoDB;

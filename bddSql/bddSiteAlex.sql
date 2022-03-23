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
    description VARCHAR(300) UNIQUE,
    front_back VARCHAR(60) UNIQUE,
    work VARCHAR(100) UNIQUE,
    email VARCHAR(50) UNIQUE
)ENGINE=InnoDB;

/*CREATE TABLE header_info(
    header_info_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,

)ENGINE=InnoDB;*/

CREATE TABLE about(
    about_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    /*KEY foreignKey_user_info(info_id),
    CONSTRAINT `foreignKey_about_user_info`
    FOREIGN KEY (info_id) REFERENCES user_info(info_id)
    ON DELETE RESTRICT ON UPDATE CASCADE,*/
    about_paragraph VARCHAR(500) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE langages_frameworks(
    langages_frameworks_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    langages_frameworks_name VARCHAR(25) UNIQUE,
    langages_frameworks_image_path VARCHAR(100) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE carousel_component_images(
    image_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    image_path VARCHAR(100) UNIQUE
)ENGINE=InnoDB;

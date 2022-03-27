CREATE SCHEMA portfolio;
USE portfolio;

CREATE TABLE my_info(
    info_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR (4) UNIQUE,
    first_name VARCHAR(9) UNIQUE,
    description VARCHAR(300) UNIQUE,
    front_back VARCHAR(60) UNIQUE,
    work VARCHAR(100) UNIQUE,
    email VARCHAR(50) UNIQUE
)ENGINE=InnoDB;

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

CREATE TABLE my_project(
    project_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    project_name VARCHAR(50),
    project_path VARCHAR(100),
    project_langage_id INTEGER NOT NULL,
    KEY foreignKey_langage_id(project_langage_id),
    CONSTRAINT `foreignKey_project_langage`
    FOREIGN KEY (project_langage_id) REFERENCES langages_frameworks(langages_frameworks_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE my_component(
    component_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    component_name VARCHAR(50) UNIQUE,
    component_path VARCHAR(100),
    component_langage_id INTEGER NOT NULL,
    KEY foreignKey_langage_id(component_langage_id),
    CONSTRAINT `foreignKey_component_langage`
    FOREIGN KEY (component_langage_id) REFERENCES langages_frameworks(langages_frameworks_id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE carousel_component_images(
    image_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    image_path VARCHAR(100) UNIQUE
)ENGINE=InnoDB;

CREATE TABLE contact(
    contact_id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(20) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    message VARCHAR(5000) NOT NULL
)ENGINE=InnoDB;

USE portfolio;

INSERT INTO my_info (name, first_name, description, front_back, work, email)
VALUES  ("Sage", "Alexandre", "Développeur web et mobile junior je souhaite à terme devenir développeur full-stack spécialisé dans le développement de site web et d'applications mobile.", "Front-end & Back-end", "Développeur web et mobile", "alexandresage56@gmail.com");

INSERT INTO about (about_paragraph)
VALUES (" Terminant une formation de développeur Web et Mobile je suis à la recherche d'un poste de développeur Web et Mobile Junior pour parfaire mes compétences."),
(" Vous avez découvert au travers de ce site, les compétences que j’ai acquises lors de ma formation de développeur web et web mobile chez Digigtal Campus à Rennes. Lors des modules de cette formation j’ai étudié différents langages et les frameworks."),
("J’ai également acquis des compétences dans le développement d’applications mobiles via ReactNative."),
("Cette formation constitue pour moi une réelle opportunité de reconversion dans un secteur qui me passionne car il est en constante évolution. J’ai par exemple à titre personnel souscrit un abonnement au site Codecademy afin de compléter les connaissances acquises lors de ma formation.");

INSERT INTO langages_frameworks (langages_frameworks_name,langages_frameworks_image_path)
VALUES
("JavaScript","src/images/langages/javascript.svg"),
("NodeJs","src/images/langages/nodejs.svg"),
("ReactJs","src/images/langages/react.svg"),
("MariaDB/Sql","src/images/langages/mariadb.svg"),
("HTML","src/images/langages/html.svg"),
("Pug","src/images/langages/pug.svg"),
("Twig","src/images/langages/twig.png"),
("PHP","src/images/langages/php.svg"),
("Symfony","src/images/langages/symfony.svg"),
("CSS","src/images/langages/css.svg"),
("Sass","src/images/langages/sass.svg"),
("Python 3","src/images/langages/python.svg");

INSERT INTO my_project (project_name,project_path,project_langage_id)
VALUES
("Test Projet 1", "#", 1);


INSERT INTO my_component (component_name,component_path,component_langage_id)
VALUES
("image-carousel", "component/image-carousel", 3),
("shopping-cart", "component/shopping", 3);


INSERT INTO carousel_component_images (image_path)
VALUES
("src/images/carousel/esteiro.jpg"),
/*("src/images/carousel/esteiroxove.png"),*/
("src/images/carousel/general.jpg"),
("src/images/carousel/longa.jpg"),
("src/images/carousel/machacona.png"),
("src/images/carousel/photo.jpg"),
("src/images/carousel/report.jpg"),
("src/images/carousel/secretspot.jpg"),
("src/images/carousel/tube.jpg"),
("src/images/carousel/userprofildefaultpicture.jpg");

INSERT INTO shopping_cart_component (product_name,product_brand,product_description,product_price,product_image_path)
VALUES
("Faded 2.0","Chili ","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac nisi sit amet nisi tempus vestibulum. Vivamus blandit non enim nec ullamcorper. Cras a dolor vitae quam tincidunt consectetur ut id mi.  ", 850, "src/images/shopping/faded.jpg"),

("Houdini", "Fire Wire ","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac nisi sit amet nisi tempus vestibulum. Vivamus blandit non enim nec ullamcorper. Cras a dolor vitae quam tincidunt consectetur ut id mi.  ", 900, "src/images/shopping/houdini.jpg"),

("Go-Fish","Fire Wire","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac nisi sit amet nisi tempus vestibulum. Vivamus blandit non enim nec ullamcorper. Cras a dolor vitae quam tincidunt consectetur ut id mi.  ", 870, "src/images/shopping/go-fish.jpg"),

("7Seas","Vissla","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac nisi sit amet nisi tempus vestibulum. Vivamus blandit non enim nec ullamcorper. Cras a dolor vitae quam tincidunt consectetur ut id mi.  ", 350, "src/images/shopping/vissla.jpg"),

("Supreme (M)","Volte","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac nisi sit amet nisi tempus vestibulum. Vivamus blandit non enim nec ullamcorper. Cras a dolor vitae quam tincidunt consectetur ut id mi.  ", 370, "src/images/shopping/volte.jpg"),

("Supreme (W)","Volte","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac nisi sit amet nisi tempus vestibulum. Vivamus blandit non enim nec ullamcorper. Cras a dolor vitae quam tincidunt consectetur ut id mi.  ", 370, "src/images/shopping/volte-women.jpg");

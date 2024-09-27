CREATE TABLE IF NOT EXISTS `login_app` (
  id int AUTO_INCREMENT ,
  username varchar(45),
  hashed_password varchar(128),
  email varchar(100) DEFAULT NULL,
  first_name varchar(45),
  last_name varchar(45),
  phone BIGINT,
  UNIQUE KEY username_UNIQUE (username),
  UNIQUE KEY phone_UNIQUE (phone),
  PRIMARY KEY (id),
  INDEX (id),
  INDEX (first_name),
  INDEX (last_name),
  INDEX (email),
  INDEX (username)
);

CREATE TABLE IF NOT EXISTS `user_profile` (
    id int AUTO_INCREMENT,
    login_app_id INTEGER,
    owner_address VARCHAR (100),
    owner_city VARCHAR (30),
    owner_state VARCHAR (2),
    owner_zip INTEGER,
    dog_name VARCHAR (25),
    dog_age INTEGER (2),
    dog_breed VARCHAR (30),
    dog_gender VARCHAR (6),
    dog_color VARCHAR (30),
    dog_birthdate VARCHAR (5),
    dog_allergies VARCHAR (200),
    dog_weight INTEGER (3),
    dog_friendly BOOLEAN,
    amt_walks INTEGER (2),
    amt_meals INTEGER (2),
    amt_per_meal INTEGER (2),
    dog_potty_trained BOOLEAN,
    dog_fixed BOOLEAN,
    UNIQUE KEY login_id_UNIQUE (login_app_id),
    INDEX (id),
    FOREIGN KEY (login_app_id) REFERENCES login_app(id)
);

CREATE TABLE IF NOT EXISTS blogs (
  BlogId INT AUTO_INCREMENT PRIMARY KEY,
  Author VARCHAR(255),
  Title VARCHAR(255),
  Body VARCHAR(4000),
  Likes VARCHAR(255),
  Category VARCHAR(255),
  Comments VARCHAR(255),
  username VARCHAR (45),
   INDEX (username),
   INDEX (BlogId),
  FOREIGN KEY (username) REFERENCES login_app(username)
);

CREATE TABLE IF NOT EXISTS appointments (
	 appointment_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
     id INT,
     start_time VARCHAR(255) NOT NULL,
	 end_time VARCHAR(255),
	 start_date VARCHAR(255) NOT NULL,
	 end_date VARCHAR(255),	 
     description VARCHAR(255),
	 is_consultation TINYINT,
    is_confirmed TINYINT,
    is_rejected TINYINT,
     first_name VARCHAR(255),
     last_name VARCHAR(255),
     email VARCHAR(255),
     username VARCHAR(255),
    INDEX (id),
    -- INDEX (first_name),
    -- INDEX (last_name),
    -- INDEX (email),
    INDEX (username),
    FOREIGN KEY (id) REFERENCES login_app(id),
    -- FOREIGN KEY (first_name) REFERENCES login_app(first_name),
    -- FOREIGN KEY (last_name) REFERENCES login_app(last_name),
    -- FOREIGN KEY (email) REFERENCES login_app(email),
    FOREIGN KEY (username) REFERENCES login_app(username)
);

CREATE TABLE IF NOT EXISTS comments (
  CommentId INT AUTO_INCREMENT PRIMARY KEY,
  BlogId INT,
  Comment_Author VARCHAR(255),
  Comment_Body VARCHAR(4000),
  username VARCHAR (45),
  Comment_Date DATETIME,
   INDEX (username),
   INDEX (BlogId),
  FOREIGN KEY (username) REFERENCES login_app(username),
  FOREIGN KEY (BlogId) REFERENCES blogs(BlogId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS homepage (
  breedid int AUTO_INCREMENT PRIMARY Key,
  title VARCHAR(255),
  description VARCHAR(255),
  breed VARCHAR (255)
); 

CREATE TABLE IF NOT EXISTS images (
  ImageId INT AUTO_INCREMENT PRIMARY KEY,
  BlogId INT UNIQUE,
  Content_Type VARCHAR (255),
  Image_Data LONGBLOB,
  username VARCHAR (45),
   INDEX (username),
   INDEX (BlogId),
  FOREIGN KEY (username) REFERENCES login_app(username),
  FOREIGN KEY (BlogId) REFERENCES blogs(BlogId) ON DELETE CASCADE
);
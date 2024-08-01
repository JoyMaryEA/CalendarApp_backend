CREATE TABLE team (
  id INT auto_increment, 
  team VARCHAR (255),
  subteam VARCHAR(255) UNIQUE,
  seats INT DEFAULT (13),
  PRIMARY KEY  (id)
);

CREATE TABLE role (
  id INT auto_increment PRIMARY KEY,
  role VARCHAR(20)
);

CREATE TABLE user_info(
  u_id VARCHAR(255) PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  color VARCHAR(50),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role INT,
  team_id INT,
  FOREIGN KEY (team_id) REFERENCES team(id)
 );
  
CREATE TABLE office_days(
    id VARCHAR(255) NOT NULL,
    u_id VARCHAR(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (u_id) REFERENCES user_info(u_id)
);

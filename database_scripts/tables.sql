
CREATE TABLE user_info(
  u_id varchar(255) PRIMARY KEY,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  color varchar(50),
  email varchar(255) UNIQUE,
  password varchar(255));
  
CREATE TABLE user_days_off(
    period_id varchar(255) NOT NULL,
    u_id varchar(255) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    PRIMARY KEY (period_id),
    FOREIGN KEY (u_id) REFERENCES user_info(u_id));
 
  
  

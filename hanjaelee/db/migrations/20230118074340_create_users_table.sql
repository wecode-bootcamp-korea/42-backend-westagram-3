-- migrate:up
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  email varchar(200) NOT NULL,
  profile_image varchar(200) NULL,
  password varchar(200) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT users_id_pk PRIMARY KEY (id),
  CONSTRAINT users_name_uk UNIQUE (name),
  CONSTRAINT users_email_uk UNIQUE (email)
)

-- migrate:down
DROP TABLE users;

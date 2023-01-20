-- migrate:up
CREATE TABLE comments (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  CONSTRAINT comments_id_pkey PRIMARY KEY (id),
  CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT comments_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id)
)

-- migrate:down
DROP TABLE comments

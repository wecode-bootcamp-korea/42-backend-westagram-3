-- migrate:up
CREATE TABLE likes (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  post_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT likes_id_pkey PRIMARY KEY (id),
  CONSTRAINT likes_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id),
  CONSTRAINT likes_post_id_fkey FOREIGN KEY (post_id) REFERENCES posts(id),
  CONSTRAINT likes_user_id_post_id_ukey UNIQUE (user_id, post_id)
)

-- migrate:down
DROP TABLE likes

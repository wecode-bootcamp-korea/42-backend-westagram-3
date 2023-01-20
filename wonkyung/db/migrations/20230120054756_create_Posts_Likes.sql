-- migrate:up
CREATE TABLE Likes (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  user_id INT NOT NULL
  post_id INT NOT NULL
  CONSTRAINT Likes_Users_id_fkey FOREIGN KEY (Users_id) REFFERENCES Users(id)
  CONSTRAINT Likes_Posts_id_fkey FOREIGN KEY (Posts_id) REFFERENCES Posts(id)
)

-- migrate:down
DROP TABLE Likes;
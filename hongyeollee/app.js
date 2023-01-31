require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const { DataSource } = require("typeorm");

const mysqlDatabase = new DataSource({
  type: process.env.TYPEORM_CONNCETION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
});

mysqlDatabase
  .initialize()
  .then(() => {
    console.log("🆗🆗🆗DataSource has been initialize~🆗🆗🆗");
  })
  .catch((err) => {
    console.log("❌❌❌DataSource hasn't been initialize❌❌❌");
  });

app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

//health check
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

//과제 2.create user
app.post("/signup", async (req, res) => {
  const { name, password, profileImage, email } = req.body;

  await mysqlDatabase.query(
    `
    INSERT INTO users(
          name,
          password,
          profile_image,
          email
        )VALUES(?, ?, ?, ?);
        `,
    [name, password, profileImage, email]
  );
  res.status(201).json({ message: "userCreated 👫" });
});

//과제 3. create post
app.post("/post", async (req, res) => {
  const { title, content, imageUrl, userId } = req.body;

  await mysqlDatabase.query(
    `
    INSERT INTO posts(
          title,
          content,
          image_url,
          user_id
        )VALUES(?, ?, ?, ?);
        `,
    [title, content, imageUrl, userId]
  );
  res.status(201).json({ message: "postCreated 📝" });
});

//과제 4. search and get posts
app.get("/post", async (req, res) => {
  await mysqlDatabase.query(
    `
    SELECT
        u.id AS userId,
        u.profile_image AS userProfileImage,
        p.id AS postingId,
        p.image_url AS postingImageUrl,
        p.content AS postingContent
    FROM users u
    INNER JOIN posts p
    ON u.id=p.id`,
    (err, rows) => {
      res.status(200).json({ data: rows });
    }
  );
});

//과제 5. get post of targeting user
app.get("/post/user/:userId", async (req, res) => {
  const { userId } = req.params;

  const userOfPost = await mysqlDatabase.query(
    `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'postingId',p.id,
            'postingImageUrl', p.image_url,
            'postingContent', p.content)) AS postings
    FROM posts p
    INNER  JOIN users u
    ON p.user_id=u.id
    WHERE u.id=?
    GROUP BY u.id;
    `,
    [userId]
  );
  res.status(200).json({ data: userOfPost });
});

// 과제 6. update posting content
app.patch("/post", async (req, res) => {
  const { postContent, postId } = req.body;

  await mysqlDatabase.query(
    `UPDATE posts p
     SET
          p.content=?
          WHERE p.id=?
    `,
    [postContent, postId]
  );

  await mysqlDatabase.query(
    `SELECT
        u.id AS userId,
        u.name AS userName,
        p.id AS postingId,
        p.title AS postingTitle,
        p.content AS postingContent
    FROM users u
    INNER JOIN posts p
    ON u.id=p.id WHERE p.id=${postId};
    `,
    (err, rows) => {
      res.status(201).json({ data: rows });
    }
  );
});

// 과제 7. delete targeting post
app.delete("/post", async (req, res) => {
  const { postId } = req.body;

  await mysqlDatabase.query(
    `
    DELETE FROM
        posts
    WHERE posts.id=${postId}
    `,
    [postId]
  );
  res.status(200).json({ message: "postingDelete ␡" });
});

//과제 8. create likes
app.post("/likes", async (req, res) => {
  const { userId, postId } = req.body;

  await mysqlDatabase.query(
    `
    INSERT INTO likes(
        user_id,
        post_id
    ) VALUES(?,?);
    `,
    [userId, postId]
  );
  res.status(200).json({ message: "likeCreated 👍" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error("Failed server listening", err);
    throw err;
  }
};

start();

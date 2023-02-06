const mysqlDatabase = require("../models");

const createPosts = async (title, content, imageUrl, userId) => {
  try {
    return await mysqlDatabase.query(
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
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

const getPosts = async () => {
  try {
    return await mysqlDatabase.query(
      `
      SELECT
          u.id AS userId,
          u.profile_image AS userProfileImage,
          p.id AS postingId,
          p.image_url AS postingImageUrl,
          p.content AS postingContent
      FROM users u
      INNER JOIN posts p
      ON u.id=p.id`
    );
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

const postsOfUser = async (userId) => {
  try {
    return await mysqlDatabase.query(
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
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

const modifyPosts = async (postContent, postId) => {
  try {
    await mysqlDatabase.query(
      `UPDATE posts p
       SET
            p.content=?
            WHERE p.id=?
      `,
      [postContent, postId]
    );

    return await mysqlDatabase.query(
      `SELECT
          u.id AS userId,
          u.name AS userName,
          p.id AS postingId,
          p.title AS postingTitle,
          p.content AS postingContent
      FROM users u
      INNER JOIN posts p
      ON u.id=p.id WHERE p.id=${postId};
      `
    );
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

const deletePosts = async (postId) => {
  try {
    await mysqlDatabase.query(
      `
      DELETE FROM
          posts
      WHERE posts.id=${postId}
      `,
      [postId]
    );
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

module.exports = {
  createPosts,
  getPosts,
  postsOfUser,
  modifyPosts,
  deletePosts,
};

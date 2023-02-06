const mysqlDatabase = require("../models");

const createLike = async (userId, postId) => {
  try {
    return await mysqlDatabase.query(
      `
      INSERT INTO likes(
          user_id,
          post_id
      ) VALUES(?,?);
      `,
      [userId, postId]
    );
  } catch {
    const error = new Error("please_write_valid_data");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  createLike,
};

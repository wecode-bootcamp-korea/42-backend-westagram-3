const likeDao = require("../models/likeDao");

const like = async (userId, postId) => {
  const createLike = await likeDao.createLike(userId, postId);
  return createLike;
};

module.exports = {
  like,
};

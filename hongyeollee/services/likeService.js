const likeDao = require("../models/likeDao");

//create like
const like = async (userId, postId) => {
  const createLike = await likeDao.createLike(userId, postId);
  return createLike;
};

module.exports = {
  like,
};

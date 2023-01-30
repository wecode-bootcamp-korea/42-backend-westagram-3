const likeDao = require('../models/likeDao')

const postLike = async (userId, postId) => {
  const isLiked = likeDao.postLike(userId, postId)
  return isLiked
}

module.exports = {
  postLike
}
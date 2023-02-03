const { catchAsync } = require('../utils/error')
const { postLikeErr } = require('../utils/error/messages')
const likeService = require('../services/likeService')

const postLike = catchAsync(async (req, res) => {
  const { userId, postId } = req.params
  const isLiked = await likeService.postLike(userId, postId)
  if (!isLiked['affectedRows']) {
    throw new Error(postLikeErr.message)
  }
  return res.status(200).json({ message: 'postLiked.' })
})

module.exports = {
  postLike
}
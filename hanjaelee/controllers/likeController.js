const likeService = require('../services/likeService')

const postLike = async (req, res) => {
  try {
    const { userId, postId } = req.params
    const isLiked = await likeService.postLike(userId, postId)
    if (!isLiked['affectedRows']) {
      throw new Error('Failed to Like Post.')
    }
    return res.status(200).json({ message: 'postLiked.' })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = {
  postLike
}
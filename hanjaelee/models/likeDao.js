const database = require('./index')
const { postLikeErr } = require('../utils/error/likeErrMsg')

const postLike = async (userId, postId) => {
  try {
    const rawQuery = `
    INSERT INTO likes (
      user_id,
      post_id
    ) VALUES (?, ?);`

    const isLiked = await database.query(rawQuery, [userId, postId])
    return isLiked
  } catch (err) {
    err.message = postLikeErr.message
    throw err
  }
}

module.exports = {
  postLike
}

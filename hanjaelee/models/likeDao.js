const database = require('./index')

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
    console.error('Failed to like post !!!!!\n\n', err)
    throw err
  }
}

module.exports = {
  postLike
}

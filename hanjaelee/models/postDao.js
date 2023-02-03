const database = require('./index')
const { writePostErr,
  getPostErr,
  updatePostErr } = require('../utils/error/messages')

const writePost = async (title, content, imageURL, userId) => {
  try {
    const rawQuery = `
    INSERT INTO posts (
      title,
      content,
      image_url,
      user_id
    ) VALUES (?, ?, ?, ?);`

    const post = await database.query(rawQuery, [title, content, imageURL, userId])
    return post
  } catch (err) {
    err.message = writePostErr.message
    throw err
  }
}

const getPosts = async () => {
  try {
    const rawQuery = `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts AS p
    INNER JOIN users AS u
    ON p.user_id = u.id`
    const posts = await database.query(rawQuery)
    return posts
  } catch (err) {
    err.message = getPostErr.message
    throw err
  }
}
const getPostsByUserId = async (userId) => {
  try {
    const rawQuery = `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'postingId', p.id,
          'postingImageUrl', p.image_url,
          'postingContent', p.content)) AS postings
    FROM posts AS p
    INNER JOIN users AS u
    ON p.user_id = u.id WHERE u.id = ?
    GROUP BY u.id;`

    const [post] = await database.query(
      rawQuery, userId)
    return post
  } catch (err) {
    err.message = getPostErr.message
    throw err
  }
}

const modifyPostByUserIdAndPostId = async (userId, postId, postContent) => {
  try {
    let rawQuery = `
      UPDATE posts
      SET content = ?
      WHERE id = ? AND user_id = ?;`
    const rawData = await database.query(rawQuery, [postContent, postId, userId])

    if (rawData['affectedRows']) {
      rawQuery = `
      SELECT
        u.id AS userId,
        u.name AS userName,
        p.id AS postingId,
        p.title AS postingTitle,
        p.content AS postingContent FROM posts AS p
      INNER JOIN users AS u
      ON p.user_id = u.id
      WHERE u.id = ? AND p.id = ?
      LIMIT 1;`
      const [post] = await database.query(rawQuery, [userId, postId])
      return post
    }
  } catch (err) {
    err.message = 'Failed modify post for user.'
    throw err
  }
}

const deletePostByPostId = async (postId) => {
  try {
    const rawQuery = `
    DELETE FROM posts WHERE id = ?;`
    const isDeleted = await database.query(rawQuery, [postId])
    return isDeleted
  } catch (err) {
    err.message = 'Failed to delete post.'
    throw err
  }
}

module.exports = {
  writePost,
  getPosts,
  getPostsByUserId,
  modifyPostByUserIdAndPostId,
  deletePostByPostId
}
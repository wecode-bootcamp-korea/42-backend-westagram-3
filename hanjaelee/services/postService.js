const postDao = require('../models/postDao')
const { invalidUserErr, invalidAccessTokenErr } = require('../utils/error/messages')

const createPost = async (title, content, imageURL, userId) => {
  try {
    const result = postDao.createPost(
      title,
      content,
      imageURL,
      userId)
    return result
  } catch (err) {
    err.statusCode = invalidAccessTokenErr.statusCode
    err.message = invalidAccessTokenErr.message
    throw err
  }
}


const getPosts = async () => {
  const posts = postDao.getPosts()
  return posts
}

const getPostsByUserId = async (userId) => {
  const post = postDao.getPostsByUserId(userId)
  return post
}

const modifyPost = async (userId, postId, postContent) => {
  const post = postDao.
    modifyPostByUserIdAndPostId(
      userId,
      postId,
      postContent)
  return post
}

const deletePostByPostId = async (postId) => {
  const isDeleted = postDao.deletePostByPostId(postId)
  return isDeleted
}

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  modifyPost,
  deletePostByPostId
}
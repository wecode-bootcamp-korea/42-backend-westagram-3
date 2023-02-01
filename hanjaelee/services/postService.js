const postDao = require('../models/postDao')
const jwt = require('jsonwebtoken')

const writePost = async (title, content, imageURL, userId, authorization) => {
  try {
    const decodedToken = jwt.verify(authorization, process.env.SECRET_KEY)
    if (decodedToken) {
      const result = postDao.writePost(
        title,
        content,
        imageURL,
        userId)
      return result
    }
    return null
  } catch (err) {
    err.statusCode = 401
    err.message = 'Invalid Access Token'
    throw err
  }
}

const getPosts = async () => {
  const posts = postDao.getPosts()
  return posts
}

const getPost = async (userId) => {
  const post = postDao.getPost(userId)
  return post
}

const modifyPost = async (userId, postId, postContent) => {
  const post = postDao.modifyPost(userId, postId, postContent)
  return post
}

const deletePost = async (postId) => {
  const isDeleted = postDao.deletePost(postId)
  return isDeleted
}

module.exports = {
  writePost,
  getPosts,
  getPost,
  modifyPost,
  deletePost
}
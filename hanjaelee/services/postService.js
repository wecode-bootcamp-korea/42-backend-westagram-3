const postDao = require('../models/postDao')

const writePost = async (title, content, imageURL, userId) => {
  const isWrited = postDao.writePost(
    title,
    content,
    imageURL,
    userId)

  return isWrited
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
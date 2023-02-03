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
  writePost,
  getPosts,
  getPostsByUserId,
  modifyPost,
  deletePostByPostId
}
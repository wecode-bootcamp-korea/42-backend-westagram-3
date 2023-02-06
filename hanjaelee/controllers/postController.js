const postService = require('../services/postService')
const { catchAsync } = require('../utils/error')
const { accessTokenErr } = require('../utils/error/messages')
const { invalidUserErr } = require('../utils/error/userErrMsg')
const { createPostErr,
  deletePostErr,
  keyErr } = require('../utils/error/postErrMsg')

const createPost = catchAsync(async (req, res) => {
  const user = req.user
  if (!user) {
    const err = new Error(accessTokenErr.message)
    err.statusCode = accessTokenErr.statusCode
    throw err
  }

  const { title, content, imageURL } = req.body
  if (!title || !content || !user) {
    const err = new Error(keyErr.message)
    err.statusCode = err.statusCode
    throw err
  }

  const data = await postService.createPost(title, content, imageURL, user.id)
  if (!data['affectedRows']) throw new Error(createPostErr.message)

  return res.status(200).json({ message: 'postCreated' })
})

const getPosts = catchAsync(async (req, res) => {
  const posts = await postService.getPosts()
  return res.status(200).json({ data: posts })
})

const getPostsByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params
  if (!userId) {
    const err = new Error(keyErr.message)
    err.statusCode = keyErr.statusCode
    throw err
  }

  const post = await postService.getPostsByUserId(userId)

  return res.status(200).json({ data: post })
})

const modifyPost = catchAsync(async (req, res) => {
  const { postId } = req.params
  const userId = req.userId
  if (!postId) {
    const err = new Error(keyErr.message)
    err.statusCode = keyErr.statusCode
    throw err
  }

  const { postContent } = req.body
  if (!postContent) {
    const err = new Error(keyErr.message)
    err.statusCode = keyErr.statusCode
    throw err
  }

  const post = await postService.modifyPost(userId, postId, postContent)
  if (!post) {
    throw new Error(invalidUserErr.message)
  }
  return res.status(200).json({ data: post })
})

const deletePostByPostId = catchAsync(async (req, res) => {
  const { postId } = req.params
  const isDeleted = await postService.deletePostByPostId(postId)
  if (!isDeleted['affectedRows']) {
    throw new Error(deletePostErr.message)
  }
  return res.status(200).json({ message: 'postDeleted' })
})

module.exports = {
  createPost,
  getPosts,
  getPostsByUserId,
  modifyPost,
  deletePostByPostId
}
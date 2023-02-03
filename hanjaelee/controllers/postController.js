const postService = require('../services/postService')
const { catchAsync } = require('../utils/error')
const { invalidUserErr,
  writePostErr,
  deletePostErr,
  keyErr } = require('../utils/error/messages')

const writePost = catchAsync(async (req, res) => {
  const { title, content, imageURL, userId } = req.body

  const data = await postService.writePost(title, content, imageURL, userId)
  if (!data['affectedRows']) throw new Error(writePostErr.message)

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
  const { userId, postId } = req.params
  const { postContent } = req.body
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
  writePost,
  getPosts,
  getPostsByUserId,
  modifyPost,
  deletePostByPostId
}
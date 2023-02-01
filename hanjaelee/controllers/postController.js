const postService = require('../services/postService')

const writePost = async (req, res) => {
  try {
    const { authorization } = req.headers
    const { title, content, imageURL, userId } = req.body

    if (!authorization) new Error('No Authorization')
    if (!title || !content || !!userId) new Error('Invalid Input.')

    const data = await postService.writePost(
      title,
      content,
      imageURL,
      userId,
      authorization)

    if (!data || !data['affectedRows']) throw new Error('Failed To write Post.')

    return res.status(200).json({ message: 'postCreated' })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const getPosts = async (req, res) => {
  try {
    const posts = await postService.getPosts()
    res.status(200).json({ data: posts })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const getPost = async (req, res) => {
  try {
    const { userId } = req.params
    const post = await postService.getPost(userId)
    res.status(200).json({ data: post })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const modifyPost = async (req, res) => {
  try {
    const { userId, postId } = req.params
    const { postContent } = req.body
    const post = await postService.modifyPost(userId, postId, postContent)
    if (!post) {
      throw new Error('this user didn\'t write this post.')
    }
    res.status(200).json({ data: post })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params
    const isDeleted = await postService.deletePost(postId)
    if (!isDeleted['affectedRows']) {
      throw new Error('Failed to Delete Post.')
    }
    res.status(200).json({ message: 'postDeleted' })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = {
  writePost,
  getPosts,
  getPost,
  modifyPost,
  deletePost
}
const express = require('express')
const postController = require('../controllers/postController')
const { validateToken } = require('../middlewares/auth')

const router = express.Router()

router.get('/', postController.getPosts)
router.get('/:userId', postController.getPostsByUserId)

router.post('/', validateToken, postController.createPost)

router.patch('/:postId', validateToken, postController.modifyPost)

router.delete('/:postId', postController.deletePostByPostId)

module.exports = {
  router
}
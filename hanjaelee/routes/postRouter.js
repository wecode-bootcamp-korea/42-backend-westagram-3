const express = require('express')
const postController = require('../controllers/postController')

const router = express.Router()

router.get('/', postController.getPosts)
router.get('/:userId', postController.getPostsByUserId)

router.post('/write', postController.writePost)

router.patch('/:userId/:postId', postController.modifyPost)

router.delete('/:postId', postController.deletePostByPostId)

module.exports = {
  router
}
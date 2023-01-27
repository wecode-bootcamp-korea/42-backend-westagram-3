const express = require('express')
const controller = require('../controllers/likeController')

const router = express.Router()

router.post('/:userId/:postId', controller.postLike)

module.exports = {
  router
}
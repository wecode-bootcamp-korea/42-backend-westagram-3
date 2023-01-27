const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

// 과제 2 : 회원가입
router.post('/signup', userController.signup)

module.exports = {
  router
}
const jwt = require('jsonwebtoken')
const userDao = require('../models/userDao')
const { invalidAccessTokenErr } = require('../utils/error/messages')
const { accessTokenErr } = require('../utils/error/messages')

const validateToken = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if (!authorization) {
      const err = new Error(accessTokenErr.message)
      err.statusCode = accessTokenErr.statusCode
      throw err
    }

    jwt.verify(authorization, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        err.statusCode = invalidAccessTokenErr.statusCode
        err.message = invalidAccessTokenErr.message
        return res.status(err.statusCode || 500).json({ message: err.message })
      }
      const user = await userDao.getUserByUserId(decoded.userId)
      req.user = user
      next()
    })

  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = {
  validateToken
}
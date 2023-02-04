const jwt = require('jsonwebtoken')

const { loginErr } = require('../utils/error/messages')
const { makeHashedPassword,
  checkHashedPassword,
  getCurrentTimeInSeconds } = require('../utils')
const userDao = require('../models/userDao.js')

const signup = async (name, email, password, profileImage) => {
  try {
    const COST_FACTOR = 12
    const hashedPassword = await makeHashedPassword(password, COST_FACTOR)

    const isCreated = await userDao.createUser(
      name,
      email,
      hashedPassword,
      profileImage
    )

    return isCreated
  } catch (err) {
    throw err
  }
}

const login = async (email, password) => {
  try {
    let accessToken = null

    const userId = await userDao.getUserIdByEmail(email)
    const hashedPassword = await userDao.getPasswordByUserId(userId)

    if (!userId || !password) return accessToken

    const isSame = await checkHashedPassword(password, hashedPassword)
    if (!isSame) return accessToken

    const CURRENT_TIME = getCurrentTimeInSeconds()
    const EXPIRE_TIME = 60 * 60 * 24
    const payLoad = {
      iss: 'Hanjae Lee',
      iat: CURRENT_TIME,
      exp: CURRENT_TIME + EXPIRE_TIME,
      userId: userId
    }

    const secretKey = process.env.SECRET_KEY
    accessToken = jwt.sign(payLoad, secretKey)

    return accessToken
  } catch (err) {
    err.message = loginErr.message
    throw err
  }
}

module.exports = {
  signup,
  login
}
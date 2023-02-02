const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userDao = require('../models/userDao.js')

const signup = async (name, email, password, profileImage) => {
  const COST_FACTOR = 12
  const hashedPassword = await makeHashedPassword(password, COST_FACTOR)

  const isCreated = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage
  )

  return isCreated
}

const login = async (email, password) => {
  try {
    let accessToken = null

    const userId = await userDao.getUserId(email)
    const hashedPassword = await userDao.getPassword(userId)
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
    err.meesage = 'Failed to login.'
    throw err
  }
}

const makeHashedPassword = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds)
}

const checkHashedPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

const getCurrentTimeInSeconds = () => {
  const current = (Date.now() / 1000) + (60 * 60 * 9)
  return Math.floor(current)
}
module.exports = {
  signup,
  login
}
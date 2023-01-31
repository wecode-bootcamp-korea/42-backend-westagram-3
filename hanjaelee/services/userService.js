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

    const payLoad = { userId: userId }
    const secretKey = process.env.SECRET_KEY
    accessToken = jwt.sign(payLoad, secretKey)
    return accessToken
  } catch (err) {
    console.error(err)
    throw err
  }
}

const makeHashedPassword = async (password, saltRounds) => {
  return await bcrypt.hash(password, saltRounds)
}

const checkHashedPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
  signup,
  login
}
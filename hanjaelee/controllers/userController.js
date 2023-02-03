const { keyErr,
  invalidUserErr,
  createUserErr } = require('../utils/error/messages')
const userService = require('../services/userService')
const { catchAsync } = require('../utils/error')

const signup = catchAsync(async (req, res) => {
  const { name, email, password, profileImage } = req.body
  if (!name || !password || !email) {
    const err = new Error(keyErr.message)
    err.statusCode = keyErr.statuscode
    throw err.statusCode
  }

  const isCreated = await userService.signup(
    name,
    email,
    password,
    profileImage)

  if (!isCreated['affectedRows']) {
    const err = new Error(createUserErr.message)
    err.statusCode = createUserErr.statusCode
    throw err
  }

  return res.status(200).json({ message: 'userCreated' })
})

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body
  if (!email, !password) {
    const err = new Error(keyErr.message)
    err.statusCode = keyErr.statusCode
    throw err
  }

  const accessToken = await userService.login(email, password)
  if (!accessToken) {
    const err = new Error(invalidUserErr.statusCode)
    err.statusCode = invalidUserErr.statusCode
    throw err
  }

  return res.status(200).json({ accessToken: accessToken })
})

module.exports = {
  signup,
  login
}
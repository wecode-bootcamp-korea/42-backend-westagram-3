const userService = require('../services/userService')
const { catchAsync } = require('../utils/error')

const signup = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    if (!name || !email || !password) {
      const err = new Error('KEY_ERROR')
      err.statusCode = 400
      throw err
    }

    const isCreated = await userService.signup(
      name,
      email,
      password,
      profileImage)

    if (!isCreated || !isCreated['affectedRows']) {
      throw new Error('Failed to Create User')
    }

    return res.status(200).json({ message: 'userCreated' })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'KEY_ERROR' })
    }

    const accessToken = await userService.login(email, password)

    if (!accessToken) {
      const err = new Error('INVALID_USER_ID')
      err.statusCode = 400
      // throw err
      return res.status(err.statusCode || 500).json({ message: err.message })
    }

    return res.status(200).json({ accessToken: accessToken })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
})

module.exports = {
  signup,
  login
}
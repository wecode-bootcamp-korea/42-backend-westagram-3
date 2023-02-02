const userService = require('../services/userService')
const { catchAsync } = require('../utils/error')

const signup = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    if (!password) {
      return res.status(400).json({ message: 'No Password.' })
    }

    const isCreated = await userService.signup(
      name,
      email,
      password,
      profileImage)

    if (!isCreated['affectedRows']) {
      throw new Error('Failed to Create User')
    }

    return res.status(200).json({ message: 'userCreated' })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

const login = catchAsync(async (req, res) => {
  try {
    const { email, password } = req.body
    const accessToken = await userService.login(email, password)

    if (!accessToken) {
      return res.status(401).json({ message: "Invalid User" })
    }

    return res.status(200).json({ accessToken: accessToken })
  } catch {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
})

module.exports = {
  signup,
  login
}
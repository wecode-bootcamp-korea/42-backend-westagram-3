const userService = require('../services/userService')

const signup = async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body

    const isCreated = await userService.signup(
      name,
      email,
      password,
      profileImage)

    if (!isCreated['affectedRows']) {
      throw new Error('Failed to Create User')
    }

    res.status(200).json({ message: 'createUser' })
  } catch (err) {
    console.error(err)
    return res.status(err.statusCode || 500).json({ message: err.message })
  }
}

module.exports = {
  signup
}
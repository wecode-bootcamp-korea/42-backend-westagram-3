const bcrypt = require('bcrypt')

const userDao = require('../models/userDao.js')

const signup = async (name, email, password, profileImage) => {
  const hashedPassword = await makeHashedPassword(password, 12)

  const isCreated = await userDao.createUser(
    name,
    email,
    hashedPassword,
    profileImage
  )

  return isCreated
}

const makeHashedPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds)
}

module.exports = {
  signup,
}
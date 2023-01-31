const bcrypt = require('bcrypt')

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

const makeHashedPassword = (password, saltRounds) => {
  return bcrypt.hash(password, saltRounds)
}

module.exports = {
  signup,
}
const userDao = require('../models/userDao.js')

const signup = async (name, email, password, profileImage) => {

  const isCreated = await userDao.createUser(
    name,
    email,
    password,
    profileImage
  )

  return isCreated
}

module.exports = {
  signup
}
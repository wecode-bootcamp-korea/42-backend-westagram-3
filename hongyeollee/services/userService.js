const userDao = require("../models/userDao");

//create user
const signup = async (name, password, profileImage, email) => {
  const createUser = await userDao.createUser(
    name,
    password,
    profileImage,
    email
  );
  return createUser;
};

module.exports = {
  signup,
};

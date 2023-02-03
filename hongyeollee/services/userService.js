const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");

//create user
const signup = async (name, password, profileImage, email) => {
  const costFactor = 12;
  const makeHash = async (password, costFactor) => {
    return await bcrypt.hash(password, costFactor);
  };
  const hashedPassword = await makeHash(password, costFactor);
  console.log(hashedPassword);
  const createUser = await userDao.createUser(
    name,
    hashedPassword,
    profileImage,
    email
  );
  return createUser;
};

module.exports = {
  signup,
};

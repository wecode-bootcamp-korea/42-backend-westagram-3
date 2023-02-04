const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//create user
const signup = async (name, password, profileImage, email) => {
  // encryption of password
  const costFactor = 12;
  const makeHash = async (password, costFactor) => {
    return await bcrypt.hash(password, costFactor);
  };
  const hashedPassword = await makeHash(password, costFactor);

  const createUser = await userDao.createUser(
    name,
    hashedPassword,
    profileImage,
    email
  );
  return createUser;
};

// compare encryption of password and service Token
const login = async (email, password) => {
  try {
    let accessToken = null;

    const hashedPassword = await userDao.getPassword(email);
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      const pwErr = new Error("WRONG PASSWORD");
      throw pwErr;
    }

    const DIVISION_TIME_SECOND_OF_ONEDAY = 60 * 60 * 24;
    const currentTime = currentUTCKoreaTime();
    const activityTime = currentUTCKoreaTime() + DIVISION_TIME_SECOND_OF_ONEDAY;

    const payload = {
      iss: "hongyeollee",
      sub: "test token",
      iat: currentTime,
      nbf: activityTime,
    };

    accessToken = jwt.sign(payload, process.env.SECRET_KEY);
    return accessToken;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const DIVISION_TIME_SECOND_OF_NINE_HOUR = 1000 + 60 * 60 * 9;
const currentUTCKoreaTime = () => {
  const currentTime = new Date().getTime() / DIVISION_TIME_SECOND_OF_NINE_HOUR;
  return Math.floor(currentTime);
};

module.exports = {
  signup,
  login,
};

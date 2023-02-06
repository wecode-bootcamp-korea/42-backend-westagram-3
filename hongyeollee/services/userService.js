const userDao = require("../models/userDao");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const constants = require("../utills/constants");

const signup = async (name, password, profileImage, email) => {
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

const login = async (email, password) => {
  try {
    let accessToken = null;

    const hashedPassword = await userDao.getPassword(email);
    const comparePassword = await bcrypt.compare(password, hashedPassword);
    if (!comparePassword) {
      const pwErr = new Error("WRONG PASSWORD");
      throw pwErr;
    }

    const currentTime = currentUTCKoreaTime();
    const activityTime = currentTime + onedayHour;

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

const nineHour = constants.DIVISION_TIME_SECOND_OF_NINE_HOUR;
const onedayHour = constants.DIVISION_TIME_SECOND_OF_ONEDAY;
const currentUTCKoreaTime = () => {
  const currentTime = new Date().getTime() / nineHour;
  return Math.floor(currentTime);
};

module.exports = {
  signup,
  login,
};

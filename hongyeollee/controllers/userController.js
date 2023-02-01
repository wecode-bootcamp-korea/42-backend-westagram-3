const userService = require("../services/userService");

//create user
const signup = async (req, res) => {
  try {
    const { name, password, profileImage, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signup(name, password, profileImage, email);
    res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signup,
};

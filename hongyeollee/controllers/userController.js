const userService = require("../services/userService");

//create user
const signup = async (req, res) => {
  try {
    console.log("signup");
    const { name, password, profileImage, email } = req.body;

    if (!name || !password || !email) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }

    await userService.signup(name, password, profileImage, email);
    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

//login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "KEY_ERROR" });
    }
    const accessToken = await userService.login(email, password);
    if (!accessToken) {
      return res.status(400).json({ message: "NOT_EXIST_TOKEN" });
    }

    // exists
    return res.status(200).json({ accessToken: accessToken });
  } catch (err) {
    console.error(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
};

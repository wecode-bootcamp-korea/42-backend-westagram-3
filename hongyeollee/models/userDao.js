const mysqlDatabase = require("./index");

const createUser = async (name, hashedPassword, profileImage, email) => {
  try {
    return await mysqlDatabase.query(
      `
      INSERT INTO users(
          name,
          password,
          profile_image,
          email
        )VALUES(?, ?, ?, ?);
        `,
      [name, hashedPassword, profileImage, email]
    );
  } catch (err) {
    err.message;
    err.statusCode = 400;
    throw err;
  }
};

const getPassword = async (email) => {
  try {
    const [result] = await mysqlDatabase.query(
      `
      SELECT 
        password 
      FROM 
        users 
      WHERE email = ?`,
      [email]
    );

    if (!result) {
      const err = new Error("No Password for user email.");
      err.statusCode = 400;
      throw err;
    }
    return result.password;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createUser,
  getPassword,
};

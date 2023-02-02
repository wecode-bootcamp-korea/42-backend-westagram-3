const mysqlDatabase = require("./index");

//create user
const createUser = async (name, hashedPassword, profileImage, email) => {
  try {
    console.log(mysqlDatabase);
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

module.exports = {
  createUser,
};

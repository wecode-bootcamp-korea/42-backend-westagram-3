const mysqlDatabase = require("./index");

//create user
const createUser = async (name, password, profileImage, email) => {
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
      [name, password, profileImage, email]
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

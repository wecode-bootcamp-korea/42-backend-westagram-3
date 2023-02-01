const { DataSource } = require("typeorm");

const mysqlDatabase = new DataSource({
  type: process.env.TYPEORM_CONNCETION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
});

mysqlDatabase
  .initialize()
  .then(() => {
    console.log("🆗🆗🆗DataSource has been initialize~🆗🆗🆗");
  })
  .catch((err) => {
    console.log("❌❌❌DataSource hasn't been initialize❌❌❌");
  });

module.exports = mysqlDatabase;

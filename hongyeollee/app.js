require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

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

app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    throw console.error(err);
  }
};

start();

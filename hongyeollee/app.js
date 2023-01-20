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

//health check
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

//create user
app.post("/signup", async (req, res) => {
  const { name, password, age, email } = req.body;

  await mysqlDatabase.query(
    `INSERT INTO users(
      name,
      password,
      age,
      email
    )VALUES(?, ?, ?, ?);
    `,
    [name, password, age, email]
  );
  res.status(201).json({ message: "userCreated ✅" });
});

const PORT = process.env.PORT;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening on ${PORT}`));
  } catch (err) {
    console.error("Failed server listening", err);
    throw err;
  }
};

start();

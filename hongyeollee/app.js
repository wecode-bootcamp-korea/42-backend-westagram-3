const http = require("http");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const {
  DataSource,
  CustomRepositoryCannotInheritRepositoryError,
} = require("typeorm");

const myDataSource = new DataSource({
  type: process.env.TYPEORM_CONNCETION,
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: process.env.TYPEORM_PORT,
});

myDataSource.initialize().then(() => {
  console.log("DataSource has been initialize~");
});

app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const server = http.createServer(app);
const PORT = process.env.PORT;

const start = async () => {
  server.listen(PORT, () => console.log(`server is listening on ${PORT}`));
};

start();

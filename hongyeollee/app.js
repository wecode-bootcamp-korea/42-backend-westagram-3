require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes");

app = express();
app.use(express.json());
app.use(morgan("combined"));
app.use(cors());
app.use(routes);

//health check
app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
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

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();
require("dotenv").config();

const { DataSource } = require('typeorm')

const appDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
  });


const app =express()

app.use(express.json());
app.use(cors());
app.use(morgan(''));


app.get("/ping", (req,res) => {
  res.json({message:"pong"});
});

const PORT =  process.env.PORT;

const start = async () =>{
   app.listen(PORT, () => console.log(`server is listening on ${PORT}` ));
}

start()
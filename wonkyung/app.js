require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");




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
  })
   .catch(()=> { 
      console.log("Failed to connect to Database")
   });
  


const app =express()

app.use(express.json());
app.use(cors());
app.use(morgan(''));


app.get("/ping", (req,res) => {
  res.json({message:"pong"});
});

app.post("/users/signup", async(req, res) => {
  const { name, email, profileImage, password } = req.body

  await appDataSource.query(
      `INSERT INTO users(
          name, 
          email,
          profile_image,
          password
      ) VALUES (?, ?, ?, ?);
      `, [name, email, profileImage, password]
  );
  

  res.status(201).json({ message : "userCreated"});
});

app.post("/posts/signup", async(req, res,) => {
  const { title, content, imageUrl, userId } = req.body;

  await appDataSource.query(
      `INSERT INTO posts(
          title,
          content,
          image_url,
          user_id
      ) VALUES ( ?, ?, ?, ? );
      `, [title, content, imageUrl, userId]
  );

  res.status(201).json({ message : "postCreated"});
})

app.get("/posts/list", async(req, res,) => {
  await appDataSource.query(
      `SELECT 
              users.id as userId, 
              users.profile_image as userProfileImage, 
              posts.id as postingId, 
              posts.image_url as postingImageUrl, 
              posts.content as postingContent 
          FROM users 
          INNER JOIN posts 
          ON users.id = posts.user_id
      `, (err, posts) => {
          return res.status(200).json(posts);
      });
});

app




const PORT =  process.env.PORT;

const start = async () =>{
   app.listen(PORT, () => console.log(`server is listening on ${PORT}` ));
}

start()
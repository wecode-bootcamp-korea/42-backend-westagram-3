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



const postArr = rows => {
  for(let i=0; i<rows.length; i++){
      delete rows[i].userId;
      delete rows[i].userProfileImage;
  }
  return rows;
}

app.get("/users/posts/:id", async(req, res) => {
  const { id } = req.params;
  
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
          WHERE users.id = ${id}; 
      `, 
      (err, rows) => { 
          res.status(200).json(
              { "data" : {
                      "userId" : rows[0].userId, 
                      "userProfileImage" : rows[0].userProfileImage,
                      "postings" : postArr(rows)
                  }
              });
      });
})

app.patch("/posts/update/:userId/:postId", async(req, res) => {
  const { userId, postId } = req.params;
  const { content } = req.body;
  await appDataSource.query(
      ` UPDATE 
              posts 
          SET 
          content=? 
          WHERE user_id=${userId} and id=${postId};
      `, [content]
  );

  await appDataSource.query(    
      `SELECT 
              users.id as userId, 
              users.name as userName, 
              posts.id as postingId, 
              posts.title as postingTitle, 
              posts.content as postingContent 
          FROM users 
          INNER JOIN posts 
          ON users.id = posts.user_id
          WHERE users.id=${userId} and posts.id=${postId};
      `, (err, rows) => { 
          res.status(200).json({"data" : rows});
  });
})
  
app.delete("/posts/delete/:id", async(req, res) => {
  const { id } = req.params;
  await appDataSource.query(
      `DELETE 
          FROM posts
          WHERE id=${id}; 
      `, (err, rows) => {
          res.status(204).json({ message:"Post Deleted" });
      }
  );    
})

app.post("/likes/:userId/:postId", async(req, res, next)=>{
  const { userId, postId } = req.params;

  await appDataSource.query(
      `INSERT INTO likes(
          user_id, 
          post_id
      ) VALUES (${userId}, ${postId});
      ` );
  res.status(200).json({ message : "likeCreated" });
})

app.delete("/likeDelete/:userId/:postId", async(req, res, next)=>{
  const { userId, postId } = req.params;
  await appDataSource.query(
      `DELETE 
          FROM likes
          WHERE user_id=${userId} and post_id=${postId};`
      , (err, rows) => {
          res.status(200).json({ message : "likesDeleted" });
      }
  )
})
const PORT =  process.env.PORT;

const start = async () =>{
  try { 
    app.listen(PORT, () => console.log(`server is listening on ${PORT}` ));
} catch (err){
  console.error(err);
}
};
start()
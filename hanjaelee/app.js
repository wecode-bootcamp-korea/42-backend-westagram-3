require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { DataSource } = require('typeorm');

const database = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE
})

database.initialize()
  .then((data) => {
    console.log('🆗🆗🆗 Data Source has been initialized.')
  })
  .catch((err) => {
    console.log('❌❌❌ Data Source has not been initialized.')
  })

app = express()

// Client 로 부터 JSON 형식이 잘못되었을 경우 처리하는 middleware
const invalidJsonMiddleware = (error, req, res, next) => {
  console.log(Object.keys(error))
  if (error instanceof SyntaxError) {
    res.status(400).json({ message: 'Invalid json is sent' })
  } else {
    next()
  }
}

app.use(express.json())
app.use(invalidJsonMiddleware)
app.use(cors())
app.use(morgan('dev'))

app.get('/ping', (req, res) => {
  res.json({ message: 'pong' })
})

// 과제 2 회원가입
app.post('/signup', async (req, res) => {
  const { name, email, profileImage, password } = req.body

  const rawQuery =
    `
    INSERT INTO users (
      name,
      email,
      profile_image,
      password
    ) VALUES (?, ?, ?, ?);`

  try {
    const rawData = await database.query(rawQuery, [name, email, profileImage, password])
    if (rawData['affectedRows']) {
      return res.status(201).json({ message: 'userCreated' })
    }
    return res.status(202).json({ message: 'userNotCreated' })
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

// 과제 3 게시글 등록하기
app.post('/post', async (req, res) => {
  const { title, content, userId } = req.body

  const rawQuery =
    `
    INSERT INTO posts (
      title,
      content,
      user_id
    ) VALUES (?, ?, ?);`

  try {
    const rawData = await database.query(rawQuery, [title, content, userId])
    if (rawData['affectedRows']) {
      return res.status(201).json({ message: 'postCreated' })
    }
    return res.status(202).json({ message: 'postnotcreated' })
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

// 과제 4 모든 게시물 가져오기
app.get('/posts', async (req, res) => {
  const rawQuery = `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      p.id AS postingId,
      p.image_url AS postingImageUrl,
      p.content AS postingContent
    FROM posts AS p
    INNER JOIN users AS u
    ON p.user_id = u.id
    `
  try {
    await database.query(rawQuery, (err, rows) => {
      console.log(rows)
      const result = {}
      const data = rows
      result['data'] = data
      res.status(200).json(result)
    })
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

// 과제 5 유저 한명이 작성한 모든 게시물 가져오기
app.get('/posts/:userId', async (req, res) => {
  const { userId } = req.params
  const rawQuery = `
    SELECT
      u.id AS userId,
      u.profile_image AS userProfileImage,
      JSON_ARRAYAGG(JSON_OBJECT(
                    'postingId', p.id,
                    'postingImageUrl', p.image_url,
                    'postingContent', p.content)) AS posting
    FROM posts AS p
    INNER JOIN users AS u
    ON p.user_id = u.id WHERE u.id = ${userId}
    GROUP BY u.id;
    `

  try {
    await database.query(rawQuery, (err, rows) => {
      console.log(rows)
      return res.status(200).json({ data: rows })
    })
  } catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

// 과제 6 유저 한명이 작성한 게시글 내용 수정하기
app.patch('/post', async (req, res) => {
  const { postId, userId, postContent } = req.body

  let rawQuery = `
    UPDATE posts
    SET content = ?
    WHERE id = ? AND user_id = ?;
  `

  try {
    const rawData = await database.query(rawQuery, [postContent, postId, userId])
    if (rawData['affectedRows']) {

      rawQuery = `
      SELECT
        u.id AS userId,
        u.name AS userName,
        p.id AS postingId,
        p.title AS postingTitle,
        p.content AS postingContent FROM posts AS p
      INNER JOIN users AS u
      ON p.user_id = u.id
      WHERE u.id = ${userId} AND p.id = ${postId}
      LIMIT 1;
    `
      try {
        await database.query(rawQuery, (err, rows) => {
          if (rows.length == 0) {
            return res.status(400).json({ message: 'affected rows is empty' })
          }
          return res.status(200).json({ data: rows[0] })
        })
      } catch (error) {
        return res.status(200).json({ message: error.sqlMessage })
      }
    }
    return res.status(400).json({ message: `userId and postId is not matched` })
  }
  catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

// 과제 7 게시글 삭제하기
app.delete('/post/:postId', async (req, res) => {
  const { postId } = req.params

  const rawQuery = `
    DELETE FROM posts WHERE id = ?;
  `
  try {
    const rawData = await database.query(rawQuery, [postId])
    if (rawData['affectedRows'] == 0) {
      return res.status(400).json({ message: `There is no post to delete for postId ${postId}` })
    }
    return res.status(200).json({ meesage: 'postingDeleted' })
  }
  catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

// 과제 8 좋아요 누르기
app.post('/like', async (req, res) => {
  const { userId, postId } = req.body
  const rawQuery = `
    INSERT INTO likes
    (user_id, post_id)
    VALUES
    (?, ?);
  `
  try {
    const rawData = await database.query(rawQuery, [userId, postId])
    if (rawData['affectedRows'] == 0) {
      return res.status(400).json({ message: 'like is not inserted.' })
    }

    return res.status(200).json({ message: 'likeCreated' })
  }
  catch (error) {
    return res.status(400).json({ message: error.sqlMessage })
  }
})

const PORT = process.env.PORT;
const start = async () => {
  try {
    app.listen(PORT, () => console.log(`server is listening to on ${PORT} `))
  } catch (err) {
    console.error(err)
  }
}

start()
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
  .then(() => {
    console.log('Data Source has been initialized.')
  })
  .catch((err) => {
    console.log('❌❌❌ Data Source has not been initialized.')
  })

app = express()

// Client 로 부터 json 형식이 잘못되었을 경우 처리하는 middleware
const invalidJsonMiddleware = (error, req, res, next) => {
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

app.post('/signup', (req, res) => {
  const { name, email, profileImage, password } = req.body

  const rawQuery =
    `
  INSERT INTO users (
    name,
    email,
    profile_image,
    password
    ) VALUES (?, ?, ?, ?);`
  const rawData = database.query(rawQuery, [name, email, profileImage, password])

  rawData
    .then((data) => {
      console.log(data)
      if (data.affectedRows) {
        res.status(201).json({ message: 'userCreated' })
        return
      }

      res.status(400).json({ message: 'userIsNotCreated' })
    })
    .catch((error) => {
      res.status(400).json({ message: error.sqlMessage })
    })
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
